# Story 1.6: Page d'Accueil avec État Vide

**Status:** Done

---

## Story

**As a** nouvel utilisateur connecté,
**I want** voir un message d'accueil chaleureux quand ma bibliothèque est vide,
**So that** je me sente bienvenu et encouragé à ajouter mon premier livre.

---

## Acceptance Criteria

### AC1: Page d'accueil accessible
**Given** je suis authentifié
**When** j'accède à `/`
**Then** je vois la page d'accueil de ma bibliothèque

### AC2: État vide affiché
**Given** je suis connecté et ma bibliothèque est vide (0 livres)
**When** la page d'accueil se charge
**Then** je vois un message d'accueil personnalisé et chaleureux
**And** l'interface ne semble pas "cassée" ou vide

### AC3: CTA proéminent
**Given** je vois l'état vide
**When** je regarde l'écran
**Then** un bouton ou CTA proéminent m'invite à "Ajouter mon premier livre"
**And** ce CTA est visuellement mis en avant (style primary)

### AC4: Style néo-brutaliste
**Given** je suis sur la page d'accueil
**When** je regarde l'interface
**Then** elle suit le style néo-brutaliste (ombres dures, couleurs chaudes)
**And** la typographie utilise Poppins pour l'interface

### AC5: Layout mobile-first
**Given** je suis sur mobile
**When** je vois la page d'accueil
**Then** le layout est optimisé pour mobile avec padding approprié
**And** les éléments sont centrés et lisibles

### AC6: Structure prête pour la liste
**Given** la page d'accueil existe
**When** des livres seront ajoutés (Epic 2)
**Then** la structure est prête pour recevoir le composant `BookList`
**And** l'état vide peut être conditionnel (affiché seulement si 0 livres)

### AC7: Header avec déconnexion
**Given** je suis sur la page d'accueil
**When** je regarde le haut de l'écran
**Then** je vois un header avec le titre "Ma Bibliothèque"
**And** un bouton de déconnexion est accessible

---

## Tasks / Subtasks

- [x] **Task 1: Création de la page HomePage** (AC: 1, 6)
  - [x] Créer `src/pages/HomePage.tsx`
  - [x] Implémenter le layout de base
  - [x] Préparer l'emplacement pour `BookList` (Epic 2)

- [x] **Task 2: Création du composant Header** (AC: 7)
  - [x] Créer `src/components/Header.tsx`
  - [x] Afficher le titre "Ma Bibliothèque"
  - [x] Ajouter le bouton de déconnexion
  - [x] Connecter au `signOut` de `useAuth()`

- [x] **Task 3: Création du composant EmptyState** (AC: 2, 3, 4, 5)
  - [x] Créer `src/components/EmptyState.tsx`
  - [x] Message d'accueil chaleureux en français
  - [x] CTA "Ajouter mon premier livre" (bouton primary)
  - [x] Style néo-brutaliste avec ombres dures

- [x] **Task 4: Intégration conditionnelle** (AC: 6)
  - [x] Préparer la logique pour afficher EmptyState ou BookList
  - [x] Pour l'instant, toujours afficher EmptyState (pas de livres)

- [x] **Task 5: Styling et Layout** (AC: 4, 5)
  - [x] Layout mobile-first
  - [x] Padding container 16px
  - [x] Centrage vertical et horizontal du contenu
  - [x] Typographie Poppins

- [x] **Task 6: Route configuration** (AC: 1)
  - [x] S'assurer que `/` pointe vers `HomePage`
  - [x] Vérifier que la route est protégée

---

## Dev Notes

### Architecture Patterns & Constraints

