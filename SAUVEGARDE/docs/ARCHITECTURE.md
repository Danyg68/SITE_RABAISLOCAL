# 🏛️ ARCHITECTURE - RabaisLocal

## Vue d'Ensemble Globale

RabaisLocal est construit sur une **architecture modulaire serverless** optimisée pour la scalabilité, la maintenabilité et les coûts. L'ensemble du système est divisé en **3 zones principales** interconnectées.

---

## 🎯 Les 3 Zones Principales

```
┌─────────────────────────────────────────────────────────────────┐
│                      RABAISLOCAL ARCHITECTURE                   │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐
│   1. MODULES     │  → Fonctionnalités métier isolées
│   (Business)     │     (Users, Credits, Offers, Affiliates, IA)
└──────────────────┘

┌──────────────────┐
│ 2. INFRASTRUCTURE│  → Services partagés mutualisés
│   (Shared)       │     (Database, Make, Security, Monitoring)
└──────────────────┘

┌──────────────────┐
│ 3. APPLICATIONS  │  → Interfaces utilisateur & API
│   (Frontend/API) │     (Web, Mobile, Edge Functions)
└──────────────────┘
```

---

## 📦 Zone 1 : MODULES (Business Logic)

### Principe
Chaque module est **autonome et indépendant** avec ses propres workflows, schémas DB, tests et documentation.

### Modules Disponibles

```
modules/
├── module_a_users/          ✅ Complet
│   ├── make/                Workflows Make.com
│   ├── supabase/            Schémas SQL
│   ├── tests/               Tests & Payloads
│   └── docs/                Documentation
│
├── module_b_credits/        🔄 En cours
│   └── ...
│
├── module_c_offers/         🔄 En cours
│   └── ...
│
├── module_e_affiliates/     📋 Planifié
│   └── ...
│
└── module_f_ia/             ✅ Complet
    └── ...
```

### Flux de Données entre Modules

```
┌──────────────────────────────────────────────────────────────┐
│                     FLUX UTILISATEUR                         │
└──────────────────────────────────────────────────────────────┘

1. MODULE A (Users)
   ↓
   User inscrit via ClickFunnels
   → Webhook Make.com reçoit données
   → Création utilisateur dans Supabase
   → Email bienvenue via MailerSend
   → User actif

2. MODULE B (Credits)
   ↓
   User achète crédits
   → Paiement via Stripe
   → Webhook Stripe → Make.com
   → Ajout crédits dans Supabase
   → Email confirmation

3. MODULE C (Offers)
   ↓
   Merchant crée offre
   → Consomme X crédits (Module B)
   → Offre enregistrée Supabase
   → Visible pour consumers (Module A)
   → Module F génère contenu IA

4. MODULE E (Affiliates)
   ↓
   Affiliate génère lien
   → Consumer clique lien
   → Inscription via Module A
   → Commission calculée
   → Paiement via GoAffPro

5. MODULE F (IA)
   ↓
   Merchant demande aide
   → Appel Edge Function
   → OpenAI génère contenu
   → Sauvegarde dans Supabase
   → Quota décompté
```

### Règles de Communication entre Modules

✅ **AUTORISÉ :**
- Module B lit données Module A (user_id)
- Module C lit données Module A + Module B (user + crédits)
- Module F lit données Module C (offres)

❌ **INTERDIT :**
- Modifier directement données d'un autre module
- Dépendances circulaires (A → B → A)
- Code partagé sauf via `/shared`

---

## 🏗️ Zone 2 : INFRASTRUCTURE (Services Partagés)

### Principe
Tous les services techniques partagés par tous les modules et applications.

### Composants

```
infrastructure/
├── database/
│   ├── migrations/          Migrations SQL globales
│   └── schemas/             Schémas partagés
│
├── make/
│   ├── shared_workflows/    Workflows réutilisables
│   └── templates/           Templates standardisés
│
├── security/
│   ├── policies/            RLS policies
│   └── certificates/        SSL/TLS
│
└── monitoring/
    └── alerting/            Alertes Slack/Email
```

### Services Externes Utilisés

**Base de Données :**
- **Supabase PostgreSQL** - Base unique pour tous les modules
- Row Level Security (RLS) activé
- Backups automatiques quotidiens
- Point-in-time recovery 7 jours

**Automation :**
- **Make.com** - Orchestration workflows
- Variables d'environnement partagées
- Logs centralisés
- Rate limiting par IP

**Emails :**
- **MailerSend** - Emails transactionnels
- Templates français standardisés
- Tracking ouvertures/clics
- Gestion bounces/spam

