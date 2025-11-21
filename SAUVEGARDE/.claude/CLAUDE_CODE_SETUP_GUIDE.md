# 🚀 GUIDE COMPLET : Claude Code + config.json + Cahier de Charge RabaisLocal

## 📋 TABLE DES MATIÈRES

1. [Question 1 : Comment Claude Code lit ton cahier de charge](#question-1)
2. [Question 2 : Le nouveau config.json enrichi](#question-2)
3. [Question 3 : Comment Claude Code utilise son fichier mémoire](#question-3)
4. [Bonus : Mise en place complète du workflow](#bonus)

---

## ❓ QUESTION 1 : Comment Claude Code lit ton cahier de charge

### ✅ Réponse rapide

Pour que Claude Code lise et comprenne ton cahier de charge :

#### **Étape 1 : Place le cahier dans le bon dossier**

```bash
/home/claude/
├── .claude
│   └── Document_Maitre.md    ← Contient ton cahier complet
├── config.json                ← Configuration du projet
├── .git/
├── docs/
│   ├── modules/
│   ├── api/
│   └── security/
└── [autres fichiers du projet]
```

**Crée le fichier `.claude/Document_Maitre.md` :**

Dans VS Code, ouvre le terminal et fais :

```bash
mkdir -p .claude
touch .claude/Document_Maitre.md
```

Puis copie-colle **tout le contenu** de ton cahier de charge (Cahier_de_charge_RabaisLocal_V2_COMPLET.docx) en texte brut dans ce fichier. Sauvegarde (Ctrl+S).

#### **Étape 2 : Crée un fichier `.claude_rules` (optionnel mais puissant)**

```bash
touch .claude_rules
```

Contenu type :

```
# Claude Coding Rules for RabaisLocal

## Contexte
- Plateforme d'économie locale intelligente
- Stack : Supabase + Make + GoAffPro + Webflow/ClickFunnels
- Lancement officiel : 19 mars 2026
- Founder: Dany Gosselin

## Code Standards
- Langue: FRANÇAIS (commentaires + variables)
- Format: JSON / JavaScript / SQL complet
- No snippets : code fonctionnel 100%
- Mobile-first responsive
- Gestion erreurs incluse
- Logging audit complète

## Sécurité
- HTTPS/TLS 1.2+ obligatoire
- RLS Supabase activé
- HMAC-SHA256 pour webhooks
- reCAPTCHA formulaires publics
- Conformité Loi 25 (Québec)

## Make Webhooks (Priorité)
- Idempotency-Key sur paiements/réservations
- Signature HMAC vérifiée
- Logs d'exécution exportés
- Erreurs catchées (pas de timeout)
```

#### **Étape 3 : Configure ton `.claude` project dans VS Code**

Ouvre la **Command Palette** (Ctrl+Shift+P) et tape :

```
Claude: Set Project Context
```

Sélectionne le dossier de ton projet.

Claude Code va maintenant **automatiquement** :
- Lire `config.json` pour comprendre la structure du projet
- Lire `Document_Maitre.md` pour connaître chaque détail fonctionnel
- Respecter `.claude_rules` pour la qualité du code
- Utiliser un fichier "mémoire" interne (voir question 3)

### ✅ Quand tu poses une question à Claude Code

**Exemple bon :**
```
"Crée un scénario Make pour synchroniser les commissions GoAffPro → Supabase.
Utilise idempotence sur les transactions et log chaque opération."
```

**Claude va :**
1. Lire `config.json` → voir que c'est RabaisLocal
2. Lire `Document_Maitre.md` → section 7 (API & Webhooks)
3. Consulter `.claude_rules` → voir les standards Make
4. **Générer du code** prêt à copier-coller dans Make directement ✅

---

## ❓ QUESTION 2 : Le nouveau config.json enrichi

### ✅ Réponse rapide

**Je viens de te créer un `config.json` COMPLET** qui :

✅ Intègre **100% du cahier de charge**  
✅ Préserve tous les **prix** inchangés  
✅ Inclut les **KPIs 2026-2027**  
✅ Liste tous les **13 modules (A→M)**  
✅ Détaille les **intégrations et sous-domaines**  
✅ Documente ta **vision long-terme et rêves**

### Fichier créé : `/mnt/user-data/outputs/config.json`

**Télécharge-le et place-le ici :**

```bash
# Sur ton PC (projet RabaisLocal)
projet-rabaislocal/
├── config.json                ← ← ← Colle le nouveau
├── .claude/
│   ├── Document_Maitre.md
│   └── .claude_rules
└── ...autres fichiers
```

### 🔍 Sections clés du nouveau config.json

```json
{
  "project": {
    "name": "RabaisLocal",
    "team_members": [Dany, Amélie (15%), Roxanne (15%)]
  },
  "timeline": {
    "pre_launch": "2025-11-14",
    "official_launch": "2026-03-19",
    "phases": {Phase A, Phase B, Phase C}
  },
  "modules": {
    "A_users_auth": {...},
    "B_credits_wallet": {...},
    "C_merchants": {...},
    ...
    "M_future_expansion": {...}
  },
  "financial": {
    "commission_model": "Zéro commission commerçants",
    "affiliate_program": "2.0 (GoAffPro)"
  },
  "kpis_targets": {
    "2026": {...},
    "2027": {...}
  }
}
```

---

## ❓ QUESTION 3 : Claude Code utilise-t-il un autre fichier pour sa "mémoire" ?

### ✅ Réponse (IMPORTANT)

**NON. Claude Code n'utilise PAS un fichier mémoire séparé.**

Voici comment fonctionne Claude Code :

#### **A — Avant (sans config)**

Chaque fois que tu lui poses une question dans VS Code :
- Claude lit le contexte **de cette seule conversation**
- Si tu fermes VS Code, tout est oublié
- La prochaine session, Claude recommence de zéro

#### **B — Maintenant (avec config.json + Document_Maitre)**

1. **Au démarrage de VS Code**, Claude Code :
   - ✅ Scanne tous les fichiers du dossier (`.claude/`, `config.json`, etc.)
   - ✅ Construit un **contexte local**
   - ✅ Intègre la structure du projet en mémoire **temporaire**

2. **Pendant la session**, tu poses une question :
   - ✅ Claude réutilise le contexte chargé
   - ✅ Il fait référence aux fichiers du projet
   - ✅ Il génère du code **conforme au config.json**

3. **Après fermeture de VS Code** :
   - ❌ La "mémoire" de Claude Code se réinitialise
   - ✅ MAIS le `config.json` reste sauvegardé dans le repo
   - ✅ La **prochaine session**, Claude CODE recharge automatiquement le config

#### **C — La vraie mémoire : Git + GitHub**

C'est **Git et GitHub** qui assurent la continuité :

```bash
# Tu commits ton config.json
git add config.json .claude/Document_Maitre.md .claude_rules
git commit -m "🔄 Mise à jour config RabaisLocal + document maître"
git push origin main

# La prochaine fois, tu pulls
git pull
# Et Claude Code recharge automatiquement tous les fichiers
```

### 🎯 Résumé : Où Claude stocke la "mémoire" ?

| Aspect | Où ? | Persistance |
|--------|------|------------|
| Code du projet | Dossiers locaux + Git | ✅ Permanente (tant que tu commits) |
| Configuration (config.json) | `config.json` à la racine | ✅ Permanente |
| Cahier de charge | `.claude/Document_Maitre.md` | ✅ Permanente |
| Contexte de session Claude | RAM VS Code | ❌ Réinitialise à chaque fermeture |
| Règles de code (.claude_rules) | `.claude_rules` | ✅ Permanente |

**Claude Code n'a PAS besoin d'un fichier mémoire séparé — Git est ta mémoire persistante.**

---

## 🎁 BONUS : Mise en place complète du workflow

### ✅ Étape 1 : Prépare ton dossier local

```bash
# Sur ton PC, dans ton projet RabaisLocal
cd ~/projets/rabaislocal

# Crée la structure .claude
mkdir -p .claude
touch .claude/Document_Maitre.md
touch .claude_rules

# Assure-toi que tu as un .gitignore
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
echo ".DS_Store" >> .gitignore
```

### ✅ Étape 2 : Colle le contenu des fichiers

**Fichier 1 : `.claude/Document_Maitre.md`**

Ouvre ce fichier et colle **tout le contenu** de ton cahier de charge en texte.

**Fichier 2 : `.claude_rules`**

Ouvre et colle les règles (voir plus haut dans ce guide).

**Fichier 3 : `config.json`**

Je viens de te créer un config.json complet. Colle-le à la racine.

### ✅ Étape 3 : Commit et pousse vers GitHub

```bash
git add config.json .claude/ .claude_rules
git commit -m "🚀 Initialisation config.json + Document Maître RabaisLocal"
git push origin main
```

### ✅ Étape 4 : Ouvre Claude Code dans VS Code

1. Installe l'extension Claude (si pas fait)
2. Clique sur l'icône Claude (🌀) dans la barre gauche
3. Tu verras le **chat intégré Claude**
4. Claude lit automatiquement ton config.json et tes fichiers projet

### ✅ Étape 5 : Pose tes questions

**Exemple de question que tu peux poser maintenant :**

```
"Basé sur mon config.json et mon cahier de charge :

Crée un scénario Make complet pour :
1. Recevoir une inscription affilié (ClickFunnels webhook)
2. Créer le compte GoAffPro
3. Générer et envoyer le contrat PDF
4. Enregistrer dans Supabase avec tag 'affiliate_active'
5. Notifier Dany par email

Assure-toi de :
- Idempotence sur l'email unique
- Gestion d'erreurs complète
- Logs audit dans Supabase
- Commentaires en français"
```

**Claude va :**
1. Ouvrir ton config.json → lire que c'est le module E (Affiliés)
2. Ouvrir Document_Maitre → lire section 7.4.3 (webhooks GoAffPro)
3. Respecter .claude_rules → code français, complet, idempotent
4. **Te générer un scénario Make prêt à copier-coller** ✅

---

## 📌 TABLEAU RÉCAPITULATIF

| Question | Réponse | Action |
|----------|---------|--------|
| **Comment Claude Code lit le cahier ?** | Via `.claude/Document_Maitre.md` | ✅ Crée ce fichier + colle ton cahier dedans |
| **Pourquoi modifier config.json ?** | Pour avoir une ref centralisée (JSON) du projet | ✅ Utilise le nouveau config.json que j'ai créé |
| **Claude Code utilise-t-il un autre fichier mémoire ?** | Non. Git + fichiers locaux = mémoire persistante | ✅ Commit régulièrement dans GitHub |

---

## 🎯 Prochaines étapes

1. ✅ Télécharge le `config.json` que j'ai créé
2. ✅ Crée les fichiers `.claude/Document_Maitre.md` et `.claude_rules`
3. ✅ Commit et pousse vers GitHub
4. ✅ Ouvre Claude Code dans VS Code
5. ✅ Pose tes questions pour les différents modules (A, B, C, etc.)

Claude Code va t'aider à construire **rapidement et sans erreurs** chaque partie de RabaisLocal.

Besoin d'aide pour une étape ? 😊
