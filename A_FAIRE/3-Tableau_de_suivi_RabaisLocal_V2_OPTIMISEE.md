# ✅ TABLEAU DE SUIVI – Modules RabaisLocal V2.0 OPTIMISÉE

**Document:** Tableau de suivi modules – V2.0 Optimisée  
**Date:** Novembre 2025  
**Statut:** Prêt pour développement  
**Durée totale estimée:** 14 semaines (3,5 mois)

---

## 🧭 RÉSUMÉ EXÉCUTIF – Changements clés

✅ **Phase 1 élargie à 3 semaines** (au lieu de 2) → plus stable  
✅ **NOUVELLE Phase 1.5** : Setup IA & Make schemas avant Phase 2  
✅ **Mock de paiement obligatoire** (Phase 2) pour tester en parallèle  
✅ **Spécification claire du fallback IA** : Claude > OpenAI > Gemini  
✅ **Phase 10 étendue à 2 semaines** avec UAT et recrutement par étapes  
✅ **Tableau RACI ajouté** (qui fait quoi)  
✅ **Colonne "Dépendances"** pour identifier les blocages  
✅ **Colonne "Livrables"** pour clarté et acceptance criteria  

---

## 🚀 PLAN D'ACTION DÉTAILLÉ – 11 PHASES (14 semaines)

### PHASE 0: PRÉ-DÉVELOPPEMENT – Setup & Specs (Semaine 1)

| # | Tâche | Responsable | Priorité | Dépendances | Livrables | Statut |
|---|-------|-------------|----------|-------------|-----------|--------|
| 0️⃣1️⃣ | Créer schéma Make complet (JSON webhooks) | Spec-maker | 🔥 A | Supabase + GoAffPro + Payments | Spec JSON complète + diagramme flux | ☐ |
| 0️⃣2️⃣ | Spécifier fallback IA (Claude par défaut) | IA-lead | 🔥 A | Backend IA | Doc : ordre de fallback + clés API | ☐ |
| 0️⃣3️⃣ | Créer tableau RACI (responsabilités) | PM | 🔥 A | Équipe | Matrice RACI finalisée | ☐ |
| 0️⃣4️⃣ | Documenter env staging vs prod | DevOps | ⚡ B | Infra | Doc déploiement + checklist | ☐ |
| 0️⃣5️⃣ | Setup repo Git & workflow CI/CD | DevOps | ⚡ B | Supabase + Vercel | Repo live + pipelines testées | ☐ |

**Résultat attendu:** Spécifications complètes, équipe alignée, infra prête

---

### PHASE 1: BASE TECHNIQUE & SÉCURITÉ (Semaines 1-3, au lieu de 1-2)

| # | Tâche | Responsable | Priorité | Dépendances | Livrables | Statut |
|---|-------|-------------|----------|-------------|-----------|--------|
| 1️⃣1️⃣ | Créer table users & auth Supabase | Backend | 🔥 A | PostgreSQL | Table users complète + indexes | ☐ |
| 1️⃣2️⃣ | Implémenter JWT + refresh tokens | Backend | 🔥 A | Supabase Auth | Auth API fonctionnelle | ☐ |
| 1️⃣3️⃣ | Créer endpoints login/logout/reset | Backend | 🔥 A | Backend API | 3 endpoints + tests | ☐ |
| 1️⃣4️⃣ | Implémenter RBAC (4 rôles) | Backend | 🔥 A | Supabase RLS | Policies Supabase testées | ☐ |
| 1️⃣5️⃣ | Ajouter champ 'référé_par' + GoAffPro link | Backend + Make | 🔥 A | GoAffPro API | Champ + sync GoAffPro OK | ☐ |
| 1️⃣6️⃣ | Vérification email + token | Backend | 🔥 A | Email/SMTP | Email de confirmation OK | ☐ |
| 1️⃣7️⃣ | Profil utilisateur (avatar, bio, région) | Frontend | ⚡ B | Supabase Storage | Profil page + upload avatar | ☐ |

