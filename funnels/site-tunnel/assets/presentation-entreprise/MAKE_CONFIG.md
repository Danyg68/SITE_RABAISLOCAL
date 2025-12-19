# 🔧 Configuration Make.com - Automatisation Email

Guide pour configurer l'envoi automatique d'emails aux commerçants ET consommateurs via Make.com (anciennement Integromat).

---

## 🆕 IMPORTANT - Webhook Unique pour Deux Publics

**Les deux pages utilisent le même webhook :**
- `presentation-commercant.html` → Envoie `role_commercant = 1`
- `presentation-consommateur.html` → Envoie `role_consommateur = 1`

**Données reçues - Page Commerçant :**
```json
{
  "email": "commercant@example.com",
  "lien_commercant": "https://marketing.rabaislocal.com/page1-commercant.html?ref=1234567",
  "ref": "1234567",
  "role_consommateur": "0",
  "role_commercant": "1",
  "role_affilie": "0",
  "timestamp": "2025-12-18T10:30:00.000Z"
}
```

**Données reçues - Page Consommateur :**
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

**⚠️ NOTE :** Les deux pages envoient des structures similaires. Les différences sont :
- Page Commerçant → `lien_commercant` + `role_commercant = 1`
- Page Consommateur → `lien_consommateur` + `role_consommateur = 1`

**⚠️ IMPORTANT :** Le scénario Make.com devra utiliser un **Router** pour envoyer un email différent selon le **rôle**.

---

## 📋 Prérequis

- Compte Make.com (gratuit ou payant)
- Accès à un service d'envoi d'email (Gmail, SendGrid, Mailgun, etc.)
- URL du fichier `presentation-commercant.html` déployé

---

## 🎯 Objectif

Quand un commerçant soumet son email sur la page de présentation :
1. Make.com reçoit les données via webhook
2. Make.com envoie automatiquement un email au commerçant
3. L'email contient le lien personnalisé avec la référence affilié

---

## 🔄 Scénario Make.com

### **Module 1 : Webhook (Trigger)**

1. Dans Make.com, crée un nouveau scénario
2. Ajoute le module **Webhooks → Custom Webhook**
3. Clique sur **Add** → Copie l'URL du webhook
4. Exemple : `https://hook.eu1.make.com/xxxxxxxxxxxxx`

**Données reçues :**
```json
{
  "email": "commercant@example.com",
  "ref": "AFF12345",
  "link": "https://marketing.rabaislocal.com/page1-commercant.html?ref=AFF12345",
  "timestamp": "2025-12-17T10:30:00.000Z"
}
```

---

### **Module 2 : Email (Action)**

#### **Option A : Gmail (Simple)**

1. Ajoute le module **Gmail → Send an Email**
2. Configure :
   ```
   To: {{email}}
   Subject: 🎉 Bienvenue sur RabaisLocal - Votre accès prioritaire
   Content: Voir template ci-dessous
   ```

#### **Option B : SendGrid (Professionnel)**

1. Ajoute le module **SendGrid → Send an Email**
2. Configure :
   ```
   To: {{email}}
   From: noreply@rabaislocal.com
   Subject: 🎉 Bienvenue sur RabaisLocal
   Content: Voir template ci-dessous
   Template ID: (si template SendGrid)
   ```

---

