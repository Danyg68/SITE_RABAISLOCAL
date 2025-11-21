# 📁 STRUCTURE DU PROJET - RabaisLocal

## Vue d'Ensemble

Ce document détaille la **structure complète du projet RabaisLocal** après restructuration modulaire.

---

## 🗂️ Arborescence Complète

```
SITE_RABAISLOCAL/
│
├── 📦 modules/                          # MODULES MÉTIER
│   ├── module_a_users/                  # ✅ Module A - Users & Auth
│   │   ├── make/                        # Workflows Make.com
│   │   │   └── webhook_inscription_consommateur.json
│   │   ├── supabase/                    # Schémas SQL
│   │   │   └── 01_create_tables_users.sql
│   │   ├── tests/                       # Tests & Fixtures
│   │   │   └── exemple_payload_inscription_consommateur.json
│   │   ├── docs/                        # Documentation
│   │   │   ├── README_Module_A_Inscription_Consommateur.md
│   │   │   └── MODULE_A_GUIDE_RAPIDE.md
│   │   └── README.md                    # Index du module
│   │
│   ├── module_b_credits/                # 🔄 Module B - Crédits
│   │   ├── make/
│   │   ├── supabase/
│   │   ├── tests/
│   │   ├── docs/
│   │   └── README.md
│   │
│   ├── module_c_offers/                 # 🔄 Module C - Offres
│   │   ├── make/
│   │   ├── supabase/
│   │   ├── tests/
│   │   ├── docs/
│   │   └── README.md
│   │
│   ├── module_e_affiliates/             # 📋 Module E - Affiliation
│   │   ├── make/
│   │   ├── supabase/
│   │   ├── tests/
│   │   ├── docs/
│   │   └── README.md
│   │
│   ├── module_f_ia/                     # ✅ Module F - IA
│   │   ├── make/
│   │   ├── supabase/
│   │   │   ├── 02_create_tables_module_f_ia.sql
│   │   │   └── edge_function_agent_merchant.ts
│   │   ├── tests/
│   │   ├── docs/
│   │   │   └── PLAN_MODULE_F_IA.md
│   │   └── README.md
│   │
│   └── README.md                        # Index de tous les modules
│
├── 🏗️ infrastructure/                   # INFRASTRUCTURE PARTAGÉE
│   ├── database/
│   │   ├── migrations/                  # Migrations SQL globales
│   │   ├── schemas/                     # Schémas partagés
│   │   └── README.md
│   │
│   ├── make/
│   │   ├── shared_workflows/            # Workflows réutilisables
│   │   ├── templates/                   # Templates standardisés
│   │   └── README.md
│   │
│   ├── security/
│   │   ├── policies/                    # Politiques de sécurité
│   │   ├── certificates/                # Certificats SSL
│   │   └── README.md
│   │
│   ├── docker/                          # Dockerfiles (optionnel)
│   ├── nginx/                           # Config Nginx (optionnel)
│   ├── monitoring/                      # Monitoring & Alerting
│   └── README.md
│
├── 🚀 applications/                     # APPLICATIONS FRONTEND/API
│   ├── web/                             # Application web Next.js
│   │   ├── public/                      # Fichiers statiques
│   │   ├── src/
│   │   │   ├── app/                     # Pages (App Router)
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── globals.css
│   │   │   │   ├── inscription/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── connexion/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── dashboard/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── components/              # Composants React
│   │   │   │   ├── FormInscription.tsx
│   │   │   │   ├── FormConnexion.tsx
│   │   │   │   └── DashboardLayout.tsx
│   │   │   │
│   │   │   ├── services/                # Services API
│   │   │   │   └── authService.ts
│   │   │   │
│   │   │   ├── hooks/                   # Custom hooks
│   │   │   ├── contexts/                # React contexts
│   │   │   ├── utils/                   # Utilitaires
│   │   │   ├── types/                   # Types TypeScript
│   │   │   └── styles/                  # Styles
│   │   │
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.ts
│   │   ├── next.config.js
│   │   ├── .env.example
│   │   └── README.md
│   │
│   ├── mobile/                          # App mobile React Native (Phase C)
│   │   ├── src/
│   │   ├── android/
│   │   ├── ios/
│   │   └── README.md
│   │
│   ├── api/                             # Edge Functions & Webhooks
│   │   ├── functions/                   # Supabase Edge Functions
│   │   │   ├── agent-merchant/
│   │   │   ├── agent-consumer/
│   │   │   └── agent-affiliate/
│   │   └── README.md
│   │
│   └── README.md
│
├── 🔧 devops/                           # DEVOPS & CI/CD
│   ├── docker/
│   │   ├── web.Dockerfile
│   │   ├── api.Dockerfile
│   │   └── README.md
│   │
│   ├── kubernetes/                      # K8s configs (futur)
│   │   ├── deployments/
│   │   ├── services/
│   │   └── README.md
│   │
│   ├── ci_cd/
│   │   ├── github-actions/              # GitHub Actions workflows
│   │   ├── vercel/                      # Vercel config
│   │   └── README.md
│   │
│   ├── scripts/
│   │   ├── backup.sh                    # Backup database
│   │   ├── deploy.sh                    # Déploiement
│   │   ├── migrate.sh                   # Migrations
│   │   └── README.md
│   │
│   └── README.md
│
├── 🔗 shared/                           # CODE PARTAGÉ
│   ├── components/                      # Composants réutilisables
│   │   └── ui/                          # Composants UI de base
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       ├── Modal.tsx
│   │       └── ...
│   │
│   ├── utils/                           # Utilitaires partagés
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   └── helpers.ts
│   │
│   ├── constants/                       # Constantes globales
│   │   ├── roles.ts
│   │   ├── statuses.ts
│   │   └── config.ts
│   │
│   ├── types/                           # Types communs
│   │   ├── user.types.ts
│   │   ├── offer.types.ts
│   │   └── api.types.ts
│   │
│   └── README.md
│
├── 🧪 tests/                            # TESTS GLOBAUX
│   ├── integration/                     # Tests d'intégration
│   │   ├── auth.test.ts
│   │   ├── offers.test.ts
│   │   └── credits.test.ts
│   │
│   ├── e2e/                             # Tests end-to-end
│   │   ├── signup-flow.spec.ts
│   │   ├── login-flow.spec.ts
│   │   └── create-offer.spec.ts
│   │
│   ├── fixtures/                        # Données de test
│   │   ├── users.json
│   │   ├── offers.json
│   │   └── credits.json
│   │
│   └── README.md
│
├── 📚 docs/                             # DOCUMENTATION GLOBALE
│   ├── ARCHITECTURE.md                  # Architecture générale
│   ├── MODULE_DEPENDENCIES.md           # Matrice dépendances
│   ├── PROJECT_STRUCTURE.md             # Ce fichier
│   ├── DEPLOYMENT.md                    # Guide déploiement
│   ├── CONTRIBUTING.md                  # Guide contribution
│   └── README_Projet.md                 # Documentation projet
│
├── 🗃️ backend/                          # BACKEND API (Legacy - À migrer)
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── 🌐 frontend/                         # FRONTEND (Legacy - À migrer)
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── 📄 scripts/                          # SCRIPTS (Legacy - À migrer)
│   ├── make/
│   ├── supabase/
│   └── ai/
│
├── 🔐 .claude/                          # CONFIG CLAUDE CODE
│   ├── config.json
│   └── settings.local.json
│
├── 💻 .vscode/                          # CONFIG VSCODE
│   └── settings.json
│
├── 📋 .github/                          # GITHUB WORKFLOWS
│   └── workflows/
│       ├── test.yml
│       ├── deploy-preview.yml
│       └── deploy-production.yml
│
├── 📝 Fichiers Racine
│   ├── README.md                        # Documentation principale
│   ├── MIGRATION_RAPPORT.md             # Rapport restructuration
│   ├── MODULE_A_LIVRAISON_COMPLETE.md
│   ├── MODULE_F_IA_LIVRAISON_COMPLETE.md
│   ├── STRUCTURE_PROJET_COMPLETE.md
│   ├── claude_rules                     # Règles Claude Code
│   ├── .gitignore                       # Git ignore
│   └── Cahier_de_charge_RabaisLocal_V2_COMPLET.docx
│
└── 📁 pages/                            # PAGES EXTERNES (ClickFunnels)
    └── Nouveau Document Microsoft Word.docx
```