**Source:** [docs/architecture.md#Project-Structure]

#### Composant EmptyState

```typescript
// src/components/EmptyState.tsx
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  onAddBook?: () => void
}

export function EmptyState({ onAddBook }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="space-y-6">
        {/* Emoji ou illustration */}
        <div className="text-6xl">📚</div>

        {/* Message d'accueil */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">
            Bienvenue dans votre bibliothèque !
          </h2>
          <p className="text-muted-foreground max-w-sm">
            Votre collection est vide pour l'instant.
            Commencez par ajouter votre premier livre.
          </p>
        </div>

        {/* CTA */}
        <Button
          size="lg"
          onClick={onAddBook}
          className="shadow-brutal hover:shadow-brutal-hover"
        >
          Ajouter mon premier livre
        </Button>
      </div>
    </div>
  )
}
```

#### Composant Header

```typescript
// src/components/Header.tsx
import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth/AuthContext'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

export function Header() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    toast.success('Vous êtes déconnecté')
    navigate('/login')
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border">
      <h1 className="text-xl font-semibold font-sans">Ma Bibliothèque</h1>
      <Button variant="ghost" size="sm" onClick={handleSignOut}>
        Déconnexion
      </Button>
    </header>
  )
}
```

#### Structure HomePage

```typescript
// src/pages/HomePage.tsx
import { Header } from '@/components/Header'
import { EmptyState } from '@/components/EmptyState'
// import { BookList } from '@/features/books/BookList' // Epic 2

export function HomePage() {
  // Pour l'instant, toujours afficher l'état vide
  // La logique avec useBooks() sera ajoutée dans Epic 2
  const hasBooks = false

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        {hasBooks ? (
          // <BookList /> sera ajouté dans Epic 2
          <div>Liste des livres</div>
        ) : (
          <EmptyState onAddBook={() => {
            // Sera connecté au FAB/Dialog dans Epic 2
            console.log('Ajouter un livre')
          }} />
        )}
      </main>
    </div>
  )
}
```

### UX Design Notes

**Source:** [docs/ux-design-specification.md]

#### Message d'accueil
- Tonalité chaleureuse, pas une base de données froide
- Message personnalisé et encourageant
- Pas de sentiment de "vide anxiogène"

#### Style visuel
- Couleurs chaudes (rose, jaune, beige)
- Ombres dures 3px (néo-brutaliste)
- Typographie Poppins pour l'interface
- Emoji ou icône pour ajouter de la chaleur

#### Layout
- Centré verticalement et horizontalement
- Padding 16px sur mobile
- Max-width sur le texte pour lisibilité

### Project Structure Notes

Fichiers à créer :
```
src/
├── components/
│   ├── Header.tsx           # NOUVEAU
│   └── EmptyState.tsx       # NOUVEAU
│
└── pages/
    └── HomePage.tsx         # NOUVEAU
```

### References

- [Source: docs/ux-design-specification.md#Empty-States]
- [Source: docs/ux-design-specification.md#Design-System-Foundation]
- [Source: docs/epics.md#Story-1.6]

---

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (Dev Agent - Amelia)

### Implementation Notes
- **Header.tsx**: Extracted header with title "Ma Bibliothèque", user email display, and logout button with neo-brutalist shadow styling
- **EmptyState.tsx**: Welcoming empty state with BookOpen icon, French message, and prominent CTA button
- **HomePage.tsx**: Restructured to use Header + conditional EmptyState/BookList pattern, ready for Epic 2

### File List
- `src/components/Header.tsx` (NEW)
- `src/components/EmptyState.tsx` (NEW)
- `src/pages/HomePage.tsx` (MODIFIED - restructured with components)

### Change Log
- 2025-12-18: Implemented homepage with empty state (Story 1.6)

---

## Definition of Done

- [x] Page d'accueil accessible à `/`
- [x] État vide avec message chaleureux
- [x] CTA "Ajouter mon premier livre" visible
- [x] Header avec titre et bouton déconnexion
- [x] Style néo-brutaliste appliqué
- [x] Layout mobile-first
- [x] Structure prête pour recevoir BookList
- [x] Code commité (704549d)

---

*Story générée le 2025-12-18 via le workflow BMAD Create Story*
