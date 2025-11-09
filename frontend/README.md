# 🎨 RabaisLocal - Frontend Application

Application Next.js 14 pour la plateforme RabaisLocal.

---

## 📋 Stack Technique

- **Framework:** Next.js 14 (App Router)
- **Langage:** TypeScript 5+
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Data Fetching:** TanStack Query (React Query)
- **Forms:** React Hook Form + Zod
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Auth:** Supabase Auth

---

## 🏗️ Structure du Projet

```
frontend/
├── src/
│   ├── app/              # Pages & Layouts (App Router)
│   ├── components/       # Composants réutilisables
│   │   ├── ui/          # Composants UI de base
│   │   ├── features/    # Composants métier
│   │   └── layout/      # Composants de layout
│   ├── services/         # Services API
│   ├── hooks/            # Custom React Hooks
│   ├── contexts/         # React Contexts
│   ├── utils/            # Utilitaires
│   ├── types/            # Types TypeScript
│   ├── styles/           # Styles globaux
│   └── assets/           # Images, fonts, etc.
├── public/               # Fichiers statiques
└── tests/                # Tests
```

---

## 🚦 Installation

### Prérequis

- Node.js >= 18.0.0
- npm >= 9.0.0

### Étapes

```bash
# 1. Installer les dépendances
npm install

# 2. Copier le fichier d'environnement
cp .env.example .env.local

# 3. Configurer les variables d'environnement
# Éditez .env.local et remplissez vos clés

# 4. Lancer en mode développement
npm run dev

# 5. Build pour production
npm run build

# 6. Lancer en production
npm start
```

L'application sera disponible à http://localhost:3000

---

## 🔧 Scripts Disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Build pour production |
| `npm start` | Lance le serveur de production |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run lint:fix` | Corrige automatiquement les erreurs |
| `npm run format` | Formate le code avec Prettier |
| `npm run typecheck` | Vérifie les types TypeScript |
| `npm test` | Lance les tests |

---

## 📱 Pages Principales

### Publiques
- `/` - Page d'accueil
- `/offres` - Liste des offres
- `/offres/[id]` - Détail d'une offre
- `/commerces` - Liste des commerces
- `/login` - Connexion
- `/register` - Inscription

### Consommateur
- `/dashboard` - Tableau de bord
- `/mes-rabais` - Rabais réservés
- `/favoris` - Offres favorites
- `/profil` - Profil utilisateur

### Commerçant
- `/merchant/dashboard` - Tableau de bord
- `/merchant/offres` - Gestion offres
- `/merchant/stats` - Statistiques

### Affilié
- `/affiliate/dashboard` - Tableau de bord
- `/affiliate/commissions` - Commissions
- `/affiliate/outils` - Outils marketing

---

## 🎨 Styling

### Tailwind CSS

Configuration dans `tailwind.config.ts`.

**Couleurs principales:**
```javascript
colors: {
  primary: '#667eea',
  secondary: '#764ba2',
  success: '#48bb78',
  warning: '#f6ad55',
  error: '#f56565',
}
```

### Dark Mode

Supporté via `next-themes`.

```tsx
import { useTheme } from 'next-themes';

function Component() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle theme
    </button>
  );
}
```

---

## 🔐 Authentification

### Supabase Auth

```tsx
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

// Connexion
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});

// Inscription
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password',
  options: {
    data: {
      prenom: 'Jean',
      nom: 'Dupont'
    }
  }
});
```

---

## 📊 State Management

### Zustand

```tsx
import { create } from 'zustand';

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user })
}));
```

---

## 🔄 Data Fetching

### TanStack Query

```tsx
import { useQuery } from '@tanstack/react-query';

function Offers() {
  const { data, isLoading } = useQuery({
    queryKey: ['offers'],
    queryFn: () => fetch('/api/offers').then(res => res.json())
  });

  if (isLoading) return <div>Chargement...</div>;

  return <div>{data.map(offer => ...)}</div>;
}
```

---

## 📝 Forms

### React Hook Form + Zod

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Min 8 caractères')
});

type FormData = z.infer<typeof schema>;

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}

      <input {...register('password')} type="password" />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Connexion</button>
    </form>
  );
}
```

---

## 🧪 Tests

```bash
# Tous les tests
npm test

# Tests avec watch
npm run test:watch
```

---

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
# Installation Vercel CLI
npm i -g vercel

# Déploiement
vercel --prod
```

### Variables d'Environnement

Configurez toutes les variables `NEXT_PUBLIC_*` dans Vercel Dashboard.

---

## 🔧 Configuration

### next.config.js

Configuration Next.js pour optimisations et redirections.

### tailwind.config.ts

Configuration Tailwind CSS (couleurs, fonts, etc.).

---

## 📦 Composants Réutilisables

### Button

```tsx
import { Button } from '@/components/ui/button';

<Button variant="primary" size="lg">
  Cliquez ici
</Button>
```

### Card

```tsx
import { Card } from '@/components/ui/card';

<Card>
  <Card.Header>Titre</Card.Header>
  <Card.Body>Contenu</Card.Body>
  <Card.Footer>Footer</Card.Footer>
</Card>
```

---

## 📞 Support

- Email: dany@rabaislocal.com
- Documentation: https://docs.rabaislocal.com

---

## 📄 Licence

Propriétaire - RabaisLocal © 2025

**Fait avec ❤️ pour l'économie locale québécoise**
