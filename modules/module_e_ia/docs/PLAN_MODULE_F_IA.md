# 🤖 Module F - Intelligence Artificielle (3 Agents)

## 📋 Vue d'Ensemble

**Priorité :** 🅱️ BETA (Phase B - Février 2026)
**Statut :** 🔄 En cours de planification
**Technologie :** OpenAI API (GPT-4o-mini)
**Hébergement :** Canada (conformité Loi 25)

---

## 🎯 Objectifs du Module

Le Module F fournit **3 agents IA spécialisés** pour automatiser et optimiser l'expérience des utilisateurs RabaisLocal :

1. **Agent Commerçant** - Génération automatique de promotions (texte + visuel)
2. **Agent Consommateur** - Recommandations personnalisées d'offres
3. **Agent Affilié** - Coaching, scripts de vente et plans d'action

---

## 🤖 Les 3 Agents IA

### 1️⃣ Agent Commerçant : Créateur de Promotions

**Mission :** Générer des promotions attractives en moins de 5 minutes.

#### Fonctionnalités
- ✅ Génération de texte marketing optimisé
- ✅ Création automatique de visuels (Canva API)
- ✅ Suggestions de titres accrocheurs
- ✅ Optimisation SEO local
- ✅ Adaptation au ton québécois
- ✅ Respect des meilleures pratiques marketing

#### Inputs Requis
```json
{
  "type_commerce": "Restaurant / Spa / Boutique / Service",
  "nom_commerce": "Nom du commerce",
  "ville": "Trois-Rivières",
  "type_promotion": "Rabais % / 2 pour 1 / Cadeau gratuit",
  "valeur_promotion": "20% / 50$ / etc.",
  "description_commerce": "Description brève du commerce",
  "mots_cles": ["pizza", "familial", "terrasse"],
  "public_cible": "Familles / Jeunes adultes / Seniors / Tous",
  "duree_promo": "7 jours / 30 jours / permanent"
}
```

#### Outputs Générés
```json
{
  "titre": "🍕 2 pizzas pour le prix d'1 chez PizzaMania!",
  "description_courte": "Régalez toute la famille...",
  "description_longue": "Texte marketing optimisé complet",
  "conditions": "Valide du lundi au jeudi...",
  "tags": ["restaurant", "pizza", "famille", "trois-rivieres"],
  "visual_prompt_canva": "Prompt pour générer le visuel",
  "seo_title": "Pizza 2 pour 1 Trois-Rivières | PizzaMania",
  "seo_description": "Description SEO optimisée",
  "score_attractivite": 8.5
}
```

#### Limites par Plan Commerçant
| Plan | IA Générations/mois |
|------|---------------------|
| Gratuit | 2 |
| Bronze | 50 |
| Silver | 85 |
| Gold | Illimité |

---

### 2️⃣ Agent Consommateur : Recommandations Personnalisées

**Mission :** Suggérer les meilleures offres selon les préférences et la localisation.

#### Fonctionnalités
- ✅ Recommandations basées sur l'historique
- ✅ Géolocalisation intelligente
- ✅ Suggestions par catégorie d'intérêt
- ✅ Alertes promos ciblées
- ✅ Chat conversationnel
- ✅ Ton amical et québécois

#### Inputs Requis
```json
{
  "user_id": "UUID",
  "ville": "Trois-Rivières",
  "preferences": ["restaurant", "spa", "divertissement"],
  "historique_reservations": [
    {
      "categorie": "restaurant",
      "date": "2025-10-15",
      "satisfaction": 5
    }
  ],
  "budget_moyen": "25-50$",
  "frequence_sortie": "1-2 fois/semaine",
  "contexte": "Je cherche un bon restaurant pour un anniversaire"
}
```

#### Outputs Générés
```json
{
  "recommandations": [
    {
      "offer_id": "UUID",
      "nom_commerce": "Le Bouchon",
      "type": "Restaurant français",
      "promotion": "20% sur menu 3 services",
      "score_pertinence": 9.2,
      "raison": "Parfait pour anniversaires, cuisine raffinée, dans votre budget",
      "distance_km": 2.5
    }
  ],
  "message_personnalise": "Salut! Pour un anniversaire, je te recommande Le Bouchon...",
  "alertes_futures": ["Nouvelle promo spa la semaine prochaine"]
}
```

