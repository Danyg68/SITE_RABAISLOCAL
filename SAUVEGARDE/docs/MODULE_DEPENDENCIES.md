# 🔗 MATRICE DE DÉPENDANCES - Modules RabaisLocal

## Vue d'Ensemble

Ce document détaille les **dépendances entre modules** pour comprendre l'ordre d'installation et les impacts de modifications.

---

## 📊 Matrice de Dépendances

### Tableau Complet

| Module | Dépend de | Est requis par | Priorité | Statut |
|--------|-----------|----------------|----------|--------|
| **Module A (Users)** | Aucun | B, C, E, F | **P0** | ✅ Complet |
| **Module B (Credits)** | A | C | **P1** | 🔄 En cours |
| **Module C (Offers)** | A, B | F | **P1** | 🔄 En cours |
| **Module E (Affiliates)** | A | Aucun | **P2** | 📋 Planifié |
| **Module F (IA)** | C | Aucun | **P2** | ✅ Complet |

---

## 🎯 Module A - Utilisateurs & Authentification

### Dépendances ENTRANTES
**Aucune** - Module A est le module fondamental qui ne dépend de rien.

### Dépendances SORTANTES
**Tous les autres modules** dépendent de Module A car ils nécessitent des utilisateurs authentifiés.

### Tables Requises
```sql
users               -- Table principale des utilisateurs
logs_audit          -- Logs d'audit (Loi 25)
legal_consents      -- Consentements légaux (RGPD)
```

### Endpoints API
```
POST /api/v1/auth/register    -- Inscription
POST /api/v1/auth/login       -- Connexion
POST /api/v1/auth/logout      -- Déconnexion
GET  /api/v1/users/:id        -- Profil utilisateur
PUT  /api/v1/users/:id        -- Mise à jour profil
```

### Services Make.com
- `webhook_inscription_consommateur.json` - Inscription consommateur
- `webhook_inscription_merchant.json` - Inscription commerçant (futur)
- `webhook_inscription_affiliate.json` - Inscription affilié (futur)

### Impact si Modifié
⚠️ **CRITIQUE** - Tous les autres modules sont affectés
- Modification schéma `users` → Vérifier tous les modules
- Changement JWT → Mettre à jour tous les clients
- Nouveau champ → Propager dans tous les workflows

---

## 💳 Module B - Système de Crédits

### Dépendances ENTRANTES
- **Module A (Users)** - Requis pour identifier utilisateurs achetant crédits

### Dépendances SORTANTES
- **Module C (Offers)** - Utilisé pour débiter crédits lors création offres

### Tables Requises
```sql
users                    -- [Module A] Pour user_id et credits_disponibles
credits_packages         -- Paquets de crédits disponibles
credits_transactions     -- Historique transactions
```

### Relations avec Module A
```sql
-- Extension table users pour crédits
ALTER TABLE users ADD COLUMN credits_disponibles INTEGER DEFAULT 0;

-- Foreign key vers users
ALTER TABLE credits_transactions
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id) REFERENCES users(id);
```

### Endpoints API
```
GET  /api/v1/credits/packages         -- Liste paquets disponibles
POST /api/v1/credits/purchase         -- Acheter crédits
GET  /api/v1/credits/balance/:user_id -- Solde crédits
GET  /api/v1/credits/history/:user_id -- Historique transactions
```

### Services Make.com
- `webhook_achat_credits.json` - Traitement achat crédits
- `webhook_stripe_payment.json` - Confirmation paiement Stripe

### Services Externes
- **Stripe** - Traitement paiements
- **MailerSend** - Confirmation achat par email

### Impact si Modifié
⚠️ **IMPORTANT** - Module C est affecté
- Changement coût crédits → Vérifier prix offres dans Module C
- Modification table transactions → Vérifier rapports Module C

---

## 🎁 Module C - Gestion des Offres

### Dépendances ENTRANTES
- **Module A (Users)** - Requis pour merchants et consumers
- **Module B (Credits)** - Requis pour débiter crédits à la création

### Dépendances SORTANTES
- **Module F (IA)** - Utilisé pour générer contenu des offres

### Tables Requises
```sql
users                    -- [Module A] Pour merchant_id et consumer_id
credits_transactions     -- [Module B] Pour débiter crédits
offers                   -- Table principale des offres
offers_activations       -- Historique activations par consumers
offers_categories        -- Catégories d'offres
```

