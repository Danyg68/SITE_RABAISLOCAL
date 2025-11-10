# 🚀 CHECKLIST PHASE 0 – Semaine 1 (PRÉ-DÉVELOPPEMENT)

**Objectif:** Avoir toutes les specs, équipe alignée, et infra prêtes pour Phase 1.  
**Durée:** 5-7 jours  
**Owner:** PM/Dany + Équipe

---

## 📋 JOUR 1-2: SCHEMA MAKE COMPLET

### Tâche: Documenter tous les webhooks Make (5 scénarios critiques)

**Responsable:** Spec-maker + Backend Lead  
**Livrable:** `Schema_Make_Complete.json` + diagramme visuel

**À faire:**

- [ ] **Scenario 1: Inscription Utilisateur**
  - [ ] Trigger: ClickFunnels form submit OU Supabase db.insert
  - [ ] Input payload JSON (email, name, role, referred_by)
  - [ ] GoAffPro API call (POST /admin/affiliates)
  - [ ] Supabase update (users.goaffpro_id)
  - [ ] Gmail send (bienvenue email)
  - [ ] Google Sheets log (inscriptions tab)
  - [ ] Error handling + retry logic
  - **Livrables:** JSON schema + flow diagram

- [ ] **Scenario 2: Paiement Validé → Commissions**
  - [ ] Trigger: Payments.AI webhook (payment.success)
  - [ ] Input: {transaction_id, user_id, amount, type, plan}
  - [ ] GoAffPro commission calc (POST /admin/commissions/calc)
  - [ ] Supabase update (affiliate_commissions table)
  - [ ] Check balance ≥ $30 for auto-payout
  - [ ] PayPal transfer (si balance ≥ $30)
  - [ ] Email notifications (commission récue / payout)
  - **Livrables:** JSON schema + flow diagram

- [ ] **Scenario 3: Contrat d'Affiliation + Signature**
  - [ ] Trigger: Affiliate signup
  - [ ] Récupérer données affilié (Supabase)
  - [ ] Générer PDF (template merge)
  - [ ] Upload Google Drive
  - [ ] Créer lien signature DocuSign
  - [ ] Email avec signing_url
  - [ ] Listen webhook DocuSign (document.signed)
  - [ ] Download PDF signé + store Supabase
  - [ ] Email confirmation + access go-live
  - **Livrables:** JSON schema + flow diagram + contrat template

- [ ] **Scenario 4: Création Offre IA → Validation Commerçant**
  - [ ] Trigger: Commerçant clique "Générer offre avec IA"
  - [ ] Call IA proxy (POST /api/ai-generate)
  - [ ] Input: {type, category, merchant_id, target_discount}
  - [ ] Response: {title, description, image_url, suggested_credits}
  - [ ] Store draft offer (Supabase offers table, status="draft")
  - [ ] Send to commerçant dashboard (validation required)
  - [ ] Commerçant click "Publier" → status="published"
  - [ ] Trigger Phase 3 notification flow
  - **Livrables:** JSON schema + flow diagram

- [ ] **Scenario 5: Auto-Renouvellement Plan Commerçant**
  - [ ] Trigger: Cron job chaque jour (Make scheduler)
  - [ ] Check plans expiring in 7 days (Supabase query)
  - [ ] For each plan: charge via Payments.AI
  - [ ] IF success: renew (subscription.renewed_at = +6 months)
  - [ ] IF fail: email alert + retry 3x over 3 days
  - [ ] Log all transactions (Google Sheets)
  - [ ] Send receipt email
  - **Livrables:** JSON schema + cron schedule doc

**Template JSON pour chaque scénario:**

