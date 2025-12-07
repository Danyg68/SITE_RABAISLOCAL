# 🚀 Guide de Déploiement Production / Test - RabaisLocal

## 📁 Structure du Projet

```
SITE_RABAISLOCAL/
├── production/              ← VERSION EN LIGNE (STABLE)
│   ├── funnels/            → Pages de tunnel (marketing)
│   ├── frontend/           → Application Next.js principale
│   └── pwa-rabaislocal-app/ → Application PWA
│
├── test/                    ← VERSION DE DÉVELOPPEMENT
│   ├── funnels/            → Pages de tunnel (tests)
│   ├── frontend/           → Application Next.js (développement)
│   └── pwa-rabaislocal-app/ → Application PWA (tests)
│
├── backend/                 ← API Node.js (partagé)
├── SAUVEGARDE/             ← Backups automatiques
└── docs/                    ← Documentation
```

---

## 🌐 Configuration des Domaines Liquid Web

### Domaines recommandés :

1. **Production (LIVE)** :
   - `www.rabaislocal.com` ou `rabaislocal.com`
   - `marketing.rabaislocal.com` (pour funnels)
   - `app.rabaislocal.com` (pour PWA)

2. **Test (STAGING)** :
   - `test.rabaislocal.com` ou `staging.rabaislocal.com`
   - `test-marketing.rabaislocal.com`
   - `test-app.rabaislocal.com`

---

## 🔧 Étapes de Configuration sur Liquid Web

### Étape 1 : Créer les sous-domaines

1. **Connectez-vous à votre panneau Liquid Web** (Manage.liquidweb.com ou cPanel)
2. Allez dans **"Domaines"** → **"Sous-domaines"**
3. Créez les sous-domaines suivants :

   ```
   Sous-domaine : test
   Domaine : rabaislocal.com
   Racine du document : /home/[votre_user]/public_html/test
   ```

   ```
   Sous-domaine : marketing
   Domaine : rabaislocal.com
   Racine du document : /home/[votre_user]/public_html/production/funnels
   ```

### Étape 2 : Installer les certificats SSL

1. Dans cPanel → **"SSL/TLS"** → **"AutoSSL"** ou **"Let's Encrypt"**
2. Activez SSL pour :
   - `rabaislocal.com`
   - `www.rabaislocal.com`
   - `test.rabaislocal.com`
   - `marketing.rabaislocal.com`
   - `test-marketing.rabaislocal.com`

### Étape 3 : Configuration du déploiement

#### Option A : Déploiement via FTP/SFTP (Simple)

**Informations de connexion** (à récupérer dans Liquid Web) :
```
Hôte : ftp.rabaislocal.com ou votre IP serveur
Port : 21 (FTP) ou 22 (SFTP recommandé)
Utilisateur : [votre_username]
Mot de passe : [votre_password]
```

**Client FTP recommandé** : FileZilla ou WinSCP

**Dossiers à uploader** :
- Local : `production/` → Serveur : `/public_html/`
- Local : `test/` → Serveur : `/public_html/test/`

#### Option B : Déploiement via Git (Professionnel - Recommandé)

1. **Sur votre serveur Liquid Web**, connectez-vous en SSH :
   ```bash
   ssh votre_username@votre_serveur.liquidweb.com
   ```

2. **Installez Git** (si pas déjà installé) :
   ```bash
   git --version
   # Si non installé, demandez au support Liquid Web
   ```

3. **Créez un dépôt Git sur le serveur** :
   ```bash
   cd ~/public_html
   git init --bare ~/rabaislocal.git
   ```

4. **Créez un hook post-receive** :
   ```bash
   nano ~/rabaislocal.git/hooks/post-receive
   ```

   Contenu du fichier :
   ```bash
   #!/bin/bash

   # Production
   GIT_WORK_TREE=/home/[votre_user]/public_html/production git checkout -f main

   # Test
   GIT_WORK_TREE=/home/[votre_user]/public_html/test git checkout -f develop

   echo "✓ Déploiement terminé"
   ```

   Rendez-le exécutable :
   ```bash
   chmod +x ~/rabaislocal.git/hooks/post-receive
   ```

