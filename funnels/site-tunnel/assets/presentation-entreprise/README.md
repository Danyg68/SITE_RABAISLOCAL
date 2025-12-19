# 📱 Page de Présentation Commerçant - Mobile

Page HTML autonome optimisée pour présentation rapide sur téléphone cellulaire.

---

## 📋 Informations

**Fichier:** `presentation-commercant.html`
**Type:** HTML autonome (HTML + CSS + JS intégré)
**Largeur max:** 420px
**Public cible:** Commerçants locaux
**Durée:** ~90 secondes

---

## 🎯 Objectif

Permettre aux affiliés RabaisLocal de présenter rapidement la plateforme à des commerçants locaux et de capturer leur adresse courriel pour leur envoyer automatiquement le lien d'inscription détaillé.

---

## ⚙️ Configuration

### **1. Paramètre REF_AFFILIE**

Dans le fichier `presentation-commercant.html`, ligne ~533 :

```javascript
const CONFIG = {
  refAffilie: '{{REF_AFFILIE}}', // ← REMPLACER ICI
  redirectUrl: 'https://marketing.rabaislocal.com/page1-commercant.html',
  webhookUrl: null
};
```

**Options :**

**Option A - Statique (simple) :**
```javascript
refAffilie: 'AFF12345',
```

**Option B - Dynamique depuis l'URL :**
```javascript
// Déjà configuré automatiquement
// L'URL: presentation-commercant.html?ref=AFF12345
// Récupère automatiquement "AFF12345"
```

**Option C - Générer une page par affilié :**
Créer plusieurs copies avec des refs différentes :
- `presentation-commercant-AFF001.html`
- `presentation-commercant-AFF002.html`

---

### **2. Configuration du Webhook (Make.com)**

Pour automatiser l'envoi d'emails, configure un webhook Make.com :

```javascript
const CONFIG = {
  refAffilie: '{{REF_AFFILIE}}',
  redirectUrl: 'https://marketing.rabaislocal.com/page1-commercant.html',
  webhookUrl: 'https://hook.eu1.make.com/xxxxxxxxxxxxx' // ← TON WEBHOOK
};
```

**Données envoyées au webhook :**
```json
{
  "email": "commercant@example.com",
  "ref": "AFF12345",
  "link": "https://marketing.rabaislocal.com/page1-commercant.html?ref=AFF12345",
  "timestamp": "2025-12-17T10:30:00.000Z"
}
```

---

## 📤 Déploiement

### **Méthode 1 : Hébergement web classique**

```
Upload via FTP vers:
/public_html/presentation/presentation-commercant.html
```

**URL finale :**
```
https://tondomaine.com/presentation/presentation-commercant.html?ref=AFF123
```

### **Méthode 2 : QR Code**

Génère un QR code pointant vers l'URL pour faciliter le partage :

```
https://tondomaine.com/presentation/presentation-commercant.html?ref=AFF123
```

Outils recommandés :
- https://www.qr-code-generator.com/
- https://www.qrcode-monkey.com/

---

## 🧪 Test Local

1. Ouvre le fichier `presentation-commercant.html` dans Chrome/Firefox
2. Ouvre la console (F12) pour voir les logs
3. Entre un email et soumets le formulaire
4. Vérifie les logs :
   ```
   📧 Email simulé envoyé à: test@example.com
   🔗 Lien: https://marketing.rabaislocal.com/page1-commercant.html?ref={{REF_AFFILIE}}
   ```

---

## 📋 Structure de la Page

1. **Hero** - Titre accrocheur + badge pré-lancement
2. **Problème** - 3 défis des commerçants locaux
3. **Solution** - 3 avantages de RabaisLocal
4. **Gratuit** - 4 bénéfices de l'inscription gratuite
5. **Différenciation** - 3 points uniques
6. **Capture Email** - Formulaire avec validation
7. **Légal** - Mention pré-lancement + date

---

## 🎨 Personnalisation

### **Couleurs principales**

```css
--primary: #3E53A5;      /* Bleu RabaisLocal */
--secondary: #4CAF50;    /* Vert succès */
--error: #E94D4C;        /* Rouge erreur */
--warning: #FFC107;      /* Jaune attention */
```

### **Modifier le texte**

Tous les textes sont dans le HTML, chercher par section :
- `<!-- HERO SECTION -->`
- `<!-- PROBLEME SECTION -->`
- `<!-- SOLUTION SECTION -->`
- etc.

---

## 📊 Suivi des Conversions

Pour tracker les soumissions, ajoute Google Analytics ou un pixel :

```javascript
// Après succès de soumission, ligne ~620
if (result.success) {
  // Google Analytics
  gtag('event', 'conversion', {
    'send_to': 'AW-XXXXXXXXX/XXXXXX',
    'value': 1.0,
    'currency': 'CAD'
  });

  // Facebook Pixel
  fbq('track', 'Lead', {
    content_name: 'presentation_commercant',
    content_category: 'lead_generation'
  });
}
```

---

## 🔒 Sécurité

- ✅ Validation email côté client
- ✅ Protection contre les soumissions multiples (bouton désactivé)
- ⚠️ **Important :** Validation côté serveur recommandée (webhook Make.com)

---

## 📱 Compatibilité Mobile

Testé et optimisé pour :
- ✅ iPhone (Safari iOS)
- ✅ Android (Chrome)
- ✅ Résolutions 320px à 420px

---

## 🆘 Dépannage

### **Le formulaire ne soumet pas**
- Vérifier la console (F12) pour les erreurs JavaScript
- Vérifier que l'email est valide
- Vérifier la connexion internet

### **Le webhook ne fonctionne pas**
- Vérifier que l'URL du webhook est correcte
- Tester le webhook dans Make.com
- Vérifier les CORS si nécessaire

### **Le message de succès ne s'affiche pas**
- Vérifier les classes CSS `.hidden`
- Vérifier le JavaScript ligne ~608

---

## 📝 Changelog

**Version 1.0** (17 décembre 2025)
- Création initiale
- Hero + 6 sections
- Capture email avec validation
- Mode simulation (sans webhook)
- Responsive mobile-first

---

## 📞 Support

Pour toute question ou personnalisation, contacte l'équipe RabaisLocal.

**Lancement officiel :** 19 mars 2026
