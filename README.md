# 🚀 RabaisLocal - Plateforme de Rabais Locaux Québécoise

**Version 2.0.0** - Plateforme intelligente propulsée par l'IA

---

## 📋 Description

RabaisLocal est une plateforme innovante qui connecte **consommateurs**, **commerçants** et **affiliés** dans un écosystème gagnant-gagnant pour stimuler l'économie locale au Québec.

### Mission
Offrir aux commerçants une visibilité **sans commission**, aux consommateurs des **rabais exclusifs**, et aux affiliés un **revenu passif automatisé**.

### Vision
Devenir LA référence québécoise des plateformes de rabais locaux avec un impact communautaire positif (3% des revenus reversés à des causes locales).

---

## 🛠️ Stack Technique Globale

### Backend
- **Runtime:** Node.js 18+ / TypeScript 5+
- **Framework:** Express.js
- **Base de données:** Supabase (PostgreSQL)
- **Cache:** Redis
- **IA:** OpenAI GPT-4o-mini

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **State:** Zustand + TanStack Query
- **Auth:** Supabase Auth

### Infrastructure
- **Automatisation:** Make.com
- **Emails:** MailerSend
- **Paiements:** Payments.AI + PayPal
- **Affiliation:** GoAffPro
- **Hosting:** Vercel + Supabase Cloud (Canada)

---

## 📁 Structure du Monorepo

```
SITE_RABAISLOCAL/
├── backend/              # API Node.js/Express
│   ├── src/             # Code source TypeScript
│   ├── logs/            # Fichiers logs
│   └── README.md
│
├── frontend/            # Application Next.js 14
│   ├── src/            # Code source React/TypeScript
│   ├── public/         # Assets statiques
│   └── README.md
│
├── mobile/             # Application mobile (Phase C)
│   └── src/
│
├── scripts/            # Scripts d'automatisation
│   ├── make/          # Blueprints Make.com
│   ├── supabase/      # Migrations SQL
│   ├── api/           # Intégrations API
│   └── ai/            # Scripts IA (Edge Functions)
│
├── docs/              # Documentation
│   ├── PLAN_MODULE_F_IA.md
│   └── README_Projet.md
│
├── tests/             # Tests end-to-end
│
├── shared/            # Code partagé (types, utils)
│   ├── types/
│   ├── utils/
│   └── constants/
│
├── infrastructure/    # Configuration infrastructure
│   ├── docker/
│   ├── nginx/
│   └── monitoring/
│
├── .claude/           # Configuration Claude Code
├── MODULE_A_LIVRAISON_COMPLETE.md
├── MODULE_F_IA_LIVRAISON_COMPLETE.md
└── README.md          # Ce fichier
```

---

## 🚦 Installation Rapide

### Prérequis

- Node.js >= 18.0.0
- npm >= 9.0.0
- Compte Supabase
- Clés API (OpenAI, MailerSend, etc.)

### Installation Globale

```bash
# 1. Cloner le dépôt
git clone https://github.com/Danyg68/SITE_RABAISLOCAL.git
cd SITE_RABAISLOCAL

# 2. Installer Backend
cd backend
npm install
cp .env.example .env
# Éditez .env avec vos clés
npm run dev

# 3. Installer Frontend (nouveau terminal)
cd ../frontend
npm install
cp .env.example .env.local
# Éditez .env.local avec vos clés
npm run dev
```

**URLs:**
- Backend API: http://localhost:3001
- Frontend App: http://localhost:3000

---

## 📚 Modules Développés

### ✅ Module A - Utilisateurs & Authentification
**Statut:** Terminé et prêt à déployer

**Fonctionnalités:**
- Inscription consommateur automatisée (ClickFunnels → Make → Supabase)
- Email de bienvenue via MailerSend
- Logs d'audit complets (Loi 25)
- Gestion quotas et crédits gratuits

**Fichiers:**
- `scripts/make/webhook_inscription_consommateur.json`
- `scripts/supabase/01_create_tables_module_a.sql`
- `MODULE_A_LIVRAISON_COMPLETE.md`

---

### 🔄 Module F - Intelligence Artificielle (3 Agents)
**Statut:** Planifié et prêt pour développement (Phase B)

**Les 3 Agents:**
1. **Agent Commerçant** - Génération promotions IA
2. **Agent Consommateur** - Recommandations personnalisées
3. **Agent Affilié** - Coaching et scripts de vente

**Fichiers:**
- `docs/PLAN_MODULE_F_IA.md`
- `scripts/supabase/02_create_tables_module_f_ia.sql`
- `scripts/ai/edge_function_agent_merchant.ts`
- `MODULE_F_IA_LIVRAISON_COMPLETE.md`

