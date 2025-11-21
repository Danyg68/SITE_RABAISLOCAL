# 🔧 DEVOPS - RabaisLocal

## Vue d'Ensemble

Cette section contient tous les outils et configurations DevOps pour le déploiement, monitoring et maintenance de RabaisLocal.

---

## 📂 Structure

```
devops/
├── docker/                      # Dockerfiles (si besoin futur)
│   ├── web.Dockerfile
│   ├── api.Dockerfile
│   └── README.md
│
├── kubernetes/                  # K8s configs (si scalabilité future)
│   ├── deployments/
│   ├── services/
│   └── README.md
│
├── ci_cd/                       # CI/CD pipelines
│   ├── github-actions/          # GitHub Actions workflows
│   ├── vercel/                  # Vercel configuration
│   └── README.md
│
├── scripts/                     # Scripts d'automatisation
│   ├── backup.sh                # Script backup DB
│   ├── deploy.sh                # Script déploiement
│   ├── migrate.sh               # Script migrations
│   └── README.md
│
└── README.md                    # Ce fichier
```

---

## 🐳 Docker (Optionnel - Futur)

### Statut : Non utilisé actuellement

RabaisLocal utilise une architecture **serverless** :
- Frontend → Vercel (CDN global)
- Backend → Supabase Edge Functions
- Workflows → Make.com (cloud)
- Database → Supabase (managed PostgreSQL)

**Docker pourrait être utilisé pour :**
- Environnement de développement local standardisé
- Tests end-to-end isolés
- Microservices custom si besoin futur

### Dockerfiles Préparés (Futur)

**Frontend (Next.js) :**
```dockerfile
# devops/docker/web.Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**Backend API (si besoin) :**
```dockerfile
# devops/docker/api.Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

---

## ☸️ Kubernetes (Optionnel - Futur)

### Statut : Non utilisé actuellement

RabaisLocal n'utilise pas Kubernetes car :
- Trafic prévu < 100k users/mois → Vercel + Supabase suffisent
- Coûts optimisés avec serverless
- Pas de gestion infrastructure complexe

**Kubernetes serait utile si :**
- Trafic > 1M users/mois
- Besoin microservices custom
- Multi-région avec latence < 100ms
- Contrôle total infrastructure

### Architecture K8s Prévue (Futur)

```yaml
# devops/kubernetes/deployments/web-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rabaislocal-web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: rabaislocal-web
  template:
    metadata:
      labels:
        app: rabaislocal-web
    spec:
      containers:
      - name: web
        image: rabaislocal/web:latest
        ports:
        - containerPort: 3000
```

---

## 🔄 CI/CD - Intégration & Déploiement Continue

### GitHub Actions

**Workflows Configurés :**

**1. Test & Build (Pull Requests)**
```yaml
# .github/workflows/test.yml
name: Tests
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run test
      - run: npm run build
```

**2. Deploy Preview (Branches)**
```yaml
# .github/workflows/deploy-preview.yml
name: Deploy Preview
on:
  push:
    branches: [develop, staging]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
```

**3. Deploy Production (Main Branch)**
```yaml
# .github/workflows/deploy-production.yml
name: Deploy Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-args: '--prod'
      - name: Run Smoke Tests
        run: npm run test:smoke
      - name: Notify Slack
        run: |
          curl -X POST ${{ secrets.SLACK_WEBHOOK }} \
          -d '{"text":"✅ Production déployée avec succès!"}'
```

**4. Database Migrations**
```yaml
# .github/workflows/migrate.yml
name: Database Migration
on:
  workflow_dispatch:
    inputs:
      migration_file:
        description: 'Migration file to run'
        required: true
jobs:
  migrate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Migration
        run: |
          psql ${{ secrets.SUPABASE_DB_URL }} \
          -f modules/${{ github.event.inputs.migration_file }}
      - name: Verify Migration
        run: npm run db:verify
```

### Vercel Configuration

