# 🌐 API GATEWAY - RabaisLocal

## Vue d'Ensemble

L'**API Gateway** est le point d'entrée unique pour toutes les requêtes API de RabaisLocal. Il gère l'authentification, le rate limiting, le versioning et le routing vers les modules appropriés.

---

## 📂 Structure

```
api_gateway/
├── routes/                      # Définition des routes par module
│   ├── v1/
│   │   ├── auth.routes.ts
│   │   ├── users.routes.ts
│   │   ├── offers.routes.ts
│   │   ├── credits.routes.ts
│   │   └── ai.routes.ts
│   └── v2/
│
├── middleware/                  # Middlewares partagés
│   ├── auth.middleware.ts       # ✅ Authentification JWT + RBAC
│   ├── rate_limit.middleware.ts # ✅ Rate limiting
│   ├── versioning.middleware.ts # ✅ Gestion versions API
│   ├── validation.middleware.ts
│   ├── error.middleware.ts
│   └── logger.middleware.ts
│
├── config/                      # Configuration
│   ├── api.config.ts
│   └── cors.config.ts
│
├── decorators/                  # Décorateurs pour routes
│   ├── auth.decorator.ts        # @RequireAuth(), @RequireRole()
│   └── validate.decorator.ts    # @ValidateBody(), @ValidateQuery()
│
└── README.md                    # Ce fichier
```

---

## 🔐 Middleware d'Authentification

### `auth.middleware.ts`

**Fonctions disponibles :**

#### 1. `authenticate` - Authentification JWT obligatoire

```typescript
import { authenticate } from '@/infrastructure/api_gateway/middleware/auth.middleware';

// Requiert un token JWT valide
router.get('/profile', authenticate, getProfileHandler);
```

#### 2. `authorize` - Autorisation par rôle

```typescript
import { authenticate, authorize } from '@/infrastructure/api_gateway/middleware/auth.middleware';

// Seulement pour merchants et admins
router.post('/offers',
  authenticate,
  authorize(['merchant', 'admin']),
  createOfferHandler
);
```

#### 3. `requirePermission` - Permission spécifique

```typescript
import { authenticate, requirePermission } from '@/infrastructure/api_gateway/middleware/auth.middleware';

// Requiert la permission 'offers:delete'
router.delete('/offers/:id',
  authenticate,
  requirePermission('offers:delete'),
  deleteOfferHandler
);
```

#### 4. `optionalAuthenticate` - Authentification optionnelle

```typescript
import { optionalAuthenticate } from '@/infrastructure/api_gateway/middleware/auth.middleware';

// Route publique mais contexte utilisateur si connecté
router.get('/offers',
  optionalAuthenticate,
  getOffersHandler
);
```

---

## ⏱️ Middleware de Rate Limiting

### `rate_limit.middleware.ts`

**Limiteurs disponibles :**

| Limiteur | Points | Durée | Usage |
|----------|--------|-------|-------|
| **global** | 100 requêtes | 1 minute | Routes publiques générales |
| **auth** | 5 tentatives | 5 minutes | Login/Register (anti-brute force) |
| **webhook** | 10 webhooks | 1 minute | Webhooks externes |
| **ai** | 20 requêtes | 1 heure | Appels IA (coûteux) |
| **creation** | 50 créations | 1 heure | Création offres/contenu |

**Utilisation :**

```typescript
import {
  globalRateLimit,
  authRateLimit,
  aiRateLimit
} from '@/infrastructure/api_gateway/middleware/rate_limit.middleware';

// Route de login (stricte)
router.post('/auth/login', authRateLimit, loginHandler);

// Route IA (limitée)
router.post('/ai/generate', authenticate, aiRateLimit, generateContentHandler);

// Route publique (limite globale)
router.get('/offers', globalRateLimit, getOffersHandler);
```

**Réponse en cas de dépassement :**

```json
{
  "success": false,
  "error": "Trop de requêtes. Veuillez réessayer plus tard.",
  "code": "RATE_LIMIT_EXCEEDED",
  "retryAfter": 45
}
```

**Headers retournés :**

```
Retry-After: 45
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 2025-11-09T20:30:00Z
```

---

## 🔢 Middleware de Versioning

### `versioning.middleware.ts`

**Versions supportées :** v1, v2, v3

**Méthodes de spécification :**

**1. Via l'URL :**
```
GET /api/v1/users
GET /api/v2/users
```

**2. Via le header :**
```
GET /api/users
Accept-Version: v2
```

**Utilisation :**

```typescript
import {
  extractApiVersion,
  requireVersion,
  deprecateVersion,
  versionRouter
} from '@/infrastructure/api_gateway/middleware/versioning.middleware';

// Extraire la version de toutes les requêtes
app.use(extractApiVersion);

// Route supportant seulement v1 et v2
router.get('/users',
  requireVersion(['v1', 'v2']),
  getUsersHandler
);

// Marquer v1 comme dépréciée
router.use('/api/v1',
  deprecateVersion('v1', '2026-01-01', 'https://docs.rabaislocal.com/api/migration-v2')
);

// Router vers différents handlers selon version
router.get('/offers',
  versionRouter({
    v1: getOffersV1Handler,
    v2: getOffersV2Handler
  })
);
```

