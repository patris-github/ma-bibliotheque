# Story 2.5: Filtrer par Statut

**Status:** ready-for-dev

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

- [ ] **Task 1: Création du composant BottomNavigation** (AC: 1, 2, 6, 7)
  - [ ] Créer `src/components/BottomNavigation.tsx`
  - [ ] 4 items : Tous, À lire, En cours, Lu
  - [ ] Icônes pour chaque item (lucide-react)
  - [ ] Position fixed bottom avec safe area padding
  - [ ] État actif visuellement distinct

- [ ] **Task 2: Gestion de l'état du filtre** (AC: 2, 3, 4)
  - [ ] Ajouter état `filter` dans HomePage
  - [ ] Type : `'all' | 'a_lire' | 'en_cours' | 'lu'`
  - [ ] Passer le setter à BottomNavigation

- [ ] **Task 3: Filtrage côté client** (AC: 3, 4, 8)
  - [ ] Filtrer la liste des livres avec `useMemo`
  - [ ] Ne pas refetch les données
  - [ ] Implémenter la logique de filtrage

- [ ] **Task 4: États vides filtrés** (AC: 5)
  - [ ] Créer un composant `FilteredEmptyState`
  - [ ] Messages personnalisés par filtre
  - [ ] Style cohérent avec EmptyState global

- [ ] **Task 5: Styling et animations** (AC: 1, 2)
  - [ ] Style néo-brutaliste pour la nav
  - [ ] Transition smooth sur changement d'onglet
  - [ ] Couleurs par statut (optionnel)

- [ ] **Task 6: Intégration dans HomePage** (AC: 1, 3)
  - [ ] Ajouter BottomNavigation dans le layout
  - [ ] Connecter le filtre à BookList
  - [ ] Ajuster le padding-bottom du contenu principal

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
Claude Opus 4.5 (SM Agent - Bob)

### File List
_Expected files:_
- `src/components/BottomNavigation.tsx`
- `src/components/FilteredEmptyState.tsx`
- Mise à jour `src/pages/HomePage.tsx`
- Mise à jour `src/index.css` (safe area)

---

## Definition of Done

- [ ] Bottom Navigation avec 4 onglets visible
- [ ] Onglet actif visuellement distinct
- [ ] "Tous" actif par défaut
- [ ] Filtrage fonctionne pour chaque statut
- [ ] Pas de requête serveur au changement de filtre
- [ ] États vides filtrés avec messages contextuels
- [ ] Icônes et labels sur chaque onglet
- [ ] Safe area respectée sur mobile
- [ ] Performance < 5 secondes
- [ ] Code commité

---

*Story générée le 2025-12-18 via le workflow BMAD Create Story*