**Paiements :**
- **Stripe** - Achat crédits
- Webhooks sécurisés
- Gestion abonnements futurs

**Affiliation :**
- **GoAffPro** - Gestion programme affiliation
- Tracking liens
- Calcul commissions

**IA :**
- **OpenAI GPT-4o-mini** - Génération contenu
- Quotas par utilisateur
- Cache réponses fréquentes

---

## 🚀 Zone 3 : APPLICATIONS (User Interfaces)

### Principe
Interfaces utilisateur et API pour consommateurs, commerçants, affiliés et admins.

### Applications

```
applications/
├── web/                     Application web Next.js 14
│   ├── public/              Pages publiques
│   ├── components/          Composants React
│   └── pages/               Routes App Router
│       ├── /                Accueil
│       ├── /inscription     Inscription
│       ├── /connexion       Connexion
│       ├── /dashboard       Dashboard consumer
│       ├── /merchant/*      Dashboard merchant
│       ├── /affiliate/*     Dashboard affiliate
│       └── /admin/*         Admin panel
│
├── mobile/                  React Native (Phase C)
│   ├── android/
│   └── ios/
│
└── api/
    └── functions/           Supabase Edge Functions
        ├── agent-merchant   IA pour merchants
        ├── agent-consumer   IA pour consumers
        └── agent-affiliate  IA pour affiliates
```

### Architecture Frontend (Web)

```
┌─────────────────────────────────────────────────────────┐
│                  NEXT.JS 14 APP ROUTER                  │
└─────────────────────────────────────────────────────────┘

User Request
    ↓
Next.js Edge Runtime (Vercel)
    ↓
Server Components (SSR)
    ├─> Supabase Auth (vérif token)
    ├─> Supabase Client (fetch data)
    └─> TanStack Query (cache)
    ↓
Client Components (CSR)
    ├─> Zustand (state management)
    ├─> React Hook Form (forms)
    └─> Zod (validation)
    ↓
Tailwind CSS (styling)
    ↓
HTML/CSS/JS → User
```

### Architecture Backend (API)

```
┌─────────────────────────────────────────────────────────┐
│                 SUPABASE EDGE FUNCTIONS                 │
└─────────────────────────────────────────────────────────┘

HTTP Request
    ↓
Supabase Edge Runtime (Deno)
    ↓
Edge Function (TypeScript)
    ├─> Validation (Zod)
    ├─> Auth check (JWT)
    ├─> Business logic
    │   ├─> OpenAI API (si IA)
    │   ├─> Stripe API (si paiement)
    │   └─> MailerSend API (si email)
    └─> Database (Supabase PostgreSQL)
    ↓
JSON Response → Client
```

---

## 🔄 Flux de Données Global

### Flux Inscription Consommateur (Module A)

```
┌──────────────────────────────────────────────────────────┐
│           FLUX INSCRIPTION CONSOMMATEUR                  │
└──────────────────────────────────────────────────────────┘

1. User visite ClickFunnels page
   ↓
2. User remplit formulaire (email, prénom, ville)
   ↓
3. ClickFunnels → Webhook Make.com
   {
     "email": "jean@gmail.com",
     "prenom": "Jean",
     "ville": "Québec"
   }
   ↓
4. Make.com - Module 1: Webhook reçoit données
   ↓
5. Make.com - Module 2: Set Variables
   - Génère UUID
   - Standardise format
   ↓
6. Make.com - Module 3: Supabase Insert User
   INSERT INTO users (id, email, prenom, ville, role, statut)
   VALUES (uuid, 'jean@gmail.com', 'Jean', 'Québec', 'consumer', 'actif')
   ↓
7. Make.com - Module 4: Supabase Insert Audit Log
   INSERT INTO logs_audit (user_id, action, ip_address)
   VALUES (uuid, 'user_registered', '192.168.1.1')
   ↓
8. Make.com - Module 5: Router (2 branches)
   ├─> Branch A: MailerSend
   └─> Branch B: Continue
   ↓
9. Make.com - Module 6: MailerSend Email Bienvenue
   Template français "Bienvenue sur RabaisLocal"
   ↓
10. Make.com - Module 7: Supabase Update User
    UPDATE users SET statut = 'actif' WHERE id = uuid
    ↓
11. Make.com - Module 8: Webhook Response
    {
      "success": true,
      "user_id": "uuid",
      "message": "Utilisateur créé avec succès"
    }
    ↓
12. ClickFunnels reçoit confirmation
    ↓
13. User reçoit email bienvenue
    ↓
✅ INSCRIPTION TERMINÉE
```

### Flux Création Offre (Module C + Module B + Module F)

