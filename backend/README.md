# 🚀 RabaisLocal - Backend API

Backend Node.js/TypeScript pour la plateforme RabaisLocal.

---

## 📋 Stack Technique

- **Runtime:** Node.js 18+
- **Langage:** TypeScript 5+
- **Framework:** Express.js
- **Base de données:** Supabase (PostgreSQL)
- **Cache:** Redis
- **IA:** OpenAI GPT-4o-mini
- **Emails:** MailerSend
- **Paiements:** Payments.AI + PayPal
- **Affiliation:** GoAffPro

---

## 🏗️ Structure du Projet

```
backend/
├── src/
│   ├── api/              # Routes & Contrôleurs
│   ├── config/           # Configuration (DB, Redis, etc.)
│   ├── services/         # Logique métier
│   ├── models/           # Modèles de données
│   ├── middleware/       # Middleware Express
│   ├── utils/            # Utilitaires
│   ├── validators/       # Validation schemas (Zod)
│   ├── types/            # Types TypeScript
│   └── index.ts          # Point d'entrée
├── logs/                 # Fichiers logs
├── uploads/              # Fichiers uploadés
├── temp/                 # Fichiers temporaires
└── tests/                # Tests unitaires & intégration
```

---

## 🚦 Installation

### Prérequis

- Node.js >= 18.0.0
- npm >= 9.0.0
- Redis (optionnel pour cache)
- Compte Supabase configuré

### Étapes

```bash
# 1. Installer les dépendances
npm install

# 2. Copier le fichier d'environnement
cp .env.example .env

# 3. Configurer les variables d'environnement
# Éditez .env et remplissez vos clés API

# 4. Lancer en mode développement
npm run dev

# 5. Build pour production
npm run build

# 6. Lancer en production
npm start
```

---

## 🔧 Scripts Disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Lance le serveur en mode développement avec hot-reload |
| `npm run build` | Compile le TypeScript vers JavaScript |
| `npm start` | Lance le serveur en mode production |
| `npm test` | Lance les tests avec coverage |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run lint:fix` | Corrige automatiquement les erreurs ESLint |
| `npm run format` | Formate le code avec Prettier |
| `npm run typecheck` | Vérifie les types TypeScript |

---

## 🌐 API Endpoints

### Health Check
```http
GET /health
```

### API v1
```http
GET /api/v1/...
```

Documentation complète disponible à `/api/docs` (Swagger).

---

## 🔐 Authentification

Le backend utilise JWT (JSON Web Tokens) pour l'authentification.

**Headers requis:**
```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🗄️ Base de Données

### Connexion Supabase

Configurez les variables d'environnement:
```env
SUPABASE_URL=https://VOTRE_PROJET.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### Migrations

Les migrations SQL sont dans `/scripts/supabase/`.

Exécutez-les directement dans Supabase SQL Editor.

---

## 🤖 Intelligence Artificielle

### Configuration OpenAI

```env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
```

### Agents Disponibles

1. **Agent Commerçant** - Génération promotions
2. **Agent Consommateur** - Recommandations
3. **Agent Affilié** - Coaching

---

## 📧 Emails

### Configuration MailerSend

```env
MAILERSEND_API_KEY=mlsn....
MAILERSEND_FROM_EMAIL=bienvenue@rabaislocal.com
```

Templates configurés dans MailerSend Dashboard.

---

## 💳 Paiements

### Payments.AI

```env
PAYMENTS_AI_API_KEY=...
PAYMENTS_AI_WEBHOOK_SECRET=whsec_...
```

### PayPal

```env
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_MODE=sandbox
```

---

## 🧪 Tests

```bash
# Tous les tests
npm test

# Tests avec watch
npm run test:watch

# Coverage
npm test -- --coverage
```

---

## 📊 Monitoring & Logs

### Logs

Les logs sont stockés dans `./logs/app.log`.

Niveaux disponibles: `error`, `warn`, `info`, `debug`.

### Sentry (Monitoring)

```env
SENTRY_DSN=https://...@sentry.io/...
```

---

## 🔒 Sécurité

- ✅ Helmet.js (Headers HTTP sécurisés)
- ✅ CORS configuré
- ✅ Rate Limiting
- ✅ Validation des inputs (Zod)
- ✅ JWT tokens
- ✅ Bcrypt pour passwords
- ✅ Variables d'environnement sécurisées

---

## 🚀 Déploiement

### Vercel

```bash
vercel --prod
```

### Docker

```bash
docker build -t rabaislocal-backend .
docker run -p 3001:3001 rabaislocal-backend
```

---

## 📞 Support

- Email: dany@rabaislocal.com
- Documentation: `/api/docs`

---

## 📄 Licence

Propriétaire - RabaisLocal © 2025

**Fait avec ❤️ pour l'économie locale québécoise**