---

## 📦 Zone 1 : MODULES (Business Logic)

### Principe
Chaque module est **autonome** avec sa propre structure standard :

```
module_x_name/
├── make/                    # Workflows Make.com (JSON)
├── supabase/                # Schémas SQL + Edge Functions
├── tests/                   # Tests + Payloads exemples
├── docs/                    # Documentation détaillée
└── README.md                # Index du module
```

### Modules Disponibles

| Module | Statut | Description |
|--------|--------|-------------|
| **module_a_users** | ✅ Complet | Utilisateurs & Authentification |
| **module_b_credits** | 🔄 En cours | Système de crédits |
| **module_c_offers** | 🔄 En cours | Gestion des offres |
| **module_e_affiliates** | 📋 Planifié | Programme d'affiliation |
| **module_f_ia** | ✅ Complet | Intelligence artificielle (3 agents) |

### Pourquoi cette structure ?

✅ **Avantages :**
- Modules indépendants et réutilisables
- Tests isolés par module
- Documentation co-localisée
- Déploiement module par module
- Maintenance simplifiée

❌ **Éviter :**
- Code partagé entre modules (utiliser `/shared`)
- Dépendances circulaires
- Modifications cross-modules sans tests

---

## 🏗️ Zone 2 : INFRASTRUCTURE (Services Partagés)

