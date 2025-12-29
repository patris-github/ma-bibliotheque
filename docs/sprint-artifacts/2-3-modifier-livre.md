# Story 2.3: Modifier un Livre

**Status:** Done

---

## Story

**As a** utilisateur connecté,
**I want** modifier les informations d'un livre existant,
**So that** je puisse corriger une erreur ou mettre à jour le statut de lecture.

---

## Acceptance Criteria

### AC1: Ouverture du formulaire d'édition
**Given** je vois la liste de mes livres
**When** je clique sur une BookCard
**Then** le formulaire d'édition s'ouvre avec les données pré-remplies

### AC2: Données pré-remplies
**Given** le formulaire d'édition est ouvert
**When** je regarde les champs
**Then** le titre, l'auteur et le statut sont pré-remplis avec les valeurs actuelles

### AC3: Modification réussie
**Given** je modifie les informations et je soumets
**When** la validation réussit
**Then** le livre est mis à jour dans Supabase
**And** la liste se rafraîchit automatiquement (invalidation cache)
**And** un Toast de succès s'affiche : "Livre modifié"
**And** le formulaire se ferme

### AC4: Célébration passage à "Lu"
**Given** je change le statut d'un livre vers "Lu"
**When** la mise à jour est effectuée
**Then** une micro-animation de célébration s'affiche (confetti ou animation subtile)

### AC5: Bouton Annuler
**Given** le formulaire d'édition est ouvert
**When** je clique sur "Annuler"
**Then** le formulaire se ferme sans sauvegarder
**And** les modifications sont ignorées

### AC6: Réutilisation du BookForm
**Given** le composant BookForm existe (Story 2.2)
**When** il est utilisé pour l'édition
**Then** le même composant est réutilisé avec un mode "edit"
**And** le bouton affiche "Enregistrer" au lieu de "Ajouter"

### AC7: État de chargement
**Given** je soumets une modification
**When** la mise à jour est en cours
**Then** le bouton affiche un état de chargement
**And** les champs sont désactivés

---

## Tasks / Subtasks

- [x] **Task 1: Modification du BookForm pour le mode édition** (AC: 2, 6)
  - [x] Ajouter prop `mode: 'add' | 'edit'`
  - [x] Ajouter prop `defaultValues` pour pré-remplir
  - [x] Changer le label du bouton selon le mode
  - [x] Ajouter bouton "Annuler" en mode édition

- [x] **Task 2: Création du mutation hook useUpdateBook** (AC: 3)
  - [x] Ajouter `useUpdateBook` dans `src/features/books/useBooks.ts`
  - [x] Utiliser `useMutation` avec `supabase.update()`
  - [x] Invalider `['livres']` et `['livre', id]` après succès

- [x] **Task 3: Création du EditBookDialog** (AC: 1, 5)
  - [x] Créer `src/features/books/EditBookDialog.tsx`
  - [x] Recevoir le livre à éditer en prop
  - [x] Utiliser BookForm en mode "edit"
  - [x] Gérer la fermeture

- [x] **Task 4: Connexion BookCard → EditDialog** (AC: 1)
  - [x] Ajouter onClick sur BookCard
  - [x] Ouvrir EditBookDialog avec le livre sélectionné
  - [x] Gérer l'état du livre sélectionné dans HomePage

- [x] **Task 5: Animation de célébration** (AC: 4)
  - [x] Détecter le changement vers statut "lu"
  - [x] Déclencher une animation (confetti léger ou emoji animé)
  - [x] Animation courte (1-2 secondes)

- [x] **Task 6: Toast de succès** (AC: 3)
  - [x] Afficher "Livre modifié" après update réussi

---

## Dev Notes

### Architecture Patterns & Constraints