#### Limites par Plan Consommateur
| Plan | IA Requêtes/mois |
|------|------------------|
| Bronze | 10 |
| Silver | 50 |
| Gold | Illimité |

---

### 3️⃣ Agent Affilié : Coach Marketing Personnel

**Mission :** Former et guider les affiliés pour maximiser leurs ventes.

#### Fonctionnalités
- ✅ Génération de scripts de vente personnalisés
- ✅ Plans d'action hebdomadaires
- ✅ Coaching stratégique
- ✅ Analyse de performance
- ✅ Suggestions d'amélioration
- ✅ Formation continue

#### Inputs Requis
```json
{
  "affiliate_id": "UUID",
  "niveau_experience": "Débutant / Intermédiaire / Avancé",
  "objectif_mensuel": "10 ventes / 50 ventes / 100 ventes",
  "performance_actuelle": {
    "ventes_ce_mois": 5,
    "taux_conversion": 3.2,
    "canaux_utilises": ["Facebook", "TikTok"]
  },
  "defi_actuel": "Je n'arrive pas à convertir mes prospects",
  "temps_disponible": "5-10h/semaine"
}
```

#### Outputs Générés
```json
{
  "plan_action_semaine": {
    "jour_1": "Créer 3 posts Facebook avec ces scripts...",
    "jour_2": "Contacter 10 prospects via messenger...",
    "jour_3": "Publier vidéo courte TikTok sur..."
  },
  "scripts_vente": [
    {
      "canal": "Facebook Messenger",
      "situation": "Premier contact",
      "script": "Salut [Prénom]! J'ai remarqué que tu aimes..."
    }
  ],
  "conseils_personnalises": [
    "Ton taux de conversion est bas (3.2%). Essaie d'ajouter plus de preuves sociales...",
    "TikTok fonctionne bien pour toi, double tes efforts là-dessus!"
  ],
  "formations_recommandees": [
    "Module : Comment faire une vidéo TikTok virale"
  ],
  "motivation": "Tu es sur la bonne voie! Continue comme ça! 💪"
}
```

#### Limites par Niveau Affilié
| Niveau | IA Coaching/mois |
|--------|------------------|
| Starter | 5 sessions |
| Builder | 20 sessions |
| Builder Plus | Illimité |

---

## 🗄️ Architecture Base de Données Supabase

### Table : `ai_agents`

```sql
CREATE TABLE ai_agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, -- 'agent_merchant', 'agent_consumer', 'agent_affiliate'
  version TEXT NOT NULL DEFAULT 'v1.0',
  model TEXT NOT NULL DEFAULT 'gpt-4o-mini',
  system_prompt TEXT NOT NULL,
  temperature DECIMAL(2,1) DEFAULT 0.7,
  max_tokens INTEGER DEFAULT 1000,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### Table : `ai_conversations`

```sql
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES ai_agents(id) ON DELETE SET NULL,
  agent_name TEXT NOT NULL,
  title TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  last_message_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_ai_conversations_user_id ON ai_conversations(user_id);
CREATE INDEX idx_ai_conversations_agent_name ON ai_conversations(agent_name);
CREATE INDEX idx_ai_conversations_status ON ai_conversations(status);
```

### Table : `ai_messages`

```sql
CREATE TABLE ai_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES ai_conversations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  tokens_used INTEGER,
  model_used TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_ai_messages_conversation_id ON ai_messages(conversation_id);
CREATE INDEX idx_ai_messages_created_at ON ai_messages(created_at DESC);
```

### Table : `ai_usage_logs`

```sql
CREATE TABLE ai_usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  agent_name TEXT NOT NULL,
  conversation_id UUID REFERENCES ai_conversations(id) ON DELETE SET NULL,
  action TEXT NOT NULL, -- 'generate_promo', 'recommend_offer', 'coach_affiliate'
  input_data JSONB,
  output_data JSONB,
  tokens_used INTEGER,
  cost_usd DECIMAL(10,6),
  execution_time_ms INTEGER,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_ai_usage_logs_user_id ON ai_usage_logs(user_id);