```json
{
  "scenario_name": "Inscription Utilisateur",
  "id": "make_001",
  "version": "1.0",
  "created_date": "2025-11-XX",
  "owner": "Backend Lead",
  "trigger": {
    "type": "webhook",
    "source": "ClickFunnels 2.0",
    "endpoint": "POST /webhooks/user-signup",
    "payload_schema": {
      "email": "string (required)",
      "name": "string (required)",
      "role": "enum: consumer|merchant|affiliate",
      "referred_by": "string|null"
    }
  },
  "steps": [
    {
      "step_id": 1,
      "name": "HTTP Request to GoAffPro",
      "type": "http",
      "method": "POST",
      "url": "https://goaffpro.com/api/v1/admin/affiliates",
      "headers": {
        "Authorization": "Bearer {{GOAFFPRO_API_KEY}}",
        "Content-Type": "application/json"
      },
      "body": {
        "email": "{{email}}",
        "name": "{{name}}",
        "referred_by": "{{referred_by}}",
        "commission_group": "affiliate_v2"
      },
      "output": {
        "affiliate_id": "string",
        "status": "string"
      }
    },
    {
      "step_id": 2,
      "name": "Update Supabase",
      "type": "supabase",
      "operation": "UPDATE",
      "table": "users",
      "where": { "email": "{{email}}" },
      "set": {
        "goaffpro_id": "{{step1.affiliate_id}}",
        "updated_at": "now()"
      }
    },
    {
      "step_id": 3,
      "name": "Send Email",
      "type": "email",
      "provider": "Gmail",
      "to": "{{email}}",
      "subject": "Bienvenue chez RabaisLocal!",
      "template": "affiliate_welcome",
      "variables": { "name": "{{name}}" }
    },
    {
      "step_id": 4,
      "name": "Log to Google Sheets",
      "type": "google_sheets",
      "spreadsheet_id": "{{INSCRIPTIONS_SHEET_ID}}",
      "sheet_name": "affiliates",
      "action": "APPEND",
      "values": [
        "{{step.timestamp}}",
        "{{email}}",
        "{{name}}",
        "{{step1.affiliate_id}}",
        "{{referred_by}}"
      ]
    }
  ],
  "error_handling": {
    "on_step_failure": "STOP_AND_ALERT",
    "retry_policy": {
      "max_attempts": 3,
      "backoff_seconds": 300
    },
    "alert_channel": "slack",
    "alert_webhook": "{{SLACK_ERRORS_WEBHOOK}}"
  },
  "dependencies": {
    "requires_apis": ["GoAffPro", "Supabase", "Gmail"],
    "requires_keys": ["GOAFFPRO_API_KEY", "SUPABASE_KEY", "GMAIL_API_KEY"]
  }
}
```

**Deadline:** Jour 2, fin de journée  
**Validation:** Backend Lead + Make specialist

---

## 📋 JOUR 2: SPÉCIFIER FALLBACK IA

### Tâche: Documenter l'ordre & configuration du fallback IA multi-provider

**Responsable:** IA-lead + Backend  
**Livrable:** `IA_Fallback_Strategy.md` + `.env.example`

**À faire:**

- [ ] **Configuration IA Primaire: Claude (Anthropic)**
  - [ ] API Key: `CLAUDE_API_KEY`
  - [ ] Model: `claude-opus-4-1-latest`
  - [ ] Max tokens: 2000
  - [ ] Temperature: 0.7
  - [ ] Timeout: 30s
  - [ ] Pricing: $0.015 per 1K tokens input
  - **Use case:** Offre creation (merchants), coaching (affiliés)
  - **Status:** ✅ Disponible prod

- [ ] **Configuration IA Secondaire: OpenAI**
  - [ ] API Key: `OPENAI_API_KEY`
  - [ ] Model: `gpt-4o` (ou gpt-4-turbo)
  - [ ] Max tokens: 2000
  - [ ] Temperature: 0.7
  - [ ] Timeout: 30s
  - [ ] Pricing: $0.03 per 1K tokens input
  - **Use case:** Fallback si Claude fail
  - **Status:** ✅ Disponible prod

- [ ] **Configuration IA Tertiary: Google Gemini**
  - [ ] API Key: `GEMINI_API_KEY`
  - [ ] Model: `gemini-2.0-flash`
  - [ ] Max tokens: 2000
  - [ ] Temperature: 0.7
  - [ ] Timeout: 30s
  - [ ] Pricing: Gratuit (pour dev)
  - **Use case:** Fallback si OpenAI fail
  - **Status:** ⚠️ Limitation quotidienne gratuit

