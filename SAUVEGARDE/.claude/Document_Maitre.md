
Cahier de charge RabaisLocal – Plateforme principale (RabaisLocal.com)

Version 2.0 – Novembre 2025
Document confidentiel – Usage interne
Rédigé par Dany Gosselin – Fondateur de RabaisLocal

🧭 SOMMAIRE SIMPLIFIÉ (Vue d’ensemble)
Page de garde et sommaire
Vision et objectifs du projet
Architecture technique et interconnexions
Description détaillée des modules (A → M)
Modèle de données Supabase
API et automatisations Make
Sécurité, Loi 25 et conformité
Gestion des paiements et flux financiers
SEO, application mobile et roadmap
Fiche de suivi modulaire et annexes

📑 TABLE DES MATIÈRES DÉTAILLÉE (Structure interne complète)
1. Page de garde
1.1 Informations générales
1.2 Table des révisions
1.3 Mentions de confidentialité
2. Sommaire
2.1  matières détaillée
3. Introduction exécutive
3.1 Vision du projet
3.2 Mission et philosophie RabaisLocal
3.3 Contexte économique et opportunité
3.4 Objectifs stratégiques
4. Architecture technique et interconnexions
4.1 Technologies principales
4.2 Diagramme technique (flux et légende)
4.3 Structure par sous-domaines
4.4 Modèle modulaire et interconnexion Make / Supabase
4.5 Hébergement et infogérance
5. Description détaillée des modules fonctionnels
Module utilisateurs & authentification
Module système de crédits et portefeuille
Module commerçants
Module consommateurs
Module affiliés
Module intelligence artificielle (IA)
Module administrateur (Retool)
Module légal et conformité
Module marketing et communication
Module analytics et performance
Module sécurité et infrastructure
Module gestion de contenu (CMS)
Module expansion future
6. Modèle de données Supabase
6.1 Schéma général (tables, relations)
6.2 Exemples de champs clés
6.3 Bonnes pratiques de structuration
7. API et automatisations Make
7.1 Webhooks principaux
7.2 Scénarios Make (par module)
7.3 Synchronisation Supabase ↔ GoAffPro
7.4 Notifications automatisées (email / push / IA)
7.5 Plan de maintenance Make
8. Sécurité, Loi 25 et conformité
8.1 Gestion des consentements et cookies
8.2 Sauvegardes automatiques et chiffrement
8.3 Politique d’effacement et d’anonymisation
8.4 Export des données utilisateurs
8.5 Procédure d’audit annuel
9. Gestion des paiements et flux financiers
9.1 Intégration Payments.AI et PayPal
9.2 Gestion des frais mensuels et annuels
9.3 Comptes internes (crédits et commissions)
9.4 Scénarios de transfert automatisé
9.5 Conformité fiscale (TPS/TVQ)
10. SEO, application mobile et roadmap
10.1 SEO régional et structure des pages
10.2 Campagnes et UTM tracking
10.3 Application mobile (fonctionnalités distinctes)
10.4 Connexion Supabase Auth entre web et app
10.5 Roadmap 2025–2026
11. Fiche de suivi modulaire
11.1 Structure de suivi par module
11.2 Modèle de tableau de progression
11.3 États (en dev / en test / en ligne)
12. Annexes techniques
12.1 Charte graphique RabaisLocal
12.2 Sous-domaines et DNS
12.3 Diagramme technique global
12.4 Schéma de notifications Make
12.5 Documentation API (brouillon Swagger)

🎯 3. Vision et objectifs du projet
3.1 Vision du projet
RabaisLocal a pour vision de devenir la plateforme québécoise de référence pour l’économie locale intelligente, où chaque citoyen peut découvrir, soutenir et profiter des commerces de sa région tout en bénéficiant d’un système d’économies simple, transparent et automatisé.
Cette vision repose sur un principe fondamental :
🧭 Chaque dollar dépensé localement doit renforcer directement l’économie régionale et profiter à la communauté, pas à des intermédiaires.
L’objectif est de bâtir un écosystème vertueux propulsé par l’intelligence artificielle, où :
Les commerçants créent et gèrent eux-mêmes leurs promotions sans commission en moins de 20 minutes grâce à a l’agent ia.
Les consommateurs profitent d’offres personnalisées et géolocalisées en temps réel.
Les affiliés développent un revenu passif équitable simplement en partageant leur lien RabaisLocal.
RabaisLocal ambitionne de devenir un moteur économique humain et intelligent, au service du Québec d’abord, puis du Canada.

3.2 Mission et philosophie RabaisLocal
Mission
Offrir une plateforme sans commission qui relie les consommateurs, les commerçants et les ambassadeurs de l’économie locale, à travers des rabais exclusifs propulsés par l’IA, un système de crédits flexibles, et un programme d’affiliation 2.0 éthique.
Philosophie
RabaisLocal s’appuie sur quatre valeurs clés :
Transparence — aucune commission cachée, aucune vente forcée.
Automatisation intelligente — l’IA et Make s’occupent du travail répétitif, permettant à chacun de se concentrer sur sa croissance.
Économie durable — chaque transaction soutient les commerces de proximité et finance des causes locales (3 % des revenus).
Accessibilité universelle — plateforme intuitive, adaptée à tous les niveaux technologiques.
Positionnement stratégique
RabaisLocal se situe entre les marketplaces de rabais (Groupon, Tuango) et les solutions de fidélisation locales (Panier Bleu, Shoplocal),
mais avec trois différences majeures :
Zéro commission : les commerçants gardent 100 % de leurs revenus.
Intelligence artificielle : création et diffusion automatisées des offres.
Économie circulaire : chaque région a son propre écosystème de rabais et d’ambassadeurs.
💡 RabaisLocal n’est pas qu’un site de rabais : c’est un mouvement collectif pour redonner le pouvoir économique aux citoyens.

3.3 Contexte économique et opportunité
Tendances actuelles
83 % des consommateurs québécois souhaitent soutenir davantage les commerces de leur région.
Plus de 60 % des commerçants locaux affirment manquer de visibilité numérique.
Le commerce local représente près de 85 milliards $/an au Québec, mais une grande partie de la consommation s’échappe vers les grandes plateformes internationales.
Limites des plateformes existantes
Fenêtre d’opportunité
La montée du mouvement “acheter local” post-pandémie, combinée à la démocratisation des outils IA et no-code, crée une fenêtre unique pour bâtir une plateforme :
100 % québécoise,
financièrement équitable,
et techniquement automatisée.
💬 RabaisLocal s’impose comme la solution qui allie technologie, proximité et impact réel.

Court terme (pré-lancement – mars 2026)
Développer la plateforme web complète (modules A → M).
Recruter et former 500 membres fondateurs et ambassadeurs régionaux.
Tester tous les flux automatisés (inscriptions, crédits, paiements, IA).
Atteindre 2 600 membres inscrits avant le lancement officiel.
Moyen terme (2026–2027)
Lancer l’application mobile (iOS & Android).
Intégrer les trois agents IA : consommateur, commerçant et affilié.
Ouvrir l’accès aux partenaires régionaux (municipalités, chambres de commerce).
Objectif : 500 commerçants actifs et 20 000 membres utilisateurs.
Long terme (2027–2028)
Devenir la plateforme #1 d’économie locale au Canada.
Étendre le concept à l’international francophone (France, Belgique, Suisse).
Créer la Fondation RabaisLocal, finançant chaque année des projets communautaires avec 3 % des revenus redistribués.
Établir une fondation RabaisLocal pour financer des projets communautaires.
3.5 Indicateurs de performance (KPI)

💬 RabaisLocal n’est pas un simple site de rabais — c’est une architecture économique intelligente au service du Québec.

⚙️ 4. Architecture technique et interconnexions

4.1 Vue d’ensemble
RabaisLocal est une plateforme modulaire no-code / low-code reposant sur une architecture distribuée, connectée par des automatisations intelligentes.
Chaque module (consommateur, commerçant, affilié, IA, administration) fonctionne de manière semi-autonome, tout en partageant une base de données centralisée via Supabase.
L’objectif principal de cette architecture est de garantir :
Flexibilité : chaque module peut être développé indépendamment ou sous-traité sans affecter les autres.
Scalabilité : montée en charge progressive sans refonte du système.
Sécurité : isolation des accès et séparation des environnements sensibles.
Automatisation : 90 % des flux internes gérés par Make (ex-Integromat).

4.2 Technologies principales

4.3 Architecture modulaire et sous-domaines
RabaisLocal utilise une architecture multi-sous-domaines afin d’isoler les environnements, tout en gardant une cohérence visuelle et une base commune.
Chaque sous-domaine est isolé au niveau DNS et SSL, mais relié par des webhooks Make et des Edge Functions Supabase.

4.4 Flux d’interconnexion technique
Diagramme des flux (schéma logique)
(reprend celui du PNG fourni)
[Utilisateur]
   ↓
[Webflow / ClickFunnels] 🔴→ (Webhook) → [Make]
   ↓
[Supabase] 🔵↔ [GoAffPro] 🔴↔ [Payments.AI / PayPal] 🟢
   ↓
[Retool (Admin)] 🔵↔ [IA Agents] 🔴
Explication des flux principaux
Formulaires d’inscription → envoyés vers Make → création automatique de l’utilisateur dans Supabase et GoAffPro.
Achat / abonnement / crédits → déclenchement Make → création de facture + paiement via Payments.AI ou PayPal → enregistrement Supabase.
IA Commerçant → reçoit les données du commerce via Supabase → génère automatiquement texte + visuel Canva → renvoie lien de promo.
IA Consommateur → lit les préférences d’achat (Supabase) → recommande des offres personnalisées.

4.5 Environnements et déploiement
Des sauvegardes automatiques Supabase sont exportées quotidiennement vers un stockage externe sécurisé (Google Drive pro).
4.6 Schéma des flux Make (type macro)


4.7 Sécurité et authentification
Connexion utilisateur : via Supabase Auth, compatible email + Google + Facebook + Apple.
2FA (optionnel) : activable pour les affiliés et commerçants.
reCAPTCHA sur tous les formulaires publics.
Chiffrement TLS/SSL : obligatoire sur tous les sous-domaines.
Logs d’activité : chaque action critique (ajout crédits, paiement, création offre, modification compte) est enregistrée dans une table logs_audit.
Politique d’accès : séparation des rôles dans Supabase (consumer, merchant, affiliate, admin, support).
4.8 Gestion des notifications
RabaisLocal adopte un système centralisé de communication automatisée, géré par Make et relié à Supabase.
Toutes les notifications sont synchronisées dans une table notifications_log pour conformité Loi 25.
4.9 Gestion des rôles et accès
4.10 Objectifs techniques clés
Disponibilité : 99,8 %
Temps de réponse moyen : < 300 ms (via CDN canadien)
Sauvegardes : journalières (7 jours glissants)
Automatisations : > 90 % des flux internes
Maintenance : 1 fois/mois avec page de maintenance IA automatique
Sécurité : conforme Loi 25 + RGPD
🧱 5. Description détaillée des modules fonctionnels

🅰️ A. Module Utilisateurs & Authentification
Objectif
Gérer l’inscription, la connexion et la gestion des profils pour les trois rôles principaux : consommateur, commerçant et affilié.
Fonctionnalités clés
Création de compte avec choix de rôle (3 tunnels distincts ClickFunnels).
Authentification via Supabase Auth (email, Google, Facebook, Apple).
Validation email (simple).
Récupération du mot de passe.
Gestion des rôles multiples :
Un consommateur peut aussi devenir affilié.
Un commerçant doit utiliser une adresse différente.
Profil enrichi : photo, ville, notifications, historique.
Gestion de session centralisée (Supabase Auth).
Critères d’acceptation
✅ Un utilisateur peut créer un compte et se reconnecter sans aide.
✅ Les rôles sont automatiquement attribués à la création.
✅ Le bouton “Devenir affilié” apparaît sur le tableau de bord consommateur.
✅ Les informations sont synchronisées dans Supabase et Make.
Automatisations Make
Webhook_Signup → Crée utilisateur Supabase → Ajoute tag “consumer” / “merchant” / “affiliate” → Envoie email via MailerSend.

🅱️ B. Module Système de Crédits & Portefeuille
Objectif
Permettre aux consommateurs et affiliés d’acheter, gérer et utiliser des crédits pour réserver des rabais.
Fonctionnalités clés
Achat de crédits via Payments.AI ou PayPal.
Attribution automatique des crédits gratuits mensuels (non cumulables).
Historique complet : achats, utilisations, transferts internes.
Double portefeuille :
Compte 1 : crédits et frais mensuels (27 $/mois prélevés automatiquement).
Compte 2 : solde des commissions et gains transférables.
Système de conversion : 1 crédit = 0,35–0,50 $.
Utilisation des crédits : réservation de rabais (3 à 5 crédits par offre).
Règles de gestion
Les crédits achetés n’expirent jamais.
Les crédits gratuits mensuels se réinitialisent chaque mois.
Le transfert de crédits entre utilisateurs n’est pas autorisé.
Critères d’acceptation
✅ Les crédits s’ajoutent automatiquement après un paiement réussi.
✅ Les déductions sont enregistrées dans Supabase et visibles dans Retool.
✅ Les soldes sont cohérents entre Supabase et Payments.AI.

🏪 C. Module Commerçants
Objectif
Permettre aux commerçants de créer, gérer et suivre leurs promotions locales avec assistance IA.
Fonctionnalités clés
Création de promotions via IA : texte + visuel Canva générés automatiquement.
Gestion des promotions actives (date, quota, visibilité).
Accès aux statistiques : vues, réservations, taux de conversion.
Gestion des forfaits :
Gratuit : 2 promos/mois
Bronze : 50 promos/mois
Argent : 85 promos/mois
Or : illimité
Collaboration entre commerces (offres groupées).
Tableau de bord commercial (Retool + Supabase).
Critères d’acceptation
✅ Un commerçant peut créer une promotion complète en moins de 20 minutes.
✅ Les visuels et textes sont automatiquement générés par l’IA.
✅ Le quota de promotions est respecté selon le forfait.
✅ Les statistiques sont visibles en temps réel.
Automatisations Make
Webhook_Commercant_NewPromo → Génère texte via OpenAI + visuel Canva → Crée entrée Supabase → Notifie commerçant (MailerSend).

🛍️ D. Module Consommateurs
Objectif
Offrir aux consommateurs une expérience fluide pour découvrir, réserver et utiliser des rabais exclusifs.
Fonctionnalités clés
Accès aux offres par ville, catégorie ou IA.
Carte membre virtuelle avec QR code unique par offre réservée.
Historique complet des rabais utilisés.
Système d’avis et de notation (commerce ↔ consommateur).
Notifications géolocalisées : “Un commerce RabaisLocal près de vous !”
Partage social : Facebook, TikTok, etc.
Participation à des concours et défis pour gagner des crédits.
Section “Carte de membre” avec recherche rapide d’offres actives.
Critères d’acceptation
✅ Le QR code fonctionne et valide un rabais en magasin.
✅ Les offres sont géolocalisées correctement.
✅ Les partages sociaux créditent l’utilisateur.
✅ Les avis inappropriés sont filtrés par IA.
Automatisations Make
Webhook_Reservation → Déduit crédits → Génère QR code → Envoie email avec code → Enregistre dans Supabase.

