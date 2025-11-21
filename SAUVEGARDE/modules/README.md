# 📦 MODULES - RabaisLocal

## Vue d'Ensemble

Cette section contient tous les modules fonctionnels de RabaisLocal. Chaque module est **autonome et indépendant** avec ses propres workflows Make.com, schémas Supabase, tests et documentation.

---

## 📋 Liste des Modules

| Module | Nom | Statut | Dépendances | Priorité |
|--------|-----|--------|-------------|----------|
| **Module A** | Utilisateurs & Authentification | ✅ Complet | Aucune | **P0** |
| **Module B** | Système de Crédits | 🔄 En cours | Module A | **P1** |
| **Module C** | Gestion des Offres | 🔄 En cours | Module A, Module B | **P1** |
| **Module E** | Programme d'Affiliation | 📋 Planifié | Module A | **P2** |
| **Module F** | Intelligence Artificielle | ✅ Complet | Module C | **P2** |

---

## 🔗 Matrice de Dépendances

```
┌─────────────────────────────────────────────────────────┐
│                  MATRICE DE DÉPENDANCES                 │
└─────────────────────────────────────────────────────────┘

MODULE A (Users)
  └─> Aucune dépendance (module de base)

MODULE B (Credits)
  └─> Dépend de MODULE A (nécessite utilisateurs authentifiés)

MODULE C (Offers)
  ├─> Dépend de MODULE A (commerçants et consommateurs)
  └─> Dépend de MODULE B (utilise crédits pour activer offres)

MODULE E (Affiliates)
  └─> Dépend de MODULE A (affiliés = sous-type d'utilisateur)

MODULE F (IA)
  └─> Dépend de MODULE C (génère contenu pour offres)
```

---

## 📦 Ordre d'Installation Recommandé

### Phase 1 - Foundation (Semaine 1-2)
1. ✅ **Module A - Utilisateurs & Authentification**
   - Inscription consommateurs/commerçants/affiliés
   - Authentification JWT
   - Gestion profils

### Phase 2 - Core Features (Semaine 3-4)
2. 🔄 **Module B - Système de Crédits**
   - Achat de paquets de crédits
   - Consommation crédits pour activer offres
   - Historique transactions

3. 🔄 **Module C - Gestion des Offres**
   - Création offres par commerçants
   - Activation offres (coûte des crédits)
   - Recherche et filtrage par consommateurs

### Phase 3 - Advanced Features (Semaine 5-6)
4. 📋 **Module E - Programme d'Affiliation**
   - Inscription affiliés
   - Génération liens de parrainage
   - Calcul commissions

5. ✅ **Module F - Intelligence Artificielle**
   - 3 agents IA (Merchant, Consumer, Affiliate)
   - Génération contenu offres
   - Recommandations personnalisées

---

## 📂 Structure d'un Module

Chaque module suit cette structure standard :

```
modules/
└── module_x_name/
    ├── make/                    # Workflows Make.com (JSON)
    │   ├── webhook_xxx.json
    │   └── scenario_xxx.json
    │
    ├── supabase/                # Schémas SQL & Edge Functions
    │   ├── 01_create_tables_xxx.sql
    │   ├── 02_functions_xxx.sql
    │   └── edge_function_xxx.ts
    │
    ├── tests/                   # Tests & Fixtures
    │   ├── exemple_payload_xxx.json
    │   └── test_cases_xxx.md
    │
    ├── docs/                    # Documentation
    │   ├── README_Module_X.md
    │   └── GUIDE_RAPIDE.md
    │
    └── README.md                # Index du module
```

---

## 🎯 Modules par Priorité

### 🔥 Priorité P0 (Critique - Bloquer)
- **Module A** - Utilisateurs & Authentification
  - Sans utilisateurs, rien ne fonctionne
  - Base de tous les autres modules

### ⚡ Priorité P1 (Haute - Important)
- **Module B** - Système de Crédits
  - Essentiel pour le modèle économique
  - Requis avant Module C

- **Module C** - Gestion des Offres
  - Cœur de métier de RabaisLocal
  - Génère revenus via Module B

### 📌 Priorité P2 (Moyenne - Souhaitable)
- **Module E** - Programme d'Affiliation
  - Croissance virale du projet
  - Peut être déployé après Module C

- **Module F** - Intelligence Artificielle
  - Différenciation compétitive
  - Améliore UX mais non-bloquant

---

## 🔧 Technologies Communes

### Make.com
- Tous les modules utilisent Make.com pour l'automatisation
- Workflows standardisés (Webhook → Validation → DB → Email → Response)
- Variables d'environnement partagées

### Supabase
- Base de données PostgreSQL unique
- Row Level Security (RLS) par module
- Edge Functions pour logique serveur

### MailerSend
- Emails transactionnels standardisés
- Templates français pour chaque module
- Tracking d'ouverture/clics

---

## 📚 Documentation

### Par Module
- [Module A - Utilisateurs & Authentification](./module_a_users/README.md) ✅
- [Module B - Système de Crédits](./module_b_credits/README.md) 🔄
- [Module C - Gestion des Offres](./module_c_offers/README.md) 🔄
- [Module E - Programme d'Affiliation](./module_e_affiliates/README.md) 📋
- [Module F - Intelligence Artificielle](./module_f_ia/README.md) ✅

### Documentation Globale
- [Architecture Générale](../docs/ARCHITECTURE.md)
- [Matrice de Dépendances](../docs/MODULE_DEPENDENCIES.md)
- [Structure du Projet](../docs/PROJECT_STRUCTURE.md)

---

## 🚀 Démarrage Rapide

### 1. Installer Module A (Foundation)
```bash
cd modules/module_a_users
# Suivre le README du module
```

### 2. Installer Module B (Credits)
```bash
cd modules/module_b_credits
# Suivre le README du module
```

### 3. Installer Module C (Offers)
```bash
cd modules/module_c_offers
# Suivre le README du module
```

---

## 🔍 Règles de Développement

### Indépendance des Modules
- ✅ Chaque module doit fonctionner indépendamment
- ✅ Aucun code partagé sauf via `/shared`
- ✅ Dépendances clairement documentées

### Standards de Qualité
- ✅ Tests pour chaque workflow Make.com
- ✅ Documentation complète en français
- ✅ Exemples de payloads JSON pour chaque endpoint

### Versionning
- ✅ Chaque module a sa propre version (semver)
- ✅ Changelog maintenu dans README du module
- ✅ Breaking changes clairement indiqués

---

## 📞 Support

**Questions sur un module spécifique ?**
- Consulter le README du module
- Vérifier la documentation dans `/docs`
- Email: dany@rabaislocal.com

---

**Dernière mise à jour :** 9 novembre 2025
**Version :** 1.0.0
**Modules complets :** 2/5 (Module A, Module F)

---

**Fait avec ❤️ pour l'économie locale québécoise**
*Architecture modulaire pour scalabilité maximale*