- [ ] **Proxy Function Spec**
  - [ ] Endpoint: `POST /api/ai-generate`
  - [ ] Input: `{ role, type, prompt, context }`
  - [ ] Logic:
    ```
    try Claude (30s timeout)
    if error or timeout:
      try OpenAI (30s timeout)
    if error or timeout:
      try Gemini (30s timeout)
    if all fail:
      return error + fallback response (template)
    ```
  - [ ] Output: `{ response, provider, cost, latency }`
  - [ ] Logging: Tous les appels (provider + success/fail)

- [ ] **Prompts par rôle**
  - [ ] **Commerçant:** "Tu es un expert en marketing pour commerces locaux..."
  - [ ] **Affilié:** "Tu es un coach business pour affiliés..."
  - [ ] **Consommateur:** "Tu aides à trouver les meilleures offres..."
  - Pour chaque: inclure context, tone, format attendu

- [ ] **Cost Tracking**
  - [ ] Setup Google Sheets for API costs
  - [ ] Formula: Claude calls × 0.015 + OpenAI calls × 0.03 + Gemini calls × 0
  - [ ] Monthly budget limit: $500 (Phase 1-5)
  - [ ] Alert si > 80% budget

- [ ] **Testing Strategy**
  - [ ] Unit test: Each provider independently
  - [ ] Integration test: Fallback chain
  - [ ] Load test: 100 concurrent requests
  - [ ] Regression test: Prompts consistency

**Livrables Structure:**

```
IA_Fallback_Strategy.md
├── 1. Provider Comparison
│   ├── Claude vs OpenAI vs Gemini
│   └── Pricing + Latency + Quality
├── 2. Fallback Order & Logic
│   └── Decision tree diagram
├── 3. Proxy Endpoint Spec
│   ├── Input schema
│   ├── Output schema
│   └── Error handling
├── 4. Prompts by Role
│   ├── Merchant prompts
│   ├── Affiliate prompts
│   └── Consumer prompts
├── 5. Monitoring & Costs
│   ├── Logging structure
│   └── Budget tracking
└── 6. Testing Plan
    ├── Unit tests
    ├── Integration tests
    └── Load tests
```

**Deadline:** Jour 2, fin de journée  
**Validation:** Backend + IA Lead

---

## 📋 JOUR 3: TABLEAU RACI

### Tâche: Créer et faire signer le tableau RACI

**Responsable:** PM/Dany  
**Livrable:** `RACI_Matrix_Signed.xlsx` + signatures

**À faire:**

- [ ] **Créer matrice RACI**
  
  | Rôle | Auth | Crédits | Offres | Commerçants | Affiliés | IA | Paiements | Admin |
  |------|------|---------|--------|-------------|----------|-----|-----------|-------|
  | **PM/Dany** | A | A | A | A | A | A | A | R |
  | **Backend Lead** | R | R | R | S | R | S | R | R |
  | **Frontend Lead** | S | R | R | R | R | R | S | R |
  | **IA Specialist** | — | — | S | — | — | R | — | — |
  | **Make/Auto** | S | S | S | — | S | S | R | S |
  | **Paiement Spec** | — | R | — | S | S | — | R | — |
  | **DevOps** | S | S | S | S | S | S | S | R |
  | **QA** | C | C | C | C | C | C | C | C |
  | **Marketing** | — | — | — | S | R | — | — | — |

  **Legend:**
  - **R** = Responsible (fait le travail)
  - **A** = Accountable (décision finale)
  - **C** = Consulted (advice)
  - **I** = Informed (notification)
  - **S** = Support (aide)

- [ ] **Valider avec chaque rôle** (meetup 15 min par personne)
  - [ ] Confirmation rôles + responsibilities
  - [ ] Clarifier dépendances
  - [ ] Commun accord sur timelines

- [ ] **Faire signer**
  - [ ] Print + signature numérique (PDF)
  - [ ] Ou Google Form for consent
  - [ ] Store in Google Drive (shared folder)

- [ ] **Créer Slack channels par module**
  - [ ] #rl-auth
  - [ ] #rl-credits
  - [ ] #rl-offers
  - [ ] #rl-merchants
  - [ ] #rl-affiliates
  - [ ] #rl-ia
  - [ ] #rl-payments
  - [ ] #rl-admin
  - [ ] #rl-errors (pour Make + logs)