5. **Sur votre machine locale**, ajoutez le remote Git :
   ```bash
   cd c:\Users\manager\OneDrive\rabaislocal\SITE_RABAISLOCAL
   git init
   git add production/* test/*
   git commit -m "Structure initiale production/test"
   git remote add production ssh://votre_user@votre_serveur.liquidweb.com/~/rabaislocal.git
   ```

6. **Déployez** :
   ```bash
   # Déployer la production
   git push production main

   # Déployer le test
   git push production develop
   ```

---

## 📝 Workflow de Travail Recommandé

### 1. Développement local (dossier `test/`)

```bash
# Modifier les fichiers dans test/
# Tester localement
# Quand tout fonctionne :
```

### 2. Déployer vers test.rabaislocal.com

```bash
# Via FTP
# Uploader test/ → /public_html/test/

# Via Git
git add test/*
git commit -m "Description des changements"
git checkout develop
git push production develop
```

### 3. Tester sur test.rabaislocal.com

- Visiter `https://test.rabaislocal.com`
- Vérifier tous les liens
- Tester les formulaires
- Vérifier la compatibilité mobile

### 4. Déployer en production

```bash
# Copier les fichiers validés de test/ vers production/
cp -r test/* production/

# Via FTP
# Uploader production/ → /public_html/

# Via Git
git add production/*
git commit -m "Mise à jour production validée"
git checkout main
git push production main
```

---

## ⚙️ Configuration des Variables d'Environnement

Créez un fichier `.env` pour chaque environnement :

### Production `.env.production`
```env
NODE_ENV=production
API_URL=https://api.rabaislocal.com
FRONTEND_URL=https://rabaislocal.com
MARKETING_URL=https://marketing.rabaislocal.com
DB_HOST=votre-db-prod.liquidweb.com
DB_NAME=rabaislocal_prod
```

### Test `.env.test`
```env
NODE_ENV=development
API_URL=https://test-api.rabaislocal.com
FRONTEND_URL=https://test.rabaislocal.com
MARKETING_URL=https://test-marketing.rabaislocal.com
DB_HOST=votre-db-test.liquidweb.com
DB_NAME=rabaislocal_test
```

---

## 🔒 Sécurité

### Fichiers à NE PAS uploader en production :
- `.env` (contient des secrets)
- `node_modules/` (à réinstaller sur le serveur)
- `.git/` (si déploiement FTP)
- fichiers de test
- fichiers temporaires

### Créez un `.gitignore` :
```
node_modules/
.env
.env.local
*.log
.DS_Store
Thumbs.db
```

---

## 📊 Checklist de Déploiement

### Avant chaque déploiement en production :

- [ ] Tests effectués sur `test.rabaislocal.com`
- [ ] Backup de la production actuelle
- [ ] Vérification des liens
- [ ] Test des formulaires
- [ ] Vérification mobile/responsive
- [ ] SSL actif et fonctionnel
- [ ] Variables d'environnement correctes
- [ ] Performance vérifiée (Google PageSpeed)

---

## 🆘 Support Liquid Web

**En cas de problème** :

1. **Support technique Liquid Web** :
   - Téléphone : 1-800-580-4985
   - Email : support@liquidweb.com
   - Chat en ligne : manage.liquidweb.com

2. **Documentation** :
   - https://www.liquidweb.com/kb/

3. **Demandes fréquentes** :
   - Installation de Node.js
   - Configuration SSL
   - Accès SSH
   - Augmentation des limites PHP

---

## 🎯 Prochaines Étapes

1. ✅ Structure locale créée (production/ et test/)
2. ⏳ Créer les sous-domaines sur Liquid Web
3. ⏳ Configurer SSL
4. ⏳ Déployer la version test
5. ⏳ Tester sur test.rabaislocal.com
6. ⏳ Déployer en production

---

## 📞 Contact

Pour toute question sur ce déploiement :
- Email : support@rabaislocal.com
- Documentation interne : /docs/

---

**Dernière mise à jour** : 7 décembre 2025
**Version** : 1.0
