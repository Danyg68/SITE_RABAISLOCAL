# 🎯 Module A - Webhook Inscription Consommateur

## 📋 Description

Ce webhook automatise l'inscription complète d'un nouveau consommateur dans l'écosystème RabaisLocal.

**Flux d'automatisation :**
1. ✅ Réception des données depuis ClickFunnels
2. ✅ Création de l'utilisateur dans Supabase (table `users`)
3. ✅ Enregistrement dans les logs d'audit (table `logs_audit`)
4. ✅ Envoi de l'email de bienvenue via MailerSend
5. ✅ Mise à jour du statut d'envoi de l'email
6. ✅ Retour d'une réponse JSON au client

---

## 🚀 Installation dans Make

### Étape 1 : Importer le Blueprint

1. Connectez-vous à [Make.com](https://www.make.com)
2. Créez un nouveau scénario
3. Cliquez sur les `...` (menu) → **Import Blueprint**
4. Sélectionnez le fichier `webhook_inscription_consommateur.json`
5. Cliquez sur **Import**

### Étape 2 : Configurer les Connexions

Vous devez configurer **3 connexions** :

#### A. Connexion Supabase (`supabase_rabaislocal`)

1. Dans Make, allez dans **Connections**
2. Créez une nouvelle connexion **Supabase**
3. Remplissez les informations :
   - **URL Supabase** : `https://VOTRE_PROJET.supabase.co`
   - **API Key (anon)** : Copiez depuis Supabase → Settings → API → `anon public`
   - **Service Role Key** : Copiez depuis Supabase → Settings → API → `service_role` (⚠️ GARDEZ SECRET)
4. Testez la connexion
5. Nommez-la : `supabase_rabaislocal`

#### B. Connexion MailerSend (`mailersend_rabaislocal`)

1. Allez sur [MailerSend](https://www.mailersend.com)
2. Générez une **API Token** : Account → API Tokens → Create Token
3. Dans Make, créez une connexion **MailerSend**
4. Collez votre **API Token**
5. Nommez-la : `mailersend_rabaislocal`

#### C. Vérifier le domaine d'envoi

Dans MailerSend :
1. Ajoutez votre domaine `rabaislocal.com`
2. Configurez les **DNS records** (SPF, DKIM, DMARC)
3. Vérifiez que le domaine est **Verified** ✅

### Étape 3 : Créer le Template d'Email dans MailerSend

1. Allez dans **Email Templates** → Create Template
2. Nommez-le : `rabaislocal_consumer_welcome`
3. Créez un design avec les variables suivantes :

**Variables de personnalisation disponibles :**
```handlebars
{{ prenom }}              <!-- Prénom du consommateur -->
{{ ville }}               <!-- Ville du consommateur -->
{{ plan }}                <!-- Plan choisi (bronze/silver/gold) -->
{{ credits_free }}        <!-- Nombre de crédits gratuits mensuels -->
{{ login_url }}           <!-- URL de connexion -->
{{ dashboard_url }}       <!-- URL du tableau de bord -->
{{ support_url }}         <!-- URL du support -->
{{ year }}                <!-- Année actuelle -->
```

**Exemple de contenu email :**

**Sujet :** `🎉 Bienvenue sur RabaisLocal, {{ prenom }} !`

**Corps du message :**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Bienvenue sur RabaisLocal</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">

  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
      <h1 style="color: white; margin: 0;">🎉 Bienvenue sur RabaisLocal !</h1>
    </div>

    <!-- Content -->
    <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">

      <p style="font-size: 18px;">Bonjour <strong>{{ prenom }}</strong>,</p>

      <p>Félicitations ! Votre compte RabaisLocal est maintenant actif à <strong>{{ ville }}</strong>. 🎊</p>

      <div style="background: white; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #667eea;">✨ Votre Plan : {{ plan | capitalize }}</h3>
        <p style="margin-bottom: 0;">Vous recevez <strong>{{ credits_free }} crédits gratuits par mois</strong> pour découvrir les rabais exclusifs de votre région !</p>
      </div>

      <h3>🚀 Prochaines étapes :</h3>
      <ol>
        <li>Connectez-vous à votre compte</li>
        <li>Explorez les offres disponibles à {{ ville }}</li>
        <li>Utilisez vos crédits gratuits pour réserver vos premiers rabais</li>
        <li>Partagez RabaisLocal avec vos amis et gagnez des crédits bonus</li>
      </ol>

      <!-- CTA Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="{{ dashboard_url }}" style="display: inline-block; background: #667eea; color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
          Accéder à mon tableau de bord
        </a>
      </div>

      <p style="font-size: 14px; color: #666; margin-top: 30px;">
        <strong>Besoin d'aide ?</strong><br>
        Notre équipe est là pour vous ! Visitez notre <a href="{{ support_url }}" style="color: #667eea;">centre d'aide</a> ou répondez directement à cet email.
      </p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

      <p style="font-size: 12px; color: #999; text-align: center;">
        © {{ year }} RabaisLocal - Fait avec ❤️ pour l'économie locale québécoise<br>
        Trois-Rivières, Québec, Canada
      </p>

    </div>

  </div>

</body>
</html>
```

4. Sauvegardez le template
5. Copiez l'**ID du template** (ex: `vywj2lpq8nl4zk3x`)
6. Collez cet ID dans le module Make n°5 → `template_id`

### Étape 4 : Activer le Webhook

1. Dans Make, cliquez sur le module **Webhook** (module n°1)
2. Cliquez sur **Copy address to clipboard**
3. L'URL ressemblera à : `https://hook.eu2.make.com/abc123def456ghi789`
4. **Gardez cette URL** - vous en aurez besoin pour ClickFunnels

### Étape 5 : Configurer ClickFunnels

Dans votre tunnel ClickFunnels d'inscription consommateur :

1. Allez dans **Settings** → **Integrations**
2. Ajoutez une intégration **Webhook**
3. Collez l'URL du webhook Make
4. Configurez le mapping des champs :

**Mapping des champs ClickFunnels → Webhook :**
```json
{
  "email": "[EMAIL]",
  "prenom": "[FIRST_NAME]",
  "nom": "[LAST_NAME]",
  "ville": "[CITY]",
  "telephone": "[PHONE]",
  "plan": "[PLAN]",
  "utm_source": "[UTM_SOURCE]",
  "utm_campaign": "[UTM_CAMPAIGN]",
  "referral_code": "[AFFILIATE_CODE]",
  "ip_address": "[IP_ADDRESS]",
  "user_agent": "[USER_AGENT]"
}
```

5. Testez l'intégration avec un contact de test

---

## 🗄️ Structure de la Base de Données Supabase

### Table : `users`

Créez la table avec cette requête SQL :

```sql
-- Table principale des utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  prenom TEXT NOT NULL,
  nom TEXT,
  ville TEXT NOT NULL,
  telephone TEXT,
  role TEXT NOT NULL CHECK (role IN ('consumer', 'merchant', 'affiliate', 'admin')),
  plan TEXT CHECK (plan IN ('bronze', 'silver', 'gold')),
  credits_balance INTEGER DEFAULT 0,
  credits_free_monthly INTEGER DEFAULT 10,
  utm_source TEXT,
  utm_campaign TEXT,
  referral_code TEXT,
  account_status TEXT DEFAULT 'active' CHECK (account_status IN ('active', 'suspended', 'deleted')),
  email_verified BOOLEAN DEFAULT false,
  onboarding_email_sent BOOLEAN DEFAULT false,
  onboarding_email_sent_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index pour améliorer les performances
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_referral_code ON users(referral_code);
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- Trigger pour mettre à jour updated_at automatiquement
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

-- RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy : Les utilisateurs peuvent lire leur propre profil
CREATE POLICY "Users can view own profile"
ON users FOR SELECT
USING (auth.uid() = id);

-- Policy : Les utilisateurs peuvent mettre à jour leur propre profil
CREATE POLICY "Users can update own profile"
ON users FOR UPDATE
USING (auth.uid() = id);

-- Policy : Seul le service role peut créer des utilisateurs (via webhook)
CREATE POLICY "Service role can insert users"
ON users FOR INSERT
WITH CHECK (true);
```

### Table : `logs_audit`

Créez la table avec cette requête SQL :

```sql
-- Table des logs d'audit
CREATE TABLE IF NOT EXISTS logs_audit (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  changes JSONB DEFAULT '{}'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index pour améliorer les performances
CREATE INDEX idx_logs_audit_user_id ON logs_audit(user_id);
CREATE INDEX idx_logs_audit_action ON logs_audit(action);
CREATE INDEX idx_logs_audit_entity_type ON logs_audit(entity_type);
CREATE INDEX idx_logs_audit_created_at ON logs_audit(created_at DESC);

-- RLS (Row Level Security)
ALTER TABLE logs_audit ENABLE ROW LEVEL SECURITY;

-- Policy : Seuls les admins peuvent lire les logs
CREATE POLICY "Only admins can view logs"
ON logs_audit FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

-- Policy : Le service role peut insérer des logs
CREATE POLICY "Service role can insert logs"
ON logs_audit FOR INSERT
WITH CHECK (true);
```

---

## 🧪 Test du Webhook

### Test Manuel avec cURL

```bash
curl -X POST https://hook.eu2.make.com/VOTRE_WEBHOOK_ID \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jean.dupont@example.com",
    "prenom": "Jean",
    "nom": "Dupont",
    "ville": "Trois-Rivières",
    "telephone": "819-555-1234",
    "plan": "bronze",
    "utm_source": "facebook",
    "utm_campaign": "prelancement_2025",
    "referral_code": "AFF12345",
    "ip_address": "192.168.1.1",
    "user_agent": "Mozilla/5.0"
  }'
```

### Réponse Attendue (Succès)

```json
{
  "success": true,
  "message": "Inscription réussie",
  "user_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "email": "jean.dupont@example.com",
  "prenom": "Jean",
  "plan": "bronze",
  "credits_free": 10,
  "timestamp": "2025-11-08T23:00:00.000Z"
}
```

### Vérifications à Effectuer

Après un test réussi, vérifiez :

1. ✅ **Supabase - Table `users`** : Le nouvel utilisateur est créé
2. ✅ **Supabase - Table `logs_audit`** : Un log avec `action = "user_signup"` existe
3. ✅ **MailerSend** : L'email a été envoyé (vérifiez dans Activity)
4. ✅ **Boîte email** : L'utilisateur a reçu l'email de bienvenue
5. ✅ **Make** : Le scénario s'est exécuté sans erreur

---

## 🔧 Gestion des Erreurs

### Erreur : "Email déjà existant"

**Cause :** L'email est déjà dans la base de données (contrainte `UNIQUE`).

**Solution :**
- Modifiez le module Supabase n°3
- Activez l'option **Upsert** pour mettre à jour l'utilisateur existant au lieu d'en créer un nouveau
- Ou gérez l'erreur avec un module **Error Handler** qui retourne un message personnalisé

### Erreur : "MailerSend template not found"

**Cause :** Le `template_id` est incorrect ou le template n'existe pas.

**Solution :**
1. Vérifiez que le template existe dans MailerSend
2. Copiez l'ID exact du template
3. Mettez à jour le module Make n°5 → `template_id`

### Erreur : "Supabase connection failed"

**Cause :** Clé API incorrecte ou RLS mal configuré.

**Solution :**
1. Vérifiez que vous utilisez la **service_role key** (pas l'anon key) pour l'insertion
2. Vérifiez les policies RLS dans Supabase

---

## 📊 Données Collectées

### Champs Obligatoires
- ✅ `email` - Email du consommateur
- ✅ `prenom` - Prénom
- ✅ `ville` - Ville de résidence

### Champs Optionnels
- `nom` - Nom de famille
- `telephone` - Numéro de téléphone
- `plan` - Plan choisi (par défaut : `bronze`)
- `utm_source` - Source de trafic (tracking)
- `utm_campaign` - Campagne marketing (tracking)
- `referral_code` - Code de parrainage affilié

### Métadonnées Automatiques
- `id` - UUID généré automatiquement
- `role` - Toujours `"consumer"`
- `credits_balance` - Toujours `0` au départ
- `credits_free_monthly` - Basé sur le plan (10/20/50)
- `account_status` - Toujours `"active"`
- `email_verified` - `false` (à vérifier plus tard)
- `created_at` - Timestamp de création
- `updated_at` - Timestamp de mise à jour

---

## 🔐 Sécurité

### Bonnes Pratiques Implémentées

1. ✅ **HTTPS uniquement** - Tous les webhooks utilisent TLS 1.2+
2. ✅ **Row Level Security (RLS)** - Activé sur toutes les tables Supabase
3. ✅ **Validation des emails** - Format email validé par Make
4. ✅ **Logs d'audit complets** - Toutes les actions sont enregistrées
5. ✅ **Données sensibles protégées** - Service role key jamais exposée
6. ✅ **Idempotence** - Les doublons d'email sont gérés (contrainte UNIQUE)

### Recommandations Supplémentaires

- [ ] Ajoutez un **HMAC signature** pour valider que les requêtes viennent bien de ClickFunnels
- [ ] Activez **reCAPTCHA** sur le formulaire ClickFunnels
- [ ] Limitez le **rate limiting** dans Make (max 100 inscriptions/minute)
- [ ] Configurez des **alertes** pour détecter les anomalies (pic d'inscriptions inhabituelles)

---

## 📈 Analytics & Suivi

### KPIs à Suivre

Dans Make → Scenario Analytics :
- **Exécutions réussies** (succès rate)
- **Erreurs** (type et fréquence)
- **Temps d'exécution moyen**

Dans Supabase → SQL Editor :

**Nombre d'inscriptions par jour :**
```sql
SELECT
  DATE(created_at) as jour,
  COUNT(*) as inscriptions
FROM users
WHERE role = 'consumer'
GROUP BY DATE(created_at)
ORDER BY jour DESC
LIMIT 30;
```

**Répartition par plan :**
```sql
SELECT
  plan,
  COUNT(*) as nombre,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as pourcentage
FROM users
WHERE role = 'consumer'
GROUP BY plan;
```

**Inscriptions par source (UTM) :**
```sql
SELECT
  utm_source,
  utm_campaign,
  COUNT(*) as inscriptions
FROM users
WHERE role = 'consumer'
AND utm_source IS NOT NULL
GROUP BY utm_source, utm_campaign
ORDER BY inscriptions DESC;
```

---

## 🚀 Optimisations Futures

### Phase B (Février 2026)
- [ ] Ajouter la validation de l'email (lien de confirmation)
- [ ] Intégrer la création de compte Supabase Auth automatique
- [ ] Synchroniser avec GoAffPro si `referral_code` présent
- [ ] Déclencher une séquence d'onboarding multi-emails (J0, J3, J7, J14)

### Phase C (Mars 2026)
- [ ] Notification push via OneSignal lors de l'inscription
- [ ] Génération automatique d'une carte membre virtuelle (QR code)
- [ ] Analytics avancées (Metabase / Posthog)
- [ ] Export automatique vers Google Sheets pour rapports

---

## 📞 Support

**Besoin d'aide ?**

- 📧 Email : dany@rabaislocal.com
- 📁 Documentation Make : [https://www.make.com/en/help](https://www.make.com/en/help)
- 📁 Documentation Supabase : [https://supabase.com/docs](https://supabase.com/docs)
- 📁 Documentation MailerSend : [https://developers.mailersend.com](https://developers.mailersend.com)

---

## 📝 Changelog

| Version | Date | Changements |
|---------|------|-------------|
| **1.0.0** | 2025-11-08 | 🎉 Version initiale - MVP Module A |

---

**Fait avec ❤️ pour RabaisLocal**
*Propulsé par Make, Supabase & MailerSend*