## 📧 Template Email HTML

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenue sur RabaisLocal</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1B2240; max-width: 600px; margin: 0 auto; padding: 20px;">

  <!-- Header -->
  <div style="text-align: center; padding: 30px 20px; background: linear-gradient(135deg, #3E53A5 0%, #2c3e80 100%); color: white; border-radius: 10px;">
    <h1 style="margin: 0; font-size: 28px;">🎉 Bienvenue sur RabaisLocal !</h1>
    <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">Votre accès prioritaire est prêt</p>
  </div>

  <!-- Content -->
  <div style="padding: 30px 0;">
    <p style="font-size: 16px; margin-bottom: 20px;">Bonjour,</p>

    <p style="font-size: 16px; margin-bottom: 20px;">
      Merci de votre intérêt pour <strong>RabaisLocal</strong>, la plateforme qui aide les commerçants locaux à attirer plus de clients <strong>sans commission</strong>.
    </p>

    <p style="font-size: 16px; margin-bottom: 20px;">
      Nous sommes actuellement en <strong>pré-lancement</strong> et vous offrons un <strong>accès prioritaire</strong> pour découvrir tous les détails.
    </p>

    <!-- CTA Button -->
    <div style="text-align: center; margin: 35px 0;">
      <a href="{{link}}" style="display: inline-block; background: linear-gradient(135deg, #4CAF50 0%, #388E3C 100%); color: white; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-size: 18px; font-weight: bold; box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);">
        🚀 Découvrir RabaisLocal
      </a>
    </div>

    <p style="font-size: 14px; color: #5B6385; text-align: center; margin-top: 20px;">
      Ou copiez ce lien dans votre navigateur :<br>
      <a href="{{link}}" style="color: #3E53A5; word-break: break-all;">{{link}}</a>
    </p>

    <!-- Benefits -->
    <div style="background: #F0F7FF; padding: 20px; border-radius: 8px; margin: 30px 0;">
      <h3 style="color: #3E53A5; font-size: 18px; margin-bottom: 15px;">✨ Ce qui vous attend :</h3>
      <ul style="padding-left: 20px; margin: 0;">
        <li style="margin-bottom: 10px;">💰 Inscription 100% gratuite</li>
        <li style="margin-bottom: 10px;">🏪 Fiche commerce complète</li>
        <li style="margin-bottom: 10px;">🎁 1 promotion gratuite</li>
        <li style="margin-bottom: 10px;">👥 Visibilité locale ciblée</li>
        <li style="margin-bottom: 10px;">🤖 Outils et agents IA spécialisés</li>
      </ul>
    </div>

    <!-- Highlight -->
    <div style="background: #FFF9E6; border-left: 4px solid #FFC107; padding: 15px; margin: 20px 0;">
      <p style="margin: 0; font-size: 15px; color: #5B6385;">
        <strong style="color: #1B2240;">⚡ Aucune commission sur vos ventes</strong><br>
        Contrairement aux autres plateformes, RabaisLocal ne prend aucun pourcentage sur vos revenus.
      </p>
    </div>

    <p style="font-size: 16px; margin-bottom: 20px;">
      Nous avons hâte de vous compter parmi les commerçants pionniers de RabaisLocal.
    </p>

    <p style="font-size: 16px; margin-bottom: 5px;">À très bientôt,</p>
    <p style="font-size: 16px; font-weight: bold; color: #3E53A5; margin-top: 0;">L'équipe RabaisLocal</p>
  </div>

  <!-- Footer -->
  <div style="text-align: center; padding: 20px 0; border-top: 1px solid #E3E8FF; margin-top: 30px;">
    <p style="font-size: 13px; color: #9E9E9E; margin-bottom: 10px;">
      <strong>RabaisLocal</strong> — Plateforme locale en pré-lancement
    </p>
    <p style="font-size: 12px; color: #BDBDBD; margin: 0;">
      Lancement officiel : 19 mars 2026
    </p>
    <p style="font-size: 12px; color: #BDBDBD; margin-top: 15px;">
      © 2025 RabaisLocal - Fait avec 💙 au Québec
    </p>
  </div>

