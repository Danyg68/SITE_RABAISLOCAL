# 🚀 APPLICATIONS - RabaisLocal

## Vue d'Ensemble

Cette section contient toutes les applications front-end et back-end de RabaisLocal. Chaque application est **indépendante** mais partage du code via `/shared`.

---

## 📂 Structure

```
applications/
├── web/                         # Application web (Next.js 14)
│   ├── public/                  # Fichiers statiques
│   ├── components/              # Composants React
│   ├── pages/                   # Pages (App Router)
│   ├── styles/                  # Styles CSS/Tailwind
│   └── README.md
│
├── mobile/                      # Application mobile (React Native)
│   ├── src/                     # Code source
│   ├── android/                 # Build Android
│   ├── ios/                     # Build iOS
│   └── README.md
│
├── api/                         # API & Edge Functions
│   ├── functions/               # Supabase Edge Functions
│   ├── webhooks/                # Webhooks externes
│   └── README.md
│
└── README.md                    # Ce fichier
```

---

## 🌐 Application Web

### Technologies
- **Framework :** Next.js 14 (App Router)
- **Language :** TypeScript 5+
- **Styling :** Tailwind CSS 3.3
- **State :** Zustand + TanStack Query
- **Forms :** React Hook Form + Zod
- **Auth :** Supabase Auth
- **Déploiement :** Vercel

### Pages Principales

**Pages Publiques :**
- `/` - Page d'accueil
- `/offres` - Liste des offres disponibles
- `/offres/[id]` - Détail d'une offre
- `/inscription` - Inscription (consommateurs/commerçants/affiliés)
- `/connexion` - Connexion
- `/a-propos` - À propos de RabaisLocal
- `/contact` - Formulaire de contact

**Pages Privées (Consommateurs) :**
- `/dashboard` - Tableau de bord
- `/profil` - Profil utilisateur
- `/favoris` - Offres favorites
- `/historique` - Historique d'utilisation

**Pages Privées (Commerçants) :**
- `/merchant/dashboard` - Tableau de bord commerçant
- `/merchant/offres` - Gestion des offres
- `/merchant/offres/creer` - Créer nouvelle offre
- `/merchant/statistiques` - Statistiques et analytics
- `/merchant/credits` - Gestion crédits

**Pages Privées (Affiliés) :**
- `/affiliate/dashboard` - Tableau de bord affilié
- `/affiliate/liens` - Liens de parrainage
- `/affiliate/commissions` - Commissions gagnées
- `/affiliate/paiements` - Historique paiements

**Pages Admin :**
- `/admin/dashboard` - Vue d'ensemble
- `/admin/users` - Gestion utilisateurs
- `/admin/offres` - Modération offres
- `/admin/credits` - Gestion crédits
- `/admin/stats` - Statistiques globales

### Composants Réutilisables

**UI Components (`/shared/components/ui/`) :**
- `Button` - Bouton avec variants
- `Card` - Carte de contenu
- `Input` - Champ de saisie
- `Select` - Menu déroulant
- `Modal` - Fenêtre modale
- `Toast` - Notifications
- `Spinner` - Indicateur de chargement
- `Badge` - Badge de statut
- `Avatar` - Avatar utilisateur
- `Table` - Tableau de données

**Feature Components (`/applications/web/components/`) :**
- `OfferCard` - Carte d'offre
- `FormInscription` - Formulaire inscription
- `FormConnexion` - Formulaire connexion
- `DashboardLayout` - Layout dashboard
- `Header` - En-tête site
- `Footer` - Pied de page
- `SearchBar` - Barre de recherche
- `FilterPanel` - Panneau de filtres

### Thème & Design System

**Couleurs RabaisLocal :**
```css
--color-primary: #3E53A5 (Bleu royal)
--color-secondary: #764ba2 (Violet)
--color-background: #F5F8FF (Bleu très clair)
--color-text: #1F2937 (Gris foncé)
--color-success: #10B981 (Vert)
--color-warning: #F59E0B (Orange)
--color-error: #EF4444 (Rouge)
```

**Typographie :**
```css
--font-family: 'Poppins', sans-serif
--font-size-sm: 0.875rem (14px)
--font-size-base: 1rem (16px)
--font-size-lg: 1.125rem (18px)
--font-size-xl: 1.25rem (20px)
--font-size-2xl: 1.5rem (24px)
--font-size-3xl: 1.875rem (30px)
```

**Espacement :**
```css
Tailwind CSS standard (4px increments)
space-1 = 4px
space-2 = 8px
space-4 = 16px
space-8 = 32px
```

### URLs de l'Application Web

**Développement :**
- Local : `http://localhost:3000`
- Preview : `https://rabaislocal-git-preview.vercel.app`

**Production :**
- Site public : `https://rabaislocal.com`
- App consommateurs : `https://app.rabaislocal.com`
- App commerçants : `https://merchant.rabaislocal.com`
- App affiliés : `https://affiliate.rabaislocal.com`
- Admin : `https://admin.rabaislocal.com`

---

## 📱 Application Mobile

