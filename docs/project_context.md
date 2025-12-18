*---
project_name: 'Ma Bibliothèque'
user_name: 'Patris'
date: '2025-12-17'
sections_completed: ['technology_stack', 'implementation_rules', 'routing_navigation', 'authentication', 'query_cache', 'file_organization', 'shadcn_components', 'environment_variables', 'anti_patterns']
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

### Core
- **React** 18.x - Frontend framework
- **TypeScript** 5.x - Typage strict obligatoire
- **Vite** 5.x - Build tool et dev server

### Routing & State
- **React Router** 7.x - Routing client-side
- **TanStack Query** (React Query) - State serveur, cache, mutations

### UI
- **Shadcn/ui** - Composants (basés sur Radix UI)
- **Tailwind CSS** 3.x - Styling utility-first
- **TweakCN** - Thème néo-brutaliste

### Forms & Validation
- **React Hook Form** - Gestion formulaires
- **Zod** - Validation et types

### Backend
- **Supabase** - Auth + Database (PostgreSQL)
- **Vercel** - Déploiement

---

## Critical Implementation Rules

### TypeScript Rules

- **TOUJOURS** utiliser TypeScript strict mode
- **JAMAIS** utiliser `any` - préférer `unknown` si type inconnu
- **IMPORTER** les types Supabase depuis `types/database.ts`
- Les données Supabase sont en **snake_case** - NE PAS convertir en camelCase

```typescript
// Correct - garder snake_case
interface Book {
  id: string
  user_id: string
  titre: string
  created_at: string
}

// Incorrect - conversion inutile
interface Book {
  userId: string  // NON
}
```

### React & State Management Rules

- **TOUJOURS** utiliser TanStack Query pour les données Supabase
- **JAMAIS** utiliser `useState` + `useEffect` pour fetch des données
- **TOUJOURS** invalider le cache après une mutation
- Query keys: `['livres']` pour la liste, `['livre', id]` pour un item

```typescript
// Correct
const { data, isLoading } = useQuery({
  queryKey: ['livres'],
  queryFn: () => supabase.from('livres').select('*')
})

// Incorrect - JAMAIS faire ça
const [books, setBooks] = useState([])
useEffect(() => {
  fetchBooks().then(setBooks)
}, [])
```

### Component Rules

- **Composants** en PascalCase: `BookCard.tsx`
- **Hooks** en camelCase avec préfixe `use`: `useBooks.ts`
- **Un composant = un fichier**
- **UI pure** dans `components/`, **logique métier** dans `features/`

### Form Rules

- **TOUJOURS** utiliser React Hook Form + Zod
- **TOUJOURS** afficher les erreurs inline sous le champ
- Messages d'erreur en **français**

```typescript
const bookSchema = z.object({
  titre: z.string().min(1, "Le titre est requis"),
  auteur: z.string().min(1, "L'auteur est requis"),
  statut: z.enum(["a_lire", "en_cours", "lu"])
})
```

### Error & Loading Rules

- **Erreurs API** → Toast notification (Sonner)
- **Erreurs validation** → Inline sous le champ
- **États chargement** → Skeleton components

```typescript
// Pattern standard
if (isLoading) return <Skeleton />
if (error) return <ErrorState />
return <Content data={data} />
```

### Supabase & Security Rules

- **TOUJOURS** vérifier que RLS est activé sur les tables
- **JAMAIS** exposer de logique sensible côté client
- **TOUJOURS** utiliser `auth.uid()` dans les policies RLS
- Variables d'environnement: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

### Routing & Navigation Rules

- **Routes protégées** via composant `ProtectedRoute`
- **Redirection** vers `/login` si non authentifié
- **React Router 7** avec loaders/actions si nécessaire

```typescript
// Pattern route protégée
<Route element={<ProtectedRoute />}>
  <Route path="/" element={<HomePage />} />
</Route>

// ProtectedRoute.tsx
const ProtectedRoute = () => {
  const { user, isLoading } = useAuth()
  if (isLoading) return <Skeleton />
  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}
```

