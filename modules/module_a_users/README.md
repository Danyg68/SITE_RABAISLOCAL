# 📦 MODULE A - Utilisateurs & Authentification

## 🎯 Description

Le **Module A** est le module fondamental de RabaisLocal. Il gère toute l'inscription, l'authentification et la gestion des profils utilisateurs pour les trois types d'acteurs :

- **Consommateurs** - Utilisateurs finaux cherchant des rabais
- **Commerçants** - Entreprises locales offrant des rabais
- **Affiliés** - Partenaires générant du trafic via liens de parrainage

---

## ✅ Statut : COMPLET

**Date de complétion :** 9 novembre 2025
**Version :** 1.0.0

---

## 📂 Structure du Module

```
module_a_users/
├── make/                                   # Workflows Make.com
│   └── webhook_inscription_consommateur.json   # Webhook inscription (8 modules)
│
├── supabase/                               # Base de données
│   └── 01_create_tables_users.sql          # 3 tables + 18 indexes + 9 RLS
│
├── tests/                                  # Tests & Fixtures
│   └── exemple_payload_inscription_consommateur.json
│
├── docs/                                   # Documentation
│   ├── README_Module_A_Inscription_Consommateur.md
│   └── MODULE_A_GUIDE_RAPIDE.md
│
└── README.md                               # Ce fichier
```

---

## 🗄️ Tables Supabase

### 1. `users` - Table Principale
Stocke tous les utilisateurs (consommateurs, commerçants, affiliés)

**Colonnes principales :**
- `id` (UUID, PK)
- `email` (unique, not null)
- `nom`, `prenom`
- `role` (consumer, merchant, affiliate)
- `statut` (actif, inactif, banni)
- `ville`, `province`, `code_postal`
- `phone`
- `date_naissance`
- `preferences_notif` (JSONB)
- `metadata` (JSONB)

### 2. `logs_audit` - Logs d'Audit
Conforme Loi 25 - Traçabilité complète

**Colonnes principales :**
- `id` (UUID, PK)
- `user_id` (FK vers users)
- `action` (login, logout, update_profile, etc.)
- `ip_address`
- `user_agent`
- `metadata` (JSONB)
- `created_at`

### 3. `legal_consents` - Consentements Légaux
Conforme Loi 25 - RGPD

**Colonnes principales :**
- `id` (UUID, PK)
- `user_id` (FK vers users)
- `type_consent` (terms, privacy, marketing, cookies)
- `consenti` (boolean)
- `ip_address`
- `version_document`
- `date_consentement`

---

## 🔄 Workflow Make.com

### Webhook Inscription Consommateur

**Fichier :** `make/webhook_inscription_consommateur.json`

**Flux (8 modules) :**

```
1. Webhook (Custom Webhook)
   └─> Reçoit données ClickFunnels (email, prénom, ville)

2. Set Variables
   └─> Standardise données + génère UUID

3. Supabase - Insert User
   └─> Crée utilisateur dans table 'users'

4. Supabase - Insert Audit Log
   └─> Log action 'user_registered' dans 'logs_audit'

5. Router (2 branches)
   ├─> Branch A : MailerSend (Email Bienvenue)
   └─> Branch B : Suite du flux

6. MailerSend - Email Bienvenue
   └─> Template français avec lien activation

7. Supabase - Update User
   └─> Marque 'statut' = 'actif'

8. Webhook Response
   └─> Retourne JSON success/error à ClickFunnels
```

**Variables Make.com requises :**
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `MAILERSEND_API_KEY`
- `MAILERSEND_TEMPLATE_ID_WELCOME`

---

## 🔐 Sécurité & RLS (Row Level Security)

### Politiques RLS Implémentées

**Table `users` :**
1. `Users can view own profile` - SELECT sur son propre profil
2. `Users can update own profile` - UPDATE limité aux champs autorisés
3. `Admins can view all users` - SELECT pour role = 'admin'
4. `Public can insert new users` - INSERT pour inscription publique

**Table `logs_audit` :**
1. `Admins can view all audit logs` - SELECT pour admins
2. `Users can view own audit logs` - SELECT sur ses propres logs

**Table `legal_consents` :**
1. `Users can view own consents` - SELECT sur ses propres consentements
2. `Public can insert consents` - INSERT lors de l'inscription
3. `Users can update own consents` - UPDATE pour changement préférences

---

## 📊 Indexes pour Performance

**18 indexes créés :**

**Table `users` :**
- `idx_users_email` (UNIQUE) - Recherche rapide par email
- `idx_users_role` - Filtrage par rôle
- `idx_users_statut` - Filtrage utilisateurs actifs
- `idx_users_ville` - Recherche géographique
- `idx_users_province` - Filtrage par province (Québec)
- `idx_users_created_at` - Tri chronologique

**Table `logs_audit` :**
- `idx_logs_audit_user_id` - Logs d'un utilisateur
- `idx_logs_audit_action` - Filtrage par type d'action
- `idx_logs_audit_created_at` - Tri chronologique
- `idx_logs_audit_ip_address` - Détection fraude

**Table `legal_consents` :**
- `idx_legal_consents_user_id` - Consentements d'un utilisateur
- `idx_legal_consents_type` - Filtrage par type
- `idx_legal_consents_date` - Tri chronologique

---

## 🧪 Tests

