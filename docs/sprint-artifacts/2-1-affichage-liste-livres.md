# Story 2.1: Affichage de la Liste des Livres

**Status:** ready-for-dev

---

## Story

**As a** utilisateur connecté,
**I want** voir la liste de tous mes livres avec leur titre, auteur et statut,
**So that** je puisse consulter ma collection d'un coup d'œil.

---

## Acceptance Criteria

### AC1: Liste des livres affichée
**Given** je suis connecté et j'ai des livres dans ma collection
**When** j'accède à la page d'accueil
**Then** je vois la liste de mes livres sous forme de cards

### AC2: Informations affichées par livre
**Given** je vois la liste de mes livres
**When** je regarde une card de livre
**Then** je vois le titre (typographie Lora)
**And** je vois l'auteur
**And** je vois un badge de statut coloré

### AC3: Couleurs des badges par statut
**Given** je vois un badge de statut
**When** le statut est "À lire"
**Then** le badge est de couleur Rose (primary)

**Given** le statut est "En cours"
**Then** le badge est de couleur Jaune (accent)

**Given** le statut est "Lu"
**Then** le badge est de couleur Bleu-vert (secondary)

### AC4: État de chargement
**Given** la liste est en cours de chargement
**When** les données ne sont pas encore disponibles
**Then** des Skeleton cards s'affichent (pas de spinner plein écran)

### AC5: Style néo-brutaliste
**Given** je vois une BookCard
**When** je regarde son style
**Then** elle a une ombre dure (3px offset, 0 blur)
**And** un border radius de 0.4rem
**And** une bordure visible

### AC6: Liste scrollable
**Given** j'ai plusieurs livres
**When** je fais défiler la page
**Then** la liste scroll de manière fluide
**And** il n'y a pas de pagination (scroll infini)

### AC7: Hook TanStack Query
**Given** le composant BookList est monté
**When** il récupère les données
**Then** il utilise le hook `useBooks` avec TanStack Query
**And** les query keys sont `['livres']`

---

## Tasks / Subtasks

- [ ] **Task 1: Création du hook useBooks** (AC: 7)
  - [ ] Créer `src/features/books/useBooks.ts`
  - [ ] Implémenter `useQuery` pour récupérer les livres
  - [ ] Query key : `['livres']`
  - [ ] Fonction de fetch avec le client Supabase

- [ ] **Task 2: Création du composant StatusBadge** (AC: 3)
  - [ ] Créer `src/components/StatusBadge.tsx`
  - [ ] 3 variantes : `a_lire` (rose), `en_cours` (jaune), `lu` (bleu-vert)
  - [ ] Labels en français : "À lire", "En cours", "Lu"

- [ ] **Task 3: Création du composant BookCard** (AC: 2, 5)
  - [ ] Créer `src/components/BookCard.tsx`
  - [ ] Titre en Lora, auteur en Poppins
  - [ ] Intégrer StatusBadge
  - [ ] Style néo-brutaliste (ombre dure, bordure)

- [ ] **Task 4: Création du composant BookList** (AC: 1, 6)
  - [ ] Créer `src/features/books/BookList.tsx`
  - [ ] Utiliser le hook `useBooks`
  - [ ] Mapper les données vers BookCard
  - [ ] Layout en grille responsive

- [ ] **Task 5: Création du Skeleton loader** (AC: 4)
  - [ ] Créer `src/components/BookCardSkeleton.tsx`
  - [ ] Utiliser le composant Skeleton de Shadcn/ui
  - [ ] Même dimensions que BookCard

- [ ] **Task 6: Intégration dans HomePage** (AC: 1)
  - [ ] Remplacer EmptyState par BookList quand des livres existent
  - [ ] Gérer la condition `books.length === 0`

- [ ] **Task 7: Types TypeScript** (AC: 2)
  - [ ] Créer le type `Book` dans `types/index.ts`
  - [ ] Utiliser les types générés de Supabase

---

## Dev Notes

### Architecture Patterns & Constraints