**Résultat attendu:** Auth API complète, RBAC fonctionnelle, GoAffPro linkage prêt

---

### PHASE 1.5: SETUP IA & AUTOMATISATIONS (Semaines 3-4) ⭐ NOUVELLE

| # | Tâche | Responsable | Priorité | Dépendances | Livrables | Statut |
|---|-------|-------------|----------|-------------|-----------|--------|
| 1️⃣5️⃣a | Configurer OpenAI API + clés | Backend | 🔥 A | OpenAI | Clés chargées, tests OK | ☐ |
| 1️⃣5️⃣b | Configurer Claude API + fallback | Backend | 🔥 A | Anthropic | Fallback orchestration OK | ☐ |
| 1️⃣5️⃣c | Configurer Gemini API (3e fallback) | Backend | ⚡ B | Google | Fallback chain testée | ☐ |
| 1️⃣5️⃣d | Créer fonction proxy IA multi-provider | Backend | 🔥 A | Backend | Endpoint /api/ai-generate prêt | ☐ |
| 1️⃣5️⃣e | Documenter prompts par rôle (commerçant/affilié/consommateur) | Content | ⚡ B | IA prompts | 3 sets de prompts doc | ☐ |
| 1️⃣5️⃣f | Setup Make scénarios de base (webhooks) | Make-specialist | 🔥 A | Make | 4 scénarios Make déployés | ☐ |

**Résultat attendu:** Proxy IA multi-provider prêt, Make orchestration complète

---

### PHASE 2: CRÉDITS & PORTEFEUILLE + MOCK PAIEMENT (Semaines 4-5)

| # | Tâche | Responsable | Priorité | Dépendances | Livrables | Statut |
|---|-------|-------------|----------|-------------|-----------|--------|
| 2️⃣1️⃣ | Créer tables credits_wallet & transactions | Backend | 🔥 A | Supabase | Tables OK + indexes | ☐ |
| 2️⃣2️⃣ | Implémenter MOCK de paiement (test mode) | Backend | 🔥 A | Backend | Endpoint /api/mock-payment OK | ☐ |
| 2️⃣3️⃣ | Générer reçus automatiques (PDF FR) | Backend | ⚡ B | Make + PDF gen | Template PDF FR prêt | ☐ |
| 2️⃣4️⃣ | Intégrer Payments.AI (réel) | Paiement | 🔥 A | Payments.AI | Tunnel paiement OK (test) | ☐ |
| 2️⃣5️⃣ | Intégrer PayPal (réel) | Paiement | 🔥 A | PayPal API | PayPal button OK (test) | ☐ |
| 2️⃣6️⃣ | Tableau de bord crédits (solde + historique) | Frontend | 🔥 A | Frontend | Dashboard crédits OK | ☐ |
| 2️⃣7️⃣ | Réduction automatique selon plan | Backend | ⚡ B | Backend logic | Logic appliquée (A/B testée) | ☐ |

**Résultat attendu:** Mock paiement + réel Payments.AI/PayPal, crédits gérés

---

### PHASE 3: OFFRES & PROMOTIONS (Semaines 5-7)

