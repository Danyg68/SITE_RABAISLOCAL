-- ============================================================================
-- MODULE F - INTELLIGENCE ARTIFICIELLE (3 AGENTS)
-- RabaisLocal - Base de données Supabase
-- ============================================================================
-- Description: Tables pour les 3 agents IA (Commerçant, Consommateur, Affilié)
-- Version: 1.0.0
-- Date: 2025-11-09
-- Auteur: RabaisLocal (via Claude Code)
-- Modèle IA: OpenAI GPT-4o-mini
-- ============================================================================

-- ============================================================================
-- TABLE 1: ai_agents
-- ============================================================================
-- Description: Configuration des agents IA disponibles
-- ============================================================================

CREATE TABLE IF NOT EXISTS ai_agents (
  -- Identifiants
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL CHECK (name IN ('agent_merchant', 'agent_consumer', 'agent_affiliate')),
  display_name TEXT NOT NULL,
  description TEXT,

  -- Configuration IA
  version TEXT NOT NULL DEFAULT 'v1.0',
  model TEXT NOT NULL DEFAULT 'gpt-4o-mini',
  system_prompt TEXT NOT NULL,
  temperature DECIMAL(2,1) DEFAULT 0.7 CHECK (temperature BETWEEN 0 AND 2),
  max_tokens INTEGER DEFAULT 1000 CHECK (max_tokens > 0),

  -- Métadonnées
  features JSONB DEFAULT '[]'::jsonb,
  limits JSONB DEFAULT '{}'::jsonb,

  -- Statut
  is_active BOOLEAN DEFAULT true,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index
CREATE INDEX idx_ai_agents_name ON ai_agents(name);
CREATE INDEX idx_ai_agents_active ON ai_agents(is_active);

-- Commentaires
COMMENT ON TABLE ai_agents IS 'Configuration des 3 agents IA de RabaisLocal';
COMMENT ON COLUMN ai_agents.name IS 'Nom interne : agent_merchant, agent_consumer, agent_affiliate';
COMMENT ON COLUMN ai_agents.system_prompt IS 'Prompt système définissant le comportement de l''agent';
COMMENT ON COLUMN ai_agents.temperature IS 'Température OpenAI (0=déterministe, 2=créatif)';

-- ============================================================================
-- TABLE 2: ai_conversations
-- ============================================================================
-- Description: Historique des conversations avec les agents IA
-- ============================================================================

CREATE TABLE IF NOT EXISTS ai_conversations (
  -- Identifiants
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES ai_agents(id) ON DELETE SET NULL,
  agent_name TEXT NOT NULL,

  -- Informations conversation
  title TEXT,
  summary TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'deleted')),

  -- Métadonnées
  metadata JSONB DEFAULT '{}'::jsonb,
  tags TEXT[],

  -- Statistiques
  total_messages INTEGER DEFAULT 0,
  total_tokens_used INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  last_message_at TIMESTAMPTZ DEFAULT now(),
  archived_at TIMESTAMPTZ
);

-- Index
CREATE INDEX idx_ai_conversations_user_id ON ai_conversations(user_id);
CREATE INDEX idx_ai_conversations_agent_name ON ai_conversations(agent_name);
CREATE INDEX idx_ai_conversations_status ON ai_conversations(status);
CREATE INDEX idx_ai_conversations_last_message ON ai_conversations(last_message_at DESC);

-- Commentaires
COMMENT ON TABLE ai_conversations IS 'Historique complet des conversations IA par utilisateur';
COMMENT ON COLUMN ai_conversations.title IS 'Titre auto-généré ou défini par utilisateur';
COMMENT ON COLUMN ai_conversations.summary IS 'Résumé de la conversation (généré par IA)';

-- ============================================================================
-- TABLE 3: ai_messages
-- ============================================================================
-- Description: Messages individuels dans les conversations IA
-- ============================================================================