🧩 E. Module Affiliés
Objectif
Gérer l’inscription, le suivi et la rémunération des affiliés dans le programme d’affiliation 2.0 de RabaisLocal.
Le système doit permettre à chaque affilié de suivre son réseau, ses commissions et ses rangs en toute transparence.
Fonctionnalités clés
Inscription automatisée via GoAffPro (connecté à Make).
Signature numérique du contrat d’affiliation (via Make + PDF auto).
Tableau de bord affilié (intégré par iFrame ou API GoAffPro).
Affichage des commissions, rangs et niveaux (jusqu’à 15 niveaux).
Classement des affiliés les plus performants (gamification / preuve sociale).
Paiements automatisés des commissions via GoAffPro ↔ Payments.AI.
Formation IA intégrée : scripts d’approche, plan d’action, tutoriels.
Critères d’acceptation
✅ Les affiliés signent électroniquement leur contrat.
✅ Le tableau GoAffPro est visible directement dans l’espace affilié.
✅ Les commissions se calculent en temps réel.
✅ Les paiements se synchronisent automatiquement chaque mois.
✅ Les rangs et bonus s’affichent selon les critères définis.
Automatisations Make
Webhook_Affilie_New → Crée utilisateur GoAffPro → Envoie contrat PDF → Tag Supabase : “affiliate_active” → Notifie par email.

🧠 F. Module Intelligence Artificielle (IA)
Objectif
Automatiser la création de contenu, les recommandations et l’assistance utilisateur grâce à trois agents IA distincts :
IA Commerçant
IA Consommateur
IA Affilié
Fonctionnalités clés
3 agents IA hébergés sur OpenAI : un contexte par rôle.
Interface de chat textuelle + vocal (progressive).
Apprentissage continu via l’historique utilisateur Supabase.
Mémoire contextuelle persistante par utilisateur.
Historique des conversations (“Mes conversations IA”).
Section “Formation IA” : comment utiliser efficacement l’assistant.
Limite d’usage mensuelle selon le forfait (Bronze/Argent/Or).
Filtrage automatique du contenu inapproprié.
IA localisée : langage et expressions régionales (Québec).
Critères d’acceptation
✅ Chaque agent répond selon son rôle.
✅ Les données sensibles ne sont pas stockées par OpenAI.
✅ L’utilisateur peut consulter ses anciennes conversations.
✅ Les quotas d’utilisation se gèrent automatiquement.
Automatisations Make
Webhook_IA_Request → Envoie requête à OpenAI → Stocke réponse dans Supabase (table : ai_logs) → Renvoie au front-end.

🧰 G. Module Administrateur (Retool)
Objectif
Centraliser toute la gestion interne dans une interface unique Retool : utilisateurs, offres, paiements, crédits, logs et support.
Fonctionnalités clés
Tableau de bord global avec KPIs temps réel (Metabase / Supabase).
Gestion des rôles et accès.
Consultation et modification des comptes (ajout / retrait de crédits, suspension).
Module Support : système de tickets internes.
Logs d’audit automatiques (création, suppression, paiements, remboursements).
Vue simplifiée pour assistants et modérateurs.
Gestion des remboursements, plaintes et litiges.
Mode “Sandbox” pour tests internes et formation.
Critères d’acceptation
✅ L’admin peut tout gérer depuis un seul tableau.
✅ Chaque action sensible est journalisée dans logs_audit.
✅ Les tickets de support s’assignent automatiquement.
✅ L’accès est restreint selon les rôles.
Automatisations Make
Webhook_Support_Ticket → Crée ticket Supabase → Alerte Retool → Email au responsable.
Webhook_Paiement_Sync → Vérifie cohérence Payments.AI ↔ Supabase ↔ GoAffPro.


⚖️ H. Module Légal & Conformité
Objectif
Garantir la conformité de RabaisLocal avec la Loi 25 (Québec) et le RGPD, tout en assurant la transparence des politiques internes.
Fonctionnalités clés
CGU, politique de confidentialité, mentions légales, politique de cookies.
Consentement explicite à la création de compte (case à cocher).
Gestion centralisée des consentements dans Supabase (consent_log).
Bandeau cookies + centre de préférences complet.
Signature électronique des contrats affiliés et ambassadeurs.
Politique d’effacement automatique des données après inactivité prolongée.
Option d’export des données utilisateur (conformité Loi 25).
Affichage automatique des dates de mise à jour légales.
Politique de remboursement (rabais non honoré).
Critères d’acceptation
✅ L’utilisateur accepte explicitement les conditions avant d’accéder au compte.
✅ Les consentements sont enregistrés et traçables.
✅ Les documents sont facilement consultables depuis le pied de page.
✅ Les données inactives s’effacent selon la politique.
Automatisations Make
Webhook_Legal_Update → Met à jour date de révision dans Supabase → Notifie utilisateurs concernés.
Webhook_Export_Data → Compile données personnelles en JSON / ZIP → Envoie lien de téléchargement.
I. Module Marketing & Communication
Objectif
Assurer la visibilité, la communication et la conversion du public à travers un système intégré de contenu, de tunnels et d’automatisations.
Fonctionnalités clés
Pages publiques Webflow / ClickFunnels : accueil, à propos, inscription, témoignages.
Système de campagnes par région (géolocalisation).
Blog / magazine RabaisLocal (SEO + actualités locales).
Chatbot d’accueil IA pour guider les visiteurs.
Système d’emailing automatisé (MailerSend via Make) :
Confirmation d’inscription.
Séquence de bienvenue (3 courriels).
Relances et rappels personnalisés.
Compteur dynamique de preuve sociale :
“2 600 membres actifs — 350 commerces partenaires — 1 200 offres locales”
Intégration UTM tracking (source / médium / campagne / contenu).
Intégration avec les réseaux sociaux (Facebook, TikTok, Instagram).
Vidéos explicatives automatisées via HeyGen et Canva.
Critères d’acceptation
✅ Les pages publiques sont conformes au branding RabaisLocal.
✅ Le compteur dynamique se met à jour automatiquement via Supabase.
✅ Les courriels automatiques s’envoient sans intervention manuelle.
✅ Les campagnes UTM sont visibles dans les rapports Analytics.
✅ Le chatbot d’accueil IA répond aux questions de base sur RabaisLocal.
Automatisations Make
Webhook_Email_Sequence → déclencheur : inscription → envoie 3 courriels de suivi.
Webhook_Social_Stats → récupère les données publiques → met à jour le compteur de membres.

📊 J. Module Analytics & Performance
Objectif
Mesurer la performance, l’engagement et les conversions de la plateforme à tous les niveaux.
Fonctionnalités clés
Intégration Metabase / Posthog pour les statistiques internes.
Tableau de bord global Retool : trafic, inscriptions, ventes, taux de conversion.
Suivi UTM et tracking lien affilié.
Rapport mensuel automatisé (Make → Google Sheets → PDF).
Analytics public : compteur d’offres et membres.
Score IA de performance commerciale : analyse du texte / visuel des promos.
Indicateurs de performance (KPI) par rôle (affilié, commerçant, consommateur).
Comparaison des régions (classement régional RabaisLocal).
Critères d’acceptation
✅ Les statistiques s’actualisent chaque jour sans action manuelle.
✅ Les UTM sont correctement reliés aux campagnes affiliés.
✅ Le rapport mensuel s’envoie automatiquement à Dany et l’équipe.
✅ Les scores IA se mettent à jour selon la performance des promotions.
Automatisations Make
Webhook_Monthly_Report → compile stats Supabase → envoie fichier PDF automatisé.
Webhook_UTM_Sync → relie GoAffPro ↔ Analytics pour traçage des campagnes.

🔒 K. Module Sécurité & Infrastructure
Objectif
Garantir la sécurité, la confidentialité et la résilience de l’écosystème RabaisLocal.
Fonctionnalités clés
SSL / HTTPS sur tous les sous-domaines.
Authentification à deux facteurs (2FA) optionnelle.
reCAPTCHA sur tous les formulaires publics.
Système anti-fraude (détection double compte / faux rabais).
Logs d’activité complets (logs_audit dans Supabase).
Sauvegarde quotidienne automatique (Supabase → Google Drive).
Audit de sécurité annuel (certification externe).
Mode “Maintenance IA” en cas de panne ou mise à jour.
Alertes automatiques en cas d’anomalie IA ou fraude détectée.
Critères d’acceptation
✅ Les backups s’exécutent chaque nuit.
✅ Les alertes automatiques se déclenchent en cas d’erreur ou tentative de fraude.
✅ Les formulaires bloquent les robots grâce à reCAPTCHA.
✅ Le mode maintenance affiche un message clair et un chatbot IA d’attente.
Automatisations Make
Webhook_Backup → export JSON / CSV vers Google Drive sécurisé.
Webhook_Security_Alert → envoie notification admin (email + push).

🗂️ L. Module Gestion de contenu (CMS)
Objectif
Permettre à l’équipe RabaisLocal d’éditer facilement le contenu du site sans coder.
Fonctionnalités clés
CMS Webflow pour les pages publiques (texte, images, articles, bannières).
CMS Supabase (admin Retool) pour les promotions et témoignages.
Création automatique de pages “commerce.rabaislocal.com/nom”.
Gestion des catégories, filtres et régions.
Publication programmée (planification Make).
Historique des modifications et restauration.
Critères d’acceptation
✅ Les pages commerçants se créent automatiquement après validation.
✅ Les textes et images sont éditables depuis Retool.
✅ L’historique des contenus est traçable.
✅ Les articles du blog s’affichent correctement sur Webflow.
Automatisations Make
Webhook_New_Commerce_Page → crée page Webflow depuis Supabase.
Webhook_Content_Update → notifie admin et archive ancienne version.

🚀 M. Module Expansion Future
Objectif
Préparer la croissance de RabaisLocal à moyen et long terme (mobile, API, internationalisation).
Fonctionnalités clés
Application mobile native (iOS & Android) avec :
Notifications push géolocalisées.
Carte interactive des offres.
Mode hors ligne (consultation des offres déjà chargées).
Scan QR intégré.
API publique RabaisLocal (clé privée pour partenaires).
API documentation (Swagger / Postman).
Multi-langue (français / anglais).
Support multi-province (TPS/TVQ automatique selon localisation).
Architecture compatible IA embarquée (assistant intégré dans l’app mobile).
Critères d’acceptation
✅ L’app mobile synchronise les données Supabase en temps réel.
✅ Les rabais à proximité se déclenchent par notification.
✅ Le mode hors ligne permet la consultation locale.
✅ L’API externe est protégée par clé privée.
✅ La structure du code est prête pour l’ajout de nouvelles régions.
Automatisations Make
Webhook_Mobile_Sync → connecte app ↔ Supabase ↔ Make en temps réel.
Webhook_API_Access → attribue clé partenaire et trace les appels API.

💬 Ces treize modules constituent l’ossature complète de RabaisLocal.
Ils couvrent 100 % du périmètre fonctionnel prévu pour le lancement et les évolutions à venir.

🧩 6. Modèle de données Supabase

6.1 Objectif général
La base de données Supabase (PostgreSQL) est le cœur du système RabaisLocal.
Elle centralise toutes les informations relatives aux utilisateurs, aux promotions, aux crédits, aux paiements, aux commissions et aux interactions IA.
Elle doit permettre :
une synchronisation fluide avec Make, GoAffPro et Payments.AI ;
une structure modulaire (chaque module = tables liées) ;
une traçabilité complète (journaux, consentements, historiques).
L’ensemble de la base est hébergé sur les serveurs canadiens de Supabase Cloud afin d’assurer la conformité à la Loi 25.

6.2 Schéma logique général
UTILISATEURS ───< CREDITS >───< PROMOTIONS >───< RESERVATIONS >───< COMMERÇANTS
      │                        │                    │
      │                        └─────< AVIS >───────┘
      │
      ├──< AFFILIÉS >──< COMMISSIONS >──< RANGS >
      │
      ├──< IA_LOGS >
      │
      ├──< PAYMENTS >──< FACTURES >
      │
      ├──< NOTIFICATIONS_LOG >
      │
      └──< LEGAL_CONSENTS >

6.3 Tables principales
🧑‍💻 Table : users
Index : email (unique), role

💳 Table : credits

🏪 Table : merchants

🎁 Table : promotions

🎫 Table : reservations

💬 Table : reviews

🤝 Table : affiliates

💵 Table : commissions

🧾 Table : payments

🤖 Table : ai_logs

⚙️ Table : logs_audit

⚖️ Table : legal_consents

🔔 Table : notifications_log

6.4 Relations principales
1 user ↔ n credits
1 user ↔ n reservations
1 merchant ↔ n promotions
1 affiliate ↔ n commissions
1 user ↔ 1 affiliate (optionnel)
1 user ↔ n ai_logs
1 user ↔ n legal_consents

6.5 Exemples de requêtes types
🔍 Créer une promotion automatiquement via IA
INSERT INTO promotions (merchant_id, title, description, credits_cost, ai_generated, image_url)
VALUES (42, '2 pour 1 sur les cafés lattés', 'Valide jusqu’à dimanche dans toutes les succursales de Trois-Rivières', 3, TRUE, 'https://cdn.canva.com/image123.jpg');
💰 Ajouter des crédits après paiement
INSERT INTO credits (user_id, type, credits_value, amount, source)
VALUES ('uuid-consommateur', 'purchase', 50, 19.95, 'Payments.AI');
📊 Consulter le top 10 des affiliés par commissions
SELECT a.id, u.first_name, u.city, a.total_commissions
FROM affiliates a
JOIN users u ON u.id = a.user_id
ORDER BY a.total_commissions DESC
LIMIT 10;



⚙️ 7. API & Automatisations Make

7.1 Principes d’architecture API
Style : REST JSON sur api.rabaislocal.com (HTTPS obligatoire).
Auth :
Public Front → Supabase Auth (JWT Bearer).
Services (Make ↔ GoAffPro ↔ Payments.AI) → Token d’API (header X-API-Key), + IP allowlist.
Idempotence : endpoints “écriture” exigent Idempotency-Key (UUID v4).
Rate limiting : 60 req/min par IP (public), 600 req/min (services).
Format d’erreur (uniforme) :
{ "error": { "code": "VALIDATION_ERROR", "message": "Field X is required", "details": {...} } }

7.2 Schéma des flux (macro)
Front (Webflow/ClickFunnels) → Webhook Make → Supabase
Paiement (Payments.AI / PayPal) → Webhook Make → Supabase
Affiliation (GoAffPro) ↔ Sync Make ↔ Supabase
IA (OpenAI/Canva) ←→ Make ←→ Supabase Storage

7.3 Endpoints REST (internes)
Base: https://api.rabaislocal.com/v1
7.3.1 Auth & Profil
GET /me
Headers: Authorization: Bearer <supabase_jwt>
Réponse:
{ "id":"uuid", "email":"x@x.com", "role":"consumer", "city":"Trois-Rivières", "created_at":"2025-10-12T10:55:00Z" }
PATCH /me
Body (exemple):
{ "city":"Trois-Rivières", "notifications": { "email": true, "push": true } }