### Relations avec Modules A et B
```sql
-- Foreign key vers users (merchants)
ALTER TABLE offers
ADD CONSTRAINT fk_merchant
FOREIGN KEY (merchant_id) REFERENCES users(id);

-- Vérifier crédits disponibles (Module B)
CREATE OR REPLACE FUNCTION check_credits_before_offer()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT credits_disponibles FROM users WHERE id = NEW.merchant_id) < NEW.credits_cost THEN
    RAISE EXCEPTION 'Crédits insuffisants';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_credits_before_insert
BEFORE INSERT ON offers
FOR EACH ROW EXECUTE FUNCTION check_credits_before_offer();
```

### Endpoints API
```
GET  /api/v1/offers                  -- Liste offres actives
GET  /api/v1/offers/:id              -- Détail offre
POST /api/v1/offers                  -- Créer offre (merchant)
PUT  /api/v1/offers/:id              -- Modifier offre (merchant)
DELETE /api/v1/offers/:id            -- Supprimer offre (merchant)
POST /api/v1/offers/:id/activate     -- Activer offre (consumer)
GET  /api/v1/offers/merchant/:id     -- Offres d'un merchant
```

### Services Make.com
- `webhook_create_offer.json` - Création offre + débit crédits
- `webhook_activate_offer.json` - Activation offre par consumer

### Services Externes
- **MailerSend** - Confirmation création offre

### Impact si Modifié
⚠️ **MOYEN** - Module F est affecté
- Modification schéma offres → Vérifier prompts IA Module F
- Nouveau champ offre → Adapter génération contenu Module F

---

## 🤝 Module E - Programme d'Affiliation

### Dépendances ENTRANTES
- **Module A (Users)** - Requis pour affiliés et leurs filleuls

### Dépendances SORTANTES
**Aucune** - Module E est un module terminal

### Tables Requises
```sql
users                    -- [Module A] Pour affiliate_id et referred_user_id
affiliates               -- Informations supplémentaires affiliés
affiliate_links          -- Liens de parrainage générés
affiliate_commissions    -- Commissions gagnées
affiliate_payouts        -- Historique paiements
```

### Relations avec Module A
```sql
-- Foreign key vers users (affiliés)
ALTER TABLE affiliates
ADD CONSTRAINT fk_affiliate
FOREIGN KEY (user_id) REFERENCES users(id);

-- Lien parrain/filleul dans users
ALTER TABLE users ADD COLUMN referred_by UUID REFERENCES users(id);
```

### Endpoints API
```
GET  /api/v1/affiliates/links/:id       -- Liens de parrainage
POST /api/v1/affiliates/links           -- Générer nouveau lien
GET  /api/v1/affiliates/commissions/:id -- Commissions gagnées
GET  /api/v1/affiliates/payouts/:id     -- Historique paiements
POST /api/v1/affiliates/request-payout  -- Demander paiement
```

### Services Make.com
- `webhook_affiliate_signup.json` - Inscription nouvel affilié
- `webhook_referral_completed.json` - Filleul inscrit → Commission
- `webhook_payout_request.json` - Demande paiement commission

### Services Externes
- **GoAffPro** - Gestion programme affiliation
- **MailerSend** - Notifications commissions

### Impact si Modifié
✅ **FAIBLE** - Aucun autre module n'en dépend
- Module isolé, modifications sans impact sur autres modules

---

## 🤖 Module F - Intelligence Artificielle

### Dépendances ENTRANTES
- **Module C (Offers)** - Requis pour générer contenu des offres

### Dépendances SORTANTES
**Aucune** - Module F est un module terminal

### Tables Requises
```sql
offers                   -- [Module C] Pour offer_id
ai_agents                -- Configuration 3 agents (Merchant, Consumer, Affiliate)
ai_conversations         -- Historique conversations
ai_messages              -- Messages individuels
ai_usage_logs            -- Logs utilisation API OpenAI
ai_quotas                -- Quotas par utilisateur
ai_generated_content     -- Contenu généré sauvegardé
ai_feedback              -- Feedback utilisateurs sur contenu IA
```

### Relations avec Module C
```sql
-- Foreign key vers offers
ALTER TABLE ai_generated_content
ADD CONSTRAINT fk_offer
FOREIGN KEY (offer_id) REFERENCES offers(id);

-- Trigger auto-génération contenu offre
CREATE OR REPLACE FUNCTION auto_generate_offer_content()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.description IS NULL OR NEW.description = '' THEN
    -- Appeler Edge Function agent-merchant
    -- (implémenté via webhook)
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Edge Functions
```typescript
// functions/agent-merchant.ts
// Génère contenu pour offres merchants

// functions/agent-consumer.ts
// Recommandations personnalisées consumers

