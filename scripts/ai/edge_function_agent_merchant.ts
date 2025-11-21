// ============================================================================
// SUPABASE EDGE FUNCTION - Agent Commerçant (Génération de Promotions)
// ============================================================================
// Description: Génère automatiquement du contenu marketing pour les commerçants
// Modèle: OpenAI GPT-4o-mini
// Version: 1.0.0
// Date: 2025-11-09
// ============================================================================

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

// ============================================================================
// CONFIGURATION
// ============================================================================

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const OPENAI_MODEL = 'gpt-4o-mini';
const AGENT_NAME = 'agent_merchant';

// Prix OpenAI GPT-4o-mini (Janvier 2025)
const PRICING = {
  input: 0.150 / 1_000_000,  // $0.150 par 1M tokens
  output: 0.600 / 1_000_000  // $0.600 par 1M tokens
};

// ============================================================================
// TYPES
// ============================================================================

interface CommerceData {
  type_commerce: string;
  nom_commerce: string;
  ville: string;
  type_promotion: string;
  valeur_promotion: string;
  description_commerce?: string;
  mots_cles?: string[];
  public_cible?: string;
  duree_promo?: string;
}

interface GeneratedPromo {
  titre: string;
  description_courte: string;
  description_longue: string;
  conditions: string;
  tags: string[];
  visual_prompt_canva: string;
  seo_title: string;
  seo_description: string;
  score_attractivite: number;
}

// ============================================================================
// FONCTION PRINCIPALE
// ============================================================================

serve(async (req) => {
  // CORS Headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // ========================================================================
    // 1. VALIDATION DE LA REQUÊTE
    // ========================================================================

    const { commerce_data, user_id } = await req.json();

    if (!commerce_data || !user_id) {
      throw new Error('Paramètres manquants : commerce_data et user_id requis');
    }

    // Initialiser Supabase client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // ========================================================================
    // 2. VÉRIFIER LE QUOTA UTILISATEUR
    // ========================================================================

    const { data: quotaCheck, error: quotaError } = await supabase
      .rpc('check_ai_quota', {
        p_user_id: user_id,
        p_agent_name: AGENT_NAME
      });

    if (quotaError) {
      console.error('Erreur vérification quota:', quotaError);
    }

    if (!quotaCheck) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'quota_exceeded',
          message: 'Quota IA mensuel atteint. Passez à un plan supérieur pour continuer.'
        }),
        {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // ========================================================================
    // 3. RÉCUPÉRER LA CONFIGURATION DE L'AGENT
    // ========================================================================

    const { data: agent, error: agentError } = await supabase
      .from('ai_agents')
      .select('*')
      .eq('name', AGENT_NAME)
      .eq('is_active', true)
      .single();

    if (agentError || !agent) {
      throw new Error('Agent non disponible');
    }

    // ========================================================================
    // 4. CRÉER OU RÉCUPÉRER LA CONVERSATION
    // ========================================================================

    let conversation_id: string;

    const { data: existingConv } = await supabase
      .from('ai_conversations')
      .select('id')
      .eq('user_id', user_id)
      .eq('agent_name', AGENT_NAME)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (existingConv) {
      conversation_id = existingConv.id;
    } else {
      const { data: newConv, error: convError } = await supabase
        .from('ai_conversations')
        .insert({
          user_id,
          agent_id: agent.id,
          agent_name: AGENT_NAME,
          title: `Génération promo - ${commerce_data.nom_commerce}`,
          status: 'active'
        })
        .select()
        .single();

      if (convError) throw convError;
      conversation_id = newConv.id;
    }

    // ========================================================================
    // 5. CONSTRUIRE LE PROMPT POUR OPENAI
    // ========================================================================

    const userPrompt = buildUserPrompt(commerce_data);

    // Enregistrer le message utilisateur
    await supabase.from('ai_messages').insert({
      conversation_id,
      user_id,
      role: 'user',
      content: JSON.stringify(commerce_data)
    });

    // ========================================================================
    // 6. APPEL À L'API OPENAI
    // ========================================================================

    const startTime = Date.now();

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: agent.model,
        messages: [
          { role: 'system', content: agent.system_prompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: agent.temperature,
        max_tokens: agent.max_tokens,
        response_format: { type: 'json_object' }
      })
    });

    if (!openaiResponse.ok) {
      const error = await openaiResponse.json();
      throw new Error(`OpenAI API Error: ${error.error?.message || 'Unknown error'}`);
    }

    const openaiData = await openaiResponse.json();
    const executionTime = Date.now() - startTime;

    // ========================================================================
    // 7. EXTRAIRE ET PARSER LA RÉPONSE
    // ========================================================================

    const assistantMessage = openaiData.choices[0].message.content;
    const generatedPromo: GeneratedPromo = JSON.parse(assistantMessage);

    const tokensUsed = openaiData.usage.total_tokens;
    const inputTokens = openaiData.usage.prompt_tokens;
    const outputTokens = openaiData.usage.completion_tokens;

    // Calculer le coût
    const costUSD = (inputTokens * PRICING.input) + (outputTokens * PRICING.output);

    // Enregistrer le message assistant
    await supabase.from('ai_messages').insert({
      conversation_id,
      user_id,
      role: 'assistant',
      content: assistantMessage,
      tokens_used: tokensUsed,
      model_used: agent.model,
      execution_time_ms: executionTime
    });

    // ========================================================================
    // 8. SAUVEGARDER LE CONTENU GÉNÉRÉ
    // ========================================================================

    const { data: savedContent, error: contentError } = await supabase
      .from('ai_generated_content')
      .insert({
        user_id,
        agent_name: AGENT_NAME,
        conversation_id,
        content_type: 'promo_text',
        input_prompt: userPrompt,
        output_content: JSON.stringify(generatedPromo),
        output_metadata: {
          commerce: commerce_data.nom_commerce,
          ville: commerce_data.ville,
          type: commerce_data.type_commerce
        },
        quality_score: generatedPromo.score_attractivite,
        is_approved: false
      })
      .select()
      .single();

    if (contentError) {
      console.error('Erreur sauvegarde contenu:', contentError);
    }

    // ========================================================================
    // 9. LOGGER L'UTILISATION
    // ========================================================================

    await supabase.from('ai_usage_logs').insert({
      user_id,
      agent_name: AGENT_NAME,
      conversation_id,
      action: 'generate_promo',
      input_data: commerce_data,
      output_data: generatedPromo,
      tokens_used: tokensUsed,
      cost_usd: costUSD,
      execution_time_ms: executionTime,
      model_used: agent.model,
      status: 'success'
    });

    // ========================================================================
    // 10. INCRÉMENTER LE QUOTA
    // ========================================================================

    await supabase.rpc('increment_ai_usage', {
      p_user_id: user_id,
      p_agent_name: AGENT_NAME,
      p_tokens_used: tokensUsed
    });

    // ========================================================================
    // 11. RETOURNER LA RÉPONSE
    // ========================================================================

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          promo: generatedPromo,
          content_id: savedContent?.id,
          conversation_id,
          metadata: {
            tokens_used: tokensUsed,
            execution_time_ms: executionTime,
            cost_usd: costUSD.toFixed(6),
            model: agent.model
          }
        }
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    // ========================================================================
    // GESTION DES ERREURS
    // ========================================================================

    console.error('Erreur Edge Function:', error);

    // Logger l'erreur si possible
    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
        await supabase.from('ai_usage_logs').insert({
          user_id: null,
          agent_name: AGENT_NAME,
          action: 'generate_promo',
          status: 'error',
          error: error.message,
          error_code: error.name
        });
      } catch (logError) {
        console.error('Erreur lors du logging:', logError);
      }
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Erreur interne du serveur'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

