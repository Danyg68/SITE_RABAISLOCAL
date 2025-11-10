# RabaisLocal – Tableau de Suivi V2.0 OPTIMISÉE
## ONE-PAGER – Quick Reference

---

## 📊 TIMELINE (14 semaines)

```
Sem 1    Sem 4    Sem 7    Sem 10   Sem 12   Sem 14
│        │        │        │        │        │
▼        ▼        ▼        ▼        ▼        ▼
PHASE 0  PHASE 2  PHASE 4  PHASE 7  PHASE 8  LAUNCH
Setup    Credits  Merchant Payments  Admin    Go-Live
│
├─ PHASE 1 (Auth + Base Tech) ─ Sem 1-3 ─ 🔥 BLOCKING EVERYTHING
├─ PHASE 1.5 (IA + Make) ─────── Sem 3-4 ─ 🔥 CRITICAL NEW
├─ PHASE 3 (Offres) ─────────── Sem 5-7
├─ PHASE 5 (Affiliés) ───────── Sem 8-9
├─ PHASE 6 (Agents IA) ─────── Sem 9-10
└─ PHASE 10-11 (Tests + UAT) ─ Sem 12-14

TOTAL: 14 weeks | Budget: $180K-200K | Team: ~10 FTE
```

---

## 🎯 11 PHASES EXPLIQUÉES

| Phase | Semaines | Tâches clés | Livrables |
|-------|----------|-----------|-----------|
| **0** | 1 | Setup Make schemas, IA fallback, RACI, Git/CI/CD | Specs + repo prêt |
| **1** | 1-3 🔥 | Auth API, RBAC, GoAffPro sync, JWT | Supabase + users OK |
| **1.5** | 3-4 🔥 | Claude/OpenAI/Gemini setup, Make scenarios | IA proxy + webhooks |
| **2** | 4-5 | Credits system, Mock + Payments.AI/PayPal | Dashboard crédits |
| **3** | 5-7 | IA offer generator, réservation, notifications | 500+ test offers |
| **4** | 7-8 | Merchant dashboard, plans, auto-renew | Merchants autonomes |
| **5** | 8-9 | Affiliate dashboard, GoAffPro sync, contrats, auto-debit | 50 test affiliés |
| **6** | 9-10 | 3 AI agents (merchant/affiliate/consumer), Canva API | Agents + media |
| **7** | 10-11 | Payment hub, commissions 51%, factures, rapports | Financial ops OK |
| **8** | 11-12 | Admin dashboard, monitoring, alerts, KPI | Ops prêt |
| **10-11** | 12-14 | Unit tests, UAT, load test, recruit 50 affiliés, socio live | 🚀 LAUNCH |

---

## 👥 ÉQUIPE REQUISE

| Rôle | Hours/week | Duration | Expertise |
|------|-----------|----------|-----------|
| Backend Lead | 40h | 14 sem | Node/Python, Supabase, APIs |
| Frontend Lead | 35h | 12 sem | React/Next, UI/UX |
| DevOps | 30h | 12 sem | Vercel, Supabase, CI/CD |
| Make/Auto | 25h | 10 sem | Make, webhooks, flows |
| QA/Tester | 20h | 10 sem | Tests, UAT, load test |
| IA Specialist | 20h | 8 sem | LLM APIs, prompts, fallback |
| Paiement Specialist | 15h | 8 sem | Payments.AI, PayPal |
| PM | 40h | 14 sem | Roadmap, decisions |

**TOTAL:** ~225h/week ≈ 10 FTE | **Cost:** $180K-200K

---

## ⚠️ TOP 5 RISQUES & MITIGATIONS

| Risque | Mitigation |
|--------|-----------|
| 🔴 GoAffPro API unstable | Sandbox testing + retry logic (Make) |
| 🔴 Payments.AI delays | Mock paiement Phase 2, real parallel |
| 🔴 Make webhooks fail | Spec complète Phase 0, retry x3 |
| 🟡 IA fallback cascade fail | Tests fallback chain Phase 1.5 |
| 🟡 Supabase perfs | Load testing Phase 10, indexes Phase 1 |

---

## 🚀 PHASE 0 – Semaine 1 (5 jours)

### ✅ DELIVERABLES À PRODUIRE

**Jour 1-2:** Schema Make JSON (5 scénarios avec payloads)  
**Jour 2:** Fallback IA strategy (Claude > OpenAI > Gemini)  
**Jour 3:** Tableau RACI signé par tous  
**Jour 4-5:** Repo Git + CI/CD pipelines live  
**Jour 5-7:** API keys + staging env testée  

### 📋 SIGN-OFF CHECKLIST