// functions/agent-affiliate.ts
// Conseils stratégiques affiliés
```

### Services Externes
- **OpenAI GPT-4o-mini** - Génération contenu
- **Supabase Edge Functions** - Runtime Deno

### Impact si Modifié
✅ **FAIBLE** - Aucun autre module n'en dépend
- Module optionnel, peut être désactivé sans casser autres modules

---

## 📋 Ordre d'Installation Recommandé

### Phase 1 - Foundation (Semaine 1-2)
```
1. MODULE A (Users)
   └─> Installer en premier (aucune dépendance)
   └─> Tester inscription/connexion
   └─> Valider RLS policies
```

### Phase 2 - Core Business (Semaine 3-4)
```
2. MODULE B (Credits)
   └─> Dépend de Module A
   └─> Tester achat crédits
   └─> Vérifier intégration Stripe

3. MODULE C (Offers)
   └─> Dépend de Module A + Module B
   └─> Tester création offre (débite crédits)
   └─> Vérifier activation par consumers
```

### Phase 3 - Advanced Features (Semaine 5-6)
```
4. MODULE E (Affiliates)
   └─> Dépend de Module A
   └─> Tester génération liens
   └─> Vérifier calcul commissions

5. MODULE F (IA)
   └─> Dépend de Module C
   └─> Tester génération contenu offres
   └─> Vérifier quotas utilisateurs
```

---

## 🔄 Impacts de Modifications

### Scénarios de Changement

**Scénario 1 : Ajout champ dans `users` (Module A)**
```
Impact : ⚠️ CRITIQUE
Modules affectés : B, C, E, F (tous)

Actions requises :
1. Mettre à jour schéma users
2. Migrer données existantes
3. Vérifier tous les workflows Make.com
4. Adapter tous les formulaires frontend
5. Tester tous les modules dépendants
```

**Scénario 2 : Modification coût crédits (Module B)**
```
Impact : ⚠️ MOYEN
Modules affectés : C

Actions requises :
1. Mettre à jour table credits_packages
2. Vérifier prix offres dans Module C
3. Mettre à jour documentation tarifs
4. Informer merchants par email
```

**Scénario 3 : Nouveau champ offre (Module C)**
```
Impact : ✅ FAIBLE
Modules affectés : F

Actions requises :
1. Ajouter champ dans table offers
2. Adapter prompt IA Module F si pertinent
3. Mettre à jour formulaire création offre
```

**Scénario 4 : Changement taux commission (Module E)**
```
Impact : ✅ AUCUN
Modules affectés : Aucun

Actions requises :
1. Mettre à jour table affiliates
2. Informer affiliés par email
3. Mettre à jour conditions du programme
```

**Scénario 5 : Nouveau agent IA (Module F)**
```
Impact : ✅ AUCUN
Modules affectés : Aucun

Actions requises :
1. Créer nouvelle Edge Function
2. Ajouter agent dans table ai_agents
3. Configurer prompts
4. Tester en isolation
```

---

## 🧪 Tests de Dépendances

### Checklist de Validation

**Lors de l'installation d'un nouveau module :**

✅ **Module A (Users)**
- [ ] Tables créées (users, logs_audit, legal_consents)
- [ ] RLS policies actives
- [ ] Webhook Make.com fonctionnel
- [ ] Inscription test réussie
- [ ] Email bienvenue reçu

✅ **Module B (Credits)**
- [ ] Module A installé et fonctionnel
- [ ] Tables créées (credits_packages, credits_transactions)
- [ ] Colonne credits_disponibles ajoutée à users
- [ ] Intégration Stripe testée
- [ ] Achat test réussi

✅ **Module C (Offers)**
- [ ] Module A et B installés et fonctionnels
- [ ] Tables créées (offers, offers_activations, offers_categories)
- [ ] Triggers de vérification crédits actifs
- [ ] Création offre test réussie
- [ ] Débit crédits vérifié

✅ **Module E (Affiliates)**
- [ ] Module A installé et fonctionnel
- [ ] Tables créées (affiliates, affiliate_links, etc.)
- [ ] Intégration GoAffPro testée
- [ ] Lien parrainage généré
- [ ] Commission test calculée

✅ **Module F (IA)**
- [ ] Module C installé et fonctionnel
- [ ] Tables créées (ai_agents, ai_conversations, etc.)
- [ ] Edge Functions déployées
- [ ] OpenAI API connectée
- [ ] Génération contenu test réussie

---

## 📚 Documentation Connexe

- [Architecture Générale](./ARCHITECTURE.md)
- [Structure du Projet](./PROJECT_STRUCTURE.md)
- [Liste des Modules](../modules/README.md)

---

## 📞 Support

**Questions sur les dépendances ?**
- 📧 Email : dany@rabaislocal.com
- 📚 Documentation : `/docs`

---

**Dernière mise à jour :** 9 novembre 2025
**Version :** 1.0.0

---

**Fait avec ❤️ pour l'économie locale québécoise**
*Dépendances claires pour développement structuré*