### Exemple de Payload (ClickFunnels → Webhook)

**Fichier :** `tests/exemple_payload_inscription_consommateur.json`

**Payload JSON :**
```json
{
  "email": "jean.tremblay@gmail.com",
  "prenom": "Jean",
  "nom": "Tremblay",
  "ville": "Québec",
  "province": "QC",
  "code_postal": "G1R 2L3",
  "phone": "418-555-1234",
  "source": "clickfunnels",
  "utm_source": "facebook",
  "utm_campaign": "lancement_2025"
}
```

**Résultat attendu :**
- ✅ Utilisateur créé dans Supabase
- ✅ Log audit enregistré
- ✅ Email de bienvenue envoyé
- ✅ Response 200 OK retournée

---

## 📚 Documentation Complète

### Guides Disponibles

1. **[README_Module_A_Inscription_Consommateur.md](./docs/README_Module_A_Inscription_Consommateur.md)**
   - Documentation technique complète
   - Configuration Make.com étape par étape
   - Schémas SQL détaillés
   - 15 698 caractères

2. **[MODULE_A_GUIDE_RAPIDE.md](./docs/MODULE_A_GUIDE_RAPIDE.md)**
   - Guide de démarrage rapide
   - Installation en 10 minutes
   - Checklist de validation
   - 6 635 caractères

---

## 🚀 Installation Rapide

### Étape 1 : Supabase

```bash
# 1. Ouvrir Supabase SQL Editor
# 2. Copier le contenu de supabase/01_create_tables_users.sql
# 3. Exécuter le script (créera 3 tables + 18 indexes + 9 RLS)
# 4. Vérifier que les tables sont créées
```

### Étape 2 : Make.com

```bash
# 1. Créer nouveau scénario Make.com
# 2. Importer make/webhook_inscription_consommateur.json
# 3. Configurer variables d'environnement :
#    - SUPABASE_URL
#    - SUPABASE_SERVICE_ROLE_KEY
#    - MAILERSEND_API_KEY
# 4. Activer le scénario
# 5. Copier l'URL du webhook
```

### Étape 3 : ClickFunnels

```bash
# 1. Aller dans Settings → Webhooks
# 2. Créer nouveau webhook
# 3. Coller l'URL du webhook Make.com
# 4. Sélectionner événement "Contact Created"
# 5. Sauvegarder
```

### Étape 4 : Test

```bash
# 1. Créer un test avec tests/exemple_payload_inscription_consommateur.json
# 2. Envoyer via Postman ou cURL :

curl -X POST https://hook.eu1.make.com/xxx \
  -H "Content-Type: application/json" \
  -d @tests/exemple_payload_inscription_consommateur.json

# 3. Vérifier :
#    - Utilisateur dans Supabase
#    - Email reçu
#    - Log audit créé
```

---

## 🔗 Dépendances

### Services Externes
- ✅ **Supabase** - Base de données PostgreSQL
- ✅ **Make.com** - Automatisation workflows
- ✅ **MailerSend** - Emails transactionnels
- ✅ **ClickFunnels** - Pages de capture (optionnel)

### Modules RabaisLocal
- ⚠️ **Aucune dépendance** - Module A est le module de base

### Modules Dépendants
- 📦 **Module B (Credits)** - Requiert utilisateurs authentifiés
- 📦 **Module C (Offers)** - Requiert commerçants et consommateurs
- 📦 **Module E (Affiliates)** - Requiert affiliés

---

## 📈 Métriques & KPIs

### Métriques Trackées

**Dans Supabase :**
- Nombre total d'utilisateurs
- Utilisateurs actifs (statut = 'actif')
- Répartition par rôle (consumer/merchant/affiliate)
- Répartition géographique (ville/province)
- Taux d'activation (email vérifié)

**Dans Make.com :**
- Nombre d'inscriptions par jour
- Taux de succès webhook (200 OK)
- Taux d'échec (erreurs)
- Temps moyen d'exécution workflow

---

## 🛠️ Maintenance

### Logs à Surveiller
- `logs_audit` - Actions suspectes (trop de tentatives login)
- Erreurs Make.com - Webhooks échoués
- Emails non délivrés (bounces MailerSend)

### Backups
- ✅ Supabase - Backups automatiques quotidiens
- ✅ Make.com - Export JSON du workflow mensuel
- ✅ Documentation - Versionnée dans Git

---

## 📞 Support

**Questions sur le Module A ?**
- 📧 Email : dany@rabaislocal.com
- 📚 Documentation : `docs/README_Module_A_Inscription_Consommateur.md`
- 🚀 Guide rapide : `docs/MODULE_A_GUIDE_RAPIDE.md`

---

## 📝 Changelog

### Version 1.0.0 (9 novembre 2025)
- ✅ Création tables Supabase (users, logs_audit, legal_consents)
- ✅ Workflow Make.com inscription consommateur (8 modules)
- ✅ 18 indexes pour performance
- ✅ 9 politiques RLS pour sécurité
- ✅ Documentation complète en français
- ✅ Tests avec exemples de payloads

---

**Dernière mise à jour :** 9 novembre 2025
**Statut :** ✅ Production Ready
**Prochaine version :** 1.1.0 (ajout OAuth Google/Facebook)

---

**Fait avec ❤️ pour l'économie locale québécoise**
*Module fondamental pour tous les utilisateurs RabaisLocal*