7.3.2 Offres & Réservations
GET /offers?city=trois-rivieres&credits_max=4&category=resto&limit=20&offset=0
Réponse (extrait):
{ "items":[
  {"id":123,"title":"2 pour 1 latte","credits_cost":3,"city":"Trois-Rivières","image_url":"...","ends_at":"2026-01-31","merchant":{"id":42,"name":"Café local"}}
], "next_offset":20 }
POST /reservations
Headers: Authorization, Idempotency-Key
Body:
{ "offer_id":123 }
Réponse:
{ "reservation_id":9876, "qr_code_url":"https://cdn.rabais/qrs/9876.png", "status":"reserved" }
POST /reservations/validate (usage commerçant/scan QR)
Body:
{ "reservation_id":9876, "branch_id": 7 }
Réponse:
{ "status":"used", "used_at":"2026-02-01T15:04:00Z" }

7.3.3 Crédits & Portefeuille
GET /wallet
Réponse:
{ "credits_balance": 128, "commissions_cad": 73.45, "transactions":[
  {"id":1,"type":"purchase","credits":50,"amount":19.95,"at":"2025-11-01"},
  {"id":2,"type":"use","credits":3,"offer_id":123,"at":"2025-11-03"}
]}
POST /credits/purchase (initie un paiement)
Body:
{ "pack":"50" }
Réponse:
{ "checkout_url":"https://payments.ai/checkout/xyz", "expires_at":"2025-11-09T20:00:00Z" }

7.3.4 IA (génération offre commerçant)
POST /ai/merchant/promo
Body:
{ "merchant_id":42, "goal":"augmenter trafic midi", "tone":"convivial",
  "constraints":{"credits_cost":3,"quantity":50,"city":"Trois-Rivières"} }
Réponse:
{ "title":"Menu midi 2 pour 1", "description":"Cette semaine, ...", "image_url":"https://cdn.canva.com/xyz.png" }

7.3.5 Avis / Notations
POST /reviews
Body:
{ "merchant_id":42, "rating":5, "comment":"Service impeccable!" }
Réponse:
{ "id": 555, "ai_flagged": false }

7.4 Webhooks entrants (Make)
Base : https://hooks.make.com/<id_scenario>
7.4.1 Inscription consommateur (ClickFunnels/Webflow → Make)
Payload (formulaire)
{
  "source":"clickfunnels",
  "role":"consumer",
  "email":"client@email.com",
  "first_name":"Alex",
  "city":"Trois-Rivières",
  "utm":{"source":"facebook","campaign":"prelaunch","medium":"cpc","content":"ad1"}
}
Make – étapes clés
Valider payload (email unique).
Supabase.create(user) + role=consumer.
MailerSend.send (bienvenue).
Supabase.insert(consents) (CGU/politiques).
Audit.log (action=signup_consumer).
Réponse
{ "ok": true, "user_id":"uuid" }

7.4.2 Inscription commerçant
Payload
{
  "role":"merchant","email":"owner@shop.com","company_name":"Boulangerie du coin",
  "city":"Shawinigan","plan":"free","branches":[{"name":"Centre-ville","city":"Shawinigan"}]
}
Make – étapes
Supabase.create(user role=merchant)
Supabase.insert(merchants, branches)
MailerSend.send(contract_link)
Audit.log (merchant_created)

7.4.3 Achat crédits (Payments.AI / PayPal → Make)
Webhook paiement (provider)
{
  "provider":"payments.ai",
  "status":"success",
  "transaction_id":"pi_abc123",
  "amount_cad":19.95,
  "user_id":"uuid",
  "product":"credits_50",
  "meta":{"idempotency_key":"1e7d4d5a-..."}
}
Make – étapes
Vérifier idempotence (payments.transaction_id unique).
Supabase.insert(payments) (status + montant).
Supabase.insert(credits) (+50, type=purchase) + update solde.
MailerSend.send(invoice_pdf)
Audit.log (credits_added)
Réponse
{ "ok": true, "credits_added": 50 }

7.4.4 Réservation d’une offre (Front → Make via API interne)
Payload
{ "user_id":"uuid", "offer_id":123, "idempotency_key":"e3e1..." }
Make – étapes
Vérifier solde crédits (≥ coût).
Débiter crédits (credits_tx) + balance_after.
Créer réservation (reservations) + générer qr_code_url.
Email confirmation + log audit.
Réponse
{ "reservation_id": 9876, "qr_code_url":"https://cdn.rabais/qrs/9876.png" }

7.4.5 Synchronisation affiliés (GoAffPro ↔ Make ↔ Supabase)
Entrant GoAffPro (vente attribuée)
{
  "event":"sale_tracked",
  "affiliate_id":"gaf_4421",
  "order_id":"ORD-9931",
  "amount_cad": 24.95,
  "commission_cad": 4.99,
  "buyer_email":"client@email.com",
  "timestamp":"2025-11-09T14:22:01Z"
}
Make – étapes
Faire correspondre affiliate_id → affiliates.goaffpro_id.
Supabase.insert(commissions) + update commissions_wallet.
MailerSend.send (notification commission).
Audit.log (commission_added)

7.5 Sorties Make → Services externes
MailerSend : emails transactionnels (bienvenue, facture, confirmation).
OneSignal : push web (rabais proches, rappel de réservation).
GA4 / Posthog : events (signup, purchase, reservation).
Google Drive : backups DB quotidiens.

7.6 Sécurité des intégrations
X-API-Key (clé rotative, stockée dans Make Variables et Supabase Secrets).
IP allowlist des webhooks (Payments.AI, PayPal, GoAffPro).
Signature HMAC (optionnelle) : header X-Signature = HMAC-SHA256(body, SHARED_SECRET).
JWT : endpoints front protégés par Supabase Auth.
Scopes : clés restreintes par usage (payments:write, offers:read, etc.).

7.7 Idempotence & Rejouabilité
Tous les webhooks paiements et réservations doivent inclure Idempotency-Key.
Les tables payments et credits_tx contiennent unique(transaction_id) pour éviter doublons.
Make garde un stockage temporaire (Data Store) des idempotency keys (TTL 24h).

7.8 Gestion d’erreurs (patterns)
Exemples d’erreurs attendues et réponses standard :
SOLDE_INSUFFISANT (réservation)
{ "error":{ "code":"INSUFFICIENT_CREDITS","message":"Solde de crédits insuffisant." } }
PAIEMENT_NON_VERIFIE
{ "error":{ "code":"PAYMENT_NOT_CONFIRMED","message":"La transaction n’est pas confirmée." } }
DUPLICATE_REQUEST (idempotence)
{ "error":{ "code":"DUPLICATE_REQUEST","message":"Requête déjà traitée." } }
VALIDATION_ERROR
{ "error":{ "code":"VALIDATION_ERROR","message":"Champs manquants: offer_id." } }

7.9 Exemples de scénarios Make (pseudo-blueprints)
7.9.1 Signup_Consumer_Flow
Webhook (public)
JSON > Validate (champ email, role=consumer)
Supabase: Upsert users
Supabase: Insert consents
MailerSend: Template “Bienvenue”
Log: Insert logs_audit
7.9.2 Payment_Credits_Confirm
Webhook Payments.AI
Guard: Check idempotency
Supabase: Insert payments
Supabase: Insert credits_tx (+ pack)
MailerSend: Facture PDF
Log
7.9.3 Reservation_Create
API Call secure (from backend)
Supabase: Check wallet
Supabase: Deduct credits (tx)
QR Service: Generate
Supabase: Insert reservations
MailerSend: Confirmation
7.9.4 GoAffPro_Sync_Commissions (cron 5 min)
HTTP: Pull sales
Map to affiliates
Insert commissions + update wallet
Notify affiliate
Log

7.10 Pseudo-contrats d’API (headers & sécurité)
Headers standard (requêtes authentifiées) :
Authorization: Bearer <supabase_jwt_or_service_token>
Content-Type: application/json
X-API-Key: <rabaislocal_service_key>   (si endpoint service)
Idempotency-Key: <uuid-v4>             (si écriture)
Réponses (succès générique) :
{ "ok": true }

7.11 Observabilité & monitoring
Logs Make exportés quotidiennement (CSV) → Google Drive.
Sentry (ou Posthog) sur front pour erreurs JS.
Alertes (email + push) si : taux d’échec webhook > 2 %, ou latence > 3s.

💡 Conclusion section 7 :
Avec ces endpoints, webhooks, payloads et scénarios Make, tu as un contrat d’intégration complet qui évite 90 % des malentendus dev ↔ no-code et garantit des automatisations tracées, sûres et idempotentes.


🔒 8. Sécurité, sauvegardes & conformité (Loi 25)
8.1 Objectifs & périmètre
Assurer la confidentialité, l’intégrité et la disponibilité des données RabaisLocal (CID), en conformité avec la Loi 25 (Québec) et les bonnes pratiques (OWASP, ISO/IEC 27001 en inspiration).
Périmètre : Supabase (DB/Auth/Storage/Edge), Make, Webflow/ClickFunnels, GoAffPro, Payments.AI/PayPal, Retool, OpenAI/Canva, MailerSend/OneSignal, Posthog/Metabase.

8.2 Gouvernance & responsabilité
Responsable de la protection des renseignements personnels (RPRP) : Dany Gosselin.
Registre des activités de traitement : tenu dans Retool (vue “Compliance”), export CSV mensuel.
Évaluations des facteurs relatifs à la vie privée (ÉFVP / PIA) : requises pour toute nouvelle intégration sensible (IA, géoloc, API publique).
Contrats de traitement (DPA) : à conserver pour chaque sous-traitant (Supabase, Make, etc.).
Formation sécurité interne : mini-module annuel (phishing, mots de passe, RGPD/Loi 25).

8.3 Classification des données

8.4 Contrôles techniques (par composant)
Supabase
Auth JWT (email + Google/Facebook/Apple), 2FA optionnel.
Row Level Security (RLS) activée : règles par rôle (consumer, merchant, affiliate, admin, support).
Chiffrement au repos (géré par Supabase) et en transit (TLS 1.2+).
Edge Functions signées (vérification X-API-Key + allowlist IP pour services).
Sauvegardes quotidiennes + tests de restauration mensuels (RTO ≤ 1 h, RPO ≤ 24 h).
Make
Scénarios isolés par dossiers, clés en Variables sécurisées, idempotence sur webhooks critiques.
Audit des exécutions activé, export quotidien CSV vers Drive sécurisé.
IP allowlist pour webhooks entrants (Payments.AI/PayPal/GoAffPro).
Webflow/ClickFunnels
reCAPTCHA sur formulaires, champs minimaux (privacy by design).
Pas de stockage perso durable : redirection immédiate vers Make → Supabase.
Retool (Admin)
SSO via Supabase Auth (rôles admin, support, comptable).
Vue limitée pour support (pas d’accès aux secrets ni clés API).
Journal d’audit complet (toutes actions critiques).
GoAffPro / Payments.AI / PayPal
Clés rotatives tous les 90 jours.
Webhooks HMAC-SHA256 avec secret partagé (header X-Signature).
OpenAI/Canva
Pas de données sensibles envoyées (minimisation).
Stockage des prompts et sorties sans PII dans ai_logs.
Filtre de sécurité IA : détection contenu toxique/illégal.
Notifications (MailerSend/OneSignal)
Double opt-in email si possible ; push web consentement explicite (CMP).
Journal notifications_log avec status (sent/failed).

8.5 Gestion des accès (RBAC)

8.6 Sauvegardes & reprise d’activité
Supabase : sauvegarde quotidienne automatique (7 rétentions), export crypté vers Google Drive pro.
Tests de restauration : mensuels (procédure documentée).
RTO (reprise) ≤ 1 h ; RPO (perte max) ≤ 24 h.
Plan de continuité : page maintenance statique + chat IA d’attente.

8.7 Journalisation & détection d’anomalies
Table logs_audit : toute action critique (paiements, crédits, suppressions, création/modif d’offre, changement de rôle).
Alertes Make :
taux d’échec webhook > 2 % sur 10 min,
latence API > 3 s,
pics anormaux de réservations/avis.
Fraude : règle IA (Posthog/Metabase) → crée ticket Retool auto.

8.8 Consentements, cookies & droits (Loi 25)
CMP (bandeau cookies + centre préférences) : stats, marketing, nécessaires.
Consentements : table legal_consents (type, version, IP, timestamp).
Accès/portabilité : export JSON/ZIP sur demande (Make → lien de téléchargement).
Rectification : formulaire “Corriger mes données”.
Effacement/anonymisation : inactivité > 24 mois → anonymisation comptes/transactions (conservation légale minimaliste).
Mineurs : par défaut interdit < 16 ans (ou parent/tuteur requis si tu décides de l’ouvrir, à documenter).

8.9 Conservation & anonymisation (calendrier)

8.10 Procédure d’incident (Breach Playbook)
Détection (alerte Make/Supabase/Sentry).
Confinement (désactiver clés compromises, bloquer scénarios).
Évaluation (quelles données, combien d’utilisateurs, vecteur).
Notification :
RPRP interne et direction sous 24 h,
utilisateurs affectés sans délai déraisonnable,
autorités compétentes si requis (CAI au Québec).
Remédiation (patch, rotation clés, correction flux).
Post-mortem (rapport écrit, actions préventives).
SLA interne : Majeur (données perso sensibles) → 24 h / Mineur → 72 h.

8.11 Tests & audits
Pentest annuel (interne + externe) sur app & API.
Revue des permissions trimestrielle (RBAC).
Scan OWASP (ZAP) pré-release majeure.
Tableau conformité dans Retool (checklist bimensuelle).

8.12 Checklists d’implémentation (prêtes à cocher)
Backend & DB
RLS actif par table sensible
Index sur champs PII (email) + uniques
Edge Functions avec X-API-Key + allowlist IP
Automatisations
Idempotency-Key sur paiements/réservations
Secrets stockés en Variables Make
Logs d’exécution exportés quotidiennement
Front & formulaires
reCAPTCHA sur tous les formulaires publics
CMP (cookies) multichoix + preuve de consentement
Minimise les champs collectés
Notifications
Opt-in email/push stocké (notifications_log)
Désabonnement en 1 clic (MailerSend)
Sauvegardes
Backup quotidien Supabase → Drive sécurisé
Test de restauration mensuel consigné
Conformité
Pages CGU / Politique / Cookies accessibles en pied de page
Processus d’export/effacement opérationnel
Registre traitements à jour

8.13 Exemples de politiques (extraits à intégrer)
Politique de mot de passe : min 12 caractères, unique, gestionnaire recommandé ; 2FA optionnel pour affiliés & commerçants.
Politique Bring Your Own Device (BYOD) (si assistants) : chiffrement disque, verrouillage auto, interdiction stockage PII en local.
Politique d’accès fournisseurs : accès “moindre privilège”, révocation immédiate en fin de mandat, NDAs signés.

8.14 Indicateurs de sécurité (KRI)

8.15 Notes conformité paiement (TPS/TVQ)
Exports mensuels depuis Supabase (table payments) par province.
Vérification croisée avec Payments.AI/PayPal (scenario Webhook_Paiement_Sync).
Rapports CSV + PDF archivés 7 ans.

Conclusion section 8 :
Avec ces contrôles (RBAC, RLS, sauvegardes, idempotence, CMP, consentements, PIA, journaux d’audit et plan d’incident), RabaisLocal répond aux exigences Loi 25 tout en gardant une architecture robuste et scalable.

