# Story 2.5: Filtrer par Statut

**Status:** Done

---

## Story

**As a** utilisateur connecté,
**I want** filtrer ma liste de livres par statut,
**So that** je puisse voir rapidement mes livres "À lire", "En cours" ou "Lu".

---

## Acceptance Criteria

### AC1: Bottom Navigation visible
**Given** je suis sur la page d'accueil
**When** je regarde le bas de l'écran
**Then** je vois une Bottom Navigation avec 4 onglets : Tous | À lire | En cours | Lu

### AC2: Onglet actif visible
**Given** je suis sur la page d'accueil
**When** je regarde la Bottom Navigation
**Then** l'onglet actuellement actif est visuellement mis en évidence
**And** par défaut, l'onglet "Tous" est actif

### AC3: Filtrage fonctionnel
**Given** je clique sur l'onglet "À lire"
**When** le filtre est appliqué
**Then** seuls les livres avec le statut "À lire" sont affichés
**And** les autres livres sont masqués

### AC4: Filtrage côté client
**Given** je change de filtre
**When** la liste est filtrée
**Then** aucune nouvelle requête serveur n'est effectuée
**And** le filtrage est instantané (< 100ms)

### AC5: État vide filtré
**Given** je filtre et aucun livre ne correspond
**When** la liste filtrée est vide
**Then** un message contextuel s'affiche selon le filtre :
- "Aucun livre à lire" (filtre À lire)
- "Aucun livre en cours" (filtre En cours)
- "Aucun livre lu" (filtre Lu)

### AC6: Icônes et labels
**Given** je regarde la Bottom Navigation
**When** je vois les onglets
**Then** chaque onglet a une icône et un label texte
**And** les icônes sont distinctives pour chaque statut

### AC7: Safe area support
**Given** je suis sur mobile avec encoche ou barre de navigation système
**When** je vois la Bottom Navigation
**Then** elle respecte les safe areas (padding-bottom approprié)
**And** elle est fixée en bas de l'écran

### AC8: Performance
**Given** j'ai une liste de ~50 livres
**When** je change de filtre
**Then** la consultation après filtrage reste < 5 secondes (NFR1)

---

## Tasks / Subtasks

- [x] **Task 1: Création du composant BottomNavigation** (AC: 1, 2, 6, 7)
  - [x] Créer `src/components/BottomNavigation.tsx`
  - [x] 4 items : Tous, À lire, En cours, Lu
  - [x] Icônes pour chaque item (lucide-react)
  - [x] Position fixed bottom avec safe area padding
  - [x] État actif visuellement distinct

- [x] **Task 2: Gestion de l'état du filtre** (AC: 2, 3, 4)
  - [x] Ajouter état `filter` dans HomePage
  - [x] Type : `'all' | 'a_lire' | 'en_cours' | 'lu'`
  - [x] Passer le setter à BottomNavigation

- [x] **Task 3: Filtrage côté client** (AC: 3, 4, 8)
  - [x] Filtrer la liste des livres avec `useMemo`
  - [x] Ne pas refetch les données
  - [x] Implémenter la logique de filtrage

- [x] **Task 4: États vides filtrés** (AC: 5)
  - [x] Créer un composant `FilteredEmptyState`
  - [x] Messages personnalisés par filtre
  - [x] Style cohérent avec EmptyState global

- [x] **Task 5: Styling et animations** (AC: 1, 2)
  - [x] Style néo-brutaliste pour la nav
  - [x] Transition smooth sur changement d'onglet
  - [x] Couleurs par statut (optionnel)

- [x] **Task 6: Intégration dans HomePage** (AC: 1, 3)
  - [x] Ajouter BottomNavigation dans le layout
  - [x] Connecter le filtre à BookList
  - [x] Ajuster le padding-bottom du contenu principal

---

## Dev Notes

### Architecture Patterns & Constraints