**vercel.json :**
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1", "fra1"],
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key"
  },
  "build": {
    "env": {
      "NEXT_TELEMETRY_DISABLED": "1"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

---

## 📜 Scripts d'Automatisation

### Backup Database

**Script : `devops/scripts/backup.sh`**

```bash
#!/bin/bash
# Backup Supabase PostgreSQL database

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_rabaislocal_$DATE.sql"

echo "🔄 Backup database..."

pg_dump $SUPABASE_DB_URL > backups/$BACKUP_FILE

if [ $? -eq 0 ]; then
  echo "✅ Backup créé : $BACKUP_FILE"

  # Upload vers S3 (optionnel)
  aws s3 cp backups/$BACKUP_FILE s3://rabaislocal-backups/

  # Garder seulement 30 derniers backups locaux
  ls -t backups/*.sql | tail -n +31 | xargs rm -f
else
  echo "❌ Erreur lors du backup"
  exit 1
fi
```

**Utilisation :**
```bash
cd devops/scripts
chmod +x backup.sh
./backup.sh
```

**Cron Job (Tous les jours à 3h du matin) :**
```bash
0 3 * * * /path/to/devops/scripts/backup.sh >> /var/log/rabaislocal-backup.log 2>&1
```

### Déploiement Production

**Script : `devops/scripts/deploy.sh`**

```bash
#!/bin/bash
# Deploy RabaisLocal to production

set -e

echo "🚀 Déploiement production RabaisLocal..."

# 1. Vérifier branche
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "❌ Erreur : Déploiement seulement depuis 'main'"
  exit 1
fi

# 2. Tests
echo "🧪 Exécution tests..."
npm run test
npm run test:e2e

# 3. Build
echo "🔨 Build application..."
npm run build

# 4. Deploy Vercel
echo "📦 Déploiement Vercel..."
vercel --prod --yes

# 5. Smoke tests
echo "🔍 Tests de vérification..."
npm run test:smoke

# 6. Notification Slack
echo "📢 Notification équipe..."
curl -X POST $SLACK_WEBHOOK \
  -d '{"text":"✅ RabaisLocal déployé en production avec succès!"}'

echo "✅ Déploiement terminé avec succès!"
```

### Migrations Database

**Script : `devops/scripts/migrate.sh`**

```bash
#!/bin/bash
# Run database migrations

set -e

MIGRATION_FILE=$1

if [ -z "$MIGRATION_FILE" ]; then
  echo "❌ Erreur : Spécifier fichier migration"
  echo "Usage: ./migrate.sh modules/module_a_users/supabase/01_create_tables_users.sql"
  exit 1
fi

if [ ! -f "$MIGRATION_FILE" ]; then
  echo "❌ Erreur : Fichier '$MIGRATION_FILE' introuvable"
  exit 1
fi

echo "🔄 Exécution migration : $MIGRATION_FILE"

# Backup avant migration
./backup.sh

# Exécuter migration
psql $SUPABASE_DB_URL < $MIGRATION_FILE

if [ $? -eq 0 ]; then
  echo "✅ Migration réussie"

  # Logger migration
  echo "$(date) - Migration : $MIGRATION_FILE" >> migrations.log
else
  echo "❌ Erreur lors de la migration"
  echo "💾 Backup disponible si besoin de rollback"
  exit 1
fi
```

**Utilisation :**
```bash
cd devops/scripts
./migrate.sh ../../modules/module_a_users/supabase/01_create_tables_users.sql
```

---

## 📊 Monitoring & Alertes

### Services de Monitoring

**1. Uptime Monitoring (UptimeRobot)**
- Check toutes les 5 minutes
- Alerte si down > 2 minutes
- Notification Slack + Email

**2. Performance Monitoring (Vercel Analytics)**
- Core Web Vitals
- Temps de chargement
- Erreurs JavaScript
- API response times

**3. Database Monitoring (Supabase Dashboard)**
- Connections actives
- Query performance
- Slow queries alerts
- Storage usage

**4. Error Tracking (Sentry - Futur)**
- Erreurs frontend
- Erreurs backend
- Source maps
- User context

### Alertes Configurées

**Alertes Critiques (Slack + Email + SMS) :**
```
❌ Site down > 2 minutes
❌ Database down
❌ Taux erreur > 5%
❌ API latency > 2s
❌ Certificat SSL expire < 7 jours
```

**Alertes Warning (Slack + Email) :**
```
⚠️ Taux erreur > 1%
⚠️ API latency > 500ms
⚠️ Database connections > 80%
⚠️ Storage > 90%
⚠️ Bandwidth > 90%
```

**Alertes Info (Slack seulement) :**
```
ℹ️ Nouveau déploiement
ℹ️ Migration DB complétée
ℹ️ Backup réussi
ℹ️ Nouveau utilisateur inscrit (milestone)
```

---

## 🔐 Secrets Management

### Variables d'Environnement

**Développement (`.env.local`) :**
```env
# Stocké localement, jamais dans Git
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

**Production (Vercel Environment Variables) :**
```
# Stocké dans Vercel Dashboard
# Accès restreint aux admins
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY (encrypted)
MAILERSEND_API_KEY (encrypted)
OPENAI_API_KEY (encrypted)
```

**CI/CD (GitHub Secrets) :**
```
# Stocké dans GitHub Settings → Secrets
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
SUPABASE_DB_URL
SLACK_WEBHOOK
```

### Rotation des Secrets

**Calendrier :**
- API Keys : Tous les 90 jours
- JWT Secrets : Tous les 180 jours
- Database passwords : Tous les 90 jours
- Webhook URLs : Si compromis

---

## 📈 Métriques & KPIs

### Métriques Techniques Trackées

**Performance :**
- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- Time to Interactive (TTI) < 3.5s

**Disponibilité :**
- Uptime > 99.9%
- Mean Time To Recovery (MTTR) < 15 min
- Mean Time Between Failures (MTBF) > 30 jours

**Base de Données :**
- Query time moyenne < 100ms
- Connections peak < 50
- Storage growth < 10GB/mois

**Déploiements :**
- Fréquence : 2-3x par semaine
- Taux succès > 95%
- Rollback time < 5 minutes

---

## 🧪 Environnements

### 1. Development (Local)
```
URL: http://localhost:3000
DB: Supabase projet test
Services: Tous en mode test
Logs: Console navigateur
```

### 2. Staging (Pre-production)
```
URL: https://staging.rabaislocal.com
DB: Supabase projet staging
Services: Clés API staging
Logs: Vercel + Supabase
Tests: End-to-end complets
```

### 3. Production
```
URL: https://rabaislocal.com
DB: Supabase projet production
Services: Clés API production
Logs: Centralisés (Vercel + Supabase + Sentry)
Monitoring: Actif 24/7
Backups: Quotidiens
```

---

## 📚 Documentation

- [Guide Déploiement](../docs/DEPLOYMENT.md)
- [Guide Monitoring](../docs/MONITORING.md)
- [Runbook Production](../docs/RUNBOOK.md)
- [Incident Response](../docs/INCIDENT_RESPONSE.md)

---

## 📞 Support DevOps

**Problèmes déploiement/infrastructure ?**
- 📧 Email : dany@rabaislocal.com
- 🚨 Urgence : +1-XXX-XXX-XXXX (à venir)
- 📚 Documentation : `/docs`

---

**Dernière mise à jour :** 9 novembre 2025
**Version :** 1.0.0

---

**Fait avec ❤️ pour l'économie locale québécoise**
*DevOps simplifié pour équipe agile*
