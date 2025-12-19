# 📱 Page de Présentation Consommateur - Mobile

Page HTML autonome optimisée pour présentation rapide sur téléphone cellulaire.

---

## 📋 Informations

**Fichier:** `presentation-consommateur.html`
**Type:** HTML autonome (HTML + CSS + JS intégré)
**Largeur max:** 420px
**Public cible:** Consommateurs locaux
**Durée:** ~90 secondes

---

## 🎯 Objectif

Permettre de présenter rapidement RabaisLocal aux consommateurs et de capturer leur adresse courriel pour leur envoyer automatiquement le lien d'inscription détaillé.

---

## ⚙️ Configuration Webhook

La page utilise le **même webhook** que la page commerçant :

```javascript
const CONFIG = {
  webhookUrl: 'https://hook.us2.make.com/4xk94ufbnfviqqhnu02bk3hk3c4up1lf'
};
```

### **Données envoyées au webhook :**

```json
{
  "email": "consommateur@example.com",
  "lien_consommateur": "https://marketing.rabaislocal.com/page-consommateur.html?ref=1234567",
  "ref": "1234567",
  "role_consommateur": "1",
  "role_commercant": "0",
  "role_affilie": "0",
  "timestamp": "2025-12-18T10:30:00.000Z"
}
```

---

## 🔄 Différences avec la page Commerçant

| Élément | Page Commerçant | Page Consommateur |
|---------|----------------|-------------------|
| **Formulaire HTML** | ✅ Identique | ✅ Identique |
| **JavaScript** | ✅ Identique | ✅ Identique |
| **Champs visibles** | refAffilie + email | refAffilie + email |
| **Données envoyées** | email + lien_commercant + ref | email + lien_consommateur + ref |
| **URL de redirection** | page1-commercant.html | page-consommateur.html |
| **role_consommateur** | `0` | `1` |
| **role_commercant** | `1` | `0` |
| **role_affilie** | `0` | `0` |

**⚠️ IMPORTANT :** Les deux pages utilisent EXACTEMENT le même formulaire et le même JavaScript. La différence est le nom du champ de lien généré (`lien_commercant` vs `lien_consommateur`), l'URL de redirection, et la valeur du rôle.

---

## 📤 Déploiement

### **Méthode 1 : Hébergement web classique**

```
Upload via FTP vers:
/public_html/presentation/presentation-consommateur.html
```

**URL finale :**
```
https://tondomaine.com/presentation/presentation-consommateur.html
```

### **Méthode 2 : QR Code**

Génère un QR code pointant vers l'URL pour faciliter le partage :

```
https://tondomaine.com/presentation/presentation-consommateur.html
```

Outils recommandés :
- https://www.qr-code-generator.com/
- https://www.qrcode-monkey.com/

---

## 🧪 Test Local

1. Ouvre le fichier `presentation-consommateur.html` dans Chrome/Firefox
2. Ouvre la console (F12) pour voir les logs
3. Entre un email et soumets le formulaire
4. Vérifie les logs :
   ```
   📤 Envoi des données: {email: "test@example.com", lien_consommateur: "...", role_consommateur: "1", ...}
   ✅ Email envoyé avec succès
   ```

---

## 📋 Structure de la Page

1. **Hero** - Titre "Économisez local, simplement"
2. **Problème** - Difficulté de trouver de vrais rabais locaux
3. **Solution** - Rabais fiables créés par les commerçants
4. **Comment ça marche** - 4 étapes simples
5. **Économiser partout** - Géolocalisation et rabais locaux
6. **Outils intelligents** - IA et recommandations personnalisées
7. **Avantage pré-lancement** - Crédits illimités pour les 5 000 premiers
8. **Gratuité** - Inscription gratuite, aucun engagement
9. **CTA/Formulaire** - Capture email + champs hidden

---

## 🎨 Personnalisation

### **Couleurs principales**

```css
--primary: #1B2240;      /* Bleu RabaisLocal */
--secondary: #4CAF50;    /* Vert succès */
--accent: #FF6B35;       /* Orange badge */
--error: #E94D4C;        /* Rouge erreur */
--warning: #FFC107;      /* Jaune attention */
```

### **Modifier le texte**

Tous les textes sont dans le HTML, chercher par section :
- `<!-- SECTION 1 - HERO -->`
- `<!-- SECTION 2 - LE PROBLÈME -->`
- `<!-- SECTION 3 - LA SOLUTION -->`
- etc.

---

## 📊 Suivi des Conversions

Pour tracker les soumissions, ajoute Google Analytics ou un pixel :

```javascript
// Après succès de soumission
if (response.ok) {
  // Google Analytics
  gtag('event', 'conversion', {
    'send_to': 'AW-XXXXXXXXX/XXXXXX',
    'value': 1.0,
    'currency': 'CAD'
  });

  // Facebook Pixel
  fbq('track', 'Lead', {
    content_name: 'presentation_consommateur',
    content_category: 'lead_generation'
  });
}
```

---

## 🔒 Sécurité

- ✅ Validation email côté client
- ✅ Protection contre les soumissions multiples (bouton désactivé)
- ✅ Timeout de 10 secondes pour le webhook
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
- Vérifier les classes CSS `.hidden` et `.visible`
- Vérifier le JavaScript (gestion du DOM)

---

## 🔧 Make.com - Configuration

Dans Make.com, le scénario devra :

1. **Recevoir les données du webhook**
2. **Filtrer par rôle** :
   - Si `role_consommateur = 1` → Email consommateur
   - Si `role_commercant = 1` → Email commerçant
3. **Envoyer l'email approprié** selon le rôle
4. **Logger dans Google Sheets** (optionnel)

### **Exemple de filtre Make.com**

```
Condition 1: role_consommateur = 1
  → Module Email Consommateur
  → Sujet: "Bienvenue sur RabaisLocal - Vos rabais locaux"

Condition 2: role_commercant = 1
  → Module Email Commerçant
  → Sujet: "Bienvenue sur RabaisLocal - Votre accès prioritaire"
```

---

## 📝 Changelog

**Version 1.0** (18 décembre 2025)
- Création initiale
- Hero + 8 sections de contenu
- Capture email avec champs hidden pour identification du rôle
- Formulaire connecté au webhook unique
- Responsive mobile-first

---

## 📞 Support

Pour toute question ou personnalisation, contacte l'équipe RabaisLocal.

**Lancement officiel :** 19 mars 2026
