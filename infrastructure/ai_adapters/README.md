# 🤖 AI ADAPTERS - Couche d'Abstraction Multi-Providers

## Vue d'Ensemble

L'**AI Adapters Layer** permet à RabaisLocal d'utiliser plusieurs fournisseurs d'IA (OpenAI, Anthropic Claude, Google Gemini) de manière interchangeable via une interface unifiée.

## 📂 Structure

```
ai_adapters/
├── providers/                   # Adapters pour chaque provider
│   ├── base.adapter.ts          # ✅ Classe abstraite
│   ├── openai.adapter.ts        # ✅ OpenAI GPT-4o-mini
│   ├── anthropic.adapter.ts     # Anthropic Claude
│   └── gemini.adapter.ts        # Google Gemini
│
├── orchestrator/                # Gestion sélection provider
│   ├── aiOrchestrator.ts        # Orchestrateur principal
│   └── providerSelector.ts      # Logique choix provider
│
├── prompts/                     # Prompts système par agent
│   ├── merchant.prompts.ts      # Prompts commerçants
│   ├── consumer.prompts.ts      # Prompts consommateurs
│   └── affiliate.prompts.ts     # Prompts affiliés
│
├── cache/                       # Cache IA
│   ├── promptCache.ts           # Cache prompts
│   └── responseCache.ts         # Cache réponses
│
└── README.md                    # Ce fichier
```

## 🎯 Bénéfices

✅ **Multi-Provider** - Basculer entre OpenAI/Claude/Gemini sans changer code
✅ **Fallback Automatique** - Si OpenAI down → Claude automatiquement
✅ **Optimisation Coûts** - Utiliser le provider le moins cher selon tâche
✅ **A/B Testing** - Comparer qualité réponses entre providers
✅ **Pas de Vendor Lock-in** - Changer de provider en 1 ligne de config

## 🔌 Utilisation

```typescript
import { aiOrchestrator } from '@/infrastructure/ai_adapters/orchestrator/aiOrchestrator';

// Génération de contenu pour offre (utilise provider optimal automatiquement)
const result = await aiOrchestrator.generateOfferContent({
  merchantName: 'Pizza Délice',
  offerType: 'percentage_discount',
  discount: 20,
  restrictions: 'Valide du lundi au jeudi'
});

console.log(result.content); // Description générée
console.log(result.provider); // 'openai' | 'claude' | 'gemini'
console.log(result.cost); // Coût en $
```

## 📚 Documentation

- [docs/AI_STRATEGY.md](../../docs/AI_STRATEGY.md) - Stratégie IA complète
- [modules/module_e_ia/README.md](../../modules/module_e_ia/README.md) - Module IA

**Dernière mise à jour :** 9 novembre 2025