**Deadline:** Jour 3, midi  
**Validation:** Tous les rôles

---

## 📋 JOUR 4-5: REPO GIT & CI/CD

### Tâche: Setup Git + workflows automatisés

**Responsible:** DevOps Lead  
**Livrable:** Repo live + CI/CD pipelines testées

**À faire:**

- [ ] **Créer Repo GitHub/GitLab**
  - [ ] Name: `rabaislocal-platform`
  - [ ] Visibility: Private
  - [ ] Add team members + permissions
  - [ ] Setup branch protection (main)

- [ ] **Créer structure folders**
  ```
  /
  ├── /backend          (Node.js/Python)
  ├── /frontend         (React/Next.js)
  ├── /mobile           (React Native - future)
  ├── /make-schemas     (JSON blueprints)
  ├── /database         (Supabase migrations)
  ├── /docs             (specs, diagrams)
  ├── /infra            (Terraform/Docker)
  └── /scripts          (setup, deploy)
  ```

- [ ] **Setup CI/CD Pipelines (GitHub Actions OU GitLab CI)**
  - [ ] **On PR/Merge to dev:**
    - [ ] Lint (ESLint, Prettier)
    - [ ] Unit tests (>80% coverage)
    - [ ] Build check
    - [ ] Deploy to staging env
  - [ ] **On Merge to main:**
    - [ ] All above +
    - [ ] Build Docker image
    - [ ] Deploy to production
    - [ ] Health check
    - [ ] Slack notification

- [ ] **Environments Setup**
  - [ ] **Dev:** Local + Docker Compose
  - [ ] **Staging:** Vercel preview + Supabase staging
  - [ ] **Prod:** Vercel main + Supabase prod
  - [ ] **Each with separate API keys** (never share)

- [ ] **Setup Secrets Management**
  - [ ] GitHub Secrets for all API keys
  - [ ] Never commit .env files
  - [ ] Create .env.example (sans valeurs)
  - [ ] Document setup procedure

- [ ] **Create Contribution Guidelines**
  - [ ] Branch naming: `feature/`, `fix/`, `hotfix/`
  - [ ] Commit message format: `[TAG] message` (feat:, fix:, docs:, etc.)
  - [ ] PR template with checklist
  - [ ] Code review requirements (min 1 approval)

**Deadline:** Jour 5, fin de journée  
**Validation:** Backend + DevOps

---

## 📋 JOUR 5-7: KEYS & STAGING ENV

### Tâche: Charger toutes les clés API + tester accès

**Responsible:** DevOps + Backend  
**Livrable:** Staging env prêt, tous les accès OK

**À faire:**

- [ ] **Supabase Setup**
  - [ ] Create project (Quebec region si possible)
  - [ ] Configure PostgreSQL (15+)
  - [ ] Setup Auth (JWT secret)
  - [ ] Create Storage bucket
  - [ ] Get API keys + store in Secrets
  - [ ] Test connection (backend)

- [ ] **OpenAI API**
  - [ ] Create account + billing setup
  - [ ] Generate API key
  - [ ] Set monthly budget limit ($500)
  - [ ] Store key in Secrets
  - [ ] Test call (models list)

- [ ] **Claude (Anthropic) API**
  - [ ] Create account + billing setup
  - [ ] Generate API key
  - [ ] Set monthly budget limit ($500)
  - [ ] Store key in Secrets
  - [ ] Test call (models list)

- [ ] **Google Gemini API**
  - [ ] Enable API in Google Cloud Console
  - [ ] Generate API key
  - [ ] Store key in Secrets
  - [ ] Test call (free tier)

- [ ] **Payments.AI & PayPal**
  - [ ] Create merchant account (Payments.AI)
  - [ ] Get API key
  - [ ] Create test credentials
  - [ ] Test payment flow (mock)
  - [ ] Store keys in Secrets

- [ ] **GoAffPro Setup**
  - [ ] Create account
  - [ ] Setup sandbox + prod environments
  - [ ] Generate API keys
  - [ ] Document endpoint URLs
  - [ ] Test API calls
  - [ ] Store keys in Secrets

