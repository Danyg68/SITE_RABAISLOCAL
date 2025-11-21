-- ============================================================================
-- MODULE A - UTILISATEURS & AUTHENTIFICATION
-- RabaisLocal - Base de données Supabase
-- ============================================================================
-- Description: Création des tables pour le système d'inscription consommateur
-- Version: 1.0.0
-- Date: 2025-11-08
-- Auteur: RabaisLocal (via Claude Code)
-- ============================================================================

-- ============================================================================
-- TABLE 1: users
-- ============================================================================
-- Description: Table principale des utilisateurs (consommateurs, commerçants, affiliés)
-- ============================================================================

CREATE TABLE IF NOT EXISTS users (
  -- Identifiants
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,

  -- Informations personnelles
  prenom TEXT NOT NULL,
  nom TEXT,
  ville TEXT NOT NULL,
  telephone TEXT,

  -- Rôle et accès
  role TEXT NOT NULL CHECK (role IN ('consumer', 'merchant', 'affiliate', 'admin')),
  plan TEXT CHECK (plan IN ('bronze', 'silver', 'gold')),
  account_status TEXT DEFAULT 'active' CHECK (account_status IN ('active', 'suspended', 'deleted')),

  -- Système de crédits
  credits_balance INTEGER DEFAULT 0,
  credits_free_monthly INTEGER DEFAULT 10,

  -- Tracking et marketing
  utm_source TEXT,
  utm_campaign TEXT,
  referral_code TEXT,

  -- Vérifications et onboarding
  email_verified BOOLEAN DEFAULT false,
  email_verification_token TEXT,
  email_verified_at TIMESTAMPTZ,
  onboarding_email_sent BOOLEAN DEFAULT false,
  onboarding_email_sent_at TIMESTAMPTZ,
  onboarding_completed BOOLEAN DEFAULT false,
  onboarding_completed_at TIMESTAMPTZ,

  -- Métadonnées flexibles (JSONB pour stocker des données supplémentaires)
  metadata JSONB DEFAULT '{}'::jsonb,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  last_login_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);

-- ============================================================================
-- INDEX pour améliorer les performances de recherche
-- ============================================================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_plan ON users(plan);
CREATE INDEX idx_users_account_status ON users(account_status);
CREATE INDEX idx_users_referral_code ON users(referral_code) WHERE referral_code IS NOT NULL;
CREATE INDEX idx_users_ville ON users(ville);
CREATE INDEX idx_users_created_at ON users(created_at DESC);
CREATE INDEX idx_users_email_verified ON users(email_verified);

-- Index GIN pour recherche dans les métadonnées JSON
CREATE INDEX idx_users_metadata ON users USING GIN (metadata);

-- ============================================================================
-- TRIGGER : Mise à jour automatique du champ updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- COMMENTAIRES sur les colonnes (documentation)
-- ============================================================================

COMMENT ON TABLE users IS 'Table principale des utilisateurs RabaisLocal (consommateurs, commerçants, affiliés, admins)';
COMMENT ON COLUMN users.id IS 'Identifiant unique UUID';
COMMENT ON COLUMN users.email IS 'Email unique de l''utilisateur (identifiant de connexion)';
COMMENT ON COLUMN users.prenom IS 'Prénom de l''utilisateur';
COMMENT ON COLUMN users.nom IS 'Nom de famille (optionnel)';
COMMENT ON COLUMN users.ville IS 'Ville de résidence pour la géolocalisation des offres';
COMMENT ON COLUMN users.role IS 'Rôle : consumer, merchant, affiliate ou admin';
COMMENT ON COLUMN users.plan IS 'Plan d''abonnement : bronze, silver ou gold';
COMMENT ON COLUMN users.credits_balance IS 'Solde de crédits achetés';
COMMENT ON COLUMN users.credits_free_monthly IS 'Crédits gratuits mensuels selon le plan';
COMMENT ON COLUMN users.utm_source IS 'Source de trafic (tracking marketing)';
COMMENT ON COLUMN users.utm_campaign IS 'Campagne marketing (tracking)';
COMMENT ON COLUMN users.referral_code IS 'Code de parrainage affilié utilisé lors de l''inscription';
COMMENT ON COLUMN users.metadata IS 'Métadonnées flexibles en JSON (signup_source, funnel_name, etc.)';

-- ============================================================================
-- TABLE 2: logs_audit
-- ============================================================================
-- Description: Enregistrement de toutes les actions importantes pour la conformité
-- ============================================================================