// ============================================================================
// FONCTIONS UTILITAIRES
// ============================================================================

/**
 * Construit le prompt utilisateur optimisé pour la génération de promo
 */
function buildUserPrompt(data: CommerceData): string {
  const mots_cles = data.mots_cles?.join(', ') || 'N/A';
  const description = data.description_commerce || 'Commerce local';
  const public_cible = data.public_cible || 'Tous';
  const duree = data.duree_promo || '30 jours';

  return `Crée une promotion marketing optimisée pour ce commerce local québécois :

📍 INFORMATIONS COMMERCE :
- Nom : ${data.nom_commerce}
- Type : ${data.type_commerce}
- Ville : ${data.ville}
- Description : ${description}
- Mots-clés : ${mots_cles}

🎯 PROMOTION À CRÉER :
- Type : ${data.type_promotion}
- Valeur : ${data.valeur_promotion}
- Public cible : ${public_cible}
- Durée : ${duree}

📝 FORMAT DE RÉPONSE JSON REQUIS :
{
  "titre": "Titre accrocheur max 80 caractères avec emoji",
  "description_courte": "Description engageante 150 caractères max",
  "description_longue": "Description complète 300-500 mots, ton chaleureux québécois, bénéfices clairs",
  "conditions": "Conditions claires et transparentes",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "visual_prompt_canva": "Prompt détaillé pour créer le visuel (couleurs, style, texte)",
  "seo_title": "Titre SEO optimisé max 60 caractères",
  "seo_description": "Meta description SEO 150-160 caractères",
  "score_attractivite": 8.5
}

✨ INSTRUCTIONS IMPORTANTES :
1. Utilise un ton authentique québécois (chaleureux, amical)
2. Mets en avant les bénéfices concrets pour le client
3. Crée un sentiment d'urgence mais reste authentique
4. Optimise pour le SEO local (inclure ville et mots-clés)
5. Le score d'attractivité doit refléter la qualité de l'offre (0-10)
6. Assure-toi que les conditions sont claires et honnêtes

Génère maintenant la promotion en JSON uniquement (pas de texte avant ou après le JSON).`;
}

// ============================================================================
// NOTES DE DÉPLOIEMENT
// ============================================================================
/*
Pour déployer cette Edge Function dans Supabase :

1. Installer Supabase CLI :
   npm install -g supabase

2. Initialiser le projet :
   supabase init

3. Créer la fonction :
   supabase functions new agent-merchant

4. Copier ce code dans :
   supabase/functions/agent-merchant/index.ts

5. Déployer :
   supabase functions deploy agent-merchant

6. Configurer les secrets :
   supabase secrets set OPENAI_API_KEY=sk-...

7. Tester localement :
   supabase functions serve agent-merchant

8. Appeler la fonction :
   POST https://VOTRE_PROJET.supabase.co/functions/v1/agent-merchant
   Headers: {
     "Authorization": "Bearer YOUR_ANON_KEY",
     "Content-Type": "application/json"
   }
   Body: {
     "user_id": "UUID",
     "commerce_data": {
       "type_commerce": "Restaurant",
       "nom_commerce": "PizzaMania",
       "ville": "Trois-Rivières",
       "type_promotion": "2 pour 1",
       "valeur_promotion": "50%",
       "description_commerce": "Pizzeria familiale artisanale",
       "mots_cles": ["pizza", "familial", "artisanal"],
       "public_cible": "Familles",
       "duree_promo": "7 jours"
     }
   }
*/