### Authentication Patterns

- **AuthContext** pour état utilisateur global
- **useAuth()** hook pour accéder à l'utilisateur
- **Supabase Auth** avec email + mot de passe

```typescript
// Hook useAuth - pattern standard
const { user, isLoading, signIn, signOut } = useAuth()

// Vérification authentification
if (!user) {
  // Rediriger ou afficher login
}

// Connexion
await signIn(email, password)

// Déconnexion
await signOut()
```

### Query Keys & Cache Invalidation

- **Query keys** structurées et cohérentes
- **Invalidation** obligatoire après chaque mutation
- **Stale time** par défaut suffisant pour l'app

```typescript
// Query keys standard
const QUERY_KEYS = {
  livres: ['livres'] as const,
  livre: (id: string) => ['livre', id] as const,
}

// Après mutation - TOUJOURS invalider
const mutation = useMutation({
  mutationFn: createBook,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['livres'] })
    toast.success("Livre ajouté")
  },
  onError: () => {
    toast.error("Erreur lors de l'ajout")
  }
})
```

### Accessibility Rules

- **Touch targets** minimum 44px
- **Contraste** WCAG 2.1 AA
- Utiliser les composants **Shadcn/ui** (Radix) pour l'accessibilité native
- **Focus management** sur les modals/dialogs

---

## File Organization

```
src/
├── components/ui/     # Shadcn/ui UNIQUEMENT
├── components/        # Composants custom partagés
├── features/auth/     # Auth: context, hooks, forms
├── features/books/    # Books: hooks, forms, list
├── lib/               # supabase.ts, queryClient.ts, utils.ts
├── pages/             # Composants de page
└── types/             # Types TypeScript
```

---

## Shadcn/ui Components Required

Composants à installer via `npx shadcn@latest add <component>` :

| Composant | Usage |
|-----------|-------|
| `button` | Actions, submit formulaires |
| `card` | BookCard, conteneurs |
| `dialog` | Modals ajout/édition livre |
| `input` | Champs formulaires |
| `select` | Sélection statut |
| `badge` | StatusBadge (À lire, En cours, Lu) |
| `alert-dialog` | Confirmation suppression |
| `skeleton` | États de chargement |
| `sheet` | Navigation mobile (optionnel) |
| `sonner` | Toast notifications |

**Installation complète :**
```bash
npx shadcn@latest add button card dialog input select badge alert-dialog skeleton sheet sonner
```

---

## Environment Variables

**Fichier `.env.local` (ignoré par git) :**
```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-anon-key
```

**Fichier `.env.example` (commité) :**
```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

**Règles :**
- **Préfixe VITE_** obligatoire pour exposer au client
- **JAMAIS** commiter `.env.local`
- **TOUJOURS** documenter dans `.env.example`

**Accès dans le code :**
```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
```

---

## Anti-Patterns (JAMAIS faire)

1. **JAMAIS** fetch avec useState/useEffect → Utiliser TanStack Query
2. **JAMAIS** convertir snake_case en camelCase
3. **JAMAIS** créer des composants sans typage TypeScript
4. **JAMAIS** ignorer les états loading/error
5. **JAMAIS** utiliser alert() → Utiliser Sonner toast
6. **JAMAIS** stocker des secrets dans le code
7. **JAMAIS** bypass RLS en désactivant les policies

---

## Quick Reference

| Aspect | Règle |
|--------|-------|
| Données | TanStack Query, pas useState |
| Format données | snake_case (pas de conversion) |
| Validation | Zod + React Hook Form |
| Erreurs | Toast (API), Inline (validation) |
| Loading | Skeleton components |
| Composants | PascalCase, un par fichier |
| Sécurité | RLS activé, auth.uid() |
| Routing | ProtectedRoute, redirect /login |
| Auth | useAuth() hook, AuthContext |
| Cache | Invalider après chaque mutation |
| Env vars | Préfixe VITE_, jamais commiter .env.local |
| UI | Shadcn/ui + TweakCN (néo-brutaliste) |

