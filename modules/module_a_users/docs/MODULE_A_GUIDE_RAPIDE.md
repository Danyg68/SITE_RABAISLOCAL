# 🚀 Guide Rapide - Module A : Inscription Consommateur

## 📦 Fichiers Créés

Tous les fichiers nécessaires pour le Module A ont été créés et sont prêts à être utilisés :

### 1. Webhook Make
📄 **Fichier :** `webhook_inscription_consommateur.json`
- Blueprint Make complet prêt à importer
- 8 modules configurés (Webhook → Supabase → MailerSend)
- Gestion des erreurs incluse

### 2. Documentation Complète
📄 **Fichier :** `README_Module_A_Inscription_Consommateur.md`
- Instructions d'installation étape par étape
- Configuration Supabase + MailerSend + ClickFunnels
- Exemples de tests
- Gestion des erreurs
- Analytics et KPIs

### 3. Script SQL Supabase
📄 **Fichier :** `../supabase/01_create_tables_module_a.sql`
- Création des tables : `users`, `logs_audit`, `legal_consents`
- Index optimisés pour les performances
- Row Level Security (RLS) configuré
- Triggers automatiques
- Fonctions utiles (anonymisation, statistiques)

### 4. Exemples de Payloads
📄 **Fichier :** `exemple_payload_inscription_consommateur.json`
- 5 exemples de payloads prêts à l'emploi
- Commandes cURL pour tester
- Mapping ClickFunnels
- Réponses attendues

---

## ⚡ Installation Rapide (15 minutes)

### Étape 1 : Supabase (5 min)
```bash
# 1. Connectez-vous à Supabase
# 2. Ouvrez le SQL Editor
# 3. Copiez-collez le contenu de : 01_create_tables_module_a.sql
# 4. Exécutez (Run)
# 5. Vérifiez les messages de succès ✅
```

### Étape 2 : Make (5 min)
```bash
# 1. Connectez-vous à Make.com
# 2. Créez un nouveau scénario
# 3. Menu (…) → Import Blueprint
# 4. Sélectionnez : webhook_inscription_consommateur.json
# 5. Configurez les 3 connexions :
#    - Supabase (service_role key)
#    - MailerSend (API token)
# 6. Copiez l'URL du webhook
```

### Étape 3 : MailerSend (3 min)
```bash
# 1. Créez un template "rabaislocal_consumer_welcome"
# 2. Utilisez le design fourni dans le README
# 3. Copiez l'ID du template
# 4. Collez-le dans Make (module #5)
```

### Étape 4 : ClickFunnels (2 min)
```bash
# 1. Ouvrez votre tunnel d'inscription consommateur
# 2. Settings → Integrations → Webhook
# 3. Collez l'URL du webhook Make
# 4. Configurez le mapping (voir exemple_payload)
# 5. Testez avec un contact de test
```

---

## 🧪 Test Rapide

### Option 1 : Test avec cURL
```bash
curl -X POST https://hook.eu2.make.com/VOTRE_WEBHOOK_ID \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "prenom": "Test",
    "ville": "Trois-Rivières"
  }'
```

### Option 2 : Test depuis ClickFunnels
1. Remplissez le formulaire d'inscription
2. Soumettez
3. Vérifiez que vous recevez l'email de bienvenue

### ✅ Vérifications
Après un test réussi :
- [ ] Utilisateur créé dans Supabase (table `users`)
- [ ] Log enregistré dans `logs_audit`
- [ ] Email envoyé (vérifiez MailerSend Activity)
- [ ] Email reçu dans la boîte
- [ ] Réponse JSON 200 OK

---

## 📊 Ce que fait le webhook

```
ClickFunnels
    ↓
    📨 Envoi des données (email, prénom, ville...)
    ↓
Make Webhook (Réception)
    ↓
    🔄 Génération UUID + Variables
    ↓
Supabase (Création utilisateur)
    ↓
    📝 Enregistrement dans users
    ↓
Supabase (Log audit)
    ↓
    📝 Enregistrement dans logs_audit
    ↓
MailerSend (Email de bienvenue)
    ↓
    📧 Envoi email personnalisé
    ↓
Supabase (Mise à jour)
    ↓
    ✅ onboarding_email_sent = true
    ↓
Réponse JSON
    ↓
    ✅ { success: true, user_id: "...", ... }
```