**Source:** [docs/architecture.md#Frontend-Architecture]

#### Composant BottomNavigation

```typescript
// src/components/BottomNavigation.tsx
import { BookOpen, BookMarked, Clock, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type FilterType = 'all' | 'a_lire' | 'en_cours' | 'lu'

interface NavItem {
  id: FilterType
  label: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { id: 'all', label: 'Tous', icon: <BookOpen className="h-5 w-5" /> },
  { id: 'a_lire', label: 'À lire', icon: <BookMarked className="h-5 w-5" /> },
  { id: 'en_cours', label: 'En cours', icon: <Clock className="h-5 w-5" /> },
  { id: 'lu', label: 'Lu', icon: <CheckCircle className="h-5 w-5" /> },
]

interface BottomNavigationProps {
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

export function BottomNavigation({ activeFilter, onFilterChange }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onFilterChange(item.id)}
            className={cn(
              'flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors',
              activeFilter === item.id
                ? 'text-primary font-medium'
                : 'text-muted-foreground'
            )}
          >
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
```

#### Filtrage côté client avec useMemo

```typescript
// Dans HomePage.tsx
import { useMemo, useState } from 'react'

type FilterType = 'all' | 'a_lire' | 'en_cours' | 'lu'

export function HomePage() {
  const { data: books, isLoading } = useBooks()
  const [filter, setFilter] = useState<FilterType>('all')

  const filteredBooks = useMemo(() => {
    if (!books) return []
    if (filter === 'all') return books
    return books.filter((book) => book.statut === filter)
  }, [books, filter])

  return (
    <div className="min-h-screen bg-background pb-20"> {/* pb-20 pour la nav */}
      <Header />
      <main className="container mx-auto px-4 py-6">
        {isLoading ? (
          <BookListSkeleton />
        ) : filteredBooks.length === 0 ? (
          <FilteredEmptyState filter={filter} totalBooks={books?.length || 0} />
        ) : (
          <BookList books={filteredBooks} />
        )}
      </main>
      <BottomNavigation activeFilter={filter} onFilterChange={setFilter} />
      <FAB onClick={() => setAddDialogOpen(true)} />
    </div>
  )
}
```

#### État vide filtré

```typescript
// src/components/FilteredEmptyState.tsx
type FilterType = 'all' | 'a_lire' | 'en_cours' | 'lu'

const filterMessages: Record<FilterType, string> = {
  all: 'Votre bibliothèque est vide.',
  a_lire: 'Aucun livre à lire.',
  en_cours: 'Aucun livre en cours de lecture.',
  lu: 'Aucun livre lu pour le moment.',
}

interface FilteredEmptyStateProps {
  filter: FilterType
  totalBooks: number
}

export function FilteredEmptyState({ filter, totalBooks }: FilteredEmptyStateProps) {
  // Si totalBooks > 0 mais filteredBooks = 0, c'est un état vide filtré
  // Si totalBooks = 0, afficher l'état vide global (EmptyState)
  if (totalBooks === 0) {
    return <EmptyState />
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-muted-foreground">{filterMessages[filter]}</p>
    </div>
  )
}
```

### UX Design Notes

**Source:** [docs/ux-design-specification.md#Navigation-Patterns]

#### Bottom Navigation
- 4 items maximum (respecté)
- Icône + Label toujours visible
- État actif : primary color + font bold
- Hauteur : 64px (h-16)
- Safe area : `pb-safe` pour iOS

#### Transitions
- Changement de filtre instantané (pas d'animation de chargement)
- Transition de couleur smooth sur les onglets

#### Z-index hierarchy
1. FAB : z-50
2. Bottom Navigation : z-40
3. Dialogs/Sheets : z-50 (au-dessus de tout)

### Safe Area CSS

```css
/* Dans index.css ou tailwind.config.js */
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}
```

Ou avec Tailwind plugin :
```js
// tailwind.config.js
theme: {
  extend: {
    spacing: {
      'safe-bottom': 'env(safe-area-inset-bottom)',
    },
  },
},
```

### Project Structure Notes

Fichiers à créer :
```
src/
├── components/
│   ├── BottomNavigation.tsx     # NOUVEAU
│   └── FilteredEmptyState.tsx   # NOUVEAU
│
└── pages/
    └── HomePage.tsx             # MODIFIER (ajout filtre)
```

### References

- [Source: docs/architecture.md#Frontend-Architecture]
- [Source: docs/ux-design-specification.md#Navigation-Patterns]
- [Source: docs/ux-design-specification.md#Flow-3-Vérifier-en-Librairie]
- [Source: docs/epics.md#Story-2.5]

---

## Dev Agent Record

### Agent Model Used
- Story creation: Claude Opus 4.5 (SM Agent - Bob)
- Implementation: Claude Opus 4.5 (Dev Agent - Amelia)

### Implementation Plan
1. Created BottomNavigation with 4 filter tabs and lucide-react icons
2. Added filter state in HomePage with FilterType union type
3. Implemented client-side filtering with useMemo (no server refetch)
4. Created FilteredEmptyState with contextual messages per filter
5. Modified BookList to accept filtered books as prop
6. Integrated everything in HomePage with proper padding

### Completion Notes
- All 6 tasks implemented and validated
- Build passes (TypeScript strict mode)
- Filtrage 100% côté client avec useMemo - instantané
- Safe area via env(safe-area-inset-bottom)
- Bottom Navigation z-40, FAB z-50 pour proper layering

### File List
**Created:**
- `src/components/BottomNavigation.tsx`
- `src/components/FilteredEmptyState.tsx`

**Modified:**
- `src/pages/HomePage.tsx` (filter state, useMemo, BottomNavigation integration)
- `src/features/books/BookList.tsx` (accepts books prop for filtered data)

---

## Definition of Done

- [x] Bottom Navigation avec 4 onglets visible
- [x] Onglet actif visuellement distinct
- [x] "Tous" actif par défaut
- [x] Filtrage fonctionne pour chaque statut
- [x] Pas de requête serveur au changement de filtre
- [x] États vides filtrés avec messages contextuels
- [x] Icônes et labels sur chaque onglet
- [x] Safe area respectée sur mobile
- [x] Performance < 5 secondes
- [x] Code commité

---

## Senior Developer Review (AI)

### Review Date: 2025-12-29
### Reviewer: Dev Agent (Amelia)
### Outcome: ✅ APPROVED (with fixes applied)

### Issues Found: 6

| ID | Severity | Category | Description | Status |
|----|----------|----------|-------------|--------|
| A11Y-01 | Medium | Accessibility | Missing `aria-current` on active nav button | ✅ Fixed |
| A11Y-02 | Low | Accessibility | Missing `type="button"` attribute | ✅ Fixed |
| A11Y-03 | Medium | Accessibility | Emoji icons not accessible to screen readers | ✅ Fixed |
| A11Y-04 | Medium | Accessibility | No visible focus ring on nav buttons | ✅ Fixed |
| ARCH-01 | Low | Architecture | FilterType exported from component instead of types/ | ✅ Fixed |
| CSS-01 | Low | CSS | Safe area fallback missing for older browsers | ✅ Fixed |

### Fixes Applied:
1. Added `aria-current="true"` to active navigation button
2. Added `type="button"` to all navigation buttons
3. Added `role="img" aria-hidden="true"` to emoji icons
4. Added `focus-visible:ring-2` styles for keyboard navigation
5. Moved `FilterType` to `src/types/index.ts` for better separation
6. Changed `pb-[env(safe-area-inset-bottom)]` to `pb-[max(0px,env(safe-area-inset-bottom))]`

### Build Status: ✅ Passing

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2025-12-29 | Code review completed - 6 issues fixed | Dev Agent (Amelia) |
| 2025-12-29 | Story implementation complete - all ACs satisfied | Dev Agent (Amelia) |

---

*Story générée le 2025-12-18 via le workflow BMAD Create Story*