### Technologies
- **Framework :** React Native 0.73+
- **Language :** TypeScript 5+
- **Navigation :** React Navigation 6
- **State :** Zustand + TanStack Query
- **Auth :** Supabase Auth
- **Déploiement :** App Store + Google Play

### Statut : Phase C (Futur)

L'application mobile sera développée dans la **Phase C** du projet, après la stabilisation de l'application web.

**Fonctionnalités Prévues :**
- 📍 Géolocalisation pour offres à proximité
- 🔔 Notifications push pour nouvelles offres
- 📷 Scan QR code pour activer offres
- 💳 Wallet numérique pour gérer crédits
- 🎯 Recommandations IA personnalisées

**Plateformes :**
- iOS 14+ (iPhone/iPad)
- Android 10+ (smartphones/tablettes)

---

## ⚡ API & Edge Functions

### Supabase Edge Functions

**Edge Functions Déployées :**

**1. `agent-merchant` (Module F)**
```typescript
// Génère contenu IA pour offres commerçants
POST /functions/v1/agent-merchant
Body: { merchant_id, offer_data, request_type }
Response: { generated_content, usage }
```

**2. `agent-consumer` (Module F - Futur)**
```typescript
// Recommandations IA pour consommateurs
POST /functions/v1/agent-consumer
Body: { user_id, preferences, location }
Response: { recommended_offers }
```

**3. `agent-affiliate` (Module F - Futur)**
```typescript
// Conseils IA pour affiliés
POST /functions/v1/agent-affiliate
Body: { affiliate_id, stats }
Response: { tips, strategies }
```

**4. `process-payment` (Module B - Futur)**
```typescript
// Traitement achats crédits
POST /functions/v1/process-payment
Body: { user_id, package_id, payment_method }
Response: { transaction_id, credits_added }
```

### Webhooks Externes

**Webhooks Reçus :**
- ClickFunnels → Inscription utilisateur
- Stripe → Paiement confirmé
- GoAffPro → Commission gagnée
- MailerSend → Email bounce/spam

**Webhooks Envoyés :**
- Slack → Alertes admin
- Zapier → Intégrations tierces
- Google Analytics → Events tracking

---

## 🔗 Intégrations

### Services Externes Intégrés

**Authentification :**
- Supabase Auth (email/password)
- Google OAuth (futur)
- Facebook OAuth (futur)

**Paiements :**
- Stripe (achats crédits)
- PayPal (alternatif - futur)

**Marketing :**
- MailerSend (emails transactionnels)
- Mailchimp (newsletters - futur)
- Google Analytics (tracking)
- Meta Pixel (Facebook Ads)

**Affiliation :**
- GoAffPro (gestion affiliés)

**IA :**
- OpenAI GPT-4o-mini (génération contenu)

**Maps :**
- Google Maps API (géolocalisation - futur)
- Mapbox (alternative - futur)

---

## 📊 Analytics & Tracking

### Événements Trackés

**Événements Publics :**
- `page_view` - Vue de page
- `offer_view` - Vue d'offre
- `search` - Recherche
- `filter_apply` - Application filtre
- `signup_start` - Début inscription
- `signup_complete` - Inscription complétée
- `login` - Connexion

**Événements Consommateurs :**
- `offer_favorite` - Ajout aux favoris
- `offer_share` - Partage offre
- `offer_activate` - Activation offre

**Événements Commerçants :**
- `offer_create` - Création offre
- `offer_publish` - Publication offre
- `credits_purchase` - Achat crédits

**Événements Affiliés :**
- `link_generate` - Génération lien
- `commission_earned` - Commission gagnée

---

## 🧪 Tests

### Types de Tests

**Tests Unitaires (Jest) :**
- Composants React
- Hooks custom
- Utilitaires
- Services API

**Tests d'Intégration (React Testing Library) :**
- Flux d'inscription
- Flux de connexion
- Création d'offre
- Achat de crédits

**Tests End-to-End (Playwright) :**
- Parcours utilisateur complet
- Tests cross-browser
- Tests responsive mobile

**Tests de Performance :**
- Lighthouse CI
- Core Web Vitals
- Bundle size analysis

---

## 🚀 Déploiement

### Pipeline CI/CD

**1. Développement**
```bash
git push origin develop
→ Vercel auto-deploy preview
→ Tests automatiques
→ Preview URL générée
```

**2. Staging**
```bash
git push origin staging
→ Deploy staging environment
→ Tests end-to-end complets
→ Review QA
```

**3. Production**
```bash
git push origin main
→ Deploy production
→ Smoke tests
→ Monitoring activé
```

---

## 📚 Documentation

- [Application Web - README](./web/README.md)
- [Application Mobile - README](./mobile/README.md) (Phase C)
- [API & Edge Functions - README](./api/README.md)
- [Guide de Contribution](../docs/CONTRIBUTING.md)

---

## 📞 Support Applications

**Questions sur les applications ?**
- 📧 Email : dany@rabaislocal.com
- 📚 Documentation : `/docs`
- 🐛 Bugs : GitHub Issues

---

**Dernière mise à jour :** 9 novembre 2025
**Version :** 1.0.0

---

**Fait avec ❤️ pour l'économie locale québécoise**
*Applications modernes pour consommateurs, commerçants et affiliés*