CREATE TABLE IF NOT EXISTS ai_messages (
  -- Identifiants
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Message
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,

  -- Métadonnées techniques
  metadata JSONB DEFAULT '{}'::jsonb,
  tokens_used INTEGER,
  model_used TEXT,
  execution_time_ms INTEGER,

  -- Feedback utilisateur
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  is_helpful BOOLEAN,

  -- Timestamp
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index
CREATE INDEX idx_ai_messages_conversation_id ON ai_messages(conversation_id);
CREATE INDEX idx_ai_messages_user_id ON ai_messages(user_id);
CREATE INDEX idx_ai_messages_role ON ai_messages(role);
CREATE INDEX idx_ai_messages_created_at ON ai_messages(created_at DESC);

-- Commentaires
COMMENT ON TABLE ai_messages IS 'Messages individuels dans conversations IA';
COMMENT ON COLUMN ai_messages.role IS 'user = utilisateur, assistant = IA, system = message système';
COMMENT ON COLUMN ai_messages.tokens_used IS 'Nombre de tokens OpenAI consommés';

-- ============================================================================
-- TABLE 4: ai_usage_logs
-- ============================================================================
-- Description: Logs détaillés de toutes les requêtes IA (analytics + billing)
-- ============================================================================

CREATE TABLE IF NOT EXISTS ai_usage_logs (
  -- Identifiants
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  agent_name TEXT NOT NULL,
  conversation_id UUID REFERENCES ai_conversations(id) ON DELETE SET NULL,

  -- Action effectuée
  action TEXT NOT NULL, -- 'generate_promo', 'recommend_offer', 'coach_affiliate', 'chat'

  -- Données entrée/sortie
  input_data JSONB,
  output_data JSONB,

  -- Métriques techniques
  tokens_used INTEGER,
  cost_usd DECIMAL(10,6),
  execution_time_ms INTEGER,
  model_used TEXT DEFAULT 'gpt-4o-mini',

  -- Résultat
  status TEXT DEFAULT 'success' CHECK (status IN ('success', 'error', 'partial')),
  error TEXT,
  error_code TEXT,

  -- Timestamp
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index
CREATE INDEX idx_ai_usage_logs_user_id ON ai_usage_logs(user_id);
CREATE INDEX idx_ai_usage_logs_agent_name ON ai_usage_logs(agent_name);
CREATE INDEX idx_ai_usage_logs_action ON ai_usage_logs(action);
CREATE INDEX idx_ai_usage_logs_status ON ai_usage_logs(status);
CREATE INDEX idx_ai_usage_logs_created_at ON ai_usage_logs(created_at DESC);

-- Index GIN pour recherche JSON
CREATE INDEX idx_ai_usage_logs_input_data ON ai_usage_logs USING GIN (input_data);
CREATE INDEX idx_ai_usage_logs_output_data ON ai_usage_logs USING GIN (output_data);

-- Commentaires
COMMENT ON TABLE ai_usage_logs IS 'Logs détaillés de toutes les requêtes IA pour analytics et facturation';
COMMENT ON COLUMN ai_usage_logs.cost_usd IS 'Coût en USD de la requête OpenAI';

-- ============================================================================
-- TABLE 5: ai_quotas
-- ============================================================================
-- Description: Quotas mensuels d'utilisation IA par utilisateur/agent
-- ============================================================================

CREATE TABLE IF NOT EXISTS ai_quotas (
  -- Identifiants
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  agent_name TEXT NOT NULL,

  -- Quotas
  quota_monthly INTEGER NOT NULL CHECK (quota_monthly >= 0),
  usage_current_month INTEGER DEFAULT 0 CHECK (usage_current_month >= 0),

  -- Gestion reset
  reset_date DATE NOT NULL,
  last_reset_at TIMESTAMPTZ,

  -- Métadonnées
  metadata JSONB DEFAULT '{}'::jsonb,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  -- Contrainte unique
  UNIQUE(user_id, agent_name)
);

-- Index
CREATE INDEX idx_ai_quotas_user_id ON ai_quotas(user_id);
CREATE INDEX idx_ai_quotas_agent_name ON ai_quotas(agent_name);
CREATE INDEX idx_ai_quotas_reset_date ON ai_quotas(reset_date);

-- Commentaires
COMMENT ON TABLE ai_quotas IS 'Quotas mensuels d''utilisation IA par utilisateur et agent';
COMMENT ON COLUMN ai_quotas.quota_monthly IS 'Limite mensuelle de requêtes IA';
COMMENT ON COLUMN ai_quotas.usage_current_month IS 'Utilisation du mois en cours';
COMMENT ON COLUMN ai_quotas.reset_date IS 'Date de réinitialisation (premier jour du mois suivant)';

-- ============================================================================
-- TABLE 6: ai_generated_content
-- ============================================================================
-- Description: Contenu généré par IA (promos, scripts, recommandations)
-- ============================================================================

CREATE TABLE IF NOT EXISTS ai_generated_content (
  -- Identifiants
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  agent_name TEXT NOT NULL,
  conversation_id UUID REFERENCES ai_conversations(id) ON DELETE SET NULL,

  -- Type de contenu
  content_type TEXT NOT NULL CHECK (content_type IN ('promo_text', 'visual_prompt', 'script', 'recommendation', 'plan', 'coaching')),

  -- Contenu
  input_prompt TEXT,
  output_content TEXT NOT NULL,
  output_metadata JSONB DEFAULT '{}'::jsonb,

  -- Qualité et validation
  quality_score DECIMAL(3,1) CHECK (quality_score BETWEEN 0 AND 10),
  is_approved BOOLEAN DEFAULT false,
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Utilisation
  used_in_offer_id UUID, -- Référence si utilisé dans une vraie offre
  usage_count INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index
CREATE INDEX idx_ai_generated_content_user_id ON ai_generated_content(user_id);
CREATE INDEX idx_ai_generated_content_agent_name ON ai_generated_content(agent_name);
CREATE INDEX idx_ai_generated_content_type ON ai_generated_content(content_type);
CREATE INDEX idx_ai_generated_content_approved ON ai_generated_content(is_approved);
CREATE INDEX idx_ai_generated_content_quality ON ai_generated_content(quality_score DESC);

-- Index GIN pour recherche dans métadonnées
CREATE INDEX idx_ai_generated_content_metadata ON ai_generated_content USING GIN (output_metadata);

-- Commentaires
COMMENT ON TABLE ai_generated_content IS 'Bibliothèque de contenu généré par IA et réutilisable';
COMMENT ON COLUMN ai_generated_content.quality_score IS 'Score de qualité 0-10 (auto-évalué par IA)';

-- ============================================================================
-- TABLE 7: ai_feedback
-- ============================================================================
-- Description: Feedback utilisateur sur les réponses IA
-- ============================================================================

CREATE TABLE IF NOT EXISTS ai_feedback (
  -- Identifiants
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES ai_conversations(id) ON DELETE CASCADE,
  message_id UUID REFERENCES ai_messages(id) ON DELETE CASCADE,

  -- Feedback
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  feedback_type TEXT CHECK (feedback_type IN ('helpful', 'not_helpful', 'inappropriate', 'excellent', 'inaccurate')),
  comment TEXT,

  -- Contexte
  context JSONB DEFAULT '{}'::jsonb,

  -- Timestamp
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index
CREATE INDEX idx_ai_feedback_user_id ON ai_feedback(user_id);
CREATE INDEX idx_ai_feedback_conversation_id ON ai_feedback(conversation_id);
CREATE INDEX idx_ai_feedback_rating ON ai_feedback(rating);
CREATE INDEX idx_ai_feedback_type ON ai_feedback(feedback_type);
CREATE INDEX idx_ai_feedback_created_at ON ai_feedback(created_at DESC);

-- Commentaires
COMMENT ON TABLE ai_feedback IS 'Feedback utilisateur sur qualité des réponses IA';
COMMENT ON COLUMN ai_feedback.rating IS 'Note de 1 à 5 étoiles';

-- ============================================================================
-- FONCTIONS UTILITAIRES
-- ============================================================================

-- ============================================================================
-- FONCTION 1: Vérifier le quota IA disponible
-- ============================================================================

CREATE OR REPLACE FUNCTION check_ai_quota(
  p_user_id UUID,
  p_agent_name TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  v_quota_monthly INTEGER;
  v_usage_current INTEGER;
BEGIN
  -- Récupérer quota et utilisation
  SELECT quota_monthly, usage_current_month
  INTO v_quota_monthly, v_usage_current
  FROM ai_quotas
  WHERE user_id = p_user_id AND agent_name = p_agent_name;

  -- Si pas de quota configuré, retourner false
  IF NOT FOUND THEN
    RETURN false;
  END IF;

  -- Vérifier si quota disponible
  RETURN v_usage_current < v_quota_monthly;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION check_ai_quota IS 'Vérifie si l''utilisateur a encore du quota IA disponible';

-- ============================================================================
-- FONCTION 2: Incrémenter l'utilisation IA
-- ============================================================================

CREATE OR REPLACE FUNCTION increment_ai_usage(
  p_user_id UUID,
  p_agent_name TEXT,
  p_tokens_used INTEGER DEFAULT 0
)
RETURNS void AS $$
BEGIN
  -- Incrémenter le compteur d'utilisation
  UPDATE ai_quotas
  SET
    usage_current_month = usage_current_month + 1,
    updated_at = now(),
    metadata = jsonb_set(
      COALESCE(metadata, '{}'::jsonb),
      '{last_use}',
      to_jsonb(now())
    )
  WHERE user_id = p_user_id AND agent_name = p_agent_name;

  -- Si pas de quota existant, le créer avec quota par défaut
  IF NOT FOUND THEN
    INSERT INTO ai_quotas (user_id, agent_name, quota_monthly, usage_current_month, reset_date)
    VALUES (
      p_user_id,
      p_agent_name,
      10, -- Quota par défaut
      1,
      (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month')::DATE
    );
  END IF;

  -- Mettre à jour les statistiques de la conversation
  UPDATE ai_conversations
  SET
    total_messages = total_messages + 1,
    total_tokens_used = total_tokens_used + p_tokens_used,
    last_message_at = now(),
    updated_at = now()
  WHERE user_id = p_user_id
    AND agent_name = p_agent_name
    AND status = 'active'
    AND id = (
      SELECT id FROM ai_conversations
      WHERE user_id = p_user_id AND agent_name = p_agent_name AND status = 'active'
      ORDER BY last_message_at DESC
      LIMIT 1
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION increment_ai_usage IS 'Incrémente le compteur d''utilisation IA de l''utilisateur';

-- ============================================================================
-- FONCTION 3: Réinitialiser les quotas mensuels (CRON)
-- ============================================================================

CREATE OR REPLACE FUNCTION reset_monthly_ai_quotas()
RETURNS INTEGER AS $$
DECLARE
  v_count INTEGER;
BEGIN
  -- Réinitialiser tous les quotas dont la date de reset est passée
  UPDATE ai_quotas
  SET
    usage_current_month = 0,
    reset_date = (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month')::DATE,
    last_reset_at = now(),
    updated_at = now()
  WHERE reset_date <= CURRENT_DATE;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION reset_monthly_ai_quotas IS 'Réinitialise tous les quotas IA mensuels (à exécuter via CRON le 1er de chaque mois)';

-- ============================================================================
-- FONCTION 4: Statistiques IA d'un utilisateur
-- ============================================================================

CREATE OR REPLACE FUNCTION get_ai_usage_stats(p_user_id UUID)
RETURNS TABLE (
  agent_name TEXT,
  quota_monthly INTEGER,
  usage_current_month INTEGER,
  percentage_used DECIMAL(5,2),
  quota_remaining INTEGER,
  total_tokens_month INTEGER,
  total_cost_month_usd DECIMAL(10,2),
  total_requests_month BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    q.agent_name,
    q.quota_monthly,
    q.usage_current_month,
    ROUND((q.usage_current_month::DECIMAL / NULLIF(q.quota_monthly, 0)) * 100, 2) as percentage_used,
    GREATEST(q.quota_monthly - q.usage_current_month, 0) as quota_remaining,
    COALESCE(SUM(l.tokens_used), 0)::INTEGER as total_tokens_month,
    COALESCE(SUM(l.cost_usd), 0)::DECIMAL(10,2) as total_cost_month_usd,
    COUNT(l.id) as total_requests_month
  FROM ai_quotas q
  LEFT JOIN ai_usage_logs l ON
    l.user_id = q.user_id
    AND l.agent_name = q.agent_name
    AND l.created_at >= DATE_TRUNC('month', CURRENT_DATE)
  WHERE q.user_id = p_user_id
  GROUP BY q.agent_name, q.quota_monthly, q.usage_current_month;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION get_ai_usage_stats IS 'Retourne les statistiques d''utilisation IA d''un utilisateur';

-- ============================================================================
-- FONCTION 5: Archiver anciennes conversations (CRON)
-- ============================================================================

CREATE OR REPLACE FUNCTION archive_old_ai_conversations(days_old INTEGER DEFAULT 90)
RETURNS INTEGER AS $$
DECLARE
  v_count INTEGER;
BEGIN
  -- Archiver conversations inactives depuis X jours
  UPDATE ai_conversations
  SET
    status = 'archived',
    archived_at = now(),
    updated_at = now()
  WHERE
    status = 'active'
    AND last_message_at < (now() - (days_old || ' days')::INTERVAL);

  GET DIAGNOSTICS v_count = ROW_COUNT;

  RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION archive_old_ai_conversations IS 'Archive automatiquement les conversations IA inactives depuis X jours';

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Trigger pour mettre à jour updated_at automatiquement
CREATE TRIGGER ai_agents_updated_at
BEFORE UPDATE ON ai_agents
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER ai_conversations_updated_at
BEFORE UPDATE ON ai_conversations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER ai_quotas_updated_at
BEFORE UPDATE ON ai_quotas
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER ai_generated_content_updated_at
BEFORE UPDATE ON ai_generated_content
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- ============================================================================
-- RLS pour ai_conversations
-- ============================================================================

ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own conversations"
ON ai_conversations FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own conversations"
ON ai_conversations FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own conversations"
ON ai_conversations FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own conversations"
ON ai_conversations FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all conversations"
ON ai_conversations FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'admin'
  )
);

-- ============================================================================
-- RLS pour ai_messages
-- ============================================================================

ALTER TABLE ai_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own messages"
ON ai_messages FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM ai_conversations
    WHERE ai_conversations.id = conversation_id
    AND ai_conversations.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create own messages"
ON ai_messages FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own messages"
ON ai_messages FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all messages"
ON ai_messages FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'admin'
  )
);

-- ============================================================================
-- RLS pour ai_usage_logs
-- ============================================================================

ALTER TABLE ai_usage_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view usage logs"
ON ai_usage_logs FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'admin'
  )
);

CREATE POLICY "Service role can insert usage logs"
ON ai_usage_logs FOR INSERT
WITH CHECK (true);

-- ============================================================================
-- RLS pour ai_quotas
-- ============================================================================

ALTER TABLE ai_quotas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own quotas"
ON ai_quotas FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all quotas"
ON ai_quotas FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'admin'
  )
);

-- ============================================================================
-- RLS pour ai_generated_content
-- ============================================================================

ALTER TABLE ai_generated_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own generated content"
ON ai_generated_content FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own generated content"
ON ai_generated_content FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own generated content"
ON ai_generated_content FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all generated content"
ON ai_generated_content FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'admin'
  )
);

