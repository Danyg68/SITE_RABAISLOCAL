# 🚀 Guide de Configuration Liquid Web - RabaisLocal

## ✅ Ce qui a été fait

1. ✅ Structure locale créée avec dossiers `production/` et `test/`
2. ✅ Configuration Git avec branches `main` (production) et `develop` (test)
3. ✅ Tous les fichiers commitées et prêts pour le déploiement
4. ✅ Documentation complète créée ([DEPLOIEMENT_PRODUCTION_TEST.md](DEPLOIEMENT_PRODUCTION_TEST.md))

---

## 📋 Prochaines étapes - Configuration Liquid Web

### Étape 1 : Connexion à votre serveur Liquid Web

1. **Ouvrez votre navigateur** et allez sur : [https://manage.liquidweb.com](https://manage.liquidweb.com)
2. **Connectez-vous** avec vos identifiants Liquid Web
3. **Accédez au cPanel** :
   - Cliquez sur votre serveur/domaine
   - Cherchez "cPanel" ou "Manage" et cliquez dessus

---

### Étape 2 : Créer les sous-domaines

#### 2.1 Sous-domaine de TEST

1. Dans cPanel, allez dans **"Domaines"** → **"Sous-domaines"** (ou "Subdomains")
2. Cliquez sur **"Créer un sous-domaine"**
3. Remplissez :
   ```
   Sous-domaine : test
   Domaine : rabaislocal.com
   Racine du document : /home/[votre_user]/public_html/test
   ```
4. Cliquez sur **"Créer"**

#### 2.2 Sous-domaine MARKETING (Production)

Répétez le processus :
```
Sous-domaine : marketing
Domaine : rabaislocal.com
Racine du document : /home/[votre_user]/public_html/production/funnels
```

#### 2.3 Sous-domaine TEST-MARKETING

```
Sous-domaine : test-marketing
Domaine : rabaislocal.com
Racine du document : /home/[votre_user]/public_html/test/funnels
```

---

### Étape 3 : Installer les certificats SSL

1. Dans cPanel, cherchez **"SSL/TLS"** ou **"AutoSSL"**
2. Cliquez sur **"AutoSSL"** ou **"Let's Encrypt"**
3. **Activez SSL** pour chaque domaine/sous-domaine :
   - ☑ rabaislocal.com
   - ☑ www.rabaislocal.com
   - ☑ test.rabaislocal.com
   - ☑ marketing.rabaislocal.com
   - ☑ test-marketing.rabaislocal.com
4. Cliquez sur **"Exécuter AutoSSL"** ou **"Install"**
5. **Attendez** que les certificats soient installés (peut prendre 5-10 minutes)

---

### Étape 4 : Méthode de Déploiement

Vous avez **deux options** :

#### Option A : Déploiement via FTP/SFTP (Plus simple - Recommandé pour commencer)

**Avantages** :
- Simple et visuel
- Pas besoin de connaissances techniques
- Vous pouvez voir les fichiers dans un gestionnaire

**Outils nécessaires** :
- [FileZilla](https://filezilla-project.org/download.php?type=client) (gratuit)
- Ou [WinSCP](https://winscp.net/eng/download.php) (gratuit)

**Informations de connexion** (à obtenir depuis Liquid Web) :
```
Hôte : ftp.rabaislocal.com (ou l'IP de votre serveur)
Port : 21 (FTP) ou 22 (SFTP - recommandé)
Utilisateur : [votre nom d'utilisateur cPanel]
Mot de passe : [votre mot de passe cPanel]
```

**Comment déployer** :

1. **Ouvrez FileZilla**
2. **Connectez-vous** avec les informations ci-dessus
3. **Côté local (gauche)** : Naviguez vers `c:\Users\manager\OneDrive\rabaislocal\SITE_RABAISLOCAL\production`
4. **Côté serveur (droite)** : Naviguez vers `/public_html/`
5. **Sélectionnez** tous les dossiers dans `production/` (funnels, frontend, pwa-rabaislocal-app)
6. **Faites un glisser-déposer** vers `/public_html/`
7. **Répétez** pour le dossier `test/` → `/public_html/test/`

#### Option B : Déploiement via Git + SSH (Plus avancé - Pour les mises à jour automatiques)

**Avantages** :
- Déploiement automatique
- Historique des versions
- Retour en arrière facile

**Prérequis** :
- Accès SSH à votre serveur
- Git installé sur le serveur

**Je peux vous guider étape par étape pour cette option si vous la choisissez.**

---

### Étape 5 : Vérifier le déploiement

Après avoir uploadé les fichiers :

1. **Visitez** `https://test.rabaislocal.com`
2. **Vérifiez** que le site de tunnel s'affiche correctement
3. **Testez** quelques liens pour vous assurer qu'ils fonctionnent
4. **Visitez** `https://marketing.rabaislocal.com` pour la version production

---

## 🆘 En cas de problème

### Problème : Les sous-domaines ne fonctionnent pas

**Solution** :
1. Vérifiez que les sous-domaines ont été créés correctement dans cPanel
2. Attendez 15-30 minutes pour la propagation DNS
3. Videz le cache de votre navigateur (Ctrl + F5)

### Problème : Erreur SSL / HTTPS ne fonctionne pas

**Solution** :
1. Retournez dans **SSL/TLS** → **AutoSSL**
2. Vérifiez que les certificats sont bien installés (icône verte ✓)
3. Si non, cliquez sur **"Réessayer"** ou **"Installer"**
4. Contactez le support Liquid Web si le problème persiste

### Problème : Erreur 404 ou Page non trouvée

**Solution** :
1. Vérifiez que les fichiers ont bien été uploadés dans les bons dossiers
2. Vérifiez les chemins dans la configuration des sous-domaines
3. Assurez-vous que le fichier `index.html` existe à la racine

---

## 📞 Support Liquid Web

**En cas de besoin d'aide** :

- **Téléphone** : 1-800-580-4985 (24/7)
- **Email** : support@liquidweb.com
- **Chat en ligne** : Via manage.liquidweb.com

**Questions fréquentes à poser au support** :
- "Comment accéder à mon cPanel ?"
- "Quels sont mes identifiants FTP/SFTP ?"
- "Comment installer un certificat SSL ?"
- "Comment activer l'accès SSH ?"

---

## 🎯 Workflow de travail recommandé

### Pour faire des modifications :

1. **Modifiez** les fichiers dans le dossier `test/` localement
2. **Testez** localement si possible
3. **Uploadez** vers `test.rabaislocal.com` via FTP
4. **Testez** sur `test.rabaislocal.com`
5. **Si tout fonctionne** :
   - Copiez les modifications de `test/` vers `production/` localement
   - Uploadez vers `rabaislocal.com` / `marketing.rabaislocal.com`

### Avec Git (Option B) :

```bash
# Pour déployer vers TEST
git checkout develop
git add .
git commit -m "Description des changements"
git push production develop

# Pour déployer vers PRODUCTION (après validation sur test)
git checkout main
git merge develop
git push production main
```

---

## 📝 Checklist de déploiement

- [ ] Connexion à Liquid Web réussie
- [ ] cPanel accessible
- [ ] Sous-domaine `test.rabaislocal.com` créé
- [ ] Sous-domaine `marketing.rabaislocal.com` créé
- [ ] Certificats SSL installés pour tous les domaines
- [ ] Méthode de déploiement choisie (FTP ou Git)
- [ ] Fichiers uploadés vers `/public_html/`
- [ ] Fichiers uploadés vers `/public_html/test/`
- [ ] Test de `https://test.rabaislocal.com` réussi
- [ ] Test de `https://marketing.rabaislocal.com` réussi

---

## 🔜 Prochaine étape

**Dites-moi quelle méthode de déploiement vous préférez** :
- **Option A (FTP)** : Plus simple, je vous guide pour télécharger FileZilla et uploader les fichiers
- **Option B (Git + SSH)** : Plus avancé, je vous guide pour configurer Git sur votre serveur

**Ou si vous avez besoin d'aide pour** :
- Trouver vos identifiants cPanel/FTP
- Créer les sous-domaines
- Installer les certificats SSL
- Autre chose ?

---

**Dernière mise à jour** : 7 décembre 2025