**Source:** [docs/architecture.md#Frontend-Architecture]

#### Mutation hook useUpdateBook

```typescript
// Dans src/features/books/useBooks.ts
export function useUpdateBook() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<BookFormData> }) => {
      const { data: book, error } = await supabase
        .from('livres')
        .update(data)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return book
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['livres'] })
      queryClient.invalidateQueries({ queryKey: ['livre', variables.id] })
    },
  })
}
```

#### BookForm modifié pour mode édition

```typescript
// src/features/books/BookForm.tsx
interface BookFormProps {
  mode: 'add' | 'edit'
  defaultValues?: BookFormData
  onSubmit: (data: BookFormData) => void
  onCancel?: () => void
  isLoading?: boolean
}

export function BookForm({ mode, defaultValues, onSubmit, onCancel, isLoading }: BookFormProps) {
  const form = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: defaultValues || {
      titre: '',
      auteur: '',
      statut: 'a_lire',
    },
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Champs... */}
      <div className="flex gap-2 justify-end">
        {mode === 'edit' && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Chargement...' : mode === 'add' ? 'Ajouter' : 'Enregistrer'}
        </Button>
      </div>
    </form>
  )
}
```

#### Détection du passage à "Lu" pour célébration

```typescript
// Dans le handler de submit du EditBookDialog
const handleSubmit = async (data: BookFormData) => {
  const wasNotLu = book.statut !== 'lu'
  const isNowLu = data.statut === 'lu'

  await updateBook({ id: book.id, data })

  if (wasNotLu && isNowLu) {
    // Déclencher animation de célébration
    triggerCelebration()
  }

  toast.success('Livre modifié')
  onClose()
}
```

### UX Design Notes

**Source:** [docs/ux-design-specification.md#Flow-4-5]

#### Micro-célébration
- Animation subtile, pas intrusive
- Durée : 1-2 secondes
- Options : confetti léger, emoji animé (📚 → ✅), ou animation CSS
- Peut utiliser une librairie comme `canvas-confetti` ou animation CSS pure

#### Formulaire d'édition
- Même structure que l'ajout
- Bouton "Annuler" visible
- Bouton principal : "Enregistrer" (pas "Modifier")

### Project Structure Notes

Fichiers à modifier/créer :
```
src/
├── features/
│   └── books/
│       ├── BookForm.tsx         # MODIFIER (mode edit)
│       ├── EditBookDialog.tsx   # NOUVEAU
│       └── useBooks.ts          # MODIFIER (useUpdateBook)
│
└── pages/
    └── HomePage.tsx             # MODIFIER (gestion état édition)
```

### References

- [Source: docs/architecture.md#Frontend-Architecture]
- [Source: docs/ux-design-specification.md#Critical-Success-Moments]
- [Source: docs/epics.md#Story-2.3]

---

## Dev Agent Record

### Agent Model Used
- Story creation: Claude Opus 4.5 (SM Agent - Bob)
- Implementation: Claude Opus 4.5 (Dev Agent - Amelia)

### Implementation Plan
1. Extended BookForm with mode/defaultValues/onCancel props
2. Created useUpdateBook mutation hook with cache invalidation
3. Created EditBookDialog with Sheet/Dialog responsive pattern
4. Connected BookList → HomePage → EditBookDialog flow
5. Added celebration animation on status change to "Lu"
6. Integrated toast notification for success feedback

### Completion Notes
- All 6 tasks implemented and validated
- Build passes (TypeScript strict mode)
- Lint passes (0 errors, 3 pre-existing warnings)
- Celebration uses CSS animation (emoji bounce) - lightweight, no external lib
- Responsive: Sheet on mobile, Dialog on desktop

### File List
**Created:**
- `src/features/books/EditBookDialog.tsx`

**Modified:**
- `src/features/books/BookForm.tsx` (added mode, defaultValues, onCancel props)
- `src/features/books/useBooks.ts` (added useUpdateBook hook)
- `src/features/books/BookList.tsx` (added onBookClick prop)
- `src/pages/HomePage.tsx` (added edit dialog state management)

---

## Definition of Done

- [x] Clic sur BookCard ouvre le formulaire d'édition
- [x] Données pré-remplies dans le formulaire
- [x] BookForm réutilisé en mode "edit"
- [x] Mise à jour dans Supabase fonctionnelle
- [x] Invalidation du cache après modification
- [x] Toast "Livre modifié" affiché
- [x] Animation de célébration au passage "Lu"
- [x] Bouton Annuler fonctionnel
- [x] Code commité

---

## Senior Developer Review (AI)

### Review Date: 2025-12-29
### Reviewer: Dev Agent (Amelia)
### Outcome: ✅ APPROVED (with fixes applied)

### Issues Found: 1

| ID | Severity | Category | Description | Status |
|----|----------|----------|-------------|--------|
| A11Y-01 | Medium | Accessibility | Celebration emoji not accessible | ✅ Fixed |

### Fixes Applied:
1. Added `role="img" aria-hidden="true"` to celebration emoji in EditBookDialog

### Build Status: ✅ Passing

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2025-12-29 | Code review completed - 1 issue fixed | Dev Agent (Amelia) |
| 2025-12-29 | Story implementation complete - all ACs satisfied | Dev Agent (Amelia) |

---

*Story générée le 2025-12-18 via le workflow BMAD Create Story*