CREATE INDEX idx_ai_usage_logs_agent_name ON ai_usage_logs(agent_name);
CREATE INDEX idx_ai_usage_logs_created_at ON ai_usage_logs(created_at DESC);
```

### Table : `ai_quotas`

```sql
CREATE TABLE ai_quotas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  agent_name TEXT NOT NULL,
  quota_monthly INTEGER NOT NULL, -- Limite mensuelle
  usage_current_month INTEGER DEFAULT 0,
  reset_date DATE NOT NULL, -- Premier jour du mois suivant
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  UNIQUE(user_id, agent_name)
);

CREATE INDEX idx_ai_quotas_user_id ON ai_quotas(user_id);
CREATE INDEX idx_ai_quotas_reset_date ON ai_quotas(reset_date);
```

### Table : `ai_generated_content`

```sql
CREATE TABLE ai_generated_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  agent_name TEXT NOT NULL,
  content_type TEXT NOT NULL, -- 'promo_text', 'visual_prompt', 'script', 'recommendation'
  input_prompt TEXT,
  output_content TEXT,
  output_metadata JSONB DEFAULT '{}'::jsonb,
  quality_score DECIMAL(3,1), -- Score 0-10
  is_approved BOOLEAN DEFAULT false,
  approved_at TIMESTAMPTZ,
  used_in_offer_id UUID, -- Si utilisé dans une vraie offre
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_ai_generated_content_user_id ON ai_generated_content(user_id);
CREATE INDEX idx_ai_generated_content_agent_name ON ai_generated_content(agent_name);
CREATE INDEX idx_ai_generated_content_approved ON ai_generated_content(is_approved);
```

### Table : `ai_feedback`

```sql
CREATE TABLE ai_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES ai_conversations(id) ON DELETE CASCADE,
  message_id UUID REFERENCES ai_messages(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  feedback_type TEXT CHECK (feedback_type IN ('helpful', 'not_helpful', 'inappropriate', 'excellent')),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_ai_feedback_rating ON ai_feedback(rating);
CREATE INDEX idx_ai_feedback_type ON ai_feedback(feedback_type);
```

---

## 🔧 Fonctions SQL Utilitaires

### 1. Vérifier le quota IA

```sql
CREATE OR REPLACE FUNCTION check_ai_quota(
  p_user_id UUID,
  p_agent_name TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  v_quota_monthly INTEGER;
  v_usage_current INTEGER;
BEGIN
  SELECT quota_monthly, usage_current_month
  INTO v_quota_monthly, v_usage_current
  FROM ai_quotas
  WHERE user_id = p_user_id AND agent_name = p_agent_name;

  IF NOT FOUND THEN
    RETURN false; -- Pas de quota configuré
  END IF;

  RETURN v_usage_current < v_quota_monthly;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 2. Incrémenter l'utilisation IA

```sql
CREATE OR REPLACE FUNCTION increment_ai_usage(
  p_user_id UUID,
  p_agent_name TEXT
)
RETURNS void AS $$
BEGIN
  UPDATE ai_quotas
  SET usage_current_month = usage_current_month + 1,
      updated_at = now()
  WHERE user_id = p_user_id AND agent_name = p_agent_name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 3. Réinitialiser les quotas mensuels

```sql
CREATE OR REPLACE FUNCTION reset_monthly_ai_quotas()
RETURNS void AS $$
BEGIN
  UPDATE ai_quotas
  SET usage_current_month = 0,
      reset_date = (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month')::DATE,
      updated_at = now()
  WHERE reset_date <= CURRENT_DATE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 4. Obtenir les statistiques IA d'un utilisateur

```sql
CREATE OR REPLACE FUNCTION get_ai_usage_stats(p_user_id UUID)
RETURNS TABLE (
  agent_name TEXT,
  quota_monthly INTEGER,
  usage_current_month INTEGER,
  percentage_used DECIMAL(5,2),
  total_tokens_month INTEGER,
  total_cost_month_usd DECIMAL(10,2)
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    q.agent_name,
    q.quota_monthly,
    q.usage_current_month,
    ROUND((q.usage_current_month::DECIMAL / NULLIF(q.quota_monthly, 0)) * 100, 2) as percentage_used,
    COALESCE(SUM(l.tokens_used), 0)::INTEGER as total_tokens_month,
    COALESCE(SUM(l.cost_usd), 0)::DECIMAL(10,2) as total_cost_month_usd
  FROM ai_quotas q
  LEFT JOIN ai_usage_logs l ON l.user_id = q.user_id AND l.agent_name = q.agent_name
    AND l.created_at >= DATE_TRUNC('month', CURRENT_DATE)
  WHERE q.user_id = p_user_id
  GROUP BY q.agent_name, q.quota_monthly, q.usage_current_month;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 🔐 Row Level Security (RLS)

### Policies pour `ai_conversations`

```sql
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

-- Les utilisateurs voient uniquement leurs propres conversations
CREATE POLICY "Users can view own conversations"
ON ai_conversations FOR SELECT
USING (auth.uid() = user_id);

-- Les utilisateurs peuvent créer leurs propres conversations
CREATE POLICY "Users can create own conversations"
ON ai_conversations FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent mettre à jour leurs propres conversations
CREATE POLICY "Users can update own conversations"
ON ai_conversations FOR UPDATE
USING (auth.uid() = user_id);

-- Les admins voient tout
CREATE POLICY "Admins can view all conversations"
ON ai_conversations FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'admin'
  )
);
```

### Policies pour `ai_messages`

```sql
ALTER TABLE ai_messages ENABLE ROW LEVEL SECURITY;

-- Les utilisateurs voient leurs propres messages
CREATE POLICY "Users can view own messages"
ON ai_messages FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM ai_conversations
    WHERE ai_conversations.id = conversation_id
    AND ai_conversations.user_id = auth.uid()
  )
);