CREATE TABLE IF NOT EXISTS logs_audit (
  -- Identifiants
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Action et contexte
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,

  -- Détails des changements
  changes JSONB DEFAULT '{}'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,

  -- Informations techniques
  ip_address TEXT,
  user_agent TEXT,

  -- Timestamp
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- INDEX pour améliorer les performances de recherche des logs
-- ============================================================================

CREATE INDEX idx_logs_audit_user_id ON logs_audit(user_id);
CREATE INDEX idx_logs_audit_action ON logs_audit(action);
CREATE INDEX idx_logs_audit_entity_type ON logs_audit(entity_type);
CREATE INDEX idx_logs_audit_entity_id ON logs_audit(entity_id);
CREATE INDEX idx_logs_audit_created_at ON logs_audit(created_at DESC);

-- Index GIN pour recherche dans les JSON
CREATE INDEX idx_logs_audit_changes ON logs_audit USING GIN (changes);
CREATE INDEX idx_logs_audit_metadata ON logs_audit USING GIN (metadata);

-- ============================================================================
-- COMMENTAIRES sur les colonnes (documentation)
-- ============================================================================

COMMENT ON TABLE logs_audit IS 'Logs d''audit pour traçabilité complète (conformité Loi 25)';
COMMENT ON COLUMN logs_audit.action IS 'Type d''action : user_signup, user_update, user_delete, etc.';
COMMENT ON COLUMN logs_audit.entity_type IS 'Type d''entité affectée : user, offer, payment, etc.';
COMMENT ON COLUMN logs_audit.entity_id IS 'ID de l''entité affectée';
COMMENT ON COLUMN logs_audit.changes IS 'Détails JSON des changements effectués';
COMMENT ON COLUMN logs_audit.metadata IS 'Métadonnées contextuelles (source, funnel, utm, etc.)';

-- ============================================================================
-- TABLE 3: legal_consents (conformité Loi 25)
-- ============================================================================
-- Description: Enregistrement des consentements utilisateurs (RGPD, Loi 25)
-- ============================================================================

CREATE TABLE IF NOT EXISTS legal_consents (
  -- Identifiants
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,

  -- Type de consentement
  consent_type TEXT NOT NULL CHECK (consent_type IN ('terms_of_service', 'privacy_policy', 'marketing_emails', 'data_processing', 'cookies')),

  -- Consentement
  consented BOOLEAN NOT NULL,
  consent_version TEXT NOT NULL, -- Version du document accepté (ex: "v1.0.0")

  -- Tracking
  ip_address TEXT,
  user_agent TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  revoked_at TIMESTAMPTZ
);

-- ============================================================================
-- INDEX pour recherche des consentements
-- ============================================================================

CREATE INDEX idx_legal_consents_user_id ON legal_consents(user_id);
CREATE INDEX idx_legal_consents_type ON legal_consents(consent_type);
CREATE INDEX idx_legal_consents_created_at ON legal_consents(created_at DESC);

-- ============================================================================
-- COMMENTAIRES sur les colonnes (documentation)
-- ============================================================================

COMMENT ON TABLE legal_consents IS 'Consentements légaux des utilisateurs (Loi 25, RGPD)';
COMMENT ON COLUMN legal_consents.consent_type IS 'Type de consentement : terms_of_service, privacy_policy, marketing_emails, data_processing, cookies';
COMMENT ON COLUMN legal_consents.consented IS 'true = accepté, false = refusé';
COMMENT ON COLUMN legal_consents.consent_version IS 'Version du document légal accepté (ex: v1.0.0)';

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================
-- Description: Politiques de sécurité au niveau des lignes
-- ============================================================================

-- ============================================================================
-- RLS pour la table users
-- ============================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy 1 : Les utilisateurs peuvent lire leur propre profil
CREATE POLICY "Users can view own profile"
ON users FOR SELECT
USING (auth.uid() = id);

-- Policy 2 : Les utilisateurs peuvent mettre à jour leur propre profil
CREATE POLICY "Users can update own profile"
ON users FOR UPDATE
USING (auth.uid() = id);

-- Policy 3 : Seul le service role peut créer des utilisateurs (via webhook)
CREATE POLICY "Service role can insert users"
ON users FOR INSERT
WITH CHECK (true);

-- Policy 4 : Les admins peuvent tout voir
CREATE POLICY "Admins can view all users"
ON users FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

-- ============================================================================
-- RLS pour la table logs_audit
-- ============================================================================

ALTER TABLE logs_audit ENABLE ROW LEVEL SECURITY;

-- Policy 1 : Seuls les admins peuvent lire les logs
CREATE POLICY "Only admins can view logs"
ON logs_audit FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

-- Policy 2 : Le service role peut insérer des logs
CREATE POLICY "Service role can insert logs"
ON logs_audit FOR INSERT
WITH CHECK (true);

-- ============================================================================
-- RLS pour la table legal_consents
-- ============================================================================

ALTER TABLE legal_consents ENABLE ROW LEVEL SECURITY;

-- Policy 1 : Les utilisateurs peuvent voir leurs propres consentements
CREATE POLICY "Users can view own consents"
ON legal_consents FOR SELECT
USING (auth.uid() = user_id);

-- Policy 2 : Les utilisateurs peuvent créer leurs propres consentements
CREATE POLICY "Users can create own consents"
ON legal_consents FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy 3 : Les admins peuvent tout voir
CREATE POLICY "Admins can view all consents"
ON legal_consents FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

-- ============================================================================
-- FONCTION: Anonymisation automatique des utilisateurs inactifs (Loi 25)
-- ============================================================================
-- Description: Fonction pour anonymiser les données après 24 mois d'inactivité
-- ============================================================================

CREATE OR REPLACE FUNCTION anonymize_inactive_users()
RETURNS void AS $$
BEGIN
  UPDATE users
  SET
    email = CONCAT('deleted_', id, '@anonymized.rabaislocal.com'),
    prenom = 'Utilisateur',
    nom = 'Supprimé',
    telephone = NULL,
    utm_source = NULL,
    utm_campaign = NULL,
    referral_code = NULL,
    metadata = '{}'::jsonb,
    account_status = 'deleted',
    deleted_at = now()
  WHERE
    account_status = 'active'
    AND last_login_at < (now() - INTERVAL '24 months')
    AND deleted_at IS NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION anonymize_inactive_users IS 'Anonymise les utilisateurs inactifs depuis 24 mois (conformité Loi 25)';

-- ============================================================================
-- FONCTION: Statistiques des inscriptions
-- ============================================================================
-- Description: Fonction pour obtenir les statistiques d'inscription
-- ============================================================================

CREATE OR REPLACE FUNCTION get_signup_stats(days_ago INTEGER DEFAULT 30)
RETURNS TABLE (
  jour DATE,
  inscriptions_consumer BIGINT,
  inscriptions_merchant BIGINT,
  inscriptions_affiliate BIGINT,
  total_inscriptions BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    DATE(created_at) as jour,
    COUNT(*) FILTER (WHERE role = 'consumer') as inscriptions_consumer,
    COUNT(*) FILTER (WHERE role = 'merchant') as inscriptions_merchant,
    COUNT(*) FILTER (WHERE role = 'affiliate') as inscriptions_affiliate,
    COUNT(*) as total_inscriptions
  FROM users
  WHERE created_at >= (now() - (days_ago || ' days')::INTERVAL)
  GROUP BY DATE(created_at)
  ORDER BY jour DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION get_signup_stats IS 'Retourne les statistiques d''inscription par jour et par rôle';

-- ============================================================================
-- DONNÉES DE TEST (optionnel - pour développement uniquement)
-- ============================================================================
-- ATTENTION: À supprimer en production !
-- ============================================================================

-- Décommentez ci-dessous pour insérer des données de test :

/*
INSERT INTO users (email, prenom, nom, ville, role, plan, credits_balance, credits_free_monthly, account_status, email_verified)
VALUES
  ('test.consumer@rabaislocal.com', 'Test', 'Consommateur', 'Trois-Rivières', 'consumer', 'bronze', 0, 10, 'active', true),
  ('test.merchant@rabaislocal.com', 'Test', 'Commerçant', 'Québec', 'merchant', 'gold', 0, 0, 'active', true),
  ('test.affiliate@rabaislocal.com', 'Test', 'Affilié', 'Montréal', 'affiliate', NULL, 0, 0, 'active', true),
  ('admin@rabaislocal.com', 'Admin', 'Principal', 'Trois-Rivières', 'admin', NULL, 0, 0, 'active', true);

-- Log de test
INSERT INTO logs_audit (user_id, action, entity_type, entity_id, changes, metadata)
SELECT
  id,
  'user_signup',
  'user',
  id,
  jsonb_build_object('email', email, 'role', role),
  jsonb_build_object('source', 'test_data', 'funnel', 'manual_insert')
FROM users
WHERE email LIKE 'test.%@rabaislocal.com';
*/

-- ============================================================================
-- VÉRIFICATION FINALE
-- ============================================================================

-- Vérifier que toutes les tables ont été créées
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users') THEN
    RAISE NOTICE '✅ Table users créée avec succès';
  END IF;

  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'logs_audit') THEN
    RAISE NOTICE '✅ Table logs_audit créée avec succès';
  END IF;

  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'legal_consents') THEN
    RAISE NOTICE '✅ Table legal_consents créée avec succès';
  END IF;

  RAISE NOTICE '🎉 Migration du Module A terminée avec succès !';
END $$;

-- ============================================================================
-- FIN DU SCRIPT
-- ============================================================================
