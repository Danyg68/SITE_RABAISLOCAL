# 🧪 MOCKS - Données de Test

Données mockées pour tests unitaires et d'intégration.

## Structure

```
mocks/
├── users/           # Utilisateurs mock
├── offers/          # Offres mock
├── credits/         # Transactions mock
├── affiliates/      # Affiliés mock
├── database/        # Supabase mock
├── make/            # Webhooks mock
└── ai/              # Réponses IA mock
```

## Utilisation

```typescript
import { mockUser, mockMerchant } from '@/tests/mocks/users/mockUser';

describe('Auth', () => {
  it('should authenticate user', () => {
    expect(mockUser.email).toBe('test@example.com');
  });
});
```

**Documentation complète :** [docs/TESTING_STRATEGY.md](../../docs/TESTING_STRATEGY.md)