```
┌──────────────────────────────────────────────────────────┐
│              FLUX CRÉATION OFFRE MERCHANT                │
└──────────────────────────────────────────────────────────┘

1. Merchant se connecte (/merchant/dashboard)
   → Supabase Auth vérifie JWT
   → Role = 'merchant' confirmé
   ↓
2. Merchant clique "Créer nouvelle offre"
   → Route /merchant/offres/creer
   ↓
3. Merchant remplit formulaire
   - Titre offre
   - Description courte
   - Pourcentage rabais
   - Date début/fin
   - Crédits requis (ex: 10 crédits)
   ↓
4. Frontend vérifie solde crédits (Module B)
   SELECT credits_disponibles FROM users WHERE id = merchant_id
   → Si crédits insuffisants → Redirection /merchant/credits
   ↓
5. Merchant clique "Générer avec IA" (optionnel)
   → Appel Edge Function /functions/v1/agent-merchant
   → OpenAI génère description longue + conseils
   → Résultat inséré dans formulaire
   ↓
6. Merchant clique "Publier offre"
   ↓
7. Frontend envoie API request
   POST /api/v1/offers
   {
     "merchant_id": "uuid",
     "titre": "20% rabais pizza",
     "description": "...",
     "rabais_pourcentage": 20,
     "credits_cost": 10
   }
   ↓
8. Backend vérifie & crée offre
   BEGIN TRANSACTION;

   -- Vérifier crédits (Module B)
   SELECT credits_disponibles FROM users WHERE id = merchant_id FOR UPDATE;

   -- Débiter crédits
   UPDATE users SET credits_disponibles = credits_disponibles - 10
   WHERE id = merchant_id;

   -- Créer offre (Module C)
   INSERT INTO offers (merchant_id, titre, description, rabais_pourcentage)
   VALUES (...);

   -- Logger transaction
   INSERT INTO credits_transactions (user_id, type, montant, offer_id)
   VALUES (merchant_id, 'debit_offer_creation', -10, offer_id);

   COMMIT;
   ↓
9. Offre publiée et visible sur /offres
   ↓
10. Email confirmation au merchant
    ↓
✅ OFFRE CRÉÉE
```

---

## 🔐 Sécurité & Authentification

### Flow Authentification JWT

```
┌──────────────────────────────────────────────────────────┐
│                 FLUX AUTHENTIFICATION                    │
└──────────────────────────────────────────────────────────┘

1. User entre email + password
   ↓
2. Frontend envoie POST /api/v1/auth/login
   {
     "email": "jean@gmail.com",
     "password": "motdepasse123"
   }
   ↓
3. Supabase Auth vérifie credentials
   ↓
4. Si valide → Génère JWT token
   {
     "access_token": "eyJhbGc...",
     "refresh_token": "eyJhbGc...",
     "expires_in": 3600,
     "user": {
       "id": "uuid",
       "email": "jean@gmail.com",
       "role": "consumer"
     }
   }
   ↓
5. Frontend stocke tokens
   localStorage.setItem('access_token', token)
   localStorage.setItem('user', JSON.stringify(user))
   ↓
6. Redirection selon rôle
   - consumer → /dashboard
   - merchant → /merchant/dashboard
   - affiliate → /affiliate/dashboard
   - admin → /admin/dashboard
   ↓
7. Chaque requête API inclut token
   Authorization: Bearer eyJhbGc...
   ↓
8. Backend vérifie token (middleware)
   - Vérifie signature
   - Vérifie expiration
   - Extrait user_id et role
   ↓
9. RLS Supabase filtre données
   - Consumer voit seulement ses données
   - Merchant voit seulement ses offres
   - Admin voit tout
   ↓
✅ AUTHENTIFICATION SÉCURISÉE
```

### Row Level Security (RLS)

**Exemple : Table `offers`**

```sql
-- Consumer peut voir offres actives
CREATE POLICY "Consumers can view active offers"
ON offers FOR SELECT
TO authenticated
USING (
  statut = 'active' AND
  date_debut <= NOW() AND
  date_fin >= NOW()
);

-- Merchant peut voir seulement ses offres
CREATE POLICY "Merchants can view own offers"
ON offers FOR SELECT
TO authenticated
USING (
  merchant_id = auth.uid() AND
  auth.jwt() ->> 'role' = 'merchant'
);

-- Merchant peut créer offres
CREATE POLICY "Merchants can create offers"
ON offers FOR INSERT
TO authenticated
WITH CHECK (
  merchant_id = auth.uid() AND
  auth.jwt() ->> 'role' = 'merchant'
);

-- Merchant peut modifier seulement ses offres
CREATE POLICY "Merchants can update own offers"
ON offers FOR UPDATE
TO authenticated
USING (merchant_id = auth.uid())
WITH CHECK (merchant_id = auth.uid());

-- Admin peut tout faire
CREATE POLICY "Admins can do everything"
ON offers FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');
```