</body>
</html>
```

---

## 🔧 Configuration du Webhook dans la Page

Dans `presentation-commercant.html`, remplace la ligne ~535 :

```javascript
const CONFIG = {
  refAffilie: '{{REF_AFFILIE}}',
  redirectUrl: 'https://marketing.rabaislocal.com/page1-commercant.html',
  webhookUrl: 'https://hook.eu1.make.com/xxxxxxxxxxxxx' // ← TON WEBHOOK ICI
};
```

---

## 🧪 Test du Scénario

1. Dans Make.com, clique sur **Run Once**
2. Ouvre `presentation-commercant.html`
3. Soumets un email de test
4. Vérifie dans Make.com que les données sont reçues
5. Vérifie ta boîte email (peut être dans spam la première fois)

---

## 📊 Modules Additionnels Recommandés

### **Module 3 : Google Sheets (Log)**

Pour garder une trace de toutes les inscriptions :

1. Ajoute **Google Sheets → Add a Row**
2. Configure :
   ```
   Spreadsheet: Commercants_Leads
   Sheet: Inscriptions
   Colonnes: Email | Ref | Timestamp | Statut
   ```

### **Module 4 : Slack (Notification)**

Pour être notifié en temps réel :

1. Ajoute **Slack → Create a Message**
2. Configure :
   ```
   Channel: #leads-commercants
   Message:
   🎉 Nouveau commerçant inscrit !
   📧 Email: {{email}}
   🔗 Ref: {{ref}}
   ```

---

## 🎯 Scénario Complet Recommandé - Webhook Unique

```
1. Webhook (Trigger)
   ↓
2. Router (OBLIGATOIRE - sépare commerçants et consommateurs)
   ↓
   ├─ Route 1: role_commercant = 1
   │   ↓
   │   ├─ Google Sheets → Add Row (Log commerçants)
   │   ↓
   │   ├─ Gmail/SendGrid → Send Email COMMERÇANT
   │   ↓
   │   └─ Slack → Notification #leads-commercants
   │
   └─ Route 2: role_consommateur = 1
       ↓
       ├─ Google Sheets → Add Row (Log consommateurs)
       ↓
       ├─ Gmail/SendGrid → Send Email CONSOMMATEUR
       ↓
       └─ Slack → Notification #leads-consommateurs