💰 9. Paiements & flux financiers

9.1 Objectif général
Mettre en place un système 100 % automatisé, sans manipulation manuelle, qui :
collecte les paiements via Payments.AI et PayPal ;
gère deux comptes virtuels distincts par utilisateur (compte principal + compte rabaislocal) ;
applique automatiquement les retenues mensuelles (27 $) et renouvellements annuels (47 $) ;
redistribue les commissions, crédits et remboursements sans intervention humaine ;
reste entièrement traçable, conforme à la Loi sur la protection des renseignements personnels et la fiscalité (TPS/TVQ).

9.2 Comptes virtuels utilisateurs
Chaque utilisateur affilié possède deux soldes internes :

9.3 Cycle de paiement mensuel
Étapes automatiques (Make)
Fin de mois (dernier jour) → scénario Paiement_Mensuel_Check se déclenche.
Vérifie le solde total commissions (commissions.total_pending).
Si montant ≥ 0 $:
Transfère 27 $ ou le montant restant vers le Compte 2 (RabaisLocal).
Transfère le reste vers le Compte 1 (Principal).
Si solde < 27 $, le montant partiel est tout de même transféré à RabaisLocal (pas de dette).
Enregistre la transaction dans :
payments (type=“retained_fee”)
commissions (type=“transfer_monthly_fee”)
audit_log (action=monthly_fee_deduction)
Envoie un courriel automatique via MailerSend :
objet : “Votre revenu du mois est disponible”
détail : solde transféré, frais retenus, lien vers l’historique.

9.4 Règle de renouvellement annuel (47 $)
Logique :
Le renouvellement annuel est prélevé uniquement sur les revenus accumulés, jamais sur l’argent personnel.
Si le Compte 2 contient ≥ 47 $ lors de la date anniversaire :
47 $ sont transférés à RabaisLocal (paiement du renouvellement).
Le solde restant demeure dans le compte 2.
Si le compte n’a pas atteint 47 $ :
RabaisLocal récupère l’intégralité du solde du Compte 2 (même s’il est inférieur à 47 $).
L’affilié conserve son accès, mais le solde repart à zéro (aucune dette créée).
L’année suivante, le cycle reprend normalement.
Automatisation Make (Renewal_Check_Annual)
Vérifie la date d’activation initiale (affiliates.created_at).
Compare au jour courant → déclencheur à J+365.
Calcule solde Compte 2.
Si ≥ 47 $ → prélève 47 $.
Si < 47 $ → prélève total restant.
Enregistre dans payments (type=“annual_renewal”).
Envoie courriel “Renouvellement réussi / solde réinitialisé”.

9.5 Schéma des flux financiers
(Commissions GoAffPro)
        ↓
Make : Commission_Sync
        ↓
Supabase (commissions.pending)
        ↓
Fin du mois
        ↓
Make : Paiement_Mensuel_Check
        ├──> Compte RabaisLocal (27 $ ou partiel)
        └──> Compte Principal (reste disponible)
        ↓
Paiement Interac (à la demande)
        ↓
Rapport TPS/TVQ

9.6 Paiements entrants
Types de paiements acceptés :
Webhook Make (Payment_Received)
Vérifie la signature HMAC (X-Signature).
Crée entrée payments.
Met à jour le statut (success/failed).
Alimente credits ou subscriptions selon type.
Envoie facture PDF via MailerSend.
Log : audit_log.insert.

9.7 Paiements sortants
Modes possibles :
Automatique via Payments.AI (solde ≥ 20 $)
Virement manuel via Interac (si configuré)
Retrait différé (option futur compte bancaire)
Étapes Make (Payout_Affiliate)
Vérifie solde Compte Principal ≥ 20 $.
Génère un batch de paiements (CSV / API Payments.AI).
Marque comme “paid” dans commissions.
Envoie email confirmation + log.
Délais :
Traitement mensuel (1er au 5 du mois suivant).
Paiements regroupés par lot (batch) pour réduire les frais.

9.8 TPS / TVQ et conformité fiscale
Collecte
RabaisLocal perçoit la TPS (5 %) et TVQ (9,975 %) sur tous les paiements commerçants et affiliés.
Calcul automatique Make :
{ "montant": 297, "TPS": 14.85, "TVQ": 29.59, "Total": 341.44 }
Stocké dans payments.taxes_details.
Rapport mensuel exporté vers Google Sheets → Revue comptable.
Déclaration
Export CSV (TPS_TVQ_Report) chaque fin de mois.
Validation croisée avec payments.status = 'success'.
Conservation 7 ans dans Drive sécurisé.

9.9 Gestion des erreurs et exceptions

9.10 Visualisation dans le tableau de bord
Vue “Mon portefeuille” :
Solde crédits 💳
Solde Compte Principal 💰
Solde Compte RabaisLocal 🟨
Historique complet (transactions, commissions, déductions, achats).
Graphique évolutif (gains / mois).
Vue admin (Retool) :
Filtres par période, type de transaction, statut.
Exports automatiques (CSV / PDF).
Indicateurs : total commissions, total frais, total taxes.

9.11 Cas particuliers
Affilié inactif (aucun gain depuis 6 mois) : compte suspendu mais solde conservé.
Affilié supprimé : anonymisation transactions, transfert final si applicable.
Décès / succession : transfert du solde à un héritier sur justificatif légal.
Commerçant fermé : suspension des abonnements et suppression des offres actives.

9.12 Résumé logique (Make)

9.13 Sécurité et audit
Toutes les transactions (entrantes/sortantes) créent un log dans audit_log.
Clés API rotatives pour chaque prestataire (Payments.AI, PayPal).
Validation HMAC pour webhooks externes.
Double contrôle (Make + Supabase trigger) pour éviter double versement.

Conclusion section 9 :
Le système financier de RabaisLocal repose sur une logique 100 % automatisée, éthique et durable : aucun affilié ne paie de sa poche, les retenues se font uniquement sur les gains, tout est traçable, et les taxes sont automatiquement collectées et archivées pour conformité.


🎨 10. Interface Utilisateur (UX/UI) & Expérience Globale

10.1 Objectif
Créer une expérience utilisateur fluide, intuitive et chaleureuse, qui incarne la mission de RabaisLocal :
“Stimuler l’économie locale avec des rabais simples, humains et intelligents.”
Le design doit inspirer confiance, modernité et proximité.
L’utilisateur, qu’il soit consommateur, commerçant ou affilié, doit toujours comprendre en trois secondes :
où il est,
ce qu’il peut faire,
et ce qu’il a à gagner.

10.2 Charte graphique

10.3 Identité visuelle
Logo :
Déclinaisons visuelles :
Version “plateforme IA” : fond bleu clair, pictos stylisés IA.
Version “commerçants” : accents bronze / argent / or selon plan.
Version “affiliés” : fond bleu nuit + accents dorés (succès).

10.4 Navigation principale
Barre de navigation (toutes pages)
Logo RabaisLocal (cliquable → accueil)
Menu principal :
Accueil
Offres locales
Commerçants
Devenir affilié
À propos
Connexion / Inscription (selon statut)
CTA principal : “Découvrir les rabais près de moi”
Icônes (selon rôle connecté) :
🔔 Notifications
👤 Profil / Tableau de bord
💳 Crédits
🛒 Mes réservations
Pied de page (footer)
CGU | Politique de confidentialité | Politique de cookies | Mentions légales
Réseaux sociaux (Facebook, TikTok, YouTube)
Lien : “Contact / Support”
Statistiques publiques (ex : “+2 600 membres déjà inscrits”)

10.5 Parcours utilisateurs (UX Flow)
A. Consommateur
Page d’accueil → découvre les offres et CTA “M’inscrire gratuitement”.
Formulaire simple : prénom, courriel, code postal, mot de passe.
Espace membre :
Carte virtuelle avec QR code unique.
Crédits disponibles / à acheter.
Offres par géolocalisation.
Historique de réservations et favoris.
IA personnalisée (Assistant Local) pour trouver les meilleures offres.
B. Commerçant
Page “Devenir commerçant” → vidéo explicative + tableau comparatif des plans.
Formulaire d’inscription : nom de commerce, NEQ, ville, plan choisi, paiement intégré.
Espace commerçant :
Tableau de bord clair (stats, vues, réservations, conversions).
Bouton “Créer une promotion avec l’IA”.
Aperçu instantané avant publication.
Gestion des factures et abonnements.
C. Affilié
Page d’inscription : présentation du programme d’affiliation 2.0 (vidéo + CTA “Je deviens affilié”).
Signature électronique du contrat (intégrée Make).
Espace affilié (GoAffPro intégré via iFrame) :
Vue commissions et progression.
Liens de partage.
Formations IA + scripts d’approche.
Graphique de croissance du réseau.
Badge visuel (Ex. : “Explorateur / Bâtisseur / Coordonnateur” selon le rang).

10.6 Composants clés du design

10.7 Règles ergonomiques (UX)
3 clics max pour toute action majeure.
1 idée par écran.
CTA toujours visible au-dessus du pli.
Texte en langage humain (jamais “Erreur 401”, mais “Oups ! Tu dois d’abord te connecter 😉”).
Utiliser l’humour léger et la proximité (style québécois chaleureux).
Couleurs significatives :
Vert → succès / rabais confirmé
Jaune → en attente
Rouge → erreur / alerte
Icônes claires : pas d’ambiguïté (💳 pour crédits, 🛍️ pour offres, 🧠 pour IA).

10.8 Version mobile
Interface centrée et épurée, texte aligné à gauche.
Navigation fixe en bas d’écran :
🏠 Accueil
🔍 Trouver
💳 Crédits
🛍️ Mes offres
👤 Profil
Animations légères (Framer Motion) pour fluidité.
Préchargement des offres locales (Mapbox + cache localStorage).
Boutons larges et contrastés (min 44px).
QR code en accès rapide (icône dans menu principal).

10.9 Accessibilité
Contraste texte/fond AA WCAG minimum.
Police ≥ 16px, espacements réguliers.
Navigation clavier (tab-index).
Labels lisibles pour tous les champs.
Mode sombre futur compatible (préparé).

10.10 Interface administrateur (Retool)
Design sobre, fonctionnel, lisible.
Code couleur par module :
💼 Commerçants = orange
👥 Consommateurs = bleu
💰 Affiliés = vert
⚙️ Système = gris
Graphiques :
Revenus, taxes, commissions, progression utilisateurs.
Filtres avancés : par date, par région, par statut.
Vue “Tickets Support” : recherche par courriel, tri par urgence.

10.11 Règles de conception dynamique
Tous les textes modifiables via CMS (Webflow ou Retool).
Sections réutilisables (design system) : CTA, Hero, témoignages, cartes offres.
Éléments animés modérément (éviter surcharges).
Chargement progressif (Lazy loading images).
Compatibilité complète Chrome / Edge / Safari / iOS / Android.

10.12 Emotion & ton de marque
“RabaisLocal, c’est la fierté d’acheter local, la simplicité du web et la puissance de l’IA.”
Ton général : positif, humain, québécois, proche du monde réel.
Langage IA : naturel et complice — l’utilisateur doit avoir l’impression de “jaser avec un vrai humain du coin”.
Ex. :
“Hey 👋 T’as déjà réservé ton rabais café cette semaine ? Ça part vite en maudit ! ☕😉”

10.13 Micro-interactions recommandées
Animation du bouton “Réserver maintenant” quand le curseur passe.
Confettis visuels après une réservation réussie.
Lueur autour du QR code validé.
Émojis discrets dans les notifications (🎉, 💰, 🛍️).
Animation IA “en train d’écrire” (3 petits points animés).

10.14 Test et validation UX
Prototypes Figma testés avec 10 utilisateurs (3 consommateurs, 3 commerçants, 4 affiliés).
Heatmaps via Hotjar pour analyser les clics.
Questionnaire post-test :
“As-tu compris comment réserver un rabais ?”
“Qu’est-ce qui t’a le plus surpris ?”
“Qu’est-ce que tu changerais ?”

10.15 Livrables UX/UI

Conclusion section 10 :
L’expérience RabaisLocal doit être aussi simple qu’un clic, aussi humaine qu’un sourire de commerçant, et aussi intelligente qu’un assistant IA bien entraîné.
Chaque action, chaque couleur, chaque message contribue à ce sentiment de proximité technologique — “le web qui redonne au local”.

🚀 11. Feuille de route & plan de développement RabaisLocal (2025 → 2026)

11.1 Objectif général
Construire RabaisLocal.com, plateforme de rabais intelligente et modulaire, en suivant une méthode itérative en trois phases :
MVP fonctionnel (pré-lancement) – offrir les fonctionnalités essentielles pour tester le marché et recruter les premiers utilisateurs.
Version BETA (lancement contrôlé) – intégrer les IA, automatisations complètes et paiements réels.
Version COMPLÈTE (lancement officiel – 19 mars 2026) – déploiement public, app mobile et IA adaptative.

11.2 Principes directeurs
Développement modulaire : chaque module peut être conçu indépendamment (sous-domaine, micro-service).
Priorisation par valeur d’impact utilisateur : on bâtit d’abord ce qui génère des revenus et de la rétention.
Intégration no-code/low-code (Make + Supabase + Webflow + GoAffPro) pour accélérer sans sacrifier la qualité.
Objectif 90 % automatisé, 100 % traçable, zéro commission commerçant.
Validation à chaque étape : Build → Test → Measure → Learn.

11.3 Structure de phases
Phase A : MVP pré-lancement (novembre → janvier)
Objectif : recruter, tester, collecter les premiers retours.
👉 Livrable clé fin janvier : MVP en ligne (inscriptions, base DB, emails, premiers tests utilisateurs).

Phase B : BETA – Automatisation & IA (février → mai)
Objectif : automatiser et stabiliser tous les flux internes.
👉 Livrable clé mai 2026 : plateforme opérationnelle (paiements, IA, automatisations).
Début du recrutement massifs affiliés & commerçants.

Phase C : Lancement complet (juin → mars 2026)
Objectif : rendre RabaisLocal totalement autonome et prêt au grand public.
👉 Livrable clé 19 mars 2026 :
💥 Lancement officiel RabaisLocal – plateforme publique, IA intégrée, application mobile, automatisations stables, conformité complète.

11.4 Suivi & gouvernance du projet
Outils recommandés
Rôles clés

11.5 Livrables par phase

11.6 Indicateurs de performance (KPI)

11.7 Plan de test & validation
Tests unitaires : automatisations Make et Edge Functions.
Tests utilisateurs : groupes pilotes (10 → 30 personnes).
Tests de charge : 5 000 requêtes/min sur Supabase.
Tests d’intégration : paiements, IA, géoloc.
Bêta fermée → ouverture progressive.
Documentation technique à jour (schemas, blueprints, changelogs).

11.8 Risques & atténuations

11.9 Phase post-lancement (avril → septembre 2026)
Suivi croissance (trafic, conversion, rétention).
Optimisation SEO régional & IA personnalisée.
Ajout du marché canadien hors Québec.
Début des partenariats municipaux.
Publication API publique.
Recrutement d’une équipe support + IA training.
Première révision majeure : RabaisLocal 2.0 (octobre 2026).

