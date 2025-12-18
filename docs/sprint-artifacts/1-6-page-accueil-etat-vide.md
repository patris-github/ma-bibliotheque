# Story 1.6: Page d'Accueil avec État Vide

**Status:** ready-for-dev

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

- [ ] **Task 1: Création de la page HomePage** (AC: 1, 6)
  - [ ] Créer `src/pages/HomePage.tsx`
  - [ ] Implémenter le layout de base
  - [ ] Préparer l'emplacement pour `BookList` (Epic 2)

- [ ] **Task 2: Création du composant Header** (AC: 7)
  - [ ] Créer `src/components/Header.tsx`
  - [ ] Afficher le titre "Ma Bibliothèque"
  - [ ] Ajouter le bouton de déconnexion
  - [ ] Connecter au `signOut` de `useAuth()`

- [ ] **Task 3: Création du composant EmptyState** (AC: 2, 3, 4, 5)
  - [ ] Créer `src/components/EmptyState.tsx`
  - [ ] Message d'accueil chaleureux en français
  - [ ] CTA "Ajouter mon premier livre" (bouton primary)
  - [ ] Style néo-brutaliste avec ombres dures

- [ ] **Task 4: Intégration conditionnelle** (AC: 6)
  - [ ] Préparer la logique pour afficher EmptyState ou BookList
  - [ ] Pour l'instant, toujours afficher EmptyState (pas de livres)

- [ ] **Task 5: Styling et Layout** (AC: 4, 5)
  - [ ] Layout mobile-first
  - [ ] Padding container 16px
  - [ ] Centrage vertical et horizontal du contenu
  - [ ] Typographie Poppins

- [ ] **Task 6: Route configuration** (AC: 1)
  - [ ] S'assurer que `/` pointe vers `HomePage`
  - [ ] Vérifier que la route est protégée

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
Claude Opus 4.5 (SM Agent - Bob)

### File List
_Expected files:_
- `src/pages/HomePage.tsx`
- `src/components/Header.tsx`
- `src/components/EmptyState.tsx`

---

## Definition of Done

- [ ] Page d'accueil accessible à `/`
- [ ] État vide avec message chaleureux
- [ ] CTA "Ajouter mon premier livre" visible
- [ ] Header avec titre et bouton déconnexion
- [ ] Style néo-brutaliste appliqué
- [ ] Layout mobile-first
- [ ] Structure prête pour recevoir BookList
- [ ] Code commité

---

*Story générée le 2025-12-18 via le workflow BMAD Create Story*