- [ ] Schema Make: 100% complète + reviewed
- [ ] IA Fallback: Strategy doc + .env ready
- [ ] RACI: Signé par tous
- [ ] Repo: Live + CI/CD green
- [ ] Secrets: 13 keys en GitHub Secrets
- [ ] Envs: Dev/Staging/Prod configured
- [ ] **PM Decision:** GO for Phase 1? ✅ YES / ❌ NO

**If any NO:** List blockers + mitigations

---

## 📦 LIVRABLES CLÉS PAR PHASE

**Phase 1-1.5:** Auth API + RBAC + IA proxy ✅ Foundation  
**Phase 2:** Credits system + paiements ✅ Transaction  
**Phase 3:** Offres IA + réservation ✅ Core business  
**Phase 4:** Commerçants dashboard ✅ Merchant ops  
**Phase 5:** Affiliés dashboard + GoAffPro ✅ Revenue  
**Phase 7:** Payment hub + commissions 51% ✅ Financial  
**Phase 10-11:** UAT + 50 affiliés + LAUNCH ✅ GO-LIVE

---

## 💰 BUDGET BREAKDOWN

| Category | Amount | Notes |
|----------|--------|-------|
| **Team (14 weeks)** | $179,450 | 8 roles, senior rates |
| **Infrastructure (3.5 mo)** | ~$2,100 | Vercel, Supabase, APIs |
| **API Costs** | ~$1,000 | Claude, OpenAI, Gemini |
| **TOTAL** | **$182,550** | Full project |

---

## 📈 SUCCESS METRICS

### Phase 0 ✅
- [ ] Schema Make 100% OK
- [ ] IA Fallback 3/3 providers working
- [ ] RACI signatures all in

### Phase 1-1.5 ✅
- [ ] Auth: 100+ test cases passing
- [ ] RBAC: all 4 roles working
- [ ] IA Proxy: latency < 3s (P95)

### Phase 5 ✅
- [ ] 50+ test affiliés created
- [ ] Commissions: 100% accurate
- [ ] Contracts: 95%+ signature rate

### GO-LIVE 🚀
- [ ] UAT: all roles signoff
- [ ] Load: 1000 concurrent users < 2s
- [ ] Uptime: 99.5% first 24h
- [ ] Errors: < 0.1% transaction fail

---

## 🔗 CRITICAL DEPENDENCIES

```
Phase 0 (specs) ──→ BLOCKS Phase 1 (auth) ──→ BLOCKS Phase 1.5 (IA)
                                         ↓
                                    BLOCKS Phase 2 (credits)
                                         ↓
                                    BLOCKS Phase 3 (offres)
                                    ↓           ↓
                                Phase 4      Phase 6
                                (merchant)   (agents)
                                    ↓
                                Phase 5 (affiliés)
                                    ↓
                                Phase 7 (payments)
                                    ↓
                                Phase 8 (admin)
                                    ↓
                            Phase 10-11 (launch)
```

**Path critique:** 0 → 1 → 1.5 → 2 → 3 → 7 → 10-11 = **Min 13 semaines**

---

## 📞 IMMEDIATE ACTIONS

**THIS WEEK:**
- [ ] Review this one-pager
- [ ] Team meeting (approve timeline + budget)
- [ ] Distribute Phase 0 Checklist

**NEXT WEEK (Phase 0):**
- [ ] Day 1-2: Make schemas
- [ ] Day 2: IA fallback specs
- [ ] Day 3: RACI signatures
- [ ] Day 4-5: Git + CI/CD
- [ ] Day 5-7: Keys + staging env

**Week 2 (Phase 1):**
- [ ] Kickoff Phase 1
- [ ] Start backend auth development

---

## 📚 FULL DOCUMENTATION

All details in `outputs/` folder:

1. **Resume_Executif_RabaisLocal_V2.md** – Executive summary
2. **Tableau_de_suivi_RabaisLocal_V2_OPTIMISEE.md** – Detailed phases
3. **Schema_Dependencies_FluxMake_RabaisLocal.md** – Architecture + Make flows
4. **Checklist_Phase_0_Semaine1.md** – Day-by-day execution
5. **INDEX_Navigation_Guide.md** – How to navigate all docs

---

## ✅ FINAL GO/NO-GO

**Ready to launch Phase 0?**

**PM/Dany:** ☐ YES | ☐ NO → _____________  
**Backend Lead:** ☐ YES | ☐ NO → _____________  
**DevOps Lead:** ☐ YES | ☐ NO → _____________  

**Date:** _________________ | **Time:** _________________

---

**Document:** One-Pager RabaisLocal V2.0  
**Created:** November 2025 | **Version:** 1.0 Final  
**🚀 Ready to ship!**