| # | Tâche | Responsable | Priorité | Dépendances | Livrables | Statut |
|---|-------|-------------|----------|-------------|-----------|--------|
| 3️⃣1️⃣ | Créer table offers + metadata | Backend | 🔥 A | Supabase | Table OK + 8 types d'offres | ☐ |
| 3️⃣2️⃣ | Générer offres via IA (texte + image) | IA + Backend | 🔥 A | OpenAI/Claude API | Generator OK (mock d'abord) | ☐ |
| 3️⃣3️⃣ | Validation manuelle commerçant avant pub | Frontend | 🔥 A | Frontend | Validation UI OK | ☐ |
| 3️⃣4️⃣ | Réservation + débit automatique crédits | Backend | 🔥 A | Backend + Credits | Réservation OK | ☐ |
| 3️⃣5️⃣ | Affichage avec filtres + géolocalisation | Frontend | ⚡ B | Frontend + Maps API | UI filtres + map OK | ☐ |
| 3️⃣6️⃣ | Gestion quotas/inventaire | Backend | ⚡ B | Backend | Logic quotas OK | ☐ |
| 3️⃣7️⃣ | Module notifications (offres locales) | Backend + Make | ⚡ B | OneSignal + Make | Notifications push OK | ☐ |

**Résultat attendu:** Générateur d'offres IA, réservation + crédits, notifications

---

### PHASE 4: COMMERÇANTS (Semaines 7-8)

| # | Tâche | Responsable | Priorité | Dépendances | Livrables | Statut |
|---|-------|-------------|----------|-------------|-----------|--------|
| 4️⃣1️⃣ | Tableau de bord commerçant complet | Frontend | 🔥 A | Frontend | Dashboard merchant OK | ☐ |
| 4️⃣2️⃣ | Création d'offres via IA (intégrée) | Frontend + IA | 🔥 A | IA proxy | Creator wizard OK | ☐ |
| 4️⃣3️⃣ | Gestion des plans (Gratuit/Bronze/Argent/Or) | Backend | 🔥 A | Backend | Plans manager OK | ☐ |
| 4️⃣4️⃣ | Paiement automatique abonnements | Paiement | 🔥 A | Payments.AI + Make | Auto-renew OK | ☐ |
| 4️⃣5️⃣ | Statistiques performance (clics/réservations/revenus) | Frontend + Backend | ⚡ B | Analytics | Stats dashboard OK | ☐ |
| 4️⃣6️⃣ | Support & FAQ commerçant | Content | ⚡ B | Knowledge base | FAQ + vidéos prêtes | ☐ |

**Résultat attendu:** Commerçants autonomes pour créer et gérer offres

---

### PHASE 5: AFFILIÉS (Semaines 8-9)

| # | Tâche | Responsable | Priorité | Dépendances | Livrables | Statut |
|---|-------|-------------|----------|-------------|-----------|--------|
| 5️⃣1️⃣ | Connecter GoAffPro (tracking + commissions) | Backend + Make | 🔥 A | GoAffPro API | Sync bidirectionnelle OK | ☐ |
| 5️⃣2️⃣ | Tableau de bord affilié (clics/ventes/équipe) | Frontend | 🔥 A | Frontend | Dashboard affilié OK | ☐ |
| 5️⃣3️⃣ | Arborescence réseau (visualisation) | Frontend | ⚡ B | Frontend charts | Network tree OK | ☐ |
| 5️⃣4️⃣ | Progression automatique rangs | Backend + GoAffPro | 🔥 A | GoAffPro sync | Rank progression OK | ☐ |
| 5️⃣5️⃣ | Contrat d'affiliation (PDF + signature) | Backend + Make | 🔥 A | PDF gen + DocuSign | Contrat signature OK | ☐ |
| 5️⃣6️⃣ | Prélèvements automatiques (27$/mois) | Paiement + Make | 🔥 A | Payments.AI + GoAffPro | Auto-debit OK | ☐ |
| 5️⃣7️⃣ | Notifications commissions/paiements | Backend + Make | ⚡ B | Email + Push | Notifs OK | ☐ |

**Résultat attendu:** Réseau d'affiliés automatisé et rémunéré

---

### PHASE 6: AGENTS IA SPÉCIALISÉS (Semaines 9-10)

| # | Tâche | Responsable | Priorité | Dépendances | Livrables | Statut |
|---|-------|-------------|----------|-------------|-----------|--------|
| 6️⃣1️⃣ | Agent IA Commerçant (suggestions offres) | Backend + IA | ⚡ B | IA proxy | Agent OK + prompts testés | ☐ |
| 6️⃣2️⃣ | Agent IA Consommateur (trouver offres) | Backend + IA | ⚡ B | IA proxy | Agent OK + search tested | ☐ |
| 6️⃣3️⃣ | Agent IA Affilié (coaching + suivi) | Backend + IA | ⚡ B | IA proxy | Agent OK + context OK | ☐ |
| 6️⃣4️⃣ | Fallback multi-provider (Claude > OpenAI > Gemini) | Backend | 🔥 A | Backend | Fallback chain testée | ☐ |
| 6️⃣5️⃣ | Integration Canva API (visuels auto) | Backend + Make | ⚡ B | Canva API | Canva templates OK | ☐ |
| 6️⃣6️⃣ | Génération vidéo via IA (Synthesia/HeyGen) | Backend + Make | ⚙️ C | Synthesia API | Video gen option prête | ☐ |

**Résultat attendu:** 3 agents IA spécialisés, fallback robuste

---

### PHASE 7: PAIEMENTS & FACTURATION COMPLÈTE (Semaines 10-11)

| # | Tâche | Responsable | Priorité | Dépendances | Livrables | Statut |
|---|-------|-------------|----------|-------------|-----------|--------|
| 7️⃣1️⃣ | Centraliser TOUS les paiements | Paiement | 🔥 A | Payments.AI + PayPal | Payment hub OK | ☐ |
| 7️⃣2️⃣ | Gérer plans commerçants (renouvellement auto) | Backend + Paiement | 🔥 A | Make + Payments | Auto-renew OK | ☐ |
| 7️⃣3️⃣ | Gérer commissions affiliés (redistribution 51%) | Backend + Make | 🔥 A | Make + Payments | Redistribution OK | ☐ |
| 7️⃣4️⃣ | Factures PDF bilingues (FR/EN) | Backend | ⚡ B | PDF gen + Make | Factures auto OK | ☐ |
| 7️⃣5️⃣ | Rapports Excel automatiques (revenus/TPS/TVQ) | Backend + Make | ⚡ B | Make + Google Sheets | Rapports auto OK | ☐ |
| 7️⃣6️⃣ | Audit trail complet (logs transactions) | Backend | ⚡ B | Supabase logs | Audit complet OK | ☐ |

**Résultat attendu:** Tous les paiements automatisés et traçables

---

### PHASE 8: ADMINISTRATION & MONITORING (Semaines 11-12)

| # | Tâche | Responsable | Priorité | Dépendances | Livrables | Statut |
|---|-------|-------------|----------|-------------|-----------|--------|
| 8️⃣1️⃣ | Tableau de bord admin (utilisateurs/offres/paiements) | Frontend | 🔥 A | Frontend | Admin dashboard OK | ☐ |
| 8️⃣2️⃣ | Gestion parrains (change affilié parent) | Backend + Frontend | ⚡ B | Backend | Sponsor change OK | ☐ |
| 8️⃣3️⃣ | Alertes système + logs d'erreurs | Backend + DevOps | ⚡ B | Sentry/LogRocket | Monitoring setup OK | ☐ |
| 8️⃣4️⃣ | Rapports automatiques hebdomadaires | Backend + Make | ⚡ B | Make + Google Sheets | Weekly reports OK | ☐ |
| 8️⃣5️⃣ | Dashboard KPI temps réel | Frontend | ⚡ B | Frontend charts | KPI board OK | ☐ |

**Résultat attendu:** Contrôle et monitoring complets du système

---

### PHASE 9: APPLICATION MOBILE PWA (Après lancement, semaine 13+)

| # | Tâche | Responsable | Priorité | Dépendances | Livrables | Statut |
|---|-------|-------------|----------|-------------|-----------|--------|
| 9️⃣1️⃣ | Connexion API existante (auth) | Mobile | ⚙️ C | Frontend mobile | Mobile auth OK | ☐ |
| 9️⃣2️⃣ | Affichage offres locales + réservation | Mobile | ⚙️ C | Mobile frontend | Offers page OK | ☐ |
| 9️⃣3️⃣ | Notifications push + géolocalisation | Mobile + Backend | ⚙️ C | OneSignal + Maps | Push + geo OK | ☐ |
| 9️⃣4️⃣ | Assistant IA mobile (voice chat) | Mobile + IA | ⚙️ C | Mobile + STT/TTS | Voice assistant OK | ☐ |

**Résultat attendu:** App mobile complète et accessible

---

### PHASE 10-11: TESTS, UAT & PRÉ-LANCEMENT (Semaines 12-14) ⭐ ÉTENDUE

| # | Tâche | Responsable | Priorité | Dépendances | Livrables | Statut |
|---|-------|-------------|----------|-------------|-----------|--------|
| 1️⃣0️⃣1️⃣ | Tests unitaires + intégration (tous modules) | QA | 🔥 A | Backend/Frontend | Coverage >80% | ☐ |
| 1️⃣0️⃣2️⃣ | UAT par rôle (consommateur/commerçant/affilié) | QA + Users | 🔥 A | All modules | UAT signée | ☐ |
| 1️⃣0️⃣3️⃣ | Test de charge (1000 users simultanés) | DevOps + QA | 🔥 A | Production-like | Load test OK | ☐ |
| 1️⃣0️⃣4️⃣ | Recrutement affiliés étape 1 (5 pionniers) | Sales | 🔥 A | GoAffPro | 5 affiliés actifs | ☐ |
| 1️⃣0️⃣5️⃣ | Recrutement affiliés étape 2 (20 additionnels) | Sales | 🔥 A | GoAffPro | 25 affiliés total | ☐ |
| 1️⃣0️⃣6️⃣ | Recrutement affiliés étape 3 (25 additionnels) | Sales | 🔥 A | GoAffPro | 50 affiliés total | ☐ |
| 1️⃣0️⃣7️⃣ | Activation sociofinancement (Explorateur/Pilier/Légende) | Marketing | ⚡ B | ClickFunnels | Socio live | ☐ |
| 1️⃣0️⃣8️⃣ | Déploiement staging → prod | DevOps | 🔥 A | Vercel/Supabase | Prod live | ☐ |
| 1️⃣0️⃣9️⃣ | Lancement site pré-lancement + tunnels CF | Marketing + DevOps | 🔥 A | ClickFunnels | Site live | ☐ |
| 1️⃣1️⃣0️⃣ | Go-live monitoring (24h/48h) | DevOps + Support | 🔥 A | Sentry + Uptime | All systems go | ☐ |

**Résultat attendu:** RabaisLocal 100% fonctionnel, prêt pré-lancement

---

## 👥 TABLEAU RACI – Qui fait quoi ?

| Rôle | Fonction | Modules principaux | Responsabilités | Dépendances |
|------|----------|-------------------|-----------------|-------------|
| PM/Dany | Propriétaire produit | Tous les modules | Vision globale, priorisation, décisions stratégiques | Équipe tech |
| Backend Lead | Architecture API | A, B, C, D, E, F, G, I | Design patterns, intégrations, sécurité | Frontend, DevOps |
| Frontend Lead | UI/UX | Tableaux de bord (A, B, D, E, F, I) | Interfaces, expérience utilisateur | Backend, Design |
| IA Specialist | Agents IA | F, G (IA commerçant/affilié/consommateur) | Prompts, fallback, optimisation | Backend |
| Make/Automation | Orchestration | Make (0, 1.5, 2, 3, 5, 7, 8) | Webhooks, scénarios, intégrations | Backend, Paiement |
| Paiement Specialist | Transactions | B, G (Payments.AI, PayPal) | Config paiements, sécurité PCI | Backend |
| DevOps/Infra | Déploiement | 0, 1, Infrastructure | CI/CD, staging, prod, monitoring | Backend, Frontend |
| QA/Tests | Qualité | Tous les modules | Tests unitaires, UAT, charge | Tous |
| Marketing/Sales | Croissance | Sociofinancement, recrut. affiliés | Tunnels CF, email sequences | Backend |

---

## ⚠️ DÉPENDANCES CRITIQUES & RISQUES

1. **Integration GoAffPro non testée** (Risque HAUTE)
   - Mitigation : Démarrer tests GoAffPro dès Phase 1, créer sandbox GoAffPro

2. **Retard Payments.AI/PayPal** (Risque HAUTE)
   - Mitigation : Mock de paiement en Phase 2, intégration réelle en parallèle

3. **IA multi-provider fallback complexe** (Risque MOYENNE)
   - Mitigation : Phase 1.5 complète, tests fallback dès départ

4. **Make webhooks instables** (Risque HAUTE)
   - Mitigation : Spec complète Phase 0, retry logic en Phase 1.5

5. **Performance Supabase avec N requêtes** (Risque MOYENNE)
   - Mitigation : Load testing en Phase 10, caching strategy Phase 8

---

## 📦 LIVRABLES ATTENDUS PAR ÉTAPE

### Phase 0
- Spec Make (JSON schema + diagramme flux)
- Doc fallback IA (ordre + clés API)
- Tableau RACI finalisé
- Setup CI/CD repo Git prêt

### Phase 1-1.5
- Auth API complète (login/logout/reset)
- RBAC + RLS Supabase testée
- GoAffPro sync bidirectionnelle OK
- Proxy IA multi-provider prêt
- 4 scénarios Make en prod

### Phase 2
- Mock paiement + vrai Payments.AI/PayPal
- Tableaux de bord crédits OK
- Factures PDF FR auto-générées

### Phase 3
- Générateur offres IA OK
- Réservation + débit crédits OK
- Notifications push OK

### Phase 4-5
- Tableaux de bord commerçants & affiliés
- Contrats d'affiliation signés
- Auto-renew & auto-debit OK

### Phase 10-11
- UAT signée par tous les rôles
- 50 affiliés recrutés & actifs
- Sociofinancement live
- Production stable 24h

---

## ⏱️ RÉSUMÉ TIMING – Vue d'ensemble

```
PHASE 0 : Semaine 1                   [====]  Setup & Specs
PHASE 1-1.5 : Semaines 1-4            [========]  Auth + IA Setup  
PHASE 2 : Semaines 4-5                [====]  Credits + Mock Paiement
PHASE 3 : Semaines 5-7                [======]  Offres & Promotions
PHASE 4 : Semaines 7-8                [====]  Commerçants
PHASE 5 : Semaines 8-9                [====]  Affiliés
PHASE 6 : Semaines 9-10               [====]  Agents IA
PHASE 7 : Semaines 10-11              [====]  Paiements Complets
PHASE 8 : Semaines 11-12              [====]  Admin & Monitoring
PHASE 10-11 : Semaines 12-14          [======]  Tests, UAT, Lancement

TOTAL : 14 semaines (3,5 mois) pour pré-lancement complet
```

---

## 🔥 ACTIONS IMMÉDIATES – Semaine 1

| Jour | Action | Qui | Livrable |
|------|--------|-----|----------|
| Jour 1-2 | Créer schéma Make JSON complet | Spec-maker | Doc + diagramme |
| Jour 2 | Spécifier fallback IA (Claude > OpenAI > Gemini) | IA-lead | Doc + clés API setup |
| Jour 3 | Créer tableau RACI | PM/Dany | Matrice RACI signée |
| Jour 4-5 | Setup repo Git + CI/CD | DevOps | Repo live + pipelines OK |
| Jour 5-7 | Démarrer Phase 1 (auth Supabase) | Backend | Table users + JWT OK |

---

## 📌 NOTE IMPORTANTE

Ce document est la version **OPTIMISÉE** du tableau initial.

### Changements clés :
- ✅ Phase 1 : 3 semaines au lieu de 2 (moins de stress)
- ✅ NOUVELLE Phase 1.5 : Setup IA & Make schemas complètes
- ✅ Phase 2 : Mock paiement obligatoire + intégration réelle en parallèle
- ✅ Phase 10-11 : UAT + recrutement affiliés par étapes
- ✅ Tableau RACI + dépendances clairement documentées
- ✅ Durée : 14 semaines (3,5 mois) au lieu de 9 semaines (moins réaliste)

### Prochains pas :
**Signez ce document et commencez Phase 0 immédiatement pour éviter retards.**

---

**Validé par:** _________________________ **Date:** _______________