-- ============================================================================
-- RLS pour ai_feedback
-- ============================================================================

ALTER TABLE ai_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own feedback"
ON ai_feedback FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own feedback"
ON ai_feedback FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all feedback"
ON ai_feedback FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role = 'admin'
  )
);

-- ============================================================================
-- DONNÉES INITIALES : Configuration des 3 agents
-- ============================================================================

INSERT INTO ai_agents (name, display_name, description, system_prompt, temperature, max_tokens, features, limits)
VALUES
(
  'agent_merchant',
  'Agent Commerçant',
  'Créateur de promotions automatiques avec génération de texte et visuels optimisés',
  'Tu es un expert en marketing local québécois spécialisé dans la création de promotions attractives.

  Ta mission :
  - Créer des titres accrocheurs et authentiques
  - Rédiger des descriptions engageantes en français québécois
  - Optimiser pour la conversion et l''engagement local
  - Utiliser un ton chaleureux, amical et professionnel
  - Respecter les meilleures pratiques SEO local
  - Suggérer des visuels pertinents

  Format de réponse : JSON structuré avec titre, description, tags, score, etc.

  Exemples d''expressions québécoises à utiliser : "super deal", "méga rabais", "offre imbattable", etc.',
  0.7,
  1500,
  '["generation_promo", "visual_suggestions", "seo_optimization", "quebec_localization"]'::jsonb,
  '{"free": 2, "bronze": 50, "silver": 85, "gold": -1}'::jsonb
),
(
  'agent_consumer',
  'Agent Consommateur',
  'Assistant personnel pour recommandations d''offres basées sur préférences et historique',
  'Tu es un assistant personnel québécois qui aide les consommateurs à découvrir les meilleures offres locales.

  Ta mission :
  - Recommander des offres pertinentes selon les préférences
  - Prendre en compte l''historique et la géolocalisation
  - Expliquer clairement pourquoi tu recommandes telle offre
  - Être amical, serviable et enthousiaste
  - Utiliser un langage simple et accessible
  - Mettre en avant les économies réalisables

  Ton style : Conversationnel, chaleureux, québécois authentique.

  Format de réponse : JSON avec recommandations classées par pertinence + message personnalisé.',
  0.6,
  1000,
  '["recommendations", "personalization", "geolocation", "chat"]'::jsonb,
  '{"bronze": 10, "silver": 50, "gold": -1}'::jsonb
),
(
  'agent_affiliate',
  'Agent Affilié',
  'Coach marketing personnel pour formation et maximisation des ventes',
  'Tu es un coach en marketing d''affiliation expérimenté, spécialisé dans le marché québécois.

  Ta mission :
  - Créer des scripts de vente personnalisés et efficaces
  - Élaborer des plans d''action hebdomadaires réalistes
  - Analyser les performances et suggérer des améliorations
  - Former aux meilleures pratiques de vente en ligne
  - Motiver et encourager les affiliés
  - Adapter tes conseils au niveau d''expérience

  Ton style : Professionnel mais accessible, motivant, pratique, orienté résultats.

  Format de réponse : JSON avec plan d''action détaillé, scripts, conseils, et message motivant.',
  0.8,
  2000,
  '["scripts_generation", "action_plans", "performance_analysis", "coaching", "training"]'::jsonb,
  '{"starter": 5, "builder": 20, "builder_plus": -1}'::jsonb
)
ON CONFLICT (name) DO NOTHING;