---

## 💡 Caractéristiques Principales

### ✅ Automatisations
- ✅ Création automatique de l'utilisateur
- ✅ Attribution des crédits gratuits selon le plan
- ✅ Envoi email de bienvenue personnalisé
- ✅ Logs d'audit automatiques
- ✅ Tracking UTM et affiliés

### 🔐 Sécurité
- ✅ Row Level Security (RLS) activé
- ✅ Validation des emails
- ✅ HTTPS/TLS 1.2+
- ✅ Service role key sécurisée
- ✅ Contrainte UNIQUE sur les emails

### 📈 Analytics
- ✅ Tracking complet des sources (UTM)
- ✅ Codes de parrainage affiliés
- ✅ Métadonnées flexibles (JSON)
- ✅ Logs détaillés de toutes les actions

### 🌍 Conformité
- ✅ Loi 25 (Québec)
- ✅ Table legal_consents prête
- ✅ Fonction d'anonymisation après 24 mois
- ✅ Historique complet d'audit

---

## 🎁 Crédits Gratuits par Plan

| Plan | Crédits gratuits/mois | Prix |
|------|----------------------|------|
| 🥉 **Bronze** | 10 crédits | 9.95 $/mois |
| 🥈 **Silver** | 20 crédits | 14.95 $/mois |
| 🥇 **Gold** | 50 crédits | 24.95 $/mois |

Ces crédits sont automatiquement attribués lors de l'inscription.

---

## 🔧 Personnalisation

### Modifier le nombre de crédits gratuits
Éditez le module Make #3 → Mapper → `credits_free_monthly` :
```javascript
{{if(2.plan_default = "bronze"; 10; if(2.plan_default = "silver"; 20; if(2.plan_default = "gold"; 50; 10)))}}
```

### Modifier l'email de bienvenue
1. Connectez-vous à MailerSend
2. Éditez le template `rabaislocal_consumer_welcome`
3. Modifiez le design et le contenu
4. Sauvegardez (l'ID reste le même)

### Ajouter des champs personnalisés
1. Ajoutez le champ dans le webhook Make (module #1)
2. Ajoutez la colonne dans Supabase (table `users`)
3. Mappez le champ dans Make (module #3)
4. Mettez à jour le mapping ClickFunnels

---

## 📞 Support

**Besoin d'aide ?**
- 📧 Email : dany@rabaislocal.com
- 📁 Documentation complète : `README_Module_A_Inscription_Consommateur.md`
- 🔗 Make Docs : [make.com/en/help](https://www.make.com/en/help)
- 🔗 Supabase Docs : [supabase.com/docs](https://supabase.com/docs)

---

## 🎯 Prochaines Étapes

Une fois le Module A fonctionnel :

### Phase B (prochaine)
- [ ] Module B : Système de crédits & paiements
- [ ] Module C : Création d'offres commerçants
- [ ] Module E : Inscription affiliés + GoAffPro
- [ ] Module F : Agents IA (recommandations)

### Améliorations Module A
- [ ] Validation email (lien de confirmation)
- [ ] Séquence onboarding multi-emails (J0, J3, J7, J14)
- [ ] Intégration Supabase Auth automatique
- [ ] Synchronisation GoAffPro si code de parrainage

---

## ✨ Récapitulatif

✅ **Vous avez maintenant :**
1. Un webhook Make 100% fonctionnel
2. Une base de données Supabase structurée
3. Un système d'emails automatisé via MailerSend
4. Des logs d'audit complets pour la conformité
5. Un tracking marketing (UTM + affiliés)
6. Une documentation complète

🎉 **Le Module A est prêt à être déployé !**

---

**Fait avec ❤️ pour RabaisLocal**
*Propulsé par Make, Supabase & MailerSend*