**Source:** [docs/architecture.md#Frontend-Architecture]

#### Hook useBooks avec TanStack Query

```typescript
// src/features/books/useBooks.ts
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/database'

type Book = Database['public']['Tables']['livres']['Row']

export function useBooks() {
  return useQuery({
    queryKey: ['livres'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('livres')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as Book[]
    },
  })
}
```

#### Composant StatusBadge

```typescript
// src/components/StatusBadge.tsx
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type Statut = 'a_lire' | 'en_cours' | 'lu'

const statusConfig: Record<Statut, { label: string; className: string }> = {
  a_lire: {
    label: 'À lire',
    className: 'bg-primary text-primary-foreground',
  },
  en_cours: {
    label: 'En cours',
    className: 'bg-accent text-accent-foreground',
  },
  lu: {
    label: 'Lu',
    className: 'bg-secondary text-secondary-foreground',
  },
}

interface StatusBadgeProps {
  statut: Statut
}

export function StatusBadge({ statut }: StatusBadgeProps) {
  const config = statusConfig[statut]
  return (
    <Badge className={cn('font-medium', config.className)}>
      {config.label}
    </Badge>
  )
}
```

#### Composant BookCard

```typescript
// src/components/BookCard.tsx
import { Card, CardContent } from '@/components/ui/card'
import { StatusBadge } from './StatusBadge'
import type { Database } from '@/types/database'

type Book = Database['public']['Tables']['livres']['Row']

interface BookCardProps {
  book: Book
  onClick?: () => void
}

export function BookCard({ book, onClick }: BookCardProps) {
  return (
    <Card
      className="cursor-pointer shadow-brutal hover:shadow-brutal-hover transition-shadow"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-lg font-medium truncate">
              {book.titre}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {book.auteur}
            </p>
          </div>
          <StatusBadge statut={book.statut} />
        </div>
      </CardContent>
    </Card>
  )
}
```

### UX Design Notes

**Source:** [docs/ux-design-specification.md#Component-Strategy]

#### Layout de la liste
- Grille 1 colonne sur mobile
- Grille 2 colonnes sur tablet (sm: 640px+)
- Grille 3 colonnes sur desktop (lg: 1024px+)
- Gap 12px entre les cards

```css
.book-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

@media (min-width: 640px) {
  .book-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .book-grid { grid-template-columns: repeat(3, 1fr); }
}
```

#### Typographie
- Titre : Lora (font-serif), 1.125rem
- Auteur : Poppins (font-sans), 0.875rem, muted

### Project Structure Notes

Fichiers à créer :
```
src/
├── components/
│   ├── BookCard.tsx             # NOUVEAU
│   ├── BookCardSkeleton.tsx     # NOUVEAU
│   └── StatusBadge.tsx          # NOUVEAU
│
├── features/
│   └── books/
│       ├── useBooks.ts          # NOUVEAU
│       └── BookList.tsx         # NOUVEAU
│
└── types/
    └── index.ts                 # MODIFIER (ajouter type Book)
```

### IMPORTANT: Conventions de données

**Source:** [docs/architecture.md#Naming-Patterns]

Les données restent en **snake_case** (pas de conversion) :
```typescript
// CORRECT
book.titre
book.auteur
book.statut
book.user_id
book.created_at

// INCORRECT - NE PAS FAIRE
book.title
book.author
book.status
```

### References

- [Source: docs/architecture.md#Frontend-Architecture]
- [Source: docs/architecture.md#Communication-Patterns]
- [Source: docs/ux-design-specification.md#Component-Strategy]
- [Source: docs/epics.md#Story-2.1]

---

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (SM Agent - Bob)

### File List
_Expected files:_
- `src/features/books/useBooks.ts`
- `src/features/books/BookList.tsx`
- `src/components/BookCard.tsx`
- `src/components/BookCardSkeleton.tsx`
- `src/components/StatusBadge.tsx`

---

## Definition of Done

- [ ] Hook `useBooks` fonctionnel avec TanStack Query
- [ ] BookCard avec titre (Lora), auteur, badge statut
- [ ] StatusBadge avec 3 couleurs (rose, jaune, bleu-vert)
- [ ] Skeleton cards pendant le chargement
- [ ] Style néo-brutaliste (ombres dures)
- [ ] Layout responsive (1/2/3 colonnes)
- [ ] Scroll fluide sans pagination
- [ ] Données en snake_case (pas de conversion)
- [ ] Code commité

---

*Story générée le 2025-12-18 via le workflow BMAD Create Story*