11.10 Résumé roadmap (visuel synthétique)
[2025]
   ⬛ NOV  → MVP (inscriptions, DB, funnels)
   ⬛ DÉC  → Tests internes / retours
   ⬛ JAN  → Lancement pré-lancement public

[2026]
   ⬛ FÉV-MAI → Automatisation + IA + Retool
   ⬛ JUIN-DÉC → App mobile + SEO + API
   ⬛ MARS 19  → Lancement officiel 🎉

11.11 Clôture et vision long terme
“RabaisLocal n’est pas un simple site de rabais.
C’est un écosystème d’économie intelligente, né au Québec, propulsé par l’IA et bâti pour durer.”
D’ici 2027 :
IA prédictive (analyse des tendances locales).
Tableau de bord économique provincial.
Partenariats avec chambres de commerce et municipalités.
Extension au reste du Canada et à la francophonie.

🧩 12. Synthèse & Annexes techniques

12.1 Résumé stratégique
RabaisLocal est une plateforme d’économie locale intelligente, construite autour de trois piliers :
Les consommateurs — découvrent et réservent des rabais exclusifs grâce à un système de crédits simple et équitable.
Les commerçants — créent leurs promotions sans commission, avec l’aide de l’IA.
Les affiliés — propulsent la croissance via un programme d’affiliation 2.0 automatisé et éthique.
L’architecture repose sur un écosystème no-code / low-code stable et évolutif :
Supabase (base & auth) → Make (automatisations) → GoAffPro (affiliation) → Payments.AI (paiements) → Webflow / ClickFunnels (front) → Retool (admin) → OpenAI (IA).
Lancement officiel : 19 mars 2026
Statut actuel : Pré-lancement (Phase A)
Conformité : Loi 25 / TPS-TVQ / Règlements affiliés GoAffPro
Identité : Marque unifiée, design chaleureux, IA intégrée.

12.2 Diagramme d’architecture globale (structure modulaire)
                            ┌───────────────────────────────┐
                            │       UTILISATEURS            │
                            │  Consommateurs / Commerçants  │
                            │        / Affiliés             │
                            └───────────────────────────────┘
                                           │
                                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                        FRONT-END (Web)                           │
│──────────────────────────────────────────────────────────────────│
│  Webflow / ClickFunnels  → Formulaires → Make (Webhook)          │
│  • Pages publiques (rabaislocal.com)                             │
│  • Tableaux de bord (liens GoAffPro / Supabase)                  │
│  • Blog, SEO régional, tunnels d’inscription                     │
└──────────────────────────────────────────────────────────────────┘
                                           │
                                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                        BACK-END (SUPABASE)                       │
│──────────────────────────────────────────────────────────────────│
│ Auth (email / social login)                                      │
│ Tables : users, roles, credits, payments, merchants, offers       │
│ Edge Functions (API interne)                                      │
│ Storage (visuels promo, contrats PDF)                             │
│ RLS + audit_logs + triggers sécurité                              │
└──────────────────────────────────────────────────────────────────┘
                                           │
                                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                            AUTOMATISATION (MAKE)                 │
│──────────────────────────────────────────────────────────────────│
│  Webhooks entrants :                                              │
│   - Formulaires (inscriptions)                                   │
│   - Paiements (Payments.AI / PayPal)                             │
│   - Commissions (GoAffPro)                                       │
│                                                                  │
│  Routages / scénarios :                                          │
│   - Ajout utilisateur → Supabase                                 │
│   - Génération contrat PDF → MailerSend                          │
│   - Vérification TPS/TVQ → Google Sheets                         │
│   - IA prompts (OpenAI)                                          │
│   - Gestion 27 $ / 47 $                                          │
│                                                                  │
│  Modules reliés :                                                │
│   - GoAffPro (Affiliation)                                       │
│   - Payments.AI + PayPal (Paiements)                             │
│   - MailerSend / OneSignal (Notifications)                       │
│   - Canva / OpenAI (Création visuelle & texte IA)                │
└──────────────────────────────────────────────────────────────────┘
                                           │
                                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                           OUTILS ADMIN (RETOOL)                  │
│──────────────────────────────────────────────────────────────────│
│ Tableau de bord complet :                                        │
│  - Utilisateurs (CRUD)                                           │
│  - Crédits & commissions                                         │
│  - Tickets Support                                               │
│  - Logs & paiements                                              │
│  - Vue simplifiée assistants                                     │
│  - Filtres & exports                                             │
└──────────────────────────────────────────────────────────────────┘
                                           │
                                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                          MODULES IA (OPENAI)                     │
│──────────────────────────────────────────────────────────────────│
│  IA Consommateur : recommandations de rabais                     │
│  IA Commerçant : génération de promos                            │
│  IA Affilié : coaching & scripts                                 │
│  Données enregistrées dans Supabase.ai_logs                      │
│  Chat textuel (vocal futur)                                      │
└──────────────────────────────────────────────────────────────────┘
                                           │
                                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                       APPLICATION MOBILE (2026)                  │
│──────────────────────────────────────────────────────────────────│
│ FlutterFlow / React Native                                       │
│  - Connexion Supabase Auth                                       │
│  - Carte interactive / QR code                                   │
│  - Notifications push / hors ligne                               │
└──────────────────────────────────────────────────────────────────┘

12.3 Structure de base de données Supabase (schéma résumé)
Tables principales

12.4 Exemples de scénarios Make (Blueprints)
🔹 Webhook_New_Consumer
Trigger : formulaire ClickFunnels consommateur
Actions :
Enregistre utilisateur Supabase
Attribue 10 crédits gratuits
Envoie courriel de bienvenue
Ajoute au tag “consumer”
Crée carte membre virtuelle (QR code)

🔹 Webhook_New_Merchant
Trigger : Formulaire commerçant
Actions :
Crée compte Supabase + GoAffPro (si affilié existant)
Génère facture PDF
Ajoute au plan choisi (Gratuit / Bronze / Argent / Or)
Active IA promo test
Envoie courriel confirmation

🔹 Webhook_New_Affiliate
Trigger : Formulaire affilié
Actions :
Crée affilié GoAffPro
Envoie contrat PDF via MailerSend
Tag “affiliate_active”
Ajoute à la base Supabase affiliates
Notifie Dany (admin)

🔹 Payment_Received
Trigger : Paiement réussi (Payments.AI)
Actions :
Crée entrée dans payments
Met à jour crédits / abonnement
Ajoute taxes TPS/TVQ
Envoie facture PDF
Journalise transaction

🔹 Renewal_Check_Annual
Trigger : Chaque jour à 00h
Actions :
Vérifie date anniversaire affiliés
Prélève 47 $ (ou solde partiel)
Enregistre opération
Envoie notification “Renouvellement réussi”

12.5 Checklists techniques (pour développement modulaire)

12.6 Diagramme des sous-domaines

12.7 Annexes graphiques
🧭 Logo officiel RabaisLocal 2025
🎨 Palette couleur et charte graphique (voir section 10)
🧠 Icônes IA thématiques (consommateur, commerçant, affilié)
📈 Mockups d’interfaces clés (accueil, tableau de bord, app mobile)
⚙️ Schéma Retool Admin (flux support → logs → paiements)

12.8 Conclusion globale
RabaisLocal est conçu comme une plateforme vivante, évolutive et 100 % québécoise.
Son écosystème modulaire lui permettra d’intégrer, tester et améliorer rapidement chaque composant (commerce, IA, marketing) sans jamais repartir de zéro.
Avec cette base :
Le développement peut être réparti entre plusieurs freelances.
Chaque module peut évoluer indépendamment grâce à Make & Supabase.
Les données demeurent centralisées, traçables et conformes.
Le système IA apprend et s’adapte au fil du temps.
🎯 L’objectif final : Faire de RabaisLocal la référence québécoise du commerce intelligent et collaboratif d’ici 2027.

📘 ANNEXE A — Schéma technique et base de données Supabase

A.1 Objectif
Définir la structure complète de la base de données Supabase servant à héberger les données de RabaisLocal, assurer la sécurité (RLS), la traçabilité (logs) et la performance du site.
Toutes les données utilisateurs, commerçants, offres, crédits et paiements transitent par cette base.

A.2 Structure globale (schéma logique)
                    ┌────────────────────┐
                    │   USERS             │
                    │────────────────────│
                    │ id (UUID)          │
                    │ email              │
                    │ prénom, nom        │
                    │ rôle               │
                    │ date_creation      │
                    │ statut (actif/inactif)
                    │ ville              │
                    │ ref_affiliate_id   │
                    └────────┬───────────┘
                             │
                ┌────────────┴─────────────┐
                │                          │
 ┌──────────────┴──────────────┐   ┌──────────────┴──────────────┐
 │        CREDITS              │   │        COMMISSIONS          │
 │─────────────────────────────│   │─────────────────────────────│
 │ id_credit                   │   │ id_commission               │
 │ id_user                     │   │ id_affiliate                │
 │ montant                     │   │ montant                     │
 │ type (achat/gain/utilisation)│  │ niveau (1–15)               │
 │ date_transaction            │   │ statut (pending/paid)       │
 │ source (jeu, achat, parrainage)│ │ date_creation              │
 └─────────────────────────────┘   └─────────────────────────────┘

                │                          │
                ▼                          ▼

  ┌────────────────────┐          ┌────────────────────┐
  │   PAYMENTS         │          │   MERCHANTS        │
  │────────────────────│          │────────────────────│
  │ id_payment         │          │ id_merchant        │
  │ id_user            │          │ id_user_admin      │
  │ montant_total      │          │ nom_commerce       │
  │ taxes_tps_tvq      │          │ plan (0,147,247,397)
  │ type (achat, abo)  │          │ nb_offres_actives  │
  │ statut (success/failed)│      │ IA_level (1–3)     │
  │ mode (PayPal, Payments.AI)│   │ date_abonnement    │
  └────────────────────┘          └────────────────────┘
                │                          │
                ▼                          ▼
     ┌────────────────────┐       ┌────────────────────┐
     │     OFFERS         │       │      AI_LOGS       │
     │────────────────────│       │────────────────────│
     │ id_offer           │       │ id_ai              │
     │ id_merchant        │       │ id_user            │
     │ titre              │       │ role (consumer/merchant/affiliate)
     │ description        │       │ prompt             │
     │ crédits_requis     │       │ réponse            │
     │ date_debut/fin     │       │ timestamp          │
     │ quota              │       │ sentiment_score    │
     │ image_url          │       └────────────────────┘
     │ statut (actif/expiré)
     └────────────────────┘

A.3 Tables secondaires (support et conformité)

A.4 Relations et contraintes

A.5 Règles de sécurité (RLS – Row Level Security)
Activer RLS sur toutes les tables contenant des données personnelles.
Politique type :
CREATE POLICY user_owns_data ON credits
FOR SELECT USING (auth.uid() = id_user);
Admins et comptables : accès global via rôle role_admin.
Tous les tokens JWT signés par Supabase Auth.

A.6 Triggers automatiques

A.7 Sauvegardes et monitoring
Sauvegarde quotidienne (Supabase native).
Export mensuel automatique vers Google Drive.
Audit mensuel : nombre total de transactions, erreurs Make, incidents IA.
Outil de monitoring : Metabase / Posthog connecté à Supabase pour visualiser la santé du système.



📘 ANNEXE B — Intégrations externes et API

B.1 Objectif
Lister toutes les intégrations externes essentielles à RabaisLocal, leurs points d’entrée (API), leurs webhooks et les protocoles de sécurité nécessaires.
Ce document sert de référence pour tous les développeurs qui brancheront le back-end Supabase et les automatisations Make.

B.2 Résumé global des intégrations

B.3 Détails d’intégration par service

🧱 B.3.1 Supabase
Rôle : Base principale de RabaisLocal (auth + data + storage).
Endpoints clés :
https://project.supabase.co/rest/v1/
Authentification :
JWT Supabase (Bearer).
Clés anon (publique) et service_role (admin).
service_role réservée aux scénarios Make sécurisés.
Utilisation dans Make :
Modules : Create Row, Update Row, Search Rows, Upsert Record.
Variable de connexion : SUPABASE_URL, SUPABASE_KEY.