- [ ] **Email (Gmail SMTP)**
  - [ ] Setup Gmail account (noreply@rabaislocal.com)
  - [ ] Enable 2FA + app password
  - [ ] Get SMTP credentials
  - [ ] Store in Secrets
  - [ ] Test email send

- [ ] **Google Sheets API**
  - [ ] Enable API in Google Cloud
  - [ ] Create service account
  - [ ] Generate JSON key
  - [ ] Share Sheets with service account email
  - [ ] Store key in Secrets
  - [ ] Test APPEND rows

- [ ] **Docker Compose Local Dev**
  - [ ] Create `docker-compose.yml`
  - [ ] Include: PostgreSQL local, Redis (cache), mailhog (email)
  - [ ] Document setup: `npm run setup:dev`
  - [ ] Test: `docker-compose up`

**Checklist Secrets (GitHub Secrets):**
- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_KEY`
- [ ] `SUPABASE_JWT_SECRET`
- [ ] `OPENAI_API_KEY`
- [ ] `CLAUDE_API_KEY`
- [ ] `GEMINI_API_KEY`
- [ ] `PAYMENTS_AI_KEY`
- [ ] `PAYPAL_CLIENT_ID`
- [ ] `PAYPAL_CLIENT_SECRET`
- [ ] `GOAFFPRO_API_KEY`
- [ ] `GMAIL_USER`
- [ ] `GMAIL_PASSWORD`
- [ ] `GOOGLE_SHEETS_KEY` (JSON)
- [ ] `SLACK_WEBHOOK_ERRORS`

**Deadline:** Jour 7, fin de journée  
**Validation:** DevOps + Backend

---

## ✅ SIGN-OFF CHECKLIST – End of Phase 0

**TOUS les items cochés avant de démarrer Phase 1 ?**

### Documentation ✅
- [ ] Schema Make JSON (5 scenarios) – finalisé + reviewed
- [ ] IA Fallback Strategy – finalisé + .env ready
- [ ] Tableau RACI – signé par tous
- [ ] README.md avec setup instructions
- [ ] Architecture diagram (high-level)

### Infrastructure ✅
- [ ] Repo Git live + branches protected
- [ ] CI/CD pipelines working (GitHub Actions OU GitLab)
- [ ] Dev env (Docker Compose) testée
- [ ] Staging env (Vercel + Supabase) testée
- [ ] Prod env documentée (checklist)

### API Keys & Secrets ✅
- [ ] Tous 13 secrets chargés dans GitHub Secrets
- [ ] Tous les accès testés (manual tests)
- [ ] .env.example créé (sans valeurs)
- [ ] Documentation "How to add new secret"

### Team Readiness ✅
- [ ] Slack channels créés (9 channels)
- [ ] RACI matrix signé + partagé
- [ ] Team kickoff meeting complété
- [ ] Roles & responsibilities clairs pour chacun
- [ ] Daily standup time agreed (e.g., 9:30 AM EST)

### Go/No-Go Decision ✅
- [ ] PM/Dany: **GO for Phase 1?** → YES ☐ NO ☐
- [ ] Backend Lead: **GO for Phase 1?** → YES ☐ NO ☐
- [ ] DevOps: **GO for Phase 1?** → YES ☐ NO ☐

**If ANY NO:** List blockers + mitigation plan below

---

## 📌 NOTES & BLOCKERS

```
[Use this space to document any issues/blockers found during Phase 0]

Issue 1:
  Description:
  Impact:
  Mitigation:
  Owner:
  Resolution Date:

Issue 2:
  [...]
```

---

## 📌 NEXT: PHASE 1 KICKOFF

**When:** Jour 8 (Lundi de la semaine 2)  
**Where:** Team meeting  
**Duration:** 1h  
**Agenda:**
1. Review Phase 0 deliverables
2. Confirm Phase 1 timeline & dependencies
3. Assign Phase 1 tasks
4. Setup daily standups
5. First sprint planning

**Attendees:** PM, Backend, Frontend, DevOps, IA Lead, Make Specialist

---

**Document créé:** PHASE 0 Checklist – Week 1 Action Plan  
**Version:** 1.0  
**Date:** Nov 2025  
**Owner:** PM/Dany + Team  
**Status:** Ready for execution
