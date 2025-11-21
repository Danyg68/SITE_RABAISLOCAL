# 🏗️ INFRASTRUCTURE - RabaisLocal

## Vue d'Ensemble

Cette section contient toute l'infrastructure partagée utilisée par tous les modules et applications RabaisLocal. L'infrastructure est **centralisée et mutualisée** pour optimiser les coûts et la maintenance.

---

## 📂 Structure

```
infrastructure/
├── database/                    # Configuration base de données
│   ├── migrations/              # Migrations SQL globales
│   ├── schemas/                 # Schémas partagés
│   └── README.md
│
├── make/                        # Workflows Make.com partagés
│   ├── shared_workflows/        # Workflows réutilisables
│   ├── templates/               # Templates de workflows
│   └── README.md
│
├── security/                    # Configuration sécurité
│   ├── policies/                # Politiques de sécurité
│   ├── certificates/            # Certificats SSL/TLS
│   └── README.md
│
├── docker/                      # Dockerfiles (si besoin)
│   └── README.md
│
├── nginx/                       # Configuration Nginx
│   └── README.md
│
└── monitoring/                  # Monitoring & Logs
    └── README.md
```

---

## 🗄️ Database

### Supabase PostgreSQL

**URL Production :** `https://xxx.supabase.co`
**Région :** Europe West (eu-central-1)

**Tables Globales :**
- `users` (Module A)
- `logs_audit` (Module A)
- `legal_consents` (Module A)
- `credits_packages` (Module B)
- `credits_transactions` (Module B)
- `offers` (Module C)
- `ai_agents` (Module F)
- ... voir chaque module pour détails

**Migrations :**
- Les migrations sont organisées par module
- Format : `XX_module_Y_description.sql`
- Exemple : `01_module_a_create_users.sql`

---

## 🔄 Make.com - Workflows Partagés

### Templates Réutilisables

**1. Template Email Transactionnel**
```
Workflow partagé pour tous les emails :
- Variables standardisées
- Gestion erreurs uniforme
- Logging systématique
```

**2. Template Webhook Standard**
```
Workflow partagé pour tous les webhooks :
- Validation payload
- Authentification
- Rate limiting
- Response standardisée
```

**3. Template Supabase CRUD**
```
Workflow partagé pour opérations DB :
- Insert avec retry
- Update avec validation
- Delete avec soft-delete
- Audit logging automatique
```

---

## 🔐 Security

### Politiques de Sécurité

**Row Level Security (RLS) :**
- Activé sur TOUTES les tables Supabase
- Politiques par rôle (consumer, merchant, affiliate, admin)
- Isolation complète des données utilisateur

**API Keys :**
- Stockées dans variables d'environnement
- Rotation tous les 90 jours
- Différentes clés dev/staging/production

**HTTPS/SSL :**
- Certificats Let's Encrypt
- Renouvellement automatique
- HSTS activé

**Rate Limiting :**
- 100 requêtes/minute par IP (API)
- 10 requêtes/minute par IP (webhooks)
- Blocage automatique après 5 échecs

---

## 🐳 Docker (Optionnel)

Pour l'instant, RabaisLocal n'utilise pas Docker car tout est serverless :
- Frontend : Vercel
- Backend : Supabase Edge Functions
- Workflows : Make.com

Docker pourrait être utilisé plus tard pour :
- Tests end-to-end locaux
- Environnement de développement standardisé
- Microservices custom si besoin

---

## 🌐 Nginx (Optionnel)

Nginx n'est pas utilisé actuellement car :
- Frontend servi par Vercel CDN
- API gérée par Supabase
- Pas de serveur custom à gérer

Nginx pourrait être utilisé plus tard pour :
- Reverse proxy si API custom
- Load balancing si forte charge
- Cache statique si besoin

---

## 📊 Monitoring

### Services de Monitoring

**Supabase Dashboard :**
- Métriques base de données en temps réel
- Logs SQL
- Performance queries

**Make.com Monitoring :**
- Exécutions workflows
- Taux de succès/échec
- Temps d'exécution moyen

**Vercel Analytics :**
- Trafic frontend
- Core Web Vitals
- Erreurs JavaScript

**MailerSend Dashboard :**
- Taux de délivrabilité emails
- Ouvertures/clics
- Bounces/spam

### Alertes Configurées

**Alertes Critiques (Slack/Email) :**
- ❌ Base de données down
- ❌ Workflow Make.com échoue 5x
- ❌ Certificat SSL expire dans 7 jours
- ❌ Taux d'erreur > 5%

**Alertes Warning (Email seulement) :**
- ⚠️ Latence DB > 500ms
- ⚠️ Utilisation CPU > 80%
- ⚠️ Stockage > 90%
- ⚠️ Taux de bounce emails > 2%

---

## 🔧 Configuration Variables

### Variables d'Environnement Partagées

**Supabase :**
```env
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

**Make.com :**
```env
MAKE_TEAM_ID=xxx
MAKE_API_TOKEN=xxx
```

**MailerSend :**
```env
MAILERSEND_API_KEY=mlsn...
MAILERSEND_DOMAIN=rabaislocal.com
```

**OpenAI (Module F) :**
```env
OPENAI_API_KEY=sk-...
OPENAI_ORG_ID=org-...
```

**GoAffPro (Module E) :**
```env
GOAFFPRO_API_KEY=xxx
GOAFFPRO_PROGRAM_ID=xxx
```

---

## 📚 Documentation

- [Configuration Base de Données](./database/README.md)
- [Workflows Make.com Partagés](./make/README.md)
- [Politiques de Sécurité](./security/README.md)
- [Architecture Générale](../docs/ARCHITECTURE.md)

---

## 🚀 Déploiement

### Environnements

**1. Development (Local)**
- Frontend : `http://localhost:3000`
- Backend : `http://localhost:3001`
- Supabase : Projet de test

**2. Staging (Pre-production)**
- Frontend : `https://staging.rabaislocal.com`
- API : `https://staging-api.rabaislocal.com`
- Supabase : Projet staging

**3. Production**
- Frontend : `https://rabaislocal.com`
- App : `https://app.rabaislocal.com`
- API : `https://api.rabaislocal.com`
- Supabase : Projet production

---

## 🔄 Backups

### Stratégie de Backup

**Supabase (Automatique) :**
- Backup complet quotidien (3h du matin)
- Rétention 30 jours
- Point-in-time recovery 7 jours

**Make.com (Manuel) :**
- Export JSON workflows chaque semaine
- Stockage dans Git
- Versioning sémantique

**Configuration (Git) :**
- Tous les fichiers de config dans Git
- Branches : main, staging, development
- Tags pour chaque déploiement production

---

## 📞 Support Infrastructure

**Problèmes infrastructure ?**
- 📧 Email : dany@rabaislocal.com
- 🔧 Status page : https://status.rabaislocal.com (futur)
- 📚 Documentation : `/docs`

---

**Dernière mise à jour :** 9 novembre 2025
**Version :** 1.0.0

---

**Fait avec ❤️ pour l'économie locale québécoise**
*Infrastructure serverless pour scalabilité maximale*