-- Les utilisateurs peuvent créer leurs propres messages
CREATE POLICY "Users can create own messages"
ON ai_messages FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

### Policies pour `ai_usage_logs`

```sql
ALTER TABLE ai_usage_logs ENABLE ROW LEVEL SECURITY;

-- Seuls les admins peuvent voir les logs
CREATE POLICY "Only admins can view usage logs"
ON ai_usage_logs FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'admin'
  )
);

-- Le service role peut insérer des logs
CREATE POLICY "Service role can insert usage logs"
ON ai_usage_logs FOR INSERT
WITH CHECK (true);
```

---

## 🌐 Intégration OpenAI API

### Configuration OpenAI

```javascript
// Configuration dans Supabase Edge Function
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
});

const openai = new OpenAIApi(configuration);

// Modèle recommandé : gpt-4o-mini (économique et performant)
const MODEL = 'gpt-4o-mini';
```

### Exemple : Agent Commerçant

```javascript
const generatePromotion = async (commerceData) => {
  const systemPrompt = `Tu es un expert en marketing local québécois.
  Tu crées des promotions attractives et authentiques pour les commerces locaux.
  Utilise un ton amical, chaleureux et québécois.
  Optimise pour la conversion et l'engagement local.`;

  const userPrompt = `Crée une promotion pour :
  - Commerce: ${commerceData.nom_commerce}
  - Type: ${commerceData.type_commerce}
  - Ville: ${commerceData.ville}
  - Promotion: ${commerceData.type_promotion} de ${commerceData.valeur_promotion}
  - Public cible: ${commerceData.public_cible}

  Génère:
  1. Un titre accrocheur (max 80 caractères)
  2. Une description courte (150 caractères)
  3. Une description longue optimisée (300-500 mots)
  4. Les conditions claires
  5. 5 tags pertinents
  6. Un score d'attractivité (0-10)

  Format JSON uniquement.`;

  const response = await openai.createChatCompletion({
    model: MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.7,
    max_tokens: 1500,
    response_format: { type: 'json_object' }
  });

  return JSON.parse(response.data.choices[0].message.content);
};
```

---

## 📊 Monitoring et Analytics

### Métriques à Suivre

**Performance IA**
- Temps de réponse moyen par agent
- Taux de satisfaction utilisateur (feedback)
- Tokens consommés par requête
- Coût mensuel par agent

**Utilisation**
- Nombre de requêtes par agent/jour
- Utilisateurs actifs IA par plan
- Taux d'adoption de l'IA par rôle
- Quotas atteints (%)

**Qualité**
- Score de qualité du contenu généré
- Taux d'approbation des promos IA
- Conversion promos IA vs manuelles
- Feedback positif/négatif

### Dashboard SQL

```sql
-- Vue globale utilisation IA
CREATE VIEW ai_dashboard_stats AS
SELECT
  agent_name,
  COUNT(DISTINCT user_id) as utilisateurs_actifs,
  COUNT(*) as requetes_totales,
  AVG(tokens_used) as tokens_moyen,
  SUM(cost_usd) as cout_total_usd,
  AVG(execution_time_ms) as temps_moyen_ms,
  COUNT(*) FILTER (WHERE error IS NOT NULL) as erreurs