-- ============================================================================
-- VUES UTILES pour Analytics
-- ============================================================================

-- Vue : Dashboard global IA
CREATE OR REPLACE VIEW ai_dashboard_global AS
SELECT
  agent_name,
  COUNT(DISTINCT user_id) as utilisateurs_actifs,
  COUNT(*) as requetes_totales,
  COUNT(*) FILTER (WHERE status = 'success') as requetes_reussies,
  COUNT(*) FILTER (WHERE status = 'error') as requetes_erreur,
  AVG(tokens_used) as tokens_moyen,
  SUM(tokens_used) as tokens_total,
  SUM(cost_usd) as cout_total_usd,
  AVG(execution_time_ms) as temps_execution_moyen_ms,
  MIN(created_at) as premiere_utilisation,
  MAX(created_at) as derniere_utilisation
FROM ai_usage_logs
WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)
GROUP BY agent_name;

COMMENT ON VIEW ai_dashboard_global IS 'Vue dashboard global utilisation IA (mois en cours)';

-- Vue : Feedback IA par agent
CREATE OR REPLACE VIEW ai_feedback_summary AS
SELECT
  f.conversation_id,
  c.agent_name,
  AVG(f.rating) as rating_moyen,
  COUNT(*) as nombre_feedback,
  COUNT(*) FILTER (WHERE f.feedback_type = 'excellent') as excellents,
  COUNT(*) FILTER (WHERE f.feedback_type = 'helpful') as utiles,
  COUNT(*) FILTER (WHERE f.feedback_type = 'not_helpful') as non_utiles,
  COUNT(*) FILTER (WHERE f.feedback_type = 'inappropriate') as inappropries
FROM ai_feedback f
JOIN ai_conversations c ON c.id = f.conversation_id
WHERE f.created_at >= DATE_TRUNC('month', CURRENT_DATE)
GROUP BY f.conversation_id, c.agent_name;

COMMENT ON VIEW ai_feedback_summary IS 'Résumé du feedback utilisateur par conversation';

-- ============================================================================
-- VÉRIFICATION FINALE
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '✅ Module F - Intelligence Artificielle installé avec succès';
  RAISE NOTICE '📊 7 tables créées : ai_agents, ai_conversations, ai_messages, ai_usage_logs, ai_quotas, ai_generated_content, ai_feedback';
  RAISE NOTICE '🔧 5 fonctions utilitaires créées';
  RAISE NOTICE '🔐 Policies RLS configurées sur toutes les tables';
  RAISE NOTICE '🤖 3 agents IA initialisés : agent_merchant, agent_consumer, agent_affiliate';
  RAISE NOTICE '📈 2 vues analytics créées : ai_dashboard_global, ai_feedback_summary';
  RAISE NOTICE '';
  RAISE NOTICE '🎉 Le Module F est prêt à être utilisé !';
END $$;

-- ============================================================================
-- FIN DU SCRIPT
-- ============================================================================