**Réponse pour version dépréciée (v1) :**

```json
{
  "success": true,
  "data": [...],
  "_warning": {
    "message": "L'API v1 est dépréciée",
    "sunsetDate": "2026-01-01",
    "migrationGuide": "https://docs.rabaislocal.com/api/migration-v2"
  }
}
```

**Headers pour version dépréciée :**

```
Deprecation: true
Sunset: 2026-01-01
Link: <https://docs.rabaislocal.com/api/migration-v2>; rel="deprecation"
```

---

## 🎯 Exemple d'Utilisation Complète

### Route `/api/v1/offers`

```typescript
import express from 'express';
import {
  authenticate,
  authorize
} from '@/infrastructure/api_gateway/middleware/auth.middleware';
import { globalRateLimit } from '@/infrastructure/api_gateway/middleware/rate_limit.middleware';
import {
  extractApiVersion,
  requireVersion
} from '@/infrastructure/api_gateway/middleware/versioning.middleware';

const router = express.Router();

// Middleware global pour toutes les routes
router.use(extractApiVersion);
router.use(globalRateLimit);

// GET /api/v1/offers - Liste des offres (public)
router.get('/offers',
  requireVersion(['v1', 'v2']),
  getOffersHandler
);

// POST /api/v1/offers - Créer offre (merchants seulement)
router.post('/offers',
  authenticate,
  authorize(['merchant', 'admin']),
  requireVersion(['v1']),
  createOfferHandler
);

// PUT /api/v1/offers/:id - Modifier offre (propriétaire seulement)
router.put('/offers/:id',
  authenticate,
  authorize(['merchant', 'admin']),
  updateOfferHandler
);

// DELETE /api/v1/offers/:id - Supprimer offre (admin seulement)
router.delete('/offers/:id',
  authenticate,
  authorize(['admin']),
  deleteOfferHandler
);

export default router;
```

---

## 🔗 Intégration avec les Modules

### Module A (Users)

```typescript
// routes/v1/users.routes.ts
router.get('/users/:id', authenticate, getUserHandler);
router.put('/users/:id', authenticate, authorize(['admin']), updateUserHandler);
```

### Module B (Credits)

```typescript
// routes/v1/credits.routes.ts
router.get('/credits/balance', authenticate, getBalanceHandler);
router.post('/credits/purchase', authenticate, aiRateLimit, purchaseCreditsHandler);
```

### Module C (Offers)

```typescript
// routes/v1/offers.routes.ts
router.get('/offers', globalRateLimit, getOffersHandler);
router.post('/offers', authenticate, authorize(['merchant']), createOfferHandler);
```

### Module E (IA)

```typescript
// routes/v1/ai.routes.ts
router.post('/ai/generate', authenticate, aiRateLimit, generateContentHandler);
router.post('/ai/chat', authenticate, rateLimitByUser('ai'), chatHandler);
```

---

## 🛡️ Sécurité

### Headers de Sécurité Ajoutés

```typescript
// Ajoutés automatiquement par l'API Gateway
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});
```

### CORS Configuration

```typescript
// config/cors.config.ts
const corsOptions = {
  origin: [
    'https://rabaislocal.com',
    'https://app.rabaislocal.com',
    'http://localhost:3000' // Dev seulement
  ],
  credentials: true,
  optionsSuccessStatus: 200
};
```

---

## 📊 Monitoring

### Métriques Collectées

- Nombre de requêtes par endpoint
- Temps de réponse moyen
- Taux d'erreur (4xx, 5xx)
- Rate limit hits
- Authentification échecs/succès
- Utilisation par version d'API

### Logs

```typescript
// Chaque requête log:
{
  timestamp: '2025-11-09T20:00:00Z',
  method: 'POST',
  path: '/api/v1/offers',
  status: 201,
  duration: 145, // ms
  userId: 'uuid',
  userRole: 'merchant',
  apiVersion: 'v1',
  ip: '192.168.1.1'
}
```

---

## 🚀 Déploiement

### Environnements

**Development :**
```
http://localhost:3001/api/v1
```

**Staging :**
```
https://staging-api.rabaislocal.com/api/v1
```

**Production :**
```
https://api.rabaislocal.com/api/v1
```

---

## 📚 Documentation

- [Authentification & Autorisation](../../docs/SECURITY.md)
- [Architecture Générale](../../docs/ARCHITECTURE.md)
- [Guide Migration v1→v2](../../docs/api/MIGRATION_V2.md)

---

**Dernière mise à jour :** 9 novembre 2025
**Version :** 1.0.0

---

**Fait avec ❤️ pour l'économie locale québécoise**
*API Gateway centralisé pour sécurité et performance*