FROM ai_usage_logs
WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)
GROUP BY agent_name;
```

---

## 🚀 Plan de Déploiement

### Phase 1 : Infrastructure (Semaine 1-2)
- [ ] Créer toutes les tables Supabase
- [ ] Configurer les RLS policies
- [ ] Créer les fonctions utilitaires
- [ ] Tester les quotas et limites

### Phase 2 : Agent Commerçant (Semaine 3-4)
- [ ] Développer Edge Function génération promo
- [ ] Intégrer OpenAI API
- [ ] Créer prompts système optimisés
- [ ] Intégrer Canva API (visuels)
- [ ] Tests avec commerçants pilotes

### Phase 3 : Agent Consommateur (Semaine 5-6)
- [ ] Développer système de recommandations
- [ ] Intégrer historique et préférences
- [ ] Créer algorithme de scoring
- [ ] Tests avec consommateurs pilotes

### Phase 4 : Agent Affilié (Semaine 7-8)
- [ ] Développer coaching personnalisé
- [ ] Créer bibliothèque de scripts
- [ ] Intégrer analytics de performance
- [ ] Tests avec affiliés pilotes

### Phase 5 : Optimisation & Lancement (Semaine 9-10)
- [ ] Optimiser coûts et performances
- [ ] Configurer monitoring complet
- [ ] Documentation utilisateur finale
- [ ] Lancement BETA public

---

## 💰 Estimation des Coûts

### OpenAI API (GPT-4o-mini)

**Tarifs (Janvier 2025) :**
- Input: $0.150 / 1M tokens
- Output: $0.600 / 1M tokens

**Estimation mensuelle (1000 utilisateurs actifs) :**
- Agent Commerçant: 500 générations × 1500 tokens = ~$0.60/mois
- Agent Consommateur: 5000 requêtes × 500 tokens = ~$2.50/mois
- Agent Affilié: 1000 sessions × 1000 tokens = ~$1.20/mois

**Total estimé : ~$4.30/mois pour 1000 utilisateurs**

---

## 🔒 Sécurité et Conformité

### Filtrage de Contenu

```javascript
// Fonction de modération OpenAI
const moderateContent = async (text) => {
  const moderation = await openai.createModeration({
    input: text
  });

  return moderation.data.results[0];
};

// Vérifier avant de sauvegarder
if (moderation.flagged) {
  throw new Error('Contenu inapproprié détecté');
}
```

### Protection des Données (Loi 25)

- ✅ Données stockées au Canada (Supabase Canada region)
- ✅ Historique conversations accessible par utilisateur
- ✅ Export données en JSON (conformité)
- ✅ Suppression conversations sur demande
- ✅ Anonymisation après 24 mois d'inactivité
- ✅ Pas de partage données avec OpenAI (sauf API calls)

### Limites de Responsabilité

- Contenu généré par IA doit être révisé par l'utilisateur
- Avertissement clair : "Contenu généré par IA, à vérifier"
- Responsabilité finale sur l'utilisateur
- Modération automatique activée

---

## 📚 Prochaines Étapes

1. **Maintenant :** Lire et valider ce plan
2. **Cette semaine :** Créer les tables Supabase (SQL)
3. **Semaine prochaine :** Développer première Edge Function (Agent Commerçant)
4. **Mois prochain :** Tests BETA avec utilisateurs pilotes

---

**Date de création :** 9 novembre 2025
**Version :** 1.0
**Statut :** 📋 Plan complet prêt à être validé

**Fait avec ❤️ pour RabaisLocal**
*Propulsé par OpenAI GPT-4o-mini + Supabase*