```

### **Configuration du Router**

1. Après le Webhook, ajoute **Flow Control → Router**
2. Crée deux routes :

**Route 1 - Commerçants :**
```
Condition: role_commercant = 1
Label: "Commerçants"
```

**Route 2 - Consommateurs :**
```
Condition: role_consommateur = 1
Label: "Consommateurs"
```

---

## 📧 Template Email CONSOMMATEUR

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenue sur RabaisLocal</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1B2240; max-width: 600px; margin: 0 auto; padding: 20px;">

  <!-- Header -->
  <div style="text-align: center; padding: 30px 20px; background: linear-gradient(135deg, #3E53A5 0%, #2c3e80 100%); color: white; border-radius: 10px;">
    <h1 style="margin: 0; font-size: 28px;">🎉 Bienvenue sur RabaisLocal !</h1>
    <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">Vos rabais locaux vous attendent</p>
  </div>

  <!-- Content -->
  <div style="padding: 30px 0;">
    <p style="font-size: 16px; margin-bottom: 20px;">Bonjour,</p>

    <p style="font-size: 16px; margin-bottom: 20px;">
      Merci de vous être inscrit sur <strong>RabaisLocal</strong>, la plateforme qui vous permet d'économiser chez les commerçants locaux près de chez vous.
    </p>

    <p style="font-size: 16px; margin-bottom: 20px;">
      Nous sommes actuellement en <strong>pré-lancement</strong>. En tant que membre des <strong>5 000 premiers inscrits</strong>, vous bénéficierez de <strong>crédits illimités lors du lancement officiel</strong>.
    </p>

    <!-- CTA Button -->
    <div style="text-align: center; margin: 35px 0;">
      <a href="https://app.rabaislocal.com/inscription-consommateur?email={{email}}" style="display: inline-block; background: linear-gradient(135deg, #4CAF50 0%, #388E3C 100%); color: white; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-size: 18px; font-weight: bold; box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);">
        🚀 Accéder à mon compte
      </a>
    </div>

    <!-- Benefits -->
    <div style="background: #F0F7FF; padding: 20px; border-radius: 8px; margin: 30px 0;">
      <h3 style="color: #3E53A5; font-size: 18px; margin-bottom: 15px;">✨ Ce qui vous attend :</h3>
      <ul style="padding-left: 20px; margin: 0;">
        <li style="margin-bottom: 10px;">💰 Crédits illimités au lancement</li>
        <li style="margin-bottom: 10px;">📍 Rabais locaux près de chez vous</li>
        <li style="margin-bottom: 10px;">🤖 Agent IA personnalisé</li>
        <li style="margin-bottom: 10px;">🔔 Notifications sur mesure</li>
        <li style="margin-bottom: 10px;">🎁 Aucun engagement, aucun abonnement</li>
      </ul>
    </div>

    <!-- Highlight -->
    <div style="background: #FFF9E6; border-left: 4px solid #FFC107; padding: 15px; margin: 20px 0;">
      <p style="margin: 0; font-size: 15px; color: #5B6385;">
        <strong style="color: #1B2240;">⚡ 100% Gratuit</strong><br>
        Inscription gratuite, crédits offerts, aucun paiement obligatoire.
      </p>
    </div>

    <p style="font-size: 16px; margin-bottom: 20px;">
      Nous avons hâte de vous aider à économiser chez vos commerçants locaux préférés.
    </p>

    <p style="font-size: 16px; margin-bottom: 5px;">À très bientôt,</p>
    <p style="font-size: 16px; font-weight: bold; color: #3E53A5; margin-top: 0;">L'équipe RabaisLocal</p>
  </div>

  <!-- Footer -->
  <div style="text-align: center; padding: 20px 0; border-top: 1px solid #E3E8FF; margin-top: 30px;">
    <p style="font-size: 13px; color: #9E9E9E; margin-bottom: 10px;">
      <strong>RabaisLocal</strong> — Plateforme locale en pré-lancement
    </p>
    <p style="font-size: 12px; color: #BDBDBD; margin: 0;">
      Lancement officiel : 19 mars 2026
    </p>
    <p style="font-size: 12px; color: #BDBDBD; margin-top: 15px;">
      © 2025 RabaisLocal - Fait avec 💙 au Québec
    </p>
  </div>

</body>
</html>
```

---

## 🔒 Sécurité

### **Validation des données**

Ajoute un module **Tools → Set Variables** avant l'envoi d'email :

```javascript
// Valider l'email
if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
  throw new Error('Email invalide');
}

// Valider la ref
if (!ref || ref === '{{REF_AFFILIE}}') {
  throw new Error('Ref affilié manquante');
}
```

---

## 💰 Coûts Make.com

- **Plan Gratuit** : 1000 opérations/mois
- **Plan Core** : 10 000 opérations/mois (~9$/mois)
- **Plan Pro** : Illimité (~29$/mois)

**Note :** 1 soumission = ~3-4 opérations (webhook + email + log)

---

## 📝 Variables Dynamiques Disponibles

Dans Make.com, tu peux utiliser :

```
{{email}}      - Email du commerçant
{{ref}}        - Référence affilié
{{link}}       - Lien complet avec ref
{{timestamp}}  - Date/heure de soumission
```

---

## 🆘 Dépannage

### **Le webhook ne reçoit rien**
- Vérifie que l'URL du webhook est correcte dans le HTML
- Vérifie que le scénario est activé (ON)
- Teste avec Postman ou curl

### **L'email n'est pas envoyé**
- Vérifie les credentials Gmail/SendGrid
- Vérifie que le module email est bien configuré
- Vérifie les logs Make.com pour les erreurs

### **L'email arrive en spam**
- Configure SPF et DKIM pour ton domaine
- Utilise SendGrid ou un service professionnel
- Évite les mots-clés spam dans le sujet

---

## 📞 Support Make.com

- Documentation : https://www.make.com/en/help
- Communauté : https://community.make.com/
- Support : help@make.com

---

**Prêt à automatiser tes inscriptions commerçants !** 🚀