⚙️ B.3.2 Make (Automatisation)
Rôle : Pont entre tous les services.
Modules utilisés :
Webhooks personnalisés (https://hook.us2.make.com/...)
Supabase, GoAffPro, Payments.AI, MailerSend, Canva, OpenAI.
Routeurs et agrégateurs pour scénarios parallèles.
Sécurité :
Idempotency-Key sur chaque opération financière.
Logs exportés quotidiennement (make_run_logs.csv).
Principaux webhooks Make :

🤝 B.3.3 GoAffPro
Rôle : Gestion complète du programme d’affiliation 2.0.
Endpoints REST :
GET /api/v2/affiliates
POST /api/v2/affiliates
GET /api/v2/commissions
POST /api/v2/payouts
Authentification :
Token API (x-api-key) généré depuis le tableau GoAffPro admin.
Webhooks à configurer :
Flux type :
GoAffPro → Make → Supabase (commissions, users) → Retool (vue admin).

💳 B.3.4 Payments.AI
Rôle : Gestion de toutes les transactions (trousses, abonnements, crédits).
Endpoints REST :
POST /v1/invoices
GET /v1/payments/{id}
POST /v1/refunds
Authentification :
Header : Authorization: Bearer <API_KEY>
Signature webhook : X-Signature (HMAC-SHA256).
Webhook :
POST https://hook.us2.make.com/payment_received
Payload type :
{
  "id": "pay_12345",
  "status": "success",
  "amount": 147.00,
  "currency": "CAD",
  "type": "merchant_plan",
  "customer_email": "test@rabaislocal.com"
}
Actions Make :
Crée payment dans Supabase.
Ajoute crédits / valide abonnement.
Envoie facture PDF via MailerSend.

💰 B.3.5 PayPal
Rôle : Option secondaire pour paiements consommateurs et commerçants.
Endpoints REST :
https://api-m.sandbox.paypal.com/v2/checkout/orders
https://api-m.paypal.com/v2/checkout/orders
Authentification :
OAuth2 (Client ID + Secret).
Token stocké dans Make variable sécurisée.
Webhook Make :
https://hook.us2.make.com/paypal_payment
Sécurité :
Vérification de la signature via header PAYPAL-AUTH-ALGO.
Requêtes validées par Transmission-Sig.

✉️ B.3.6 MailerSend
Rôle : Envoi d’emails automatisés (inscriptions, factures, notifications).
Endpoints REST :
POST /v1/email
Exemples d’emails :
Confirmation d’inscription.
Réinitialisation mot de passe.
Contrat affilié (PDF).
Paiement mensuel confirmé.
Headers :
Authorization: Bearer <API_KEY>
Template type :
Subject: Bienvenue sur RabaisLocal 🎉
Body: Bonjour {{nom}}, ton inscription est confirmée...

🔔 B.3.7 OneSignal
Rôle : Notifications push (Web + mobile).
Utilisée pour informer des nouveaux rabais et rappels d’offres.
Endpoints REST :
POST https://onesignal.com/api/v1/notifications
Exemple payload :
{
  "app_id": "xxxxxxx",
  "include_external_user_ids": ["user123"],
  "contents": { "en": "Nouveau rabais près de chez vous !" },
  "data": { "offer_id": "abc123" }
}

🎨 B.3.8 Canva
Rôle : Génération automatique des visuels d’offres pour les commerçants.
Intégration via Make :
Module “Canva for Teams → Create Design from Template”.
Variables dynamiques : nom commerce, titre offre, crédits, logo.
Fichier généré → Upload vers Supabase Storage (offers_images).
Formats :
.png pour affichage web
.pdf pour promo téléchargeable

🧠 B.3.9 OpenAI
Rôle : Agents IA (Consommateur, Commerçant, Affilié).
Endpoint API :
POST https://api.openai.com/v1/chat/completions
Headers :
Authorization: Bearer OPENAI_API_KEY
Content-Type: application/json
Exemple payload IA Commerçant :
{
  "model": "gpt-4o-mini",
  "messages": [
    {"role": "system", "content": "Tu es un agent RabaisLocal qui aide un commerçant à créer une offre locale."},
    {"role": "user", "content": "Je veux offrir 25% sur mes pizzas cette fin de semaine."}
  ]
}
Sortie :
Texte promotionnel.
Titre d’offre.
Hashtags régionaux.
Proposition de visuel (envoyé à Canva).
Stockage : dans table ai_logs.

🧾 B.3.10 Retool
Rôle : Interface administrateur centralisée.
Connexion :
Source de données : Supabase (Postgres).
Clé API Make pour opérations spécifiques.
Auth SSO via Supabase Auth.
Modules internes :
Dashboard global.
Vue tickets support.
Gestion crédits, paiements, utilisateurs.
Logs et exports.

📊 B.3.11 Metabase / Posthog
Rôle : Suivi analytique et performances.
Connexion :
Directe à Supabase DB.
Tableau de bord : trafic, offres vues, taux conversion.
Export PDF mensuel.

B.4 Protocoles de sécurité

B.5 Monitoring & alertes
Tous les appels API sont journalisés dans api_logs (Supabase).
Les erreurs Make déclenchent une alerte Slack/email à Dany via Webhook_Alert_Error.
KPI de santé API : taux d’erreur < 2 %, latence moyenne < 3 s.



📘 ANNEXE C — Wireframes et maquettes Figma

C.1 Objectif
Fournir une vision visuelle normalisée de l’expérience utilisateur avant l’intégration.
Les wireframes (dessins simplifiés de l’interface) servent à :
uniformiser la hiérarchie de contenu entre les modules,
préparer la structure CMS Webflow,
accélérer la conception graphique dans Figma ou Canva.

C.2 Directives UI globales

C.3 Wireframe 1 – Page d’accueil Consommateur
Objectif
Inciter les visiteurs à s’inscrire gratuitement et découvrir les rabais locaux.
Première impression : claire, conviviale, « locale ».
Structure (desktop)
[Header fixe]
 ├─ Logo RabaisLocal
 ├─ Menu : Accueil / Offres locales / Commerçants / Devenir affilié / Connexion
 └─ CTA : "Découvrir les rabais près de moi"

[Hero section]
 ├─ Image : famille ou commerçant souriant
 ├─ Titre : "Économise localement grâce à l’intelligence collective"
 ├─ Sous-texte : "Découvre les meilleurs rabais de ta région en un clic"
 └─ Bouton : "Je m’inscris gratuitement"

[Bloc : Comment ça fonctionne]
 ├─ Étape 1 : Trouve des offres
 ├─ Étape 2 : Réserve avec tes crédits
 ├─ Étape 3 : Présente ton QR code en magasin

[Bloc : Offres vedettes]
 ├─ 3 cartes alignées : image, titre, prix en crédits, bouton "Réserver"
 └─ Bouton secondaire : "Voir toutes les offres"

[Bloc : Témoignages / Stats sociales]
 ├─ "2600 membres déjà inscrits"
 ├─ Photos circulaires utilisateurs
 ├─ Étoiles et citations

[Footer]
 ├─ CGU / Politique / Mentions légales / Contact
 └─ Réseaux sociaux + compteur membres
Mobile
Navigation repliée (menu burger).
CTA “Découvrir les rabais” fixé bas écran.
Cartes offres empilées (1 par ligne).
Section témoignages → carrousel horizontal.

C.4 Wireframe 2 – Tableau de bord Commerçant
Objectif
Permettre à un commerçant de créer et suivre ses promotions IA simplement.
Structure (desktop)
[Header]  Logo + menu + avatar commerce

[Barre latérale gauche]
 ├─ Tableau de bord
 ├─ Créer une promotion (IA)
 ├─ Mes offres
 ├─ Statistiques
 ├─ Factures / Paiements
 └─ Support

[Zone principale]
 ├─ Bloc résumé : plan actif (ex : Bronze)
 ├─ Statistiques clés : vues / réservations / taux conversion
 ├─ Bouton principal : "Créer une promotion avec l’IA"
 ├─ Liste des offres récentes
 └─ Graphique : évolution des vues (30 jours)
Écran “Créer une promotion”
Formulaire assisté IA :
Type de promo (rabais %, 2 pour 1, mystère…)
Dates / quota / crédits
Bouton “Générer mon texte et visuel”
Résultat : texte + image Canva générés
Bouton : “Publier l’offre”
Mobile
Menu en bas d’écran (icônes : 🏠 📈 ➕ 💬 👤)
Stats et offres empilées verticalement.

C.5 Wireframe 3 – Espace Affilié
Objectif
Fournir aux affiliés un espace clair pour suivre leurs commissions, leur réseau et accéder à leurs outils IA.
Structure
[Header]  Logo + avatar affilié + notification gain

[Bloc : Solde]
 ├─ Solde principal (💰)
 ├─ Solde RabaisLocal (retenue 27 $/47 $)
 └─ Bouton : "Demander mon paiement"

[Bloc : Progression]
 ├─ Rang actuel (Bâtisseur, Coordonnateur…)
 ├─ Barre progression (%)
 ├─ Objectifs à atteindre
 └─ Graphique des gains/mois

[Bloc : Mon réseau]
 ├─ Arborescence ou tableau GoAffPro (intégré iframe)
 ├─ Nombre de niveaux actifs
 └─ Liens de parrainage

[Bloc : Formation IA]
 ├─ Capsules vidéo / scripts d’approche
 └─ Chat IA intégré (assistant affilié)
Mobile
Affichage vertical : Solde → Progression → Réseau → Formation.
Bouton flottant “Partager mon lien” toujours visible.

C.6 Version mobile (expérience unifiée)
Barre de navigation fixe (bas écran)
🏠 Accueil   🔍 Trouver   💳 Crédits   🛍️ Offres   👤 Profil
QR code carte membre accessible depuis le menu principal.
Moteur IA simplifié : zone texte + micro + réponses en bulles.
Notifications push via OneSignal.
Thème clair par défaut, sombre optionnel.

C.7 Structure CMS Webflow
Pages statiques : Accueil / À propos / FAQ / Contact / Connexion.
Pages dynamiques : /offres/[slug] / /commerce/[slug] / /region/[nom].

C.8 Indications pour le designer
Utiliser Figma avec styles partagés (couleurs, texte, boutons).
Exporter tous les composants en .svg ou .png.
Noms de calques normalisés :
btn_primary, card_offer, section_hero, form_signup.
Prévoir mode responsive : Desktop (1440 px) / Tablet (1024 px) / Mobile (390 px).
Éviter surcharge d’animations ; transitions < 0,4 s.





📘 ANNEXE D — Plan de tests & validation (QA)

D.1 Objectifs & portée
Garantir que chaque module respecte les spécifications fonctionnelles et techniques.
Détecter les régressions avant mise en ligne.
Vérifier la sécurité, la conformité Loi 25, la fiscalité (TPS/TVQ) et la performance.
Fournir une base de recettes claire pour les développeurs, le PM et les testeurs.

D.2 Environnements & comptes de test
Environnements
DEV : branches rapides, features en cours (réinitialisable à tout moment).
STAGING : miroir PRODUCTION, données anonymisées, tests d’acceptation.
PRODUCTION : accès restreint, monitoring + sauvegardes.
Comptes & jeux de données (à créer)
Consommateurs :
c_troisriv@example.com (TR), c_mtl@example.com (Montréal), c_quebec@example.com (QC)
Commerçants :
boulangerie@example.com (Plan Bronze), resto@example.com (Plan Or), salon@example.com (Gratuit)
Affiliés :
aff_1@example.com (rang de base), aff_2@example.com (rang avancé)
Admins Retool :
admin@example.com, support@example.com, comptable@example.com
Jeux d’offres préchargés : 12 promos (3 par région), quotas variés, coûts 2–5 crédits, dates différentes.

D.3 Rôles & responsabilités QA

D.4 Stratégie de test (pyramide)
Unitaires (Make modules, Edge Functions)
Intégration (Supabase ↔ Make ↔ GoAffPro/Payments.AI)
End-to-End (E2E) (parcours rôle complet)
UAT (tests utilisateurs réels en staging)
Non-fonctionnels (perf, sécurité, accessibilité)

D.5 Checklists par module (prêtes à cocher)
D.5.1 Utilisateurs & Auth
Inscription e-mail (3 tunnels) → enregistrement Supabase
Login social : Google / Facebook / Apple
Réinitialisation mot de passe (MailerSend)
Rôles appliqués correctement (consumer/merchant/affiliate)
RLS : un utilisateur ne voit jamais les données d’un autre
2FA optionnel fonctionne (activation/désactivation)
Acceptation : création/connexion < 10 s, 0 erreur en 30 essais
D.5.2 Crédits & Portefeuille
Achat packs 20/50/100 → crédits ajoutés automatiquement
Crédits gratuits mensuels (non cumulables) → attribués par Make
Débit correct lors d’une réservation (2–5 crédits)
Historique complet visible et exportable
Acceptation : solde exact à ±0 crédit après 20 opérations mixtes
D.5.3 Commerçants & Offres
Création d’offre via IA : texte + image Canva → publiée
Quotas plans : Gratuit (2/mois), Bronze (50), Argent (85), Or (illimité)
Dates & quotas respectés (expiration/épuisement)
Stats : vues, réservations, conversion → visibles sous 1 min
Acceptation : 10 offres créées → 10 visibles et réservables
D.5.4 Consommateurs & Réservations
Recherche par ville/catégorie/géoloc
QR code unique par réservation → scannable → statut “used”
Avis/notation avec filtre IA anti-abus
Partage social → crédits bonus attribués
Acceptation : 30 réservations test, 0 incohérence statut/solde
D.5.5 Affiliés (GoAffPro)
Inscription + contrat PDF signé
Tableau de bord intégré (iframe/API) visible
Commissions remontent en temps réel
Classement affiliés & progression rangs
Acceptation : 5 ventes simulées → 5 commissions exactes
D.5.6 IA (3 agents)
IA Commerçant : génère une promo cohérente (titre + texte + image)
IA Consommateur : propose 3 offres pertinentes selon la ville
IA Affilié : fournit scripts + plan d’action
Quotas mensuels par plan (Bronze/Argent/Or)
Acceptation : réponses < 6 s moy., 90 % jugées pertinentes
D.5.7 Admin (Retool)
Vue globale KPIs + filtres
Ajout/Retrait crédits (journalisé)
Tickets support → cycle complet (ouvert/assigné/résolu)
Exports paiements & TPS/TVQ (CSV + PDF)
Acceptation : 100 % des actions sensibles loguées
D.5.8 Légal & Conformité (Loi 25)
CMP cookies (consentements par catégorie)
CGU / Politique / Mentions légales accessibles (footer)
Registre consentements (version, IP, date)
Export des données utilisateur (JSON/ZIP) à la demande
Politique d’effacement/anonymisation (24 mois)
Acceptation : conformité validée par check-audit (Annexe A/8)
D.5.9 Marketing & Emails
Séquence 3 courriels onboarding → reçus
UTM tracking (source/medium/campaign/content) → visibles Analytics
Compteur dynamique (membres/offres) → valeurs cohérentes
Acceptation : 100 % des événements clés visibles dans Posthog

D.6 Paiements & flux financiers (tests dédiés)
Webhook Payments.AI/PayPal (HMAC, duplication bloquée)
Retenue mensuelle 27 $ → bascule Compte 2 / reste Compte 1
Renouvellement annuel 47 $ → logique “solde partiel autorisé”
Payout affilié (≥ 20 $) → statut “paid” + email de confirmation
Rapports TPS/TVQ → montants exacts par mois
Acceptation : 12 cycles simulés → 0 écart sur soldes et taxes

D.7 Tests non-fonctionnels
Performance & charge
Page d’accueil TTFB < 600 ms (CDN actif)
Recherche offres (city + geo) < 1 500 ms
500 réservations en 5 minutes → pas d’erreur 5xx
Pics simultanés 1 000 req/min → latence API < 3 s
Sécurité
RLS vérifiée (tests d’intrusion simples)
reCAPTCHA actif sur formulaires publics
Webhooks signés (HMAC) et IP allowlist
Sauvegarde quotidienne + test restauration mensuel validé
Pentest externe planifié avant lancement
Accessibilité
Contraste AA minimum
Navigation clavier complète
Labels/ARIA sur formulaires
Alternatives texte pour images clés

D.8 Gestion des bugs (workflow)
Création (Trello/Linear) : titre, module, gravité (Blocker/Major/Minor), étapes pour reproduire, captures.
Triage (QA lead) : priorité P0/P1/P2, assignation.
Correction (dev) : PR lié, test unitaire.
Revue (QA) : test de vérification + étiquette “Fix Verified”.
Regression suite : relancer tests impactés.
Rapport hebdo : bugs ouverts/fermés, temps moyen de résolution.
SLA interne :
P0 (Bloquant) : < 24 h
P1 (Majeur) : < 72 h
P2 (Mineur) : < 7 jours

D.9 UAT — Tests d’acceptation utilisateur
Panel : 10 consommateurs, 5 commerçants, 5 affiliés (mix régions).
Scénarios réels à exécuter :
Inscription → réservation → validation en boutique
Commerçant crée 2 offres IA → 1 épuisée, 1 expirée
Affilié partage 3 liens → 2 ventes suivies → paiement fin de mois
Échelle de satisfaction (1–5) : clarté, vitesse, confiance, utilité.
Critère GO : satisfaction moyenne ≥ 4/5 + 0 bug bloquant.

D.10 Recette finale (Go/No-Go)
Checklist de mise en ligne
Tous les checklists D.5 validés ✅
Tests non-fonctionnels (perf/sécu/accès) OK ✅
Pentest externe : corrections appliquées ✅
Sauvegarde + runbook restauration vérifiés ✅
Plan de rollback (DNS + release) prêt ✅
Page maintenance & message IA prêt ✅
Monitoring/alertes (Make + Posthog + Uptime) actifs ✅
Signatures
Chef de projet (Dany) : __________________ Date : ____
Référent QA : __________________ Date : ____
Tech lead / Intégrateur : __________________ Date : ____

D.11 Calendrier QA (suggestion)
S-4 à S-3 : tests unitaires & intégration (DEV)
S-2 : E2E + non-fonctionnels (STAGING)
S-1 : UAT + pentest + corrections finales
Semaine 0 : gel des changements, backup complet, GO LIVE
Semaine +1 : suivi post-prod & correctifs rapides

D.12 Modèles de cas de test (exemples prêts à dupliquer)
CT-AUTH-001 — Inscription consommateur
Pré-conditions : STAGING, email neuf
Étapes : remplir formulaire → confirmer email
Résultat attendu : user créé, tag “consumer”, email de bienvenue reçu
CT-PAY-007 — Achat pack 50 crédits
Pré : compte consommateur connecté
Étapes : initier paiement → webhooks reçus → revenir au site
Attendu : payments.success + credits +50 + facture envoyée
CT-IA-012 — Génération promo commerçant
Pré : commerçant plan Bronze
Étapes : remplir formulaire IA → générer → publier
Attendu : texte & image ok, offre visible, stats démarrent

🎯 Conclusion — Annexe D
Avec ce plan QA, tu as la grille de validation complète pour livrer sereinement chaque module et appuyer ton GO LIVE sans sueurs froides.
C’est le document qu’une équipe pro utilise en revue de sprint et en meeting pré-prod.


[TABLE]

Plateforme | Modèle | Inconvénients
Groupon | Commissions de 30 à 50 % | Non rentable pour les petits commerces
Tuango | Commissions élevées, peu de personnalisation | Aucune IA, expérience rigide
Panier Bleu | Répertoire, non transactionnel | Pas de rabais, pas de fidélisation
RabaisLocal | Sans commission, IA + crédits | Centré sur le Québec, évolutif, automatisé
[/TABLE]


[TABLE]

Objectif | KPI principal | Cible 2026 | Cible 2027
Adhésion consommateurs | Nombre d’inscriptions actives | 10 000 | 25 000
Conversion commerçants | % des commerces gratuits qui montent de plan | 35 % | 50 %
Croissance affiliés | Affiliés actifs GoAffPro | 500 | 1 500
Automatisation IA | % des offres générées automatiquement | 60 % | 85 %
Satisfaction client | Taux de satisfaction global | 90 % | 95 %
[/TABLE]


[TABLE]

Composant | Technologie / Outil choisi | Rôle dans l’écosystème RabaisLocal
Front-end principal | Webflow / ClickFunnels 2.0 | Pages publiques, tunnels de vente, formulaires d’inscription
Back-end / Base de données | Supabase (PostgreSQL + Auth + Storage + Edge Functions) | Gestion des utilisateurs, crédits, offres, abonnements et logs
Automatisation | Make (webhooks + routeurs + modules GoAffPro / Supabase / MailerSend / Payments.AI) | Exécution des scénarios automatisés (création de comptes, emails, paiements, etc.)
Affiliation | GoAffPro | Suivi des affiliés, commissions, rangs, paiements et reporting
Paiements | Payments.AI + PayPal | Traitement des transactions et automatisation des prélèvements
IA | OpenAI (GPT-5) + Canva API + HeyGen + Bolt.new | Génération automatisée de promotions, visuels et contenus personnalisés
Administration | Retool | Tableau de bord interne centralisé (gestion des données, support, analytics)
Analytics / KPIs | Metabase + Posthog + Google Analytics 4 | Suivi des performances, rapports automatisés et visualisation des statistiques
Hébergement | Vercel / Supabase Cloud (Canada) | Infrastructure scalable et conforme Loi 25
Sécurité / Authentification | Supabase Auth + reCAPTCHA + 2FA optionnel | Gestion sécurisée des connexions et sessions
Notifications | MailerSend (email) + OneSignal (push) + Make (SMS automatisés) | Communication unifiée multi-canal
[/TABLE]


[TABLE]

Sous-domaine | Rôle principal | Accès
www.rabaislocal.com | Site principal – présentation publique, accès aux offres et formulaires d’inscription | Public
app.rabaislocal.com | Interface utilisateur (consommateur / commerçant / affilié) | Authentifié
admin.rabaislocal.com | Panneau Retool pour la gestion interne et le support | Restreint
ai.rabaislocal.com | Agents IA (Commerçant, Consommateur, Affilié) avec chat textuel et vocal | Authentifié
api.rabaislocal.com | API interne (liaison Supabase ↔ GoAffPro ↔ Payments.AI ↔ IA) | Sécurisé (token + HTTPS)
marketing.rabaislocal.com | Pages ClickFunnels (tunnels, pré-lancement, sociofinancement) | Public
[/TABLE]


[TABLE]

Environnement | Objectif | Particularités techniques
Développement (Dev) | Tests internes et automatisations Make | Données fictives, sandbox Payments.AI
Pré-production (Staging) | Validation avant mise en ligne | Miroir de la prod, mais accès restreint
Production (Prod) | Environnement en ligne public | Sécurisé SSL, sauvegarde quotidienne, audit mensuel
[/TABLE]


[TABLE]

Nom du scénario Make | Déclencheur | Actions principales | Destination
Webhook_Commercant_New | Formulaire ClickFunnels / Webflow | Crée le compte Supabase + envoie contrat PDF + crée GoAffPro | Supabase + GoAffPro
Webhook_Consommateur_New | Inscription gratuite | Crée profil + carte membre + email bienvenue | Supabase + MailerSend
Paiement_Affilie | Achat trousse 47$ | Paiement Payments.AI → activation compte → signature contrat | Supabase + GoAffPro
Crédits_Auto_Mensuel | 1er de chaque mois | Ajoute crédits gratuits aux abonnés payants | Supabase
Sync_Commissions | Quotidien 02:00 AM | Synchronise GoAffPro ↔ Supabase pour statistiques | Supabase + Retool
Backup_Database | Quotidien 23:00 | Export complet JSON + CSV | Google Drive sécurisé
[/TABLE]


[TABLE]

Canal | Outil | Type de notification
Email | MailerSend | Inscription, confirmation, rappels, factures
Push Web | OneSignal | Promotions, nouveautés, géolocalisation
Push Mobile | Firebase (app) | Rabais à proximité, messages IA
Chat IA | OpenAI / Make | Recommandations ou assistance automatique
[/TABLE]


[TABLE]

Rôle | Description | Accès
Consommateur | Accès aux offres, crédits, historique | App + IA consommateur
Commerçant | Gestion des promotions, statistiques | App + IA commerçant
Affilié | Tableau GoAffPro, commissions, rangs | GoAffPro + App
Admin principal | Accès global, gestion Supabase / Make | Retool + Admin
Modérateur / Support | Suivi utilisateurs et litiges | Retool (vue restreinte)
[/TABLE]


[TABLE]

Champ | Type | Description
id | UUID (PK) | Identifiant unique Supabase Auth
email | TEXT | Adresse email
role | ENUM (‘consumer’, ‘merchant’, ‘affiliate’, ‘admin’) | Rôle utilisateur
first_name | TEXT | Prénom
last_name | TEXT | Nom
city | TEXT | Ville
province | TEXT | Province
postal_code | TEXT | Code postal
join_date | TIMESTAMP | Date d’inscription
referred_by | TEXT | Code affilié référent
status | BOOLEAN | Actif / suspendu
created_at | TIMESTAMP | Auto
updated_at | TIMESTAMP | Auto
[/TABLE]


[TABLE]

Champ | Type | Description
id | SERIAL (PK) | Identifiant du mouvement
user_id | UUID (FK → users.id) | Propriétaire des crédits
type | ENUM(‘purchase’, ‘reward’, ‘use’, ‘reset’) | Type d’opération
amount | NUMERIC(10,2) | Montant en $ équivalent
credits_value | INT | Nombre de crédits
balance_after | INT | Solde après transaction
source | TEXT | Origine (paiement, concours, IA, etc.)
created_at | TIMESTAMP | Auto
[/TABLE]


[TABLE]

Champ | Type | Description
id | SERIAL (PK) | Identifiant commerce
user_id | UUID (FK → users.id) | Propriétaire du commerce
company_name | TEXT | Nom de l’entreprise
plan | ENUM(‘free’, ‘bronze’, ‘silver’, ‘gold’) | Forfait actuel
promotions_active | INT | Nombre d’offres actives
total_views | INT | Nombre total de vues
total_reservations | INT | Nombre total de réservations
region | TEXT | Région d’activité
logo_url | TEXT | Lien du logo
validated | BOOLEAN | Compte vérifié
created_at | TIMESTAMP | Auto
[/TABLE]


[TABLE]

Champ | Type | Description
id | SERIAL (PK) | Identifiant de l’offre
merchant_id | INT (FK → merchants.id) | Commerçant lié
title | TEXT | Titre du rabais
description | TEXT | Description courte
credits_cost | INT | Coût en crédits
start_date | DATE | Début de validité
end_date | DATE | Fin de validité
quantity_available | INT | Nombre total disponible
ai_generated | BOOLEAN | Indique si l’offre est IA
image_url | TEXT | Lien de l’image (Canva)
city | TEXT | Ville concernée
active | BOOLEAN | Statut
created_at | TIMESTAMP | Auto
[/TABLE]


[TABLE]

Champ | Type | Description
id | SERIAL (PK) | Identifiant réservation
user_id | UUID (FK → users.id) | Consommateur
promo_id | INT (FK → promotions.id) | Offre réservée
qr_code_url | TEXT | Lien du QR unique
status | ENUM(‘reserved’, ‘used’, ‘expired’, ‘cancelled’) | Statut
credits_used | INT | Nombre de crédits utilisés
created_at | TIMESTAMP | Auto
[/TABLE]


[TABLE]

Champ | Type | Description
id | SERIAL (PK) | Identifiant avis
user_id | UUID (FK → users.id) | Auteur
merchant_id | INT (FK → merchants.id) | Commerce évalué
rating | INT | Note sur 5
comment | TEXT | Commentaire
ai_flagged | BOOLEAN | Indique si l’IA a détecté un risque
created_at | TIMESTAMP | Auto
[/TABLE]


[TABLE]

Champ | Type | Description
id | SERIAL (PK) | Identifiant affilié
user_id | UUID (FK → users.id) | Utilisateur associé
rank | TEXT | Rang actuel
total_referrals | INT | Nombre de filleuls
total_commissions | NUMERIC(10,2) | Commissions cumulées
goaffpro_id | TEXT | ID de référence externe
active | BOOLEAN | Statut
created_at | TIMESTAMP | Auto
[/TABLE]


[TABLE]

Champ | Type | Description
id | SERIAL (PK) | Identifiant commission
affiliate_id | INT (FK → affiliates.id) | Affilié concerné
source_user_id | UUID | Utilisateur référé
amount | NUMERIC(10,2) | Montant
status | ENUM(‘pending’, ‘paid’, ‘cancelled’) | Statut
created_at | TIMESTAMP | Auto
[/TABLE]


[TABLE]

Champ | Type | Description
id | SERIAL (PK) | Identifiant paiement
user_id | UUID (FK → users.id) | Payer
provider | ENUM(‘payments.ai’, ‘paypal’) | Prestataire
transaction_id | TEXT | Référence transaction
amount | NUMERIC(10,2) | Montant total
status | ENUM(‘success’, ‘failed’, ‘pending’) | Statut
purpose | TEXT | Objet (trousse, forfait, crédits)
created_at | TIMESTAMP | Auto
[/TABLE]


[TABLE]

Champ | Type | Description
id | SERIAL (PK) | Identifiant
user_id | UUID (FK → users.id) | Utilisateur concerné
ai_type | ENUM(‘consumer’, ‘merchant’, ‘affiliate’) | Agent IA
prompt | TEXT | Requête envoyée
response | TEXT | Réponse IA
tokens_used | INT | Nombre de tokens consommés
created_at | TIMESTAMP | Auto
[/TABLE]


[TABLE]

Champ | Type | Description
id | SERIAL (PK) | Entrée log
action | TEXT | Type d’action
user_id | UUID | Utilisateur concerné
module | TEXT | Module concerné
details | TEXT | Informations additionnelles
created_at | TIMESTAMP | Auto
[/TABLE]


[TABLE]

Champ | Type | Description
id | SERIAL (PK) | Identifiant consentement
user_id | UUID | Utilisateur concerné
policy_version | TEXT | Version du document accepté
consent_type | TEXT | Type (CGU, Politique, Cookies)
ip_address | TEXT | IP au moment du consentement
created_at | TIMESTAMP | Auto
[/TABLE]


[TABLE]

Champ | Type | Description
id | SERIAL (PK) | Identifiant
user_id | UUID (FK → users.id) | Destinataire
type | ENUM(‘email’, ‘push_web’, ‘push_mobile’, ‘chat_ia’) | Canal
message | TEXT | Contenu
status | ENUM(‘sent’, ‘failed’) | État
created_at | TIMESTAMP | Auto
[/TABLE]


[TABLE]

Classe | Description | Exemples | Protection requise
Publique | Diffusable | Offres, stats publiques | Aucune exigence spéciale
Interne | Usage interne RL | Logs anonymisés, configs | Accès RBAC, pas d’export non chiffré
Confidentielle | Données perso | Nom, email, ville, réservations | Chiffrement en transit/au repos, journalisation
Sensible | Haut risque | Pièces d’identité (si KYC futur), précision de géoloc, tokens API | Chiffrement fort, accès limité, double contrôle
[/TABLE]


[TABLE]

Rôle | Accès | Exclusions
Consommateur | Ses données, ses réservations, ses avis | Pas d’accès aux données d’autrui
Commerçant | Ses commerces/offres/stats | Pas d’accès autres commerces
Affilié | Dashboard GoAffPro, commissions liées | Pas d’accès aux données clients
Support (limité) | Tickets, vue lecture comptes | Pas de modification crédits/paiements
Comptable | Exports paiements, TPS/TVQ | Pas de modification utilisateurs
Admin | Accès global | —
[/TABLE]


[TABLE]

Donnée | Conservation active | Anonymisation
Compte utilisateur | Tant que compte actif | À 24 mois d’inactivité
Transactions (paiements) | 7 ans (obligations comptables) | Anonymisation partielle (hash)
Logs audit | 24 mois | Purge
IA logs (prompts/réponses) | 12 mois | Purge totale
Consentements | 7 ans | Archivage sécurisé
[/TABLE]


[TABLE]

KRI | Seuil | Action
Taux d’échec webhooks 5 min | > 2 % | Alerte + investigation
Tentatives login échouées 1 h | > 50 | Bloque IP + captcha
Temps restauration test | > 60 min | Revoir runbook & infra
Incidents majeurs/trim. | > 0 | Revue sécurité + audit externe
[/TABLE]


[TABLE]

Compte | Nom | Utilisation | Déblocage / Transfert
🟦 Compte 1 | Compte principal | Reçoit les commissions nettes après retenue de 27 $ mensuel. Sert au retrait ou au transfert Interac. | Libre chaque mois après déduction.
🟨 Compte 2 | Compte RabaisLocal | Sert à accumuler les retenues (27 $ / mois) et le futur renouvellement annuel (47 $). | Non accessible à l’utilisateur ; uniquement pour automatisations internes.
[/TABLE]


[TABLE]

Type | Canal | Description
Paiement de trousse affilié | Payments.AI / PayPal | 47 $ ou 77 $ selon promo
Achat de crédits | Payments.AI / PayPal | Packs de 20, 50, 100 crédits
Abonnement commerçant | Payments.AI / PayPal | Bronze, Argent, Or (3 mois)
[/TABLE]


[TABLE]

Cas | Action automatique | Journalisation
Paiement échoué | Retente 3 fois (Make) puis “failed” | audit_log
Solde insuffisant (moins de 27 $) | Retenue partielle | audit_log
Webhook dupliqué | Ignoré via idempotency_key | payments.duplicate_flag
Fraude détectée | Blocage du compte + ticket Retool | support_tickets
Remboursement demandé | Validation admin → reversement crédit | payments.refunded
[/TABLE]


[TABLE]

Nom du scénario | Déclencheur | Objectif
Payment_Received | Webhook Payments.AI | Enregistrer paiements entrants
Commission_Sync | GoAffPro webhook | Ajouter commissions & maj solde
Paiement_Mensuel_Check | Cron fin de mois | Retenue 27 $ et virement solde
Renewal_Check_Annual | Cron date anniversaire | Prélèvement 47 $ annuel
Payout_Affiliate | Manuel / Cron | Effectuer paiement affiliés
TPS_TVQ_Report | Cron mensuel | Export fiscal vers Google Sheets
[/TABLE]


[TABLE]

Élément | Valeur
Couleur principale | Bleu RabaisLocal #3E53A5
Couleur secondaire | Gris clair #F5F8FF
Accent | Rouge #E53935 (CTA / notifications importantes)
Texte | Gris foncé #1B2240
Police | Poppins (400, 600, 700)
Arrondis | border-radius: 12px à 24px
Ombres | Douces (Shadow Medium)
Émotions visuelles | Confiance, bienveillance, efficacité
Illustrations | Humaines, québécoises, souriantes, locales (Canva / Freepik personnalisées)
[/TABLE]


[TABLE]

Élément | Fonction | Exemples
Card offre | Présente une promo (image + titre + crédits + bouton) | “2 pour 1 café – 3 crédits”
Bouton principal (CTA) | Action centrale (inscription, achat, réservation) | background: #3E53A5; color: #fff; font-weight: 600
Badge IA | Signale une offre générée par IA | Petit picto “✨ IA”
Tableaux / Graphiques | Visualisation stats commerçants / affiliés | Recharts ou Supabase Charts
Système d’onglets | Naviguer entre sous-sections | “Mes offres / Mes stats / Mes factures”
Notifications | Non-intrusives (coin supérieur droit, auto-fermeture 4 s) | “🎉 Offre réservée avec succès !”
Modales | Confirmation d’achat, QR code, validation rabais | Fermeture clic extérieur autorisée
[/TABLE]


[TABLE]

Type | Format | Outil
Prototype interactif | .fig | Figma
Charte graphique | .pdf | Canva / Figma
Composants réutilisables | .json / .html | Webflow
Bibliothèque d’icônes | .svg | Lucide / Phosphor
Guide de ton & voix | .pdf | IA RabaisLocal Writer
[/TABLE]


[TABLE]

Priorité | Module | Livrable | Statut attendu
🅰️ | Formulaires d’inscription (3 rôles) | ClickFunnels + Make → Supabase | ✅ fonctionnel
🅰️ | Base Supabase (users, roles, credits, payments) | Schéma finalisé | ✅
🅰️ | Tunnel pré-lancement (consommateur, commerçant, affilié) | Pages Webflow + Copy validé | ✅
🅰️ | Automatisation d’inscription Make → GoAffPro | Webhooks reliés | ✅
🅰️ | Email onboarding automatisé | MailerSend scénarisé | ✅
🅱️ | Tableau de bord Retool (admin test) | Vue lecture seule | 🔄 prototype
🅱️ | Système de crédits simple (achat + utilisation manuelle) | Prototype fonctionnel | 🔄
🅱️ | Agent IA v0 (assistant texte consommateur) | Chat test (OpenAI API) | 🔄
🅲 | Politique légale + consentements Loi 25 | Pages publiques prêtes | ✅
[/TABLE]


[TABLE]

Priorité | Module | Livrable | Commentaire
🅰️ | Synchronisation GoAffPro ↔ Supabase | Scénario Make stable | Critique
🅰️ | Paiements entrants (Payments.AI / PayPal) | Webhook validé + test sandbox | ✅ mars
🅰️ | Tableau de bord affilié intégré (iFrame/API) | Version stylisée | ✅ avril
🅰️ | IA Commerçant (génération de promo texte+image) | Canva + OpenAI | ✅ avril
🅱️ | Retool Admin complet (gestion utilisateurs + tickets) | Vue modulaire par rôle | ✅ mai
🅱️ | Notifications : email, push web, IA | Unified notif center | ✅ mai
🅱️ | Rapports TPS/TVQ automatiques | Export Sheets + Drive | ✅
🅲 | CMS Webflow (offres, blog, témoignages) | Connecté Supabase | 🔄
🅲 | IA Consommateur v1 (recommandations) | Moteur basé sur historique + géoloc | 🔄
[/TABLE]


[TABLE]

Priorité | Module | Livrable | Échéance
🅰️ | App mobile (React Native ou FlutterFlow) | Géolocalisation + QR + notifications push | Décembre 2025
🅰️ | IA Affilié (assistant de coaching + scripts dynamiques) | Chat + plan d’action automatisé | Janvier 2026
🅱️ | API publique (partenaires) | Accès restreint par clé | Février 2026
🅱️ | Audit sécurité / Pentest externe | Rapport + corrections | Février 2026
🅲 | SEO régional (pages /régions) | Arborescence complète | Mars 2026
🅲 | Campagne lancement (pré-inscrits → grand public) | Funnel + vidéos + e-mails | Mars 2026
[/TABLE]


[TABLE]

Domaine | Outil | Usage
Gestion tâches | Notion / ClickUp | Kanban par module
Dev no-code | Make | Scénarios + Webhooks
DB & auth | Supabase | Schéma + monitoring
UX/UI | Figma + Canva | Design system
QA & bug | Trello ou Linear | Suivi anomalies
Docs légales | Google Drive / Notion Legal | Versions + signatures
Back-office | Retool | Vue admin unifiée
[/TABLE]


[TABLE]

Rôle | Responsable | Description
Chef de projet | Dany Gosselin | Supervision globale
Architecte no-code | Freelance / toi au début | Stack & automatisations
Designer UI/UX | Freelance Canva/Figma | Interfaces & visuels
Rédacteur IA | Toi / ChatGPT | Textes + scripts
Comptable partenaire | À recruter | Fiscalité & TPS/TVQ
Dev mobile | Externe (FlutterFlow) | App iOS/Android
[/TABLE]


[TABLE]

Phase | Livrables principaux | Indicateur de réussite
A – MVP | 3 tunnels actifs, 1 DB fonctionnelle, emails auto | ≥ 500 inscriptions pré-lancement
B – BETA | Paiements, IA, Retool, automatisations | 100 % des flux testés sans bug critique
C – Finale | App mobile, IA 3 agents, SEO régional | Lancement 19 mars 2026 réussi + stabilité 99,5 %
[/TABLE]


[TABLE]

Domaine | KPI | Cible 2026
Inscriptions consommateurs | 50 000 | Min. 10 000 actifs
Commerçants inscrits | 5 000 | 40 % payants
Affiliés actifs | 2 500 | 25 % niveau Bâtisseur +
Taux de conversion rabais | 30 % | Moyen par région
Satisfaction utilisateur (NPS) | ≥ 8/10 | Mesuré trimestriellement
Disponibilité plateforme | 99,5 % | Monitoring Supabase
Temps moyen de résolution ticket | < 24 h | via Retool
[/TABLE]


[TABLE]

Risque | Impact | Mesure d’atténuation
Erreur automatisation Make | Bloque paiements | Logs + idempotence
Non-conformité Loi 25 | Amende + image | Vérification juridique trimestrielle
Dépendance plateforme externe | Rupture service | Redondance + backups
Manque de tests réels | Bugs production | Bêta élargie
Charge IA trop coûteuse | Hausse dépenses | Ajustement quotas IA
[/TABLE]


[TABLE]

Table | Description | Champs clés
users | Profil de base | id, nom, email, rôle, date_creation
roles | Rôles (consumer, merchant, affiliate, admin) | id_role, nom, permissions
credits | Gestion des crédits | id_user, balance, transactions
payments | Paiements entrants/sortants | id_payment, type, montant, taxes, statut
commissions | Commissions affiliés | id_affiliate, montant, statut, niveau
merchants | Infos commerçants | id_merchant, nom, plan, offres_count
offers | Offres commerciales | id_offer, id_merchant, titre, credits, date_expiration
ai_logs | Historique IA | id_user, role, prompt, réponse, timestamp
notifications_log | Historique messages | id_user, type, canal, date, statut
audit_logs | Journal système | id_log, action, user_id, timestamp, détail
support_tickets | Demandes support | id_ticket, type, priorité, statut
legal_consents | Consentements légaux | id_user, version, ip, date_acceptation
[/TABLE]


[TABLE]

Catégorie | À vérifier avant livraison module
Base de données | Tables liées créées + RLS activé
Make | Idempotence + logs d’exécution + erreurs gérées
Front | Validation formulaire + reCAPTCHA actif
Paiements | HMAC vérifié + webhook testé
IA | Prompts testés, contenu propre
Admin Retool | Lecture/écriture testée + filtres actifs
Notifications | Emails + push validés + opt-in enregistré
Légal | CGU / politique / cookies accessibles
[/TABLE]


[TABLE]

Domaine | Fonction | Exemple d’URL
www.rabaislocal.com | Plateforme principale | Page d’accueil / rabais
admin.rabaislocal.com | Interface Retool | Gestion interne
ai.rabaislocal.com | Agents IA | Chat consommateurs / commerçants
marketing.rabaislocal.com | Programme d’affiliation 2.0 | Liens GoAffPro
app.rabaislocal.com | Version mobile web / progressive | PWA + QR
api.rabaislocal.com | API publique future | Données locales externes
[/TABLE]


[TABLE]

Table | Description | Champs principaux
audit_logs | Traçabilité actions admin | id_log, user_id, action, date, ip
support_tickets | Suivi des plaintes et remboursements | id_ticket, type, message, statut, priorité
notifications_log | Historique des notifications | id_notif, id_user, canal, message, statut
legal_consents | Consentements Loi 25 | id_user, type_doc, version, ip, date_acceptation
reports_tps_tvq | Exports fiscaux | id_report, mois, tps, tvq, total
wallet_accounts | Comptes internes affiliés | id_user, compte1_solde, compte2_solde, maj_date
[/TABLE]


[TABLE]

Relation | Type | Description
users.id → credits.id_user | 1:N | un utilisateur peut avoir plusieurs transactions de crédits
users.id → commissions.id_affiliate | 1:N | un affilié peut générer plusieurs commissions
merchants.id_merchant → offers.id_merchant | 1:N | un commerçant crée plusieurs offres
payments.id_user → users.id | N:1 | chaque paiement appartient à un utilisateur
ai_logs.id_user → users.id | N:1 | chaque échange IA est lié à un utilisateur
wallet_accounts.id_user → users.id | 1:1 | chaque utilisateur a un double portefeuille
legal_consents.id_user → users.id | 1:1 | consentement unique par version
[/TABLE]


[TABLE]

Trigger | Objectif | Action
after_insert_payment | MàJ crédits / solde affilié | Met à jour wallet_accounts
after_update_commission | Journalisation paiements | Crée ligne dans audit_logs
after_insert_offer | Validation quota et dates | Déclenche alerte si incohérence
after_insert_ai_logs | Filtrage contenu inapproprié | Supprime ou masque réponse IA
[/TABLE]


[TABLE]

Service | Fonction principale | Outil / API | Mode d’intégration
Supabase | Auth, DB, stockage | API REST / GraphQL | Direct (Make + Edge Functions)
Make | Automatisations / scénarios | Webhooks / Modules natifs | Connecteur + JSON payload
GoAffPro | Programme d’affiliation 2.0 | REST API / Webhooks | Connecté à Make
Payments.AI | Paiements / Factures | API REST + Webhooks | Make + Supabase
PayPal | Paiements alternatifs | REST API / Sandbox | Make + HMAC
MailerSend | Envoi d’emails automatiques | SMTP / API REST | Make (module “Send Email”)
OneSignal | Notifications push | REST API | Make / Supabase
Canva | Génération d’images promo | Canva Automate / Make | API via Make
OpenAI | Agents IA (3 rôles) | REST API | Make + Supabase
Retool | Admin centralisé | API Supabase / Make | Front-Admin
Metabase / Posthog | Analytics & suivi | API REST | Supabase Connector
[/TABLE]


[TABLE]

Nom | Fonction
Webhook_New_Consumer | Crée un consommateur après formulaire
Webhook_New_Merchant | Crée un commerçant et facture son plan
Webhook_New_Affiliate | Crée affilié + contrat PDF
Webhook_Payment_Received | Met à jour paiements / crédits
Webhook_Commission_Sync | Synchronise commissions GoAffPro
Webhook_AI_Request | Appel OpenAI / stockage réponse
[/TABLE]


[TABLE]

Événement | Webhook cible Make | Description
commission.created | /hook/commission_create | Nouvelle commission
affiliate.created | /hook/affiliate_create | Nouvel affilié
payout.completed | /hook/payout_complete | Paiement confirmé
[/TABLE]


[TABLE]

Intégration | Méthode | Détails sécurité
Supabase | JWT + RLS | Accès par rôle
Make | HTTPS + Idempotency | Requêtes vérifiées
GoAffPro | x-api-key + HTTPS | Rotation trimestrielle
Payments.AI | HMAC-SHA256 | Signature + horodatage
PayPal | OAuth2 + Transmission ID | Vérification double
MailerSend | Bearer token | Scoped key
OpenAI | Bearer token | Limite taux requêtes
Canva | OAuth + Make connector | Token stocké variable
OneSignal | App Key | Liste blanche IPs
Retool | SSO (Supabase Auth) | Session limitée 8 h
[/TABLE]


[TABLE]

Élément | Valeur / Recommandation
Grille | 12 colonnes (desktop) / 4 colonnes (mobile)
Couleurs | Bleu #3E53A5 / Gris clair #F5F8FF / Texte #1B2240 / Accent #E53935
Police | Poppins – 400 / 600 / 700
Rayon coins | 16 px (cartes, boutons)
Espacement vertical | 32 px entre sections
CTA | Boutons pleins bleu, texte blanc
Icônes | Lucide / Phosphor – style arrondi
[/TABLE]


[TABLE]

Collection | Champs principaux | Description
Offres locales | Titre, image, crédits, commerçant, région, catégorie | Liste dynamique des rabais
Commerçants | Nom, logo, plan, lien site, ville | Page profil commerce
Témoignages | Nom, texte, photo | Preuve sociale
Articles | Titre, slug, contenu, image, auteur | Blog SEO
Pages légales | Titre, contenu, date MAJ | CGU, Politique, etc.
[/TABLE]


[TABLE]

Rôle | Responsable | Tâches
Chef de projet | Dany | Planifie sprints, valide GO/NO-GO
Référent QA | (à désigner) | Coordonne tests, centralise bugs
Devs module | Freelances | Corrigent, livrent, documentent
Testeurs | 2–3 externes | Tests exploratoires & UAT
Juridique | (interne/consultant) | Vérifie Loi 25 / CGU / cookies
[/TABLE]
