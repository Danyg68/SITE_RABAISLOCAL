# DOCUMENTATION COMPLETE DES TUNNELS DE VENTE RABAISLOCAL

**Derniere mise a jour:** 26 novembre 2025
**Version:** 2.0
**Projet:** RabaisLocal - Pre-lancement

---

## TABLE DES MATIERES

1. [Vue d'ensemble du systeme](#1-vue-densemble-du-systeme)
2. [Tunnel Consommateur](#2-tunnel-consommateur)
3. [Tunnel Commercant](#3-tunnel-commercant)
4. [Tunnel Affilie](#4-tunnel-affilie)
5. [Scenarios de validation et paiement](#5-scenarios-de-validation-et-paiement)
6. [Recapitulatif des scenarios Make](#6-recapitulatif-des-scenarios-make)
7. [Tables Supabase et structure](#7-tables-supabase-et-structure)
8. [Architecture technique](#8-architecture-technique)
9. [Notes importantes](#9-notes-importantes)
10. [Maintenance et troubleshooting](#10-maintenance-et-troubleshooting)

---

## 1. VUE D'ENSEMBLE DU SYSTEME

Le systeme RabaisLocal utilise trois tunnels de vente distincts pour gerer l'inscription des differents types d'utilisateurs :
- **Consommateurs** : Utilisateurs cherchant des rabais
- **Commercants** : Entreprises offrant des promotions
- **Affilies** : Partenaires generant des revenus par parrainage

Chaque tunnel est automatise via des scenarios Make.com qui interagissent avec :
- **GoAffPro** : Gestion des affilies et du programme de parrainage
- **Supabase** : Base de donnees pour le stockage des informations
- **Google Sheets** : Backup des inscriptions
- **PayPal** : Traitement des paiements (affilies)
- **Email SMTP** : Envoi des communications

---

## 2. TUNNEL CONSOMMATEUR

### 2.1 Vue d'ensemble
Le tunnel consommateur permet l'inscription gratuite avec un systeme de parrainage integre.

### 2.2 Scenario Make: "2025 Consommateur_signup__v2.0"

#### Webhook
- **Nom** : inscription consommateur version 3
- **Hook ID** : 1127941
- **URL** : Webhook Make custom

#### Flux du scenario

**Module 1: Reception webhook**
- Recoit les donnees du formulaire d'inscription
- **Champs recus** :
  - source
  - submitted_at
  - rl_ref (code de reference)
  - role
  - first_name
  - last_name
  - postal_code
  - email
  - page (url, title)
  - utm (source, medium, campaign, term, content)

**Module 2: Set Variable (CodeParrainFinal)**
- Definit le code de parrain final
- Si rl_ref est vide, met 0, sinon utilise rl_ref
- **Variable** : CodeParrainFinal

**Module 3: Get Affiliate (Recherche parrain)**
- **Connexion** : GoAffPro (Groupe_conso)
- Recherche par ref_code
- **Champs recuperes** : id, first_name, last_name, email, ref_code, company_name, ref_codes, zip

**Module 4: Get Affiliate (Verification email)**
- **Connexion** : GoAffPro (Groupe_conso)
- Recherche par email pour verifier si l'utilisateur existe deja
- **Champs recuperes** : id, first_name, last_name, email, ref_code, company_name, ref_codes

**Module 5: Router (Decision)**

#### Route 1 - Deja inscrit (Filtre: 4.id existe)

**Module 6: Send Email**
- **Destinataire** : L'email du formulaire ({{1.email}})
- **Expediteur** : envoi-form@rabaislocal.com (SMTP Likuid)
- **Sujet** : "Oups ton compte RabaisLocal existe deja (voici tes acces)"
- **Contenu HTML** :
  - Message expliquant que le compte existe
  - Lien de connexion : https://partenaires.rabaislocal.com/login
  - Lien mot de passe oublie : https://partenaires.rabaislocal.com/forgot-password
  - Instructions specifiques pour commercants deja inscrits (utiliser une autre adresse email)
  - Design moderne avec fond degrade

**Module 7: Google Sheets (Add Row)**
- **Spreadsheet** : RabaisLocal > Backup formulaire inscription > Consommateurs
- **Sheet** : Deja_inscrit
- **Champs inseres** :
  - timestamp (A): Date et heure formatees
  - Affiliate_id (B): {{4.id}}
  - email (C): {{1.email}}
  - first_name (D): {{1.first_name}}
  - last_name (E): {{1.last_name}}
  - ref_id (F): {{2.CodeParrainFinal}}
  - ref_id formulaire (I): {{1.rl_ref}}
- **Gestion erreur** : Ignore (on error)

**Module 20: Send Email (Notification interne)**
- **Destinataire** : inscription@rabaislocal.com
- **Sujet** : "tentative inscription nouvelle consommateur"
- **Contenu** : Details de la tentative d'inscription (comparaison donnees GoAffPro vs formulaire)
- **Gestion erreur** : Ignore (on error)

#### Route 2 - Nouvelle inscription (Filtre: 4.id n'existe pas)

**Module 9: Create Affiliate**
- **Connexion** : GoAffPro (Groupe_conso)
- **Donnees envoyees** :
  - email: {{1.email}}
  - password: {{1.last_name}}
  - password_expired: true (force changement)
  - first_name: {{1.first_name}}
  - last_name: {{1.last_name}}
  - zip: {{1.postal_code}}
  - status: pending
  - commission: on product (type vide)
  - parent_email: {{ifempty(3.email; empty)}} (si parrain existe)
- **Gestion erreur** : Break and Retry (3 tentatives, 15s intervalle)

**Module 11: HTTP Request (Assignation groupe consommateurs)**
- **URL** : https://api.goaffpro.com/v1/admin/affiliates/{{9.affiliate_id}}
- **Methode** : PATCH
- **Headers** :
  - Content-Type: application/json
  - X-GOAFFPRO-ACCESS-TOKEN: 187f764954d3b07e32f8e16d0ac3331d446f247bc50c57243d5eb58b66ec7c11
- **Body** : `{"group_id": 14143}`
- **Action** : Assigne le nouvel affilie au groupe consommateurs (14143)

**Module 12: Supabase Create Row (si applicable)**
- **Table** : inscrit_consommateur
- **Champs** :
  - email
  - prenom (first_name)
  - nom (last_name)
  - code_postal (postal_code)
  - ref_id_parrain (ID du parrain)
  - created_at (timestamp)
  - statut: "pending"

**Module 13: Google Sheets (Backup)**
- **Sheet** : Nouvelle_inscription
- Enregistre toutes les informations du nouveau consommateur
- **Gestion erreur** : Ignore

**Module 14: Send Email (Bienvenue - si applicable)**
- **Destinataire** : {{1.email}}
- **Sujet** : "Bienvenue chez RabaisLocal - Inscription confirmee"
- **Contenu** : Email de bienvenue personnalise avec instructions

**Module 25: Webhook Respond (Redirection)**
- **Status HTTP** : 302 (Redirection temporaire)
- **Header Location** : https://marketing.rabaislocal.com/page2-consommateur.html

---

## 3. TUNNEL COMMERCANT

### 3.1 Vue d'ensemble
Le tunnel commercant permet aux entreprises de s'inscrire pour offrir des promotions.

### 3.2 Scenario Make: "2025 CF_cie_signup__v2.0"

#### Webhook
- **Nom** : inscription_cie_free_2
- **Hook ID** : 1598694
- **URL** : Webhook Make custom

#### Flux du scenario

**Module 1: Reception webhook**
- **Champs recus** :
  - ref (code parrain)
  - prenom
  - nom
  - commerce (nom entreprise)
  - code_postal
  - email

**Module 2: Set Variable (CodeParrainFinal)**
- **Logique** : `if(length(1.ref) = 0; 0; 1.ref)`
- Meme principe que le tunnel consommateur

**Module 3: Get Affiliate (Recherche parrain)**
- **Connexion** : GoAffPro (Groupe_conso)
- Recherche par ref_code avec CodeParrainFinal
- **Champs** : id, first_name, last_name, email, ref_code, company_name, ref_codes, zip

**Module 4: Get Affiliate (Verification email)**
- Verifie si l'email existe deja dans le systeme GoAffPro

**Module 5: Router (Decision)**

#### Route 1 - Deja inscrit (Filtre: 4.id existe)

**Module 24: Webhook Respond (Redirection immediate)**
- **Status** : 302
- **Header Location** : https://marketing.rabaislocal.com/page2-commercant_deja_inscrit.html
- **Action** : Redirection AVANT l'envoi de l'email

**Module 6: Send Email (Alerte adresse utilisee)**
- **Destinataire** : {{1.email}}
- **Sujet** : "Adresse deja utilisee - choisissez une autre adresse pour votre compte commercant"
- **Contenu HTML** :
  - Explication que l'adresse est deja associee a un compte (consommateur ou affilie)
  - Instructions pour utiliser une adresse professionnelle
  - Exemple : contact@votrecommerce.com
  - Bouton CTA "Completer mon inscription commercant"
  - Lien retour formulaire : https://www.rabaislocal.net/page-0-choixparcours?ref={{1.ref}}
  - Design professionnel avec logo RabaisLocal
- **Gestion erreur** : Ignore

**Module 7: Google Sheets (Backup)**
- **Sheet** : cie_deja_inscrit
- **Spreadsheet** : RabaisLocal > Backup formulaire inscription > Commercants
- **Champs** :
  - timestamp (A): Date formatee
  - email (B): {{1.email}}
  - last_name (D): {{1.nom}}
  - compagny_name (E): {{1.commerce}}
  - cp (F): {{1.commerce}} (duplication?)
  - ref_id (G): {{4.ref_codes[]}}
  - Groupe (H): {{4.group_id}}
  - status (I): {{4.status}}
  - ref_id formulaire (J): {{1.ref}}
- **Gestion erreur** : Ignore

**Module 20: Send Email (Notification interne)**
- **Destinataire** : inscription@rabaislocal.com
- **Sujet** : "tentative inscription nouvelle cie"
- **Contenu** : Comparaison donnees GoAffPro vs formulaire
- **Gestion erreur** : Ignore

#### Route 2 - Nouvelle inscription (Filtre: 4.id n'existe pas)

**Module 9: Create Affiliate**
- **Connexion** : GoAffPro (Groupe_conso)
- **Donnees** :
  - email: {{1.email}}
  - password: {{1.nom}}
  - password_expired: true
  - first_name: {{1.prenom}}
  - last_name: {{1.nom}}
  - company_name: {{1.commerce}}
  - zip: {{1.code_postal}}
  - status: pending
  - commission: on product
  - parent_email: {{ifempty(3.email; empty)}}
- **Gestion erreur** : Break and Retry (3 tentatives, 15s)

**Module 11: HTTP Request (Assignation groupe commercants)**
- **URL** : https://api.goaffpro.com/v1/admin/affiliates/{{9.affiliate_id}}
- **Methode** : PATCH
- **Headers** : Memes que consommateur
- **Body** : `{"group_id": 12453}`
- **Action** : Assigne au groupe commercants (12453)

**Module 12: Supabase Create Row (si applicable)**
- **Table** : inscrit_commercant
- **Champs** : email, prenom, nom, commerce, code_postal, ref_parrain, created_at, statut

**Module 13: Google Sheets (Backup)**
- **Sheet** : Nouvelle_inscription_commercant
- Toutes les informations du nouveau commercant

**Module 14: Send Email (Bienvenue commercant - si applicable)**
- **Sujet** : "Bienvenue sur RabaisLocal - Inscription commercant confirmee"

**Module 15: Webhook Respond (Redirection)**
- **Header Location** : https://marketing.rabaislocal.com/page2-commercant.html

---

## 4. TUNNEL AFFILIE

### 4.1 Vue d'ensemble
Le tunnel affilie est le plus complexe car il inclut un systeme de paiement PayPal et differents cas de figure :
1. Nouvelle inscription affilie (avec paiement)
2. Upgrade consommateur vers affilie (avec paiement)
3. Deja affilie (tentative de re-inscription)

### 4.2 Scenario A: "2025 Affilie_mail_pre_paiement"

#### Webhook
- **Nom** : form_post_paiement
- **Hook ID** : 1592462
- **Objectif** : Enregistrer les informations AVANT le paiement PayPal

#### Flux du scenario

**Module 1: Reception webhook**
- **Champs recus** :
  - type (type d'inscription)
  - source (origine traffic)
  - transaction_id (ID temporaire)
  - ref (code parrain)
  - email
  - referer (URL precedente)
  - timestamp

**Module 2: Supabase Create Row**
- **Table** : BACKUP affilie_pre_inscription
- **Champs inseres** :
  - id (UUID auto-genere)
  - transaction_id: {{1.transaction_id}}
  - email: {{1.email}}
  - ref: {{1.ref}} (default: 0 si vide)
  - created_at: {{1.timestamp}}
- **Objectif** : Backup avant redirection PayPal

**Module 3: Send Email (Notification interne)**
- **Destinataire** : preinscription@rabaislocal.com
- **Sujet** : "Pre-inscription"
- **Contenu texte** :
  ```
  Voici les infos
  Type : {{1.type}}
  Source : {{1.source}}
  Id transaction : {{1.transaction_id}}
  Reference : {{1.ref}}{{1.referer}}
  Mail : {{1.email}}
  Date : {{1.referer}}
  {{1.timestamp}}
  ```
- **Note** : Quelques bugs dans le mapping (referer utilise deux fois)

### 4.3 Scenario B: "2025 Affilie_inscription_paypal"

#### Webhook
- **Nom** : Affilie_inscription_paypal
- **Hook ID** : 1593482
- **Objectif** : Traiter l'inscription complete APRES paiement PayPal

#### Flux du scenario

**Module 162: Reception webhook**
- **Champs recus** :
  - prenom, nom, email, telephone
  - adresse_numero, adresse_appartement, adresse_rue
  - ville, province, code_postal
  - referer
  - accept_contrat, accept_prelaunch, newsletter_optin (checkboxes)
  - transaction_id (ID PayPal)
  - ref (code parrain)
  - timestamp, type, source

**Module 2: Set Variable (CodeParrainFinal)**
- **Logique** : `if(length(162.ref) = 0; 0; 162.ref)`

**Module 3: Get Affiliate (Recherche parrain)**
- Recherche par ref_code
- **Champs** : id, email, ref_code, group_id

**Module 4: Get Affiliate (Verification email existant)**
- Recherche par email
- **Champs complets** : Tous les champs GoAffPro disponibles (40+ champs)

**Module 5: Router (3 routes possibles)**

#### Route 1 - Deja affilie (Filtre: 4.id existe ET group_id != 14143)

**Module 6: Send Email (Deja affilie)**
- **Destinataire** : {{162.email}}
- **Sujet** : "Bonne nouvelle {{162.prenom}} : tu fais deja partie des affilies RabaisLocal !"
- **Contenu HTML** :
  - Design moderne avec badge "PRE-LANCEMENT"
  - Message personnalise : "Bonjour {{162.prenom}}, tu es deja affilie RabaisLocal"
  - Section "Tes avantages affilies" :
    - Lien de parrainage actif : https://marketing.rabaislocal.com/?ref={{4.ref_code}}
    - Espace membre pour revenus et reseau
    - Trousse de lancement (agent IA + outils + automatisations)
    - Commissions recursur abonnements & credits
    - Evolutif jusqu'a 15 niveaux selon rang
  - Section "Tes privileges consommateur" :
    - Carte de membre active
    - Rabais jusqu'a 95% avec credits sans expiration
    - Offres eclairs, encheres, rabais mysteres
  - CTA : "Continue de partager !"
  - Rappel lancement officiel : 19 mars 2026

**Module 7: Google Sheets (Backup)**
- **Sheet** : Deja_affilie
- **Spreadsheet** : RabaisLocal > Backup formulaire inscription > Affilies
- **Champs** :
  - timestamp (A): {{162.timestamp}}
  - email (B): {{162.email}}
  - first_name (C): {{162.prenom}}
  - last_name (D): {{162.nom}}
  - ref_id (E): {{162.ref}}
  - ref_id formulaire (H): {{162.referer}}
- **Gestion erreur** : Ignore

#### Route 2 - Upgrade consommateur vers affilie (Filtre: 4.id existe ET group_id == 14143)

**Module 9: Update Affiliate**
- **Connexion** : GoAffPro (Groupe_conso)
- **ID** : {{4.id}}
- **Action** : Mise a jour du profil existant avec nouvelles donnees
- **Champs mis a jour** :
  - name: "{{162.prenom}}, {{162.nom}}"
  - first_name: {{162.prenom}}
  - last_name: {{162.nom}}
  - email: {{162.email}}
  - phone: {{162.telephone}}
  - address_1: "{{162.adresse_numero}} app. {{162.adresse_appartement}}"
  - city: {{162.ville}}
  - state: {{162.province}}
  - zip: {{162.code_postal}}
  - ref_code: {{4.id}} (utilise l'ID comme code de reference)
  - status: pending
  - commission: on product
  - password_expired: 1 (force changement mot de passe)
- **Gestion erreur** : Break and Retry (3 tentatives, 15s)

**Module 11: HTTP Request (Changement de groupe)**
- **URL** : https://api.goaffpro.com/v1/admin/affiliates/{{4.id}}
- **Methode** : PATCH
- **Body** : `{"group_id": 12452}`
- **Action** : Deplace du groupe consommateurs (14143) vers groupe affilies (12452)

**Module 12: Supabase Create Row (Upgrade)**
- **Table** : affilie_upgrade
- **Champs** :
  - affiliate_id: {{4.id}}
  - email: {{162.email}}
  - ancien_groupe: "14143"
  - nouveau_groupe: "12452"
  - upgrade_date: timestamp
  - Autres details de l'inscription

**Module 13: Send Email (Bienvenue nouvel affilie - upgrade)**
- **Sujet** : "Felicitations ! Tu es maintenant Affilie Fondateur RabaisLocal"
- **Contenu** : Email celebrant l'upgrade avec tous les avantages affilies

**Module 14: Webhook Respond (Redirection)**
- **Status** : 302
- **Location** : https://marketing.rabaislocal.com/page3-affilie.html

#### Route 3 - Nouvelle inscription affilie (Filtre: 4.id n'existe pas)

**Module 15: Create Affiliate**
- **Connexion** : GoAffPro (Groupe_conso)
- **Donnees completes** :
  - email: {{162.email}}
  - password: {{162.nom}}
  - password_expired: true
  - name: "{{162.prenom}}, {{162.nom}}"
  - first_name: {{162.prenom}}
  - last_name: {{162.nom}}
  - phone: {{162.telephone}}
  - address_1: "{{162.adresse_numero}} app. {{162.adresse_appartement}}"
  - city: {{162.ville}}
  - state: {{162.province}}
  - zip: {{162.code_postal}}
  - status: pending
  - commission: on product
  - parent_email: {{ifempty(3.email; empty)}} (si parrain existe)
- **Gestion erreur** : Break and Retry (3 tentatives, 15s)

**Module 16: HTTP Request (Assignation groupe affilies)**
- **URL** : https://api.goaffpro.com/v1/admin/affiliates/{{15.affiliate_id}}
- **Body** : `{"group_id": 12452}`

**Module 17: Supabase Create Row**
- **Table** : affilie_inscription
- **Champs** : Toutes les informations d'inscription complete
  - email, prenom, nom, telephone
  - adresse complete
  - ville, province, code_postal
  - ref_parrain, transaction_id
  - accept_contrat, accept_prelaunch, newsletter_optin
  - created_at, statut

**Module 18: Google Sheets (Backup)**
- **Sheet** : Nouvelle_inscription_affilie
- **Spreadsheet** : RabaisLocal > Backup formulaire inscription > Affilies

**Module 19: Send Email (Bienvenue nouvel affilie)**
- **Destinataire** : {{162.email}}
- **Sujet** : "Bienvenue en tant qu'Affilie Fondateur RabaisLocal"
- **Contenu HTML complet** :
  - Message de bienvenue personnalise
  - Acces espace membre : https://partenaires.rabaislocal.com/login
  - Lien de parrainage unique (genere apres creation)
  - Instructions pour creer mot de passe
  - Trousse de lancement disponible
  - Explication du systeme de commissions
  - Prochaines etapes detaillees

**Module 21: Webhook Respond (Redirection)**
- **Status** : 302
- **Location** : https://marketing.rabaislocal.com/page3-affilie.html

### 4.4 Scenario C: "Envoi Facture PayPal"

#### Webhook
- **Nom** : Paiement_PayPal_recu
- **Hook ID** : 1596205
- **Type** : IPN (Instant Payment Notification) PayPal
- **Objectif** : Enregistrer le paiement et envoyer le recu

#### Flux du scenario

**Module 2: Reception webhook PayPal IPN**
- **Champs PayPal standards recus** (37 champs) :
  - **Montants** :
    - mc_gross (montant brut)
    - mc_fee (frais PayPal)
    - payment_fee
    - mc_shipping
    - tax
    - discount
    - shipping_discount
  - **Transaction** :
    - txn_id (ID transaction unique)
    - txn_type (type de transaction)
    - payment_date
    - payment_status (Completed, Pending, etc.)
    - payment_type
    - receipt_id
  - **Payeur** :
    - payer_id
    - payer_email
    - payer_status
    - first_name
    - last_name
  - **Produit** :
    - item_number1
    - item_name1
    - quantity1
    - mc_gross_1
    - num_cart_items
  - **Commercant** :
    - business
    - receiver_email
    - receiver_id
  - **Divers** :
    - mc_currency (devise)
    - residence_country
    - custom (donnees custom)
    - notify_version
    - verify_sign (signature verification)
    - protection_eligibility
    - charset

**Module 3: Supabase Create Row**
- **Table** : Paiement_recu_PayPal
- **Champs inseres** :
  - id (integer, auto-increment)
  - nom: {{2.last_name}}
  - prenom: {{2.first_name}}
  - email: {{2.payer_email}}
  - paypal_trans_id: {{2.payer_id}}
  - montant: {{2.mc_gross}}
  - statut_transaction: {{2.payment_status}}
  - statut_dossier: "Paye" (valeur fixe)
  - created_at: {{2.payment_date}}
- **Note** : Telephone laisse vide a ce stade

**Module 4: Send Email (Recu de paiement)**
- **Destinataire** : {{2.payer_email}}
- **Expediteur** : envoi-form@rabaislocal.com (SMTP Likuid)
- **Sujet** : "Recu de paiement : Votre acces Affilie Fondateur"
- **Contenu HTML professionnel** :
  - **Header** : Fond noir avec logo "RABAISLOCAL"
  - **Message principal** :
    - "Bonjour **{{2.first_name}}**"
    - Confirmation reception paiement
    - "Bienvenue dans l'aventure RabaisLocal en tant qu'Affilie Fondateur !"
  - **Recu officiel** (tableau formate) :
    - Date : {{2.payment_date}}
    - N° Transaction : {{2.txn_id}}
    - Produit : Acces Affilie Fondateur
    - **TOTAL PAYE** : {{2.mc_gross}} $ CAD (en vert, taille 18px)
  - **Section "Action requise"** (fond bleu clair) :
    - Warning : Si pas encore finalise inscription (mot de passe et telephone)
    - Bouton CTA bleu : "Finaliser mon inscription"
    - Lien : https://marketing.rabaislocal.com/page2_form_affilie.html
  - **Footer** :
    - Signature equipe RabaisLocal
    - Copyright 2025
    - Mention email automatique
  - **Design** : Police Arial, max-width 600px, coins arrondis, ombres

---

## 5. SCENARIOS DE VALIDATION ET PAIEMENT

### 5.1 Scenario: "Scenario B1 Validation Universelle"

#### Webhook
- **Nom** : Validation Universelle
- **Hook ID** : 1600527
- **Objectif** : Valider les inscriptions par email (tous types d'utilisateurs)

#### Flux du scenario

**Module 1: Reception webhook**
- **Champs** : email (unique champ requis)

**Module 2: Get Affiliate (GoAffPro)**
- **Connexion** : GoAffPro (Groupe_conso)
- Recherche par email
- **Champs recuperes** : id, first_name, last_name, email, ref_code, group_id, status

**Module 3: Update Affiliate (Approbation)**
- **ID** : {{2.id}}
- **Changements** :
  - status: "approved" (passage de "pending" a "approved")
  - commission: on product
- **Objectif** : Active le compte
- **Gestion erreur** : Module 4 - Ignore (si deja approuve ou autre erreur)

**Module 6: Router (Decision selon groupe)**

#### Route 1 - Autres groupes (commercants, etc.) (Filtre: defaut)

**Module 11: Webhook Respond (Redirection commercant)**
- **Status** : 302
- **Header Location** : https://marketing.rabaislocal.com/page3-commercant.html

#### Route 2 - Groupe consommateurs (Filtre: group_id == 14143)

**Module 12: Send Email (Bienvenue consommateur valide)**
- **Destinataire** : {{1.email}}
- **Sujet** : "Bienvenue chez RabaisLocal - Tes avantages exclusifs sont deja prets !"
- **Contenu HTML ultra-detaille** :

  **Section 1: Header**
  - Logo RabaisLocal
  - Badge bleu : "PRE-LANCEMENT — Lancement officiel le 19 mars 2026"
  - Titre H1 : "Bienvenue {{2.first_name}}, Ton inscription est confirmee !"

  **Section 2: Confirmation membre fondateur**
  - "Felicitations ! Tu fais partie des **5 000 premiers consommateurs inscrits**"
  - Test gratuit 3 mois apres lancement officiel
  - Date lancement : **19 mars 2026**

  **Section 3: Avantages immediats (liste a puces)**
  - Carte RabaisLocal numerique (simple, sans app)
  - Promo credits illimites de bienvenue (barre ~25)
  - Rabais exclusifs jusqu'a 95%
  - Statut Membre Fondateur
  - Aucun engagement, zero frais cache

  **Section 4: Prochaine etape (fond gris)**
  - Titre : "Creer ton mot de passe et te connecter !"
  - **1. Identifiant** : {{1.email}} (en rouge gras)
  - **2. Creer mot de passe (OBLIGATOIRE)**
    - Bouton bleu : "Modifier mon mot de passe maintenant"
    - Lien : https://partenaires.rabaislocal.com/forgot-password
  - **Lien de connexion** : https://partenaires.rabaislocal.com/login
  - **Lien de referencement** : https://marketing.rabaislocal.com?ref={{2.id}}

  **Section 5: Important**
  - RabaisLocal en pre-lancement jusqu'au 19 mars 2026
  - Espace membre actif maintenant
  - Avantages disponibles au lancement
  - Lien Facebook : https://www.facebook.com/rabaislocal

  **Section 6: Footer**
  - Message solidarite locale
  - Signature equipe RabaisLocal
  - Lien desabonnement
  - Copyright

- **Gestion erreur** : Module 18 - Ignore (on error)

**Module 20: Webhook Respond (Redirection consommateur)**
- **Status** : 302
- **Header Location** : https://marketing.rabaislocal.com/page3-consommateur.html

---

## 6. RECAPITULATIF DES SCENARIOS MAKE

| Scenario | Webhook ID | Webhook Name | Declencheur | Tables Supabase | Google Sheets | Groupes GoAffPro | Actions principales | Emails envoyes |
|----------|-----------|-------------|------------|-----------------|---------------|------------------|---------------------|----------------|
| **Consommateur Signup v2.0** | 1127941 | inscription consommateur version 3 | Formulaire inscription consommateur | inscrit_consommateur (si applicable) | Consommateurs > Deja_inscrit<br>Consommateurs > Nouvelle_inscription | 14143 (consommateurs) | - Verification email existant<br>- Creation GoAffPro<br>- Assignation groupe 14143<br>- Backup Google Sheets | - "Compte existe deja"<br>- Email bienvenue<br>- Notification interne |
| **Commercant Signup v2.0** | 1598694 | inscription_cie_free_2 | Formulaire inscription commercant | inscrit_commercant (si applicable) | Commercants > cie_deja_inscrit<br>Commercants > Nouvelle_inscription_commercant | 12453 (commercants) | - Verification email existant<br>- Creation GoAffPro<br>- Assignation groupe 12453<br>- Redirection immediate si existe | - "Adresse utilisee"<br>- Email bienvenue commercant<br>- Notification interne |
| **Affilie Pre-paiement** | 1592462 | form_post_paiement | Formulaire avant paiement PayPal | BACKUP affilie_pre_inscription | - | - | - Enregistrement pre-inscription<br>- Backup avant PayPal | - Notification interne pre-inscription |
| **Affilie Inscription PayPal** | 1593482 | Affilie_inscription_paypal | Formulaire apres paiement affilie | affilie_inscription<br>affilie_upgrade | Affilies > Deja_affilie<br>Affilies > Nouvelle_inscription_affilie | 12452 (affilies)<br>14143 -> 12452 (upgrade) | - Verification status<br>- Creation ou Update GoAffPro<br>- Assignation/changement groupe<br>- Gestion upgrades consommateur | - "Deja affilie"<br>- Email upgrade conso->affilie<br>- Email bienvenue nouvel affilie |
| **Envoi Facture PayPal** | 1596205 | Paiement_PayPal_recu | IPN PayPal | Paiement_recu_PayPal | - | - | - Enregistrement paiement<br>- Extraction donnees PayPal | - Recu de paiement detaille |
| **Validation Universelle** | 1600527 | Validation Universelle | Click lien validation email | - | - | Tous (14143, 12452, 12453) | - Approbation affilie (pending -> approved)<br>- Routage selon groupe<br>- Redirection appropriee | - Email bienvenue complet (consommateurs)<br>- Pas d'email autres groupes (juste redirection) |

### 6.1 Webhooks Make - URLs completes

Tous les webhooks sont heberges sur le domaine Make :
- **Format** : `https://hook.us2.make.com/[HOOK_ID]`
- **Zone** : us2.make.com

**Liste des webhooks :**
1. `https://hook.us2.make.com/1127941` - Consommateur signup
2. `https://hook.us2.make.com/1598694` - Commercant signup
3. `https://hook.us2.make.com/1592462` - Affilie pre-paiement
4. `https://hook.us2.make.com/1593482` - Affilie inscription PayPal
5. `https://hook.us2.make.com/1596205` - Reception paiement PayPal (IPN)
6. `https://hook.us2.make.com/1600527` - Validation universelle

---

## 7. TABLES SUPABASE ET STRUCTURE

### 7.1 Table: inscrit_consommateur
**Objectif** : Enregistrer les inscriptions des consommateurs

```sql
CREATE TABLE inscrit_consommateur (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT,
  prenom TEXT,
  nom TEXT,
  code_postal TEXT,
  ref_id_parrain TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  statut TEXT DEFAULT 'pending'
);
```

**Index recommandes** :
- Index sur email (recherche rapide)
- Index sur ref_id_parrain (rapports parrainage)

### 7.2 Table: inscrit_commercant
**Objectif** : Enregistrer les inscriptions des commercants

```sql
CREATE TABLE inscrit_commercant (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT,
  prenom TEXT,
  nom TEXT,
  commerce TEXT, -- Nom de l'entreprise
  code_postal TEXT,
  ref_parrain TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  statut TEXT DEFAULT 'pending'
);
```

### 7.3 Table: BACKUP affilie_pre_inscription
**Objectif** : Backup des inscriptions affilies AVANT paiement PayPal

```sql
CREATE TABLE "BACKUP affilie_pre_inscription" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id TEXT,
  email TEXT,
  ref TEXT DEFAULT '0',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Note** : Nom de table avec espace - necessite quotes en SQL

### 7.4 Table: affilie_inscription
**Objectif** : Enregistrer les inscriptions completes des affilies

```sql
CREATE TABLE affilie_inscription (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  prenom TEXT,
  nom TEXT,
  telephone TEXT,
  adresse_numero TEXT,
  adresse_appartement TEXT,
  adresse_rue TEXT,
  ville TEXT,
  province TEXT,
  code_postal TEXT,
  ref_parrain TEXT,
  transaction_id TEXT, -- ID transaction PayPal
  accept_contrat BOOLEAN,
  accept_prelaunch BOOLEAN,
  newsletter_optin BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  statut TEXT DEFAULT 'pending'
);
```

**Index recommandes** :
- Index unique sur email
- Index sur transaction_id (lien avec PayPal)

### 7.5 Table: affilie_upgrade
**Objectif** : Historique des upgrades consommateur -> affilie

```sql
CREATE TABLE affilie_upgrade (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id TEXT NOT NULL, -- ID GoAffPro
  email TEXT NOT NULL,
  upgrade_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ancien_groupe TEXT DEFAULT '14143', -- Groupe consommateurs
  nouveau_groupe TEXT DEFAULT '12452', -- Groupe affilies
  statut TEXT,
  notes TEXT
);
```

**Utilite** :
- Tracking des conversions consommateur -> affilie
- Rapports marketing
- Calcul commissions sur upgrades

### 7.6 Table: Paiement_recu_PayPal
**Objectif** : Enregistrer tous les paiements PayPal recus

```sql
CREATE TABLE "Paiement_recu_PayPal" (
  id SERIAL PRIMARY KEY, -- Integer auto-increment
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  email TEXT,
  prenom TEXT,
  nom TEXT,
  paypal_trans_id TEXT UNIQUE, -- ID transaction PayPal (payer_id)
  telephone TEXT,
  statut_dossier TEXT DEFAULT 'attente_formulaire',
  montant TEXT, -- Stocke comme text pour garder format exact
  statut_transaction TEXT -- 'Completed', 'Pending', 'Refunded', etc.
);
```

**Notes importantes** :
- ID en INTEGER (pas UUID) pour compatibilite anciens systemes
- montant en TEXT pour eviter problemes d'arrondi
- paypal_trans_id doit etre UNIQUE pour eviter doublons
- statut_dossier permet de tracker le workflow complet

**Statuts possibles** :
- `attente_formulaire` : Paiement recu, en attente du formulaire complet
- `Paye` : Paiement confirme et formulaire complete
- `Rembourse` : Paiement rembourse
- `En_litige` : Probleme avec la transaction

### 7.7 Schema relationnel

```
inscrit_consommateur
    |
    +--[upgrade]--> affilie_upgrade
                        |
                        v
                    affilie_inscription
                        |
                        +--[paiement]-- Paiement_recu_PayPal
```

**Relations** :
- Un consommateur peut devenir affilie (upgrade)
- Un affilie a necessairement un paiement PayPal
- Le ref_parrain dans toutes les tables reference un affiliate_id GoAffPro

---

## 8. ARCHITECTURE TECHNIQUE

### 8.1 Systeme GoAffPro - Groupes d'utilisateurs

**Groupe 14143: Consommateurs**
- **Description** : Utilisateurs standard cherchant des rabais
- **Caracteristiques** :
  - Acces gratuit aux offres et promotions
  - Peuvent parrainer d'autres consommateurs
  - Peuvent etre upgrades vers affilies moyennant paiement
  - Carte de membre numerique
  - Credits promo de bienvenue
- **Privileges** :
  - Rabais jusqu'a 95%
  - Offres eclairs exclusives
  - Groupes d'achat
  - Encheres mysteres
- **Commission** : Aucune (consommation seulement)

**Groupe 12452: Affilies**
- **Description** : Partenaires generant des revenus par parrainage
- **Caracteristiques** :
  - Systeme de parrainage multiniveau (jusqu'a 15 niveaux)
  - Commissions recursives sur abonnements et credits
  - Tous les privileges consommateurs inclus
  - Acces a l'espace membre affilie complet
  - Trousse de lancement avec agent IA
- **Commission** : Sur tous les produits vendus dans leur reseau
- **Outils fournis** :
  - Lien de parrainage unique
  - Tableau de bord revenus et reseau
  - Materiel marketing (bannieres, posts sociaux)
  - Formations et webinaires
  - Support prioritaire

**Groupe 12453: Commercants**
- **Description** : Entreprises offrant des promotions sur RabaisLocal
- **Caracteristiques** :
  - Gestion de leurs offres et promotions
  - Tableau de bord commercant avec statistiques
  - Acces API pour integration
  - Formation et support dedie
- **Commission** : Peuvent gagner sur parrainages d'autres commercants
- **Outils fournis** :
  - Interface de creation d'offres
  - Calendrier de promotions
  - Statistiques de performance
  - Gestion des avis clients
  - Integration point de vente

### 8.2 Flux de donnees detaille

```
                        FORMULAIRE WEB
                              |
                              v
                     +-------------------+
                     | Webhook Make.com  |
                     +-------------------+
                              |
                              v
              +-------------------------------+
              | Module 1: Reception donnees   |
              | - Validation format           |
              | - Extraction champs           |
              +-------------------------------+
                              |
                              v
              +-------------------------------+
              | Module 2: Set Variable        |
              | - Traitement code parrain     |
              | - CodeParrainFinal = ref ou 0 |
              +-------------------------------+
                              |
                              v
              +-------------------------------+
              | Module 3: Get Affiliate       |
              | - Recherche parrain par ref   |
              | - GoAffPro API                |
              +-------------------------------+
                              |
                              v
              +-------------------------------+
              | Module 4: Get Affiliate       |
              | - Recherche user par email    |
              | - Verification doublon        |
              +-------------------------------+
                              |
                              v
                       [ROUTER - DECISION]
                              |
         +--------------------+--------------------+
         |                    |                    |
         v                    v                    v
   [EXISTE DEJA]      [NOUVEAU USER]       [UPGRADE CONSO]
         |                    |                    |
         v                    v                    v
  +-------------+      +-------------+      +-------------+
  | - Email     |      | - Create    |      | - Update    |
  |   deja      |      |   GoAffPro  |      |   GoAffPro  |
  |   inscrit   |      | - Assign    |      | - Change    |
  | - Backup    |      |   groupe    |      |   groupe    |
  |   GSheet    |      | - Supabase  |      | - Supabase  |
  | - Notif     |      | - Email     |      | - Email     |
  |   interne   |      | - Redirect  |      | - Redirect  |
  +-------------+      +-------------+      +-------------+
         |                    |                    |
         +--------------------+--------------------+
                              |
                              v
                       [FIN SCENARIO]
```

### 8.3 Gestion des erreurs et strategies de retry

**Hierarchie des operations (de critique a non-critique) :**

1. **Operations GoAffPro (CRITIQUES)**
   - **Modules concernes** : Create Affiliate, Update Affiliate, HTTP Request (assign group)
   - **Strategie** :
     ```
     Break and Retry:
       - Nombre tentatives: 3
       - Intervalle: 15 secondes
       - Mode: Automatique
     ```
   - **Si echec complet** :
     - Scenario marque comme incomplete
     - Notification admin via Make
     - Donnees conservees dans queue de retry
   - **Raisons d'echec possibles** :
     - Rate limit API GoAffPro
     - Timeout reseau
     - Validation echec (email invalide, etc.)
     - Email deja utilise (gere par router)

2. **Operations Supabase (IMPORTANTES)**
   - **Modules concernes** : Create Row dans toutes les tables
   - **Strategie** :
     ```
     Pas de retry automatique
     Continue on error: Non
     ```
   - **Si echec** :
     - Erreur loggee dans historique Make
     - Scenario arrete a cette etape
     - Donnees GoAffPro deja crees (pas de rollback)
     - Notification admin necessaire
   - **Raisons d'echec possibles** :
     - Contrainte UNIQUE violation
     - Schema mismatch
     - Connexion perdue
     - Quota atteint

3. **Operations Google Sheets (BACKUP)**
   - **Modules concernes** : Add Row
   - **Strategie** :
     ```
     Ignore errors:
       - On Error: Continue
       - Non-bloquant
     ```
   - **Si echec** :
     - Scenario continue sans interruption
     - Erreur loggee mais ignoree
     - Backup manque mais donnees principales OK
   - **Raisons d'echec possibles** :
     - Quota Google API
     - Permissions sheet
     - Format donnees invalide

4. **Operations Email (NOTIFICATIONS)**
   - **Modules concernes** : Send Email (tous)
   - **Strategie** :
     ```
     Ignore errors:
       - On Error: Continue
       - Non-bloquant
     ```
   - **Si echec** :
     - Scenario continue
     - Inscription/paiement quand meme valide
     - User ne recoit pas email (peut etre renvoye manuellement)
   - **Raisons d'echec possibles** :
     - Quota SMTP atteint
     - Email destinataire invalide
     - Serveur SMTP down
     - Contenu rejete (spam)

**Diagramme des priorites d'erreur :**
```
[GoAffPro]         --> CRITIQUE --> RETRY 3x --> Si echec: STOP + ALERTE
       |
       v
[Supabase]         --> IMPORTANT --> Pas retry --> Si echec: STOP + ALERTE
       |
       v
[Google Sheets]    --> BACKUP --> Ignore errors --> Continue toujours
       |
       v
[Email]            --> NOTIFICATION --> Ignore errors --> Continue toujours
       |
       v
[Webhook Respond]  --> FINAL --> Toujours execute
```

### 8.4 Securite et tokens

**GoAffPro API**
- **Token** : `187f764954d3b07e32f8e16d0ac3331d446f247bc50c57243d5eb58b66ec7c11`
- **Type** : Access Token permanent
- **Transmission** : Header `X-GOAFFPRO-ACCESS-TOKEN`
- **Permissions** :
  - Creation affilies
  - Modification affilies
  - Assignation groupes
  - Lecture donnees affilies
- **Rate limits** :
  - Non documente dans les blueprints
  - Gere par retry automatique
- **Securite** :
  - Token stocke dans connexion Make (encrypte)
  - Jamais expose dans logs ou emails

**Supabase**
- **Type** : Service Role Key (probablement)
- **Stockage** : Connexion Make securisee (ID: 5926029)
- **Nom connexion** : "RabaisLocal Supabase"
- **Permissions** :
  - INSERT sur toutes les tables
  - SELECT pour verifications (si necessaire)
- **Securite** :
  - Credentials jamais exposes
  - RLS (Row Level Security) peut etre applique
  - Logs d'acces Supabase actifs

**Email SMTP (Likuid)**
- **Service** : Likuid (fournisseur SMTP)
- **Compte** : ID Make 2792085
- **Expediteur** : envoi-form@rabaislocal.com
- **Connexion** : Connexion SMTP securisee (nom: "likuid (SMTP envoi-form@rabaislocal.com)")
- **Authentification** : Username/password stockes dans Make
- **Securite** :
  - TLS/SSL pour transmission
  - SPF/DKIM configures (suppose)
  - Quota journalier (non specifie)

**Google Sheets**
- **Type** : OAuth 2.0 Google
- **Compte** : rabaislocal@gmail.com
- **Connexion ID** : 2613380
- **Nom** : "My Google connection (rabaislocal@gmail.com)"
- **Permissions** :
  - Lecture/ecriture sur Google Drive
  - Acces aux spreadsheets specifiques
- **Securite** :
  - Refresh token stocke dans Make
  - Acces scope limite
  - 2FA recommande sur compte Google

**PayPal**
- **Type** : IPN (Instant Payment Notification)
- **Securite** :
  - Webhook URL secrete (hook ID 1596205)
  - Signature PayPal (`verify_sign`)
  - Validation IPN recommandee (callback PayPal)
- **Donnees sensibles** :
  - Transaction IDs
  - Montants de paiement
  - Emails payeurs
- **Recommandation** : Implementer validation IPN callback pour securite maximale

### 8.5 URLs et redirections - Cartographie complete

**Pages de destination post-inscription**
```
CONSOMMATEUR
- Nouvelle inscription:
  https://marketing.rabaislocal.com/page2-consommateur.html
- Apres validation email:
  https://marketing.rabaislocal.com/page3-consommateur.html

COMMERCANT
- Nouvelle inscription:
  https://marketing.rabaislocal.com/page2-commercant.html
- Deja inscrit:
  https://marketing.rabaislocal.com/page2-commercant_deja_inscrit.html
- Apres validation email:
  https://marketing.rabaislocal.com/page3-commercant.html

AFFILIE
- Apres paiement (formulaire final):
  https://marketing.rabaislocal.com/page2_form_affilie.html
- Apres inscription complete:
  https://marketing.rabaislocal.com/page3-affilie.html
```

**Portails utilisateurs**
```
AUTHENTIFICATION
- Connexion principale:
  https://partenaires.rabaislocal.com/login
- Mot de passe oublie:
  https://partenaires.rabaislocal.com/forgot-password
- Creation/modification mot de passe:
  https://partenaires.rabaislocal.com/forgot-password
  (meme URL, processus different selon statut)

PARRAINAGE
- Lien de parrainage generique:
  https://marketing.rabaislocal.com?ref={REF_CODE}
- Lien avec tracking UTM (exemple):
  https://marketing.rabaislocal.com?ref={REF_CODE}&utm_source=facebook&utm_medium=social
```

**Pages de choix et retour**
```
SELECTION PARCOURS
- Page principale choix profil:
  https://www.rabaislocal.net/page-0-choixparcours
- Avec code parrain:
  https://www.rabaislocal.net/page-0-choixparcours?ref={REF}
```

**Reseaux sociaux**
```
FACEBOOK
- Page officielle RabaisLocal:
  https://www.facebook.com/rabaislocal
```

**Flow de redirection par scenario**

```
CONSOMMATEUR FLOW:
Formulaire inscription
    --> Webhook Make (1127941)
    --> Si nouveau: Create GoAffPro + Supabase
    --> Redirection (302): page2-consommateur.html
    --> User clique lien validation dans email
    --> Webhook Make (1600527)
    --> Update GoAffPro (approved)
    --> Redirection (302): page3-consommateur.html
    --> FIN

COMMERCANT FLOW:
Formulaire inscription
    --> Webhook Make (1598694)
    --> Si existe: Redirection IMMEDIATE (302): page2-commercant_deja_inscrit.html
    --> Si nouveau: Create GoAffPro + Supabase
    --> Redirection (302): page2-commercant.html
    --> User clique lien validation dans email
    --> Webhook Make (1600527)
    --> Update GoAffPro (approved)
    --> Redirection (302): page3-commercant.html
    --> FIN

AFFILIE FLOW:
1. Formulaire pre-paiement
    --> Webhook Make (1592462)
    --> Backup Supabase
    --> User redirige vers PayPal
2. Paiement PayPal
    --> IPN PayPal --> Webhook Make (1596205)
    --> Enregistrement paiement Supabase
    --> Email recu envoye
3. Formulaire post-paiement complet
    --> Webhook Make (1593482)
    --> Si nouveau: Create GoAffPro
    --> Si upgrade: Update GoAffPro + Change groupe
    --> Redirection (302): page3-affilie.html
    --> FIN (pas de validation email separee pour affilies)
```

### 8.6 Timing et latence

**Temps de reponse typiques par operation :**
```
Reception webhook:           < 100ms
Get Affiliate (GoAffPro):    200-500ms
Create Affiliate:            500-1000ms
Update Affiliate:            300-700ms
HTTP Request (assign group): 200-400ms
Supabase Create Row:         100-300ms
Google Sheets Add Row:       500-2000ms (variable)
Send Email (SMTP):           500-2000ms
Webhook Respond:             < 50ms
```

**Duree totale estimee par scenario :**
```
Consommateur nouveau:        3-7 secondes
Consommateur existant:       2-4 secondes
Commercant nouveau:          3-7 secondes
Commercant existant:         1-2 secondes (redirection immediate)
Affilie pre-paiement:        1-2 secondes
Affilie post-paiement new:   5-10 secondes
Affilie post-paiement upgrade: 4-8 secondes
Reception PayPal IPN:        2-4 secondes
Validation universelle:      2-5 secondes
```

**Optimisations possibles :**
- Operations Google Sheets en parallele (actuellement sequentiel)
- Cache GoAffPro pour recherche parrain (si meme ref utilise souvent)
- Queue asynchrone pour emails (non-bloquant)

---

## 9. NOTES IMPORTANTES

### 9.1 Gestion des doublons

**Strategies de prevention :**

1. **Verification systematique par email**
   - Tous les scenarios checkent si l'email existe dans GoAffPro AVANT creation
   - Module "Get Affiliate" avec recherche par email
   - Si trouve (4.id existe), route vers "Deja inscrit"

2. **Messages adaptes selon le statut**
   ```
   Si Consommateur (group 14143):
     - Email: "Ton compte existe deja" + instructions connexion
     - Mention: Peut utiliser autre email si veut etre commercant

   Si Commercant (group 12453):
     - Redirection immediate: page2-commercant_deja_inscrit.html
     - Email: "Adresse deja utilisee" + demande adresse professionnelle
     - CTA: Retour au formulaire avec autre email

   Si Affilie (group 12452):
     - Email: "Tu fais deja partie des affilies"
     - Rappel avantages + lien de parrainage actif
     - Pas de re-creation de compte
   ```

3. **Cas particulier: Upgrade Consommateur -> Affilie**
   - Email existe MAIS groupe = 14143
   - Permet l'upgrade vers affilie (group 12452)
   - Update du profil existant (pas creation nouveau)
   - Changement de groupe via HTTP API
   - Historique dans table affilie_upgrade

4. **Protection au niveau base de donnees**
   - **Recommande** : Contrainte UNIQUE sur email dans toutes les tables Supabase
   - **Recommande** : Index sur email pour recherche rapide
   - Si doublon tente insertion Supabase: erreur attrapee et loggee

5. **Logs et notifications**
   - Toutes les tentatives d'inscription avec email existant sont:
     - Enregistrees dans Google Sheets (sheet "Deja_inscrit")
     - Notifiees par email a inscription@rabaislocal.com
     - Loggees dans historique Make

### 9.2 Systeme de parrainage

**Architecture du parrainage :**

1. **Code de reference (ref)**
   - **Format** : Numerique (ID GoAffPro de l'affilie)
   - **Transmission** : URL parameter `?ref={CODE}`
   - **Capture** : JavaScript frontend -> champ cache formulaire
   - **Exemples** :
     ```
     https://marketing.rabaislocal.com?ref=12345
     https://www.rabaislocal.net/page-0-choixparcours?ref=67890
     ```

2. **Attribution automatique du parrain**
   ```
   Formulaire soumis avec ref=12345
       |
       v
   Module "Set Variable" (CodeParrainFinal)
       |
       +-- Si ref vide --> CodeParrainFinal = 0 (pas de parrain)
       +-- Si ref existe --> CodeParrainFinal = ref
       |
       v
   Module "Get Affiliate" (recherche parrain)
       |
       +-- Recherche par ref_code = CodeParrainFinal
       +-- Si trouve --> parrain.id, parrain.email, etc.
       +-- Si pas trouve --> parrain.email = empty
       |
       v
   Module "Create Affiliate" (nouveau user)
       |
       +-- parent_email = {{ifempty(3.email; empty)}}
       +-- Lien permanent cree dans GoAffPro
       +-- Parrainage a VIE (ne change jamais)
   ```

3. **Conservation du lien a vie**
   - Une fois le parent_email defini dans GoAffPro, il NE CHANGE JAMAIS
   - Meme si le parrain change de groupe (conso -> affilie), le lien reste
   - Toutes les commissions futures seront attribuees a ce parrain
   - Tracking dans GoAffPro permet de voir tout le reseau sous chaque affilie

4. **Tracking des conversions**
   - GoAffPro track automatiquement:
     - Qui a parraine qui
     - Date de parrainage
     - Statut du filleul (pending, approved)
     - Conversions (inscriptions, achats, upgrades)
   - Supabase backup avec champs:
     - `ref_parrain` ou `ref_id_parrain` dans toutes les tables
     - Permet reporting custom si necessaire

5. **Types de conversions trackees**
   ```
   CONSOMMATEUR:
   - Parraine par: Consommateur OU Affilie
   - Parrain gagne: Points/credits (si consommateur) OU commission (si affilie)

   COMMERCANT:
   - Parraine par: Consommateur OU Affilie OU Commercant
   - Parrain gagne: Commission selon regle GoAffPro

   AFFILIE:
   - Parraine par: Affilie OU Commercant
   - Parrain gagne: Commission recursuve + bonus reseau
   - Calcul multiniveau (jusqu'a 15 niveaux selon rang)
   ```

6. **URL de parrainage personnalisee**
   - Generee automatiquement dans email de bienvenue
   - Format: `https://marketing.rabaislocal.com?ref={{AFFILIATE_ID}}`
   - Exemple reel: `https://marketing.rabaislocal.com?ref=54321`
   - Peut etre combine avec UTM tracking:
     ```
     https://marketing.rabaislocal.com?ref=54321&utm_source=facebook&utm_medium=post&utm_campaign=lancement
     ```

7. **Validation et securite**
   - Code ref valide par recherche GoAffPro
   - Si code invalide, traite comme ref=0 (pas de parrain)
   - Pas de modification possible apres creation compte
   - Admin peut modifier manuellement dans GoAffPro si necessaire

### 9.3 Pre-lancement et avantages membres fondateurs

**Calendrier du pre-lancement :**

- **Periode actuelle** : Pre-lancement (inscriptions en cours)
- **Date lancement officiel** : **19 mars 2026**
- **Duree pre-lancement** : ~4 mois (novembre 2025 - mars 2026)

**Programme Membres Fondateurs - Consommateurs :**

1. **Objectif des 5000 premiers**
   - Limite: 5000 consommateurs inscrits pendant pre-lancement
   - Statut special: "Membre Fondateur"
   - Badge/identifiant unique dans le systeme

2. **Avantages exclusifs**
   ```
   1. Test gratuit 3 mois
      - Debut: 19 mars 2026 (lancement)
      - Fin: 19 juin 2026
      - Acces complet sans frais

   2. Credits promo illimites
      - Mention baree "~25 Promo credits" --> illimites
      - Valables a vie (pas d'expiration)
      - Utilisables sur toutes les offres

   3. Acces anticipe
      - Inscription pendant pre-lancement
      - Compte actif avant tout le monde
      - Profil prepare pour le lancement

   4. Concours reserves
      - Tirages exclusifs membres fondateurs
      - Prix speciaux pre-lancement
      - Avantages non disponibles apres

   5. Badge Membre Fondateur
      - Visible sur profil
      - Reconnaissance communaute
      - Avantages futurs possibles
   ```

3. **Communication pre-lancement**
   - Tous les emails mentionnent:
     - "En pre-lancement"
     - Date 19 mars 2026 bien visible
     - "Avantages actives au lancement"
   - Exemple dans email validation:
     ```
     "Important : RabaisLocal est en pre-lancement jusqu'au 19 mars 2026.
      Ton espace membre est actif des maintenant, et tous tes avantages
      seront disponibles des le lancement officiel."
     ```

**Programme Affilies Fondateurs :**

1. **Conditions**
   - Paiement unique (montant non specifie dans blueprints)
   - Inscription pendant pre-lancement
   - Acceptation contrat affilie

2. **Avantages specifiques**
   ```
   1. Trousse de lancement
      - Agent IA pour marketing
      - Outils d'automatisation
      - Templates emails/posts
      - Formation exclusive

   2. Commissions avantageuses
      - Taux preferentiels (details non dans blueprints)
      - Recursives sur abonnements
      - Bonus sur upgrades reseau
      - Jusqu'a 15 niveaux

   3. Statut permanent
      - "Affilie Fondateur" a vie
      - Reconnaissance dans systeme
      - Acces prioritaire nouveautes

   4. Support prioritaire
      - Ligne directe equipe
      - Formation continue
      - Webinaires exclusifs
   ```

3. **Workflow paiement PayPal**
   ```
   1. Formulaire pre-paiement (hook 1592462)
      - Enregistrement email + ref parrain
      - Backup dans Supabase
      - Notification interne

   2. Redirection PayPal
      - User paye montant requis
      - PayPal IPN envoye (hook 1596205)
      - Recu enregistre Supabase

   3. Email recu automatique
      - Confirmation paiement
      - Details transaction
      - Lien formulaire final: page2_form_affilie.html

   4. Formulaire post-paiement complet (hook 1593482)
      - Infos completes (adresse, telephone, etc.)
      - Creation/upgrade compte GoAffPro
      - Assignation groupe 12452
      - Email bienvenue avec acces espace membre
   ```

**Programme Commercants :**

1. **Offre pre-lancement**
   - Inscription gratuite pendant pre-lancement
   - Periode de preparation avant lancement
   - Formation a la plateforme

2. **Preparation lancement**
   ```
   - Configuration profil entreprise
   - Creation premieres offres (en attente activation)
   - Test de l'interface commercant
   - Integration APIs si applicable
   - Formation equipe
   ```

3. **Avantages Commercants Fondateurs**
   - Visibilite accrue au lancement
   - Badge "Commercant Fondateur"
   - Frais possiblement reduits (non specifie dans blueprints)
   - Support dedie

### 9.4 Workflow complet PayPal (Affilies) - Details techniques

**Etape 1: Pre-inscription**
```
User sur page marketing
    |
    v
Remplir formulaire pre-paiement
    - Email
    - Code parrain (optionnel)
    |
    v
Submit formulaire --> Webhook Make 1592462
    |
    v
Scenario "Affilie_mail_pre_paiement"
    - Module 2: Insert Supabase (table: BACKUP affilie_pre_inscription)
      * Champs: transaction_id, email, ref, created_at
    - Module 3: Email notification interne
      * Destinataire: preinscription@rabaislocal.com
    |
    v
Page de remerciement / Redirection PayPal
    - URL PayPal avec:
      * item_name: "Acces Affilie Fondateur RabaisLocal"
      * amount: [MONTANT]
      * return_url: page2_form_affilie.html
      * cancel_url: page marketing
      * notify_url: https://hook.us2.make.com/1596205
```

**Etape 2: Paiement PayPal**
```
User sur page PayPal
    |
    v
Complete paiement (carte/compte PayPal)
    |
    v
PayPal envoie IPN (Instant Payment Notification)
    - POST asynchrone --> Webhook Make 1596205
    - Contenu: Tous les details transaction (37 champs)
    |
    v
Scenario "Envoi Facture PayPal"
    - Module 2: Reception webhook PayPal
      * Validation payment_status
      * Extraction donnees payeur
    - Module 3: Insert Supabase (table: Paiement_recu_PayPal)
      * Champs: nom, prenom, email, paypal_trans_id,
                montant, statut_transaction, created_at
      * statut_dossier = "Paye"
    - Module 4: Send Email (Recu de paiement)
      * Destinataire: payer_email
      * Sujet: "Recu de paiement : Votre acces Affilie Fondateur"
      * Contenu: HTML detaille avec:
        - Details transaction
        - Montant paye en gras vert
        - Bouton CTA: "Finaliser mon inscription"
        - Lien: https://marketing.rabaislocal.com/page2_form_affilie.html
    |
    v
PayPal redirige user vers return_url
    - page2_form_affilie.html
    - User voit message confirmation paiement
```

**Etape 3: Formulaire post-paiement complet**
```
User sur page2_form_affilie.html
    |
    v
Remplir formulaire complet
    - Prenom, Nom
    - Telephone
    - Adresse complete (numero, rue, app, ville, province, CP)
    - Checkboxes:
      * Accept contrat
      * Accept prelaunch
      * Newsletter optin
    - Hidden fields:
      * Email (pre-rempli)
      * Transaction ID PayPal
      * Ref parrain
    |
    v
Submit formulaire --> Webhook Make 1593482
    |
    v
Scenario "Affilie_inscription_paypal"
    - Module 162: Reception webhook
    - Module 2: Set Variable (CodeParrainFinal)
    - Module 3: Get Affiliate (recherche parrain)
    - Module 4: Get Affiliate (verification email)
    - Module 5: Router
      |
      +-- Si email existe ET groupe = 14143 (consommateur)
      |   |
      |   v
      |   ROUTE 2: Upgrade vers affilie
      |   - Module 9: Update Affiliate
      |     * Mise a jour profil avec nouvelles infos
      |     * password_expired = 1
      |   - Module 11: HTTP Request
      |     * Change group_id: 14143 --> 12452
      |   - Module 12: Insert Supabase (affilie_upgrade)
      |   - Module 13: Email bienvenue upgrade
      |   - Module 14: Redirect page3-affilie.html
      |
      +-- Si email n'existe pas
          |
          v
          ROUTE 3: Nouvelle inscription
          - Module 15: Create Affiliate
            * Toutes les infos du formulaire
            * status = pending
            * password_expired = true
          - Module 16: HTTP Request
            * Assign group_id = 12452
          - Module 17: Insert Supabase (affilie_inscription)
          - Module 18: Backup Google Sheets
          - Module 19: Email bienvenue affilie
          - Module 21: Redirect page3-affilie.html
```

**Etape 4: Post-inscription**
```
User sur page3-affilie.html
    - Message felicitations
    - Instructions prochaines etapes
    - Liens utiles
    |
    v
User recoit email bienvenue
    - Lien espace membre: partenaires.rabaislocal.com/login
    - Lien creation mot de passe: .../forgot-password
    - Lien de parrainage unique
    - Instructions utilisation plateforme
    |
    v
User cree son mot de passe
    - Via lien forgot-password
    - Email avec nouveau mot de passe
    - Ou directement dans GoAffPro portal
    |
    v
User se connecte espace membre
    - Dashboard affilies
    - Outils marketing
    - Statistiques reseau
    - Commissions
```

**Validations et securite dans le workflow :**

1. **Prevention doublons**
   - Check email existe a l'etape 3 (formulaire final)
   - Si existe: route vers upgrade ou "deja affilie"
   - Pas de double compte possible

2. **Coherence paiement**
   - Transaction ID PayPal enregistre a l'etape 2
   - Transmis dans formulaire final (hidden field)
   - Permet lier paiement <-> inscription
   - **Important** : Pas de verification automatique dans blueprint
   - **Recommandation** : Ajouter verification du payment_status dans scenario 1593482

3. **Gestion abandons**
   - Si paiement OK mais pas formulaire final:
     - Paiement enregistre dans Paiement_recu_PayPal
     - Email recu envoye avec lien formulaire
     - User peut revenir plus tard finaliser
     - statut_dossier reste "attente_formulaire" jusqu'a completion

4. **Cas d'erreur possibles**
   ```
   Erreur 1: Paiement echoue
     - User reste sur PayPal
     - Pas de IPN envoye
     - Peut reessayer

   Erreur 2: IPN non recu
     - Paiement OK chez PayPal mais pas enregistre
     - User ne recoit pas email recu
     - Verification manuelle necessaire
     - PayPal peut renvoyer IPN jusqu'a 15 fois

   Erreur 3: Formulaire final non soumis
     - Paiement OK et enregistre
     - Mais compte GoAffPro pas cree
     - Email recu contient lien formulaire
     - User peut soumettre plus tard

   Erreur 4: Creation GoAffPro echoue
     - Scenario utilise Break & Retry (3x15s)
     - Si echec complet: notification admin
     - Paiement deja enregistre
     - Peut etre cree manuellement
   ```

### 9.5 Changements de statut - Cycle de vie utilisateur

**Statuts GoAffPro disponibles :**
```
- pending   : En attente de validation
- approved  : Compte valide et actif
- rejected  : Compte refuse (rare, gestion manuelle)
- invited   : Invitation envoyee, en attente d'acceptation
```

**Flux de statuts par type d'utilisateur :**

**1. CONSOMMATEUR**
```
Formulaire soumis
    |
    v
[CREATION GOAFFPRO]
status: pending
group_id: 14143
password_expired: true
    |
    v
Email bienvenue envoye
    |
    v
User recoit email avec lien validation
    |
    v
User clique lien --> Webhook Make 1600527
    |
    v
[VALIDATION UNIVERSELLE]
status: pending --> approved
    |
    v
Email confirmation envoye (avec tous les details acces)
    |
    v
[STATUS FINAL: approved]
    |
    v
User peut se connecter et utiliser plateforme
```

**2. COMMERCANT**
```
Formulaire soumis
    |
    v
[CREATION GOAFFPRO]
status: pending
group_id: 12453
password_expired: true
    |
    v
Email bienvenue envoye
    |
    v
User recoit email avec lien validation
    |
    v
User clique lien --> Webhook Make 1600527
    |
    v
[VALIDATION UNIVERSELLE]
status: pending --> approved
    |
    v
Redirection page3-commercant.html (pas d'email supplementaire)
    |
    v
[STATUS FINAL: approved]
    |
    v
User peut se connecter et configurer commerce
```

**3. AFFILIE (Nouveau)**
```
Paiement PayPal OK
    |
    v
Formulaire post-paiement soumis
    |
    v
[CREATION GOAFFPRO]
status: pending
group_id: 12452
password_expired: true
    |
    v
Email bienvenue affilie envoye
    |
    v
[STATUS: pending mais compte utilisable]
    |
    v
User cree mot de passe et se connecte
    |
    v
Admin valide manuellement (ou automatique si config)
    |
    v
status: pending --> approved
    |
    v
[STATUS FINAL: approved]
    |
    v
Commissions activees, reseau actif
```

**4. AFFILIE (Upgrade depuis consommateur)**
```
Consommateur existant
status: approved
group_id: 14143
    |
    v
Paiement PayPal OK + Formulaire soumis
    |
    v
[UPDATE GOAFFPRO]
status: reste approved (pas change)
group_id: 14143 --> 12452
password_expired: 1 (force renouvellement)
Ajout: telephone, adresse complete
    |
    v
Email felicitations upgrade envoye
    |
    v
[STATUS FINAL: approved dans nouveau groupe]
    |
    v
User doit changer mot de passe a prochaine connexion
    |
    v
Acces outils affilies + garde acces consommateur
```

**Diagramme des statuts:**
```
                    [INSCRIPTION]
                         |
                         v
                   status: pending
                    group: assign
              password_expired: true
                         |
          +--------------+--------------+
          |              |              |
    [CONSOMMATEUR]  [COMMERCANT]   [AFFILIE]
       14143          12453          12452
          |              |              |
          v              v              v
     Validation     Validation     Paiement OK
       email          email       (pas validation)
          |              |              |
          v              v              v
    status: approved  status: approved  status: pending
          |              |                     |
          |              |                     v
          |              |              Admin valide
          |              |                     |
          |              |                     v
          +              +              status: approved
           \             |             /
            \            |            /
             \           |           /
              v          v          v
             [COMPTE ACTIF COMPLET]
```

**Actions possibles par statut :**

```
STATUS: pending
- Connexion possible (si mot de passe defini)
- Acces limite a l'espace membre
- Pas de commissions actives (affilies)
- Pas d'acces aux offres (consommateurs)
- Message "Compte en attente de validation"

STATUS: approved
- Connexion complete
- Acces complet a toutes fonctionnalites
- Commissions actives (affilies)
- Acces toutes offres (consommateurs)
- Peut parrainer

STATUS: rejected
- Connexion bloquee
- Message "Compte refuse"
- Contact support necessaire
- Rare, gestion manuelle

STATUS: invited
- Pas utilise dans les scenarios actuels
- Prevu pour invitations admins
- Statut temporaire avant acceptance
```

**Triggers de changement de statut :**

1. **pending --> approved**
   - Trigger: Click lien validation email
   - Scenario: Validation Universelle (1600527)
   - Automatique, sans intervention admin

2. **approved --> rejected**
   - Trigger: Action manuelle admin
   - Via interface GoAffPro
   - Raisons: Fraude, violation conditions, etc.

3. **pending --> rejected**
   - Trigger: Action manuelle admin
   - Avant meme validation email
   - Raisons: Email invalide, doublon detecte manuellement, etc.

4. **invited --> pending**
   - Trigger: User accepte invitation
   - Puis suit workflow normal vers approved

**Notifications par changement de statut :**

```
Creation (pending):
- Email bienvenue avec lien validation
- Instructions prochaines etapes
- Lien creation mot de passe

Validation (approved):
- Consommateurs: Email complet avec tous details
- Commercants: Redirection page (pas d'email)
- Affilies: Pas de notification (deja approves apres paiement)

Rejet (rejected):
- Email notification (si configure)
- Explication raison
- Contact support
```

---

## 10. MAINTENANCE ET TROUBLESHOOTING

### 10.1 Verifications regulieres

**Checklist quotidienne :**
```
[ ] Verifier executions Make.com
    - Acces: make.com > Scenarios > History
    - Chercher erreurs (statut "Error" ou "Incomplete")
    - Verifier taux de reussite > 95%

[ ] Controler synchronisation GoAffPro
    - Comparer nombre affilies GoAffPro vs Supabase
    - Verifier derniers IDs assignes correctement
    - Checker groupes (14143, 12452, 12453)

[ ] Valider backups Google Sheets
    - Verifier nouvelles lignes ajoutees
    - Comparer avec historique Make
    - S'assurer pas de trous dans sequences

[ ] Monitorer emails envoyes
    - Verifier bounce rate < 2%
    - Checker spam reports
    - Confirmer tous emails templates fonctionnent
```

**Checklist hebdomadaire :**
```
[ ] Analyse des paiements PayPal
    - Comparer Paiement_recu_PayPal vs PayPal dashboard
    - Verifier correspondance montants
    - Identifier paiements sans inscription complete

[ ] Revue des inscriptions incompletes
    - Paiements sans formulaire final
    - Formulaires sans validation email
    - Comptes pending depuis > 7 jours

[ ] Test des scenarios Make
    - Test inscription consommateur
    - Test inscription commercant
    - Test workflow affilie complet
    - Verification redirections

[ ] Revue des logs Supabase
    - Erreurs d'insertion
    - Requetes lentes
    - Espace utilise
```

**Checklist mensuelle :**
```
[ ] Audit complet GoAffPro
    - Verification integrite donnees
    - Nettoyage comptes test
    - Mise a jour groupes si necessaire

[ ] Analyse des performances
    - Temps moyen execution scenarios
    - Taux erreur par scenario
    - Taux conversion par tunnel

[ ] Revue securite
    - Rotation tokens si necessaire
    - Verification permissions
    - Audit acces Supabase

[ ] Backup complet
    - Export Supabase toutes tables
    - Download Google Sheets
    - Archive scenarios Make (export blueprints)
```

### 10.2 Points de vigilance

**1. Expiration tokens API**
```
SYMPTOME:
- Erreur "Unauthorized" ou "Invalid token"
- Scenarios echouent soudainement
- Erreur 401 dans logs Make

ACTION:
1. Verifier validite token GoAffPro
   - Test manuel: curl -H "X-GOAFFPRO-ACCESS-TOKEN: [TOKEN]" https://api.goaffpro.com/v1/admin/affiliates?limit=1
2. Si expire, regenerer dans GoAffPro dashboard
3. Mettre a jour dans Make:
   - Connections > GoAffPro > Edit
   - Remplacer token
4. Tester scenarios

PREVENTION:
- Documenter date expiration (si applicable)
- Configurer alerte 7 jours avant expiration
- Utiliser token sans expiration si possible
```

**2. Limites de rate sur GoAffPro API**
```
SYMPTOME:
- Erreur "Rate limit exceeded" ou "Too many requests"
- Erreur 429 dans logs
- Scenarios ralentissent ou echouent

ACTION IMMEDIATE:
1. Pause scenarios pendant 5 minutes
2. Verifier documentation limites GoAffPro
3. Activer "Break and Retry" si pas deja fait
4. Reduire frequence scenarios si declenchement automatique

ACTION LONG TERME:
- Implementer cache pour recherches frequentes
- Batch operations si possible
- Contacter GoAffPro pour augmenter limites

LIMITES TYPIQUES (a verifier):
- 100 requetes/minute
- 1000 requetes/heure
- Peut varier selon plan
```

**3. Quota emails SMTP**
```
SYMPTOME:
- Emails non recus
- Erreur "Quota exceeded" dans logs
- Bounce rate augmente

ACTION:
1. Verifier utilisation quota Likuid:
   - Dashboard fournisseur
   - Nombre emails envoyes aujourd'hui
2. Si limite atteinte:
   - Attendre reset (generalement minuit)
   - Ou upgrader plan
3. Verifier liste bounces:
   - Nettoyer emails invalides
   - Supprimer bounces permanents

PREVENTION:
- Monitorer usage quotidien
- Configurer alertes a 80% quota
- Prevoir plan superieur si croissance
- Implementer queue pour lisser envois

QUOTAS TYPIQUES:
- Plan basique: 1000-5000/jour
- Plan pro: 10000-50000/jour
- A verifier selon contrat Likuid
```

**4. Espace de stockage Supabase**
```
SYMPTOME:
- Erreur "Storage quota exceeded"
- Inserts echouent
- Dashboard Supabase affiche warning

ACTION:
1. Verifier usage actuel:
   - Supabase Dashboard > Settings > Usage
2. Identifier tables volumineuses:
   - SQL: SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename))
3. Nettoyage possible:
   - Archiver anciennes donnees
   - Supprimer logs anciens
   - Compresser backups

PREVENTION:
- Monitorer croissance hebdomadaire
- Configurer alerte a 80% quota
- Planifier archivage regulier
- Upgrader plan si necessaire

QUOTAS:
- Plan gratuit: 500 MB
- Plan Pro: 8 GB + extensions
```

### 10.3 Logs et monitoring

**1. Historique Make.com**
```
ACCES:
make.com > Organization > Scenarios > [Nom scenario] > History

INFORMATIONS DISPONIBLES:
- Date/heure execution
- Statut (Success, Error, Incomplete)
- Duree execution
- Nombre operations
- Erreurs detaillees
- Input/output chaque module

RETENTION:
- 30 jours plan gratuit
- 60+ jours plans payes
- Exporter si besoin archivage long terme

ANALYSE:
- Filtrer par statut "Error"
- Identifier patterns erreurs
- Verifier heures de pointe
- Comparer performances
```

**2. Logs Supabase**
```
ACCES:
Supabase Dashboard > Logs > [Choisir niveau]

TYPES DE LOGS:
- API logs: Toutes requetes API
- Postgres logs: Requetes SQL
- Auth logs: Authentifications
- Realtime logs: Subscriptions

REQUETES UTILES:
-- Erreurs insertion recentes
SELECT * FROM logs
WHERE level = 'error'
  AND message LIKE '%INSERT%'
  AND timestamp > NOW() - INTERVAL '24 hours';

-- Requetes lentes
SELECT query, total_time
FROM pg_stat_statements
WHERE total_time > 1000
ORDER BY total_time DESC;

RETENTION:
- 7 jours plan gratuit
- 90+ jours plans payes
```

**3. Backup Google Sheets comme reference**
```
LOCALISATION:
Google Drive > RabaisLocal > Backup formulaire inscription

SHEETS DISPONIBLES:
Consommateurs/
  - Deja_inscrit
  - Nouvelle_inscription

Commercants/
  - cie_deja_inscrit
  - Nouvelle_inscription_commercant

Affilies/
  - Deja_affilie
  - Nouvelle_inscription_affilie

UTILISATION:
- Reference en cas doute donnees Supabase
- Audit croise
- Export CSV pour analyse
- Verification sequences IDs

AUTOMATISATION:
- Apps Script pour rapports auto
- Alertes si pas de nouvelle ligne depuis X heures
- Dashboard Google Data Studio
```

**4. Notifications emails internes**
```
RECIPIENTS:
- preinscription@rabaislocal.com (pre-paiements affilies)
- inscription@rabaislocal.com (tentatives inscriptions existantes)

CONTENU TYPIQUE:
- Details tentative inscription
- Comparaison donnees GoAffPro vs formulaire
- Horodatage
- Code parrain si applicable

UTILISATION:
- Detection tentatives multiples (fraude?)
- Identification problemes UX (users confus?)
- Suivi conversions en temps reel
- Alertes manuelles si patterns anormaux
```

**5. Dashboards recommandes**

**Dashboard Make.com (natif):**
```
- Graphique executions par jour
- Taux de reussite par scenario
- Operations consommees
- Temps moyen execution
```

**Dashboard custom (Google Data Studio ou Metabase):**
```
METRIQUES CLES:
- Inscriptions par jour (tous types)
- Taux conversion (visite -> inscription)
- Taux validation email
- Paiements PayPal vs inscriptions completes
- Top 10 parrains (plus de filleuls)

SOURCES DONNEES:
- Supabase (requetes SQL)
- Google Sheets (import)
- GoAffPro API (si disponible)

ALERTES:
- Baisse > 50% inscriptions jour vs moyenne 7 jours
- Taux erreur scenarios > 5%
- Paiement sans inscription depuis > 24h
- Email bounce rate > 5%
```

---

## ANNEXES

### Annexe A: Codes de reponse HTTP

```
200 OK: Requete reussie
302 Found: Redirection temporaire (utilise dans tous les scenarios)
400 Bad Request: Donnees invalides
401 Unauthorized: Token invalide/expire
404 Not Found: Ressource inexistante
429 Too Many Requests: Rate limit atteint
500 Internal Server Error: Erreur serveur
```

### Annexe B: Champs GoAffPro complets

Liste complete des champs disponibles dans GoAffPro (extraite des blueprints):
```
- id
- avatar
- honorific
- date_of_birth
- gender (Male/Female)
- name
- first_name
- last_name
- email
- ref_code
- company_name
- ref_codes (array)
- coupon
- coupons (array)
- phone
- website
- facebook, twitter, instagram, snapchat, pinterest
- address_1, address_2
- city, state, zip, country
- admin_note
- extra_1, extra_2, extra_3
- group_id
- registration_ip
- personal_message
- payment_method, payment_details
- commission (type, amount, on)
- status (pending/approved/invited/rejected)
- last_login
- total_referral_earnings
- total_network_earnings
- total_amount_paid
- total_amount_pending
- total_other_earnings
- number_of_orders
- tax_identification_number
- login_token
- signup_page
- comments
- password (write-only)
- password_expired (boolean)
- paypal_email
- parent_email (parrain)
```

### Annexe C: Exemples de requetes SQL utiles

```sql
-- Statistiques inscriptions par jour
SELECT
  DATE(created_at) as date,
  COUNT(*) as inscriptions
FROM inscrit_consommateur
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Top 10 parrains
SELECT
  ref_id_parrain,
  COUNT(*) as filleuls
FROM inscrit_consommateur
WHERE ref_id_parrain IS NOT NULL
  AND ref_id_parrain != '0'
GROUP BY ref_id_parrain
ORDER BY filleuls DESC
LIMIT 10;

-- Paiements sans inscription complete
SELECT
  p.email,
  p.created_at as date_paiement,
  p.montant,
  a.email as inscription_complete
FROM "Paiement_recu_PayPal" p
LEFT JOIN affilie_inscription a ON p.email = a.email
WHERE a.email IS NULL
ORDER BY p.created_at DESC;

-- Taux de conversion validation email
SELECT
  COUNT(*) as total_inscrits,
  SUM(CASE WHEN statut = 'approved' THEN 1 ELSE 0 END) as valides,
  ROUND(100.0 * SUM(CASE WHEN statut = 'approved' THEN 1 ELSE 0 END) / COUNT(*), 2) as taux_validation_pct
FROM inscrit_consommateur;
```

---

**FIN DE LA DOCUMENTATION**

**Document genere le** : 26 novembre 2025
**Version** : 2.0
**Auteur** : Analyse complete des blueprints Make.com
**Fichiers sources analyses** :
- 2025 Consommateur_signup__v2.0.blueprint.json
- 2025 CF_cie_signup__v2.0.blueprint.json
- 2025 Affilie_mail_pre_paiement.blueprint.json
- 2025 Affilie_inscription_paypal.blueprint (2).json
- Envoi Facture PayPal .blueprint.json
- Scenario B1 Validation Universelle.blueprint.json

**Statut** : Documentation technique complete et detaillee
**Prochaine revision** : A effectuer apres lancement officiel (19 mars 2026)