### Principe
Tous les services **techniques** partagés par tous les modules.

### Composants Principaux

**database/** - Base de données globale
- Migrations SQL centralisées
- Schémas partagés
- Backups et restore

**make/** - Workflows partagés
- Templates réutilisables
- Workflows communs (emails, webhooks)
- Variables d'environnement

**security/** - Sécurité globale
- Politiques RLS Supabase
- Certificats SSL/TLS
- Configuration pare-feu

**monitoring/** - Monitoring & Alerting
- Configuration alertes (Slack, Email)
- Dashboards
- Logs centralisés

### Pourquoi cette structure ?

✅ **Avantages :**
- Évite duplication de code
- Configuration centralisée
- Maintenance simplifiée
- Standards partagés

---

## 🚀 Zone 3 : APPLICATIONS (User Interfaces)

### Principe
Interfaces utilisateur et API pour différents acteurs.

### Applications Disponibles

**web/** - Application web Next.js 14
```
Utilisateurs : Consumers, Merchants, Affiliates, Admins
Stack : Next.js 14 + TypeScript + Tailwind CSS
Déploiement : Vercel
```

**mobile/** - Application mobile (Phase C)
```
Plateformes : iOS + Android
Stack : React Native + TypeScript
Déploiement : App Store + Google Play
```

**api/** - Edge Functions & API
```
Runtime : Deno (Supabase Edge Functions)
Endpoints : /functions/v1/*
Déploiement : Supabase
```

### Pourquoi cette structure ?

✅ **Avantages :**
- Séparation claire frontend/backend
- Déploiement indépendant
- Scalabilité par application
- Code partagé via `/shared`

---

## 🔗 Zone 4 : SHARED (Code Partagé)

### Principe
Code **réutilisable** entre toutes les applications et modules.

### Composants

**components/** - Composants UI réutilisables
```tsx
Button, Card, Input, Modal, Toast, Spinner, Badge, Avatar, Table
```

**utils/** - Fonctions utilitaires
```ts
formatters.ts    - Formatage dates, prix, etc.
validators.ts    - Validation email, phone, etc.
helpers.ts       - Fonctions diverses
```

**constants/** - Constantes globales
```ts
roles.ts         - Rôles utilisateurs (consumer, merchant, affiliate, admin)
statuses.ts      - Statuts (actif, inactif, banni, etc.)
config.ts        - Configuration globale
```

**types/** - Types TypeScript communs
```ts
user.types.ts    - Types User, Role, Statut
offer.types.ts   - Types Offer, Category
api.types.ts     - Types API Response, Error
```

### Pourquoi cette structure ?

✅ **Avantages :**
- DRY (Don't Repeat Yourself)
- Cohérence entre applications
- Tests centralisés
- Maintenance unique

---

## 🧪 Zone 5 : TESTS (Tests Globaux)

### Principe
Tests **end-to-end** et d'**intégration** entre modules.

### Types de Tests

**integration/** - Tests d'intégration
```
Tests entre modules (ex: Module A + Module B)
```

**e2e/** - Tests end-to-end
```
Parcours utilisateur complets (Playwright)
```

**fixtures/** - Données de test
```
Données JSON pour tests automatisés
```

### Pourquoi cette structure ?

✅ **Avantages :**
- Tests unitaires dans chaque module
- Tests d'intégration centralisés
- Fixtures partagées
- CI/CD automatisé

---

## 🔧 Zone 6 : DEVOPS (CI/CD & Scripts)

### Principe
Outils pour **déploiement**, **monitoring** et **maintenance**.

### Composants

**docker/** - Dockerfiles (optionnel)
```
Actuellement non utilisé (architecture serverless)
Prêt pour migration future si besoin
```

**kubernetes/** - Configs K8s (futur)
```
Pour scalabilité > 1M users
```

**ci_cd/** - Pipelines CI/CD
```
GitHub Actions
Vercel auto-deploy
Tests automatisés
```

**scripts/** - Scripts d'automatisation
```bash
backup.sh     - Backup database quotidien
deploy.sh     - Déploiement production
migrate.sh    - Exécution migrations SQL
```

### Pourquoi cette structure ?

✅ **Avantages :**
- Déploiement automatisé
- Backups réguliers
- Scripts réutilisables
- Monitoring continu

---

## 📚 Zone 7 : DOCS (Documentation)

### Principe
Documentation **centralisée** pour tout le projet.

### Documents Disponibles

| Document | Description |
|----------|-------------|
| **ARCHITECTURE.md** | Architecture générale du système |
| **MODULE_DEPENDENCIES.md** | Matrice dépendances entre modules |
| **PROJECT_STRUCTURE.md** | Ce fichier - Structure complète |
| **DEPLOYMENT.md** | Guide déploiement production |
| **CONTRIBUTING.md** | Guide contribution développeurs |

### Pourquoi cette structure ?

✅ **Avantages :**
- Documentation centralisée
- Facile à trouver
- Versionnée avec Git
- Toujours à jour

---

## 🔀 Migration de l'Ancienne Structure

### Structure Avant (Legacy)

```
SITE_RABAISLOCAL/
├── backend/                 # Backend monolithique
├── frontend/                # Frontend monolithique
├── scripts/                 # Scripts éparpillés
│   ├── make/
│   ├── supabase/
│   └── ai/
└── docs/
```

### Structure Après (Modulaire)

```
SITE_RABAISLOCAL/
├── modules/                 # ✅ Modules isolés
├── infrastructure/          # ✅ Services partagés
├── applications/            # ✅ Apps séparées
├── shared/                  # ✅ Code partagé
├── tests/                   # ✅ Tests centralisés
├── devops/                  # ✅ CI/CD & Scripts
└── docs/                    # ✅ Documentation
```

### Fichiers Déplacés

**Module A (Users) :**
```
scripts/make/webhook_inscription_consommateur.json
→ modules/module_a_users/make/

scripts/supabase/01_create_tables_module_a.sql
→ modules/module_a_users/supabase/01_create_tables_users.sql

scripts/make/README_Module_A_Inscription_Consommateur.md
→ modules/module_a_users/docs/
```

**Module F (IA) :**
```
scripts/supabase/02_create_tables_module_f_ia.sql
→ modules/module_f_ia/supabase/

scripts/ai/edge_function_agent_merchant.ts
→ modules/module_f_ia/supabase/

docs/PLAN_MODULE_F_IA.md
→ modules/module_f_ia/docs/
```

---

## 📋 Conventions de Nommage

### Fichiers

**SQL :** `XX_module_Y_description.sql`
```
01_module_a_create_users.sql
02_module_f_create_ai_agents.sql
```

**TypeScript :** `camelCase.ts`
```
authService.ts
userHelpers.ts
offerValidators.ts
```

**React Components :** `PascalCase.tsx`
```
FormInscription.tsx
DashboardLayout.tsx
OfferCard.tsx
```

**Make.com Workflows :** `snake_case.json`
```
webhook_inscription_consommateur.json
webhook_achat_credits.json
```

### Dossiers

**Modules :** `module_x_name`
```
module_a_users
module_b_credits
module_c_offers
```

**Applications :** `lowercase`
```
web
mobile
api
```

**Infrastructure :** `lowercase`
```
database
security
monitoring
```

---

## 🎯 Règles de Développement

### Où Mettre Nouveau Code ?

**1. Nouvelle fonctionnalité métier**
```
→ Créer nouveau module dans /modules
```

**2. Nouveau composant UI réutilisable**
```
→ Ajouter dans /shared/components
```

**3. Nouvelle page frontend**
```
→ Ajouter dans /applications/web/src/app
```

**4. Nouvelle Edge Function**
```
→ Ajouter dans /applications/api/functions
```

**5. Nouveau script DevOps**
```
→ Ajouter dans /devops/scripts
```

**6. Nouvelle documentation**
```
→ Ajouter dans /docs
```

---

## 📞 Support

**Questions sur la structure ?**
- 📧 Email : dany@rabaislocal.com
- 📚 Documentation : `/docs`
- 🏗️ Architecture : [ARCHITECTURE.md](./ARCHITECTURE.md)

---

**Dernière mise à jour :** 9 novembre 2025
**Version :** 1.0.0

---

**Fait avec ❤️ pour l'économie locale québécoise**
*Structure modulaire pour scalabilité maximale*