---

## 📊 Monitoring & Observabilité

### Métriques Collectées

```
┌──────────────────────────────────────────────────────────┐
│                    MONITORING STACK                      │
└──────────────────────────────────────────────────────────┘

1. FRONTEND (Vercel Analytics)
   ├─> Core Web Vitals (LCP, FID, CLS)
   ├─> Page load times
   ├─> JavaScript errors
   └─> User analytics

2. BACKEND (Supabase Dashboard)
   ├─> Database query performance
   ├─> Active connections
   ├─> Storage usage
   └─> API response times

3. WORKFLOWS (Make.com)
   ├─> Execution success/failure rate
   ├─> Average execution time
   ├─> Error logs
   └─> Webhook delivery status

4. EMAILS (MailerSend)
   ├─> Delivery rate
   ├─> Open rate
   ├─> Click rate
   └─> Bounce/spam rate

5. IA (OpenAI Dashboard)
   ├─> API calls count
   ├─> Tokens consumed
   ├─> Costs
   └─> Rate limits
```

---

## 🚀 Déploiement & Scalabilité

### Architecture Déploiement

```
┌──────────────────────────────────────────────────────────┐
│              ARCHITECTURE DÉPLOIEMENT                    │
└──────────────────────────────────────────────────────────┘

FRONTEND (Vercel)
├─> Déployé sur CDN global (150+ edge locations)
├─> Auto-scaling illimité
├─> HTTPS automatique (Let's Encrypt)
└─> Regions: IAD1 (US East), FRA1 (Europe)

DATABASE (Supabase)
├─> PostgreSQL managed (AWS RDS)
├─> Région: eu-central-1 (Frankfurt)
├─> Auto-backups quotidiens
├─> Point-in-time recovery
└─> Connection pooling (max 100 connections)

EDGE FUNCTIONS (Supabase)
├─> Deno runtime
├─> Déployées globalement
├─> Auto-scaling
└─> Timeout: 60 secondes max

WORKFLOWS (Make.com)
├─> Cloud SaaS (EU servers)
├─> 99.9% uptime SLA
├─> Rate limiting: 1000 ops/minute
└─> Retries automatiques (3x)
```

### Scalabilité Prévue

**Phase 1 (0-10k users) - ACTUELLE**
- Frontend: Vercel gratuit/hobby
- Database: Supabase gratuit (500MB)
- Make.com: Plan gratuit (1000 ops/mois)

**Phase 2 (10k-100k users)**
- Frontend: Vercel Pro ($20/mois)
- Database: Supabase Pro ($25/mois, 8GB)
- Make.com: Plan Core ($9/mois, 10k ops/mois)

**Phase 3 (100k-1M users)**
- Frontend: Vercel Enterprise (custom)
- Database: Supabase Team ($599/mois, 100GB)
- Make.com: Plan Pro ($29/mois, 100k ops/mois)
- CDN: Cloudflare Enterprise
- Caching: Redis (Upstash)

---

## 📚 Stack Technologique Complet

### Frontend
- **Next.js 14** - React framework (App Router)
- **TypeScript 5** - Type safety
- **Tailwind CSS 3** - Styling
- **Zustand** - State management
- **TanStack Query** - Server state
- **React Hook Form** - Forms
- **Zod** - Validation

### Backend
- **Supabase** - PostgreSQL + Auth + Storage
- **Deno** - Edge Functions runtime
- **TypeScript** - Edge Functions language

### Automation
- **Make.com** - Workflow orchestration
- **ClickFunnels** - Landing pages
- **MailerSend** - Transactional emails

### Payments
- **Stripe** - Payment processing

### IA
- **OpenAI GPT-4o-mini** - Content generation

### DevOps
- **Vercel** - Hosting + CI/CD
- **GitHub Actions** - CI/CD pipelines
- **Git** - Version control

---

## 📞 Support Architecture

**Questions sur l'architecture ?**
- 📧 Email : dany@rabaislocal.com
- 📚 Documentation complète : `/docs`
- 🏗️ Diagrammes : Voir ce fichier

---

**Dernière mise à jour :** 9 novembre 2025
**Version :** 1.0.0

---

**Fait avec ❤️ pour l'économie locale québécoise**
*Architecture moderne, scalable et serverless*