---

## 💰 Modèle Économique

### Consommateurs
- **Bronze:** 9,95 $/mois (10 crédits/mois)
- **Silver:** 14,95 $/mois (20 crédits/mois + IA)
- **Gold:** 24,95 $/mois (50 crédits/mois + IA illimitée)

### Commerçants
- **Gratuit:** 2 promos/mois
- **Bronze:** 147 $/3 mois (50 promos/mois)
- **Silver:** 247 $/3 mois (85 promos/mois)
- **Gold:** 397 $/3 mois (illimité)

### Affiliés
- **Trousse promo:** 47 $ (premiers 1000)
- **Trousse normale:** 77 $
- **Renouvellement:** 47 $/an
- **Frais mensuels:** 27 $/mois (sur commissions)

---

## 📅 Calendrier de Développement

| Phase | Dates | Objectifs | Statut |
|-------|-------|-----------|--------|
| **Phase A - MVP** | Nov 2025 - Jan 2026 | 3 tunnels d'inscription + Base Supabase | 🟡 En cours |
| **Phase B - BETA** | Fév 2026 - Mai 2026 | IA + Paiements + Retool Admin | ⏳ Planifié |
| **Phase C - Launch** | Juin 2026 - Mars 2026 | App mobile + API publique + SEO | ⏳ Futur |

---

## 🎯 KPIs Cibles 2026

- 👥 **50,000** inscriptions consommateurs
- 🏪 **5,000** commerçants actifs
- 🤝 **2,500** affiliés actifs
- 🤖 **60%** offres générées par IA
- ⭐ **NPS Score:** 8/10
- ⏱️ **Uptime:** 99.5%

---

## 🚀 Scripts Disponibles

### Backend
```bash
cd backend
npm run dev         # Développement
npm run build       # Build production
npm start           # Lancer production
npm test            # Tests
npm run lint        # Vérification code
```

### Frontend
```bash
cd frontend
npm run dev         # Développement
npm run build       # Build production
npm start           # Lancer production
npm test            # Tests
npm run lint        # Vérification code
```

---

## 🔐 Sécurité & Conformité

✅ **Loi 25 (Québec)**
- Données stockées au Canada
- Consentements tracés
- Anonymisation après 24 mois
- Export données utilisateur

✅ **RGPD (optionnel)**
- Compatible si expansion internationale

✅ **Sécurité**
- HTTPS/TLS 1.2+
- Row Level Security (RLS) Supabase
- JWT + Bcrypt
- Rate Limiting
- Validation inputs (Zod)

---

## 📖 Documentation

### Guides Développement
- [Backend README](backend/README.md)
- [Frontend README](frontend/README.md)

### Modules
- [Module A - Inscription Consommateur](MODULE_A_LIVRAISON_COMPLETE.md)
- [Module F - Intelligence Artificielle](MODULE_F_IA_LIVRAISON_COMPLETE.md)

### Plans Techniques
- [Plan Module IA](docs/PLAN_MODULE_F_IA.md)
- [README Projet](docs/README_Projet.md)

---

## 🧪 Tests

```bash
# Tests backend
cd backend && npm test

# Tests frontend
cd frontend && npm test

# Tests end-to-end
cd tests && npm test
```

---

## 🚀 Déploiement

### Backend (Vercel Functions)
```bash
cd backend
vercel --prod
```

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

### Base de Données (Supabase)
1. Créer projet Supabase (region Canada)
2. Exécuter migrations SQL
3. Configurer RLS policies
4. Générer et sauvegarder clés API

---

## 👥 Équipe

- **Dany Gosselin** - Fondateur / CEO
  - Email: dany@rabaislocal.com
  - Rôle: Visionnaire, Stratégie, Affiliation 2.0

- **Amélie (15%)** - Associée
  - Rôle: Marketing / Recrutement (progression)

- **Roxanne (15%)** - Associée
  - Rôle: Adjointe / Opérations (progression)

---

## 🤝 Contribution

Ce projet est propriétaire. Pour contribuer, contactez dany@rabaislocal.com.

---

## 📞 Support

- 📧 Email: dany@rabaislocal.com
- 🌐 Website: https://rabaislocal.com
- 📍 Localisation: Trois-Rivières, Québec, Canada

---

## 📄 Licence

**Propriétaire** - RabaisLocal © 2025

Tous droits réservés. Ce code est la propriété exclusive de RabaisLocal.

---

## 🎉 Remerciements

Merci à tous les acteurs de l'économie locale québécoise qui font vivre nos communautés!

---

**Fait avec ❤️ pour l'économie locale québécoise**

*Propulsé par Make, Supabase, OpenAI & Next.js*
