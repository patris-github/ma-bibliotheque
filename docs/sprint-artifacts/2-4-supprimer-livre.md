# Story 2.4: Supprimer un Livre

**Status:** Done

---

## Story

**As a** utilisateur connecté,
**I want** supprimer un livre de ma collection,
**So that** je puisse retirer les livres que je ne souhaite plus suivre.

---

## Acceptance Criteria

### AC1: Accès à la suppression
**Given** je suis dans le formulaire d'édition d'un livre
**When** je regarde les actions disponibles
**Then** je vois un bouton "Supprimer" de style destructive (rouge-orange)

### AC2: Confirmation avant suppression
**Given** je clique sur "Supprimer"
**When** l'action est déclenchée
**Then** une boîte de dialogue de confirmation s'affiche (AlertDialog)
**And** le message est : "Êtes-vous sûr de vouloir supprimer ce livre ?"
**And** le titre du livre est affiché pour confirmation

### AC3: Suppression confirmée
**Given** la confirmation de suppression est affichée
**When** je confirme la suppression (bouton "Supprimer")
**Then** le livre est supprimé de Supabase
**And** la liste se met à jour automatiquement (invalidation cache)
**And** un Toast de confirmation s'affiche : "Livre supprimé"
**And** le formulaire d'édition se ferme

### AC4: Suppression annulée
**Given** la confirmation de suppression est affichée
**When** j'annule (bouton "Annuler" ou clic extérieur)
**Then** rien n'est supprimé
**And** je reviens au formulaire d'édition

### AC5: État de chargement
**Given** je confirme la suppression
**When** la requête est en cours
**Then** le bouton "Supprimer" affiche un état de chargement
**And** le bouton "Annuler" est désactivé

---

## Tasks / Subtasks

- [x] **Task 1: Création du mutation hook useDeleteBook** (AC: 3)
  - [x] Ajouter `useDeleteBook` dans `src/features/books/useBooks.ts`
  - [x] Utiliser `useMutation` avec `supabase.delete()`
  - [x] Invalider `['livres']` après succès

- [x] **Task 2: Création du composant DeleteBookDialog** (AC: 2, 4, 5)
  - [x] Créer `src/features/books/DeleteBookDialog.tsx`
  - [x] Utiliser AlertDialog de Shadcn/ui
  - [x] Afficher le message de confirmation avec le titre du livre
  - [x] Boutons "Annuler" et "Supprimer"
  - [x] Style destructive pour le bouton Supprimer

- [x] **Task 3: Ajout du bouton Supprimer dans BookForm** (AC: 1)
  - [x] Ajouter bouton "Supprimer" dans BookForm (mode edit uniquement)
  - [x] Style `variant="destructive"`
  - [x] Déclencher l'ouverture du DeleteBookDialog

- [x] **Task 4: Intégration dans EditBookDialog** (AC: 1, 3, 4)
  - [x] Gérer l'état du DeleteBookDialog
  - [x] Fermer EditBookDialog après suppression réussie
  - [x] Callback onDelete pour fermer les deux dialogs

- [x] **Task 5: Toast de confirmation** (AC: 3)
  - [x] Afficher "Livre supprimé" après delete réussi

---

## Dev Notes

### Architecture Patterns & Constraints

**Source:** [docs/architecture.md#Frontend-Architecture]

#### Mutation hook useDeleteBook

```typescript
// Dans src/features/books/useBooks.ts
export function useDeleteBook() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('livres')
        .delete()
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['livres'] })
    },
  })
}
```

#### Composant DeleteBookDialog

```typescript
// src/features/books/DeleteBookDialog.tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface DeleteBookDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bookTitle: string
  onConfirm: () => void
  isLoading?: boolean
}

export function DeleteBookDialog({
  open,
  onOpenChange,
  bookTitle,
  onConfirm,
  isLoading,
}: DeleteBookDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer ce livre ?</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir supprimer "{bookTitle}" ?
            Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? 'Suppression...' : 'Supprimer'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

#### Bouton Supprimer dans BookForm

```typescript
// Dans BookForm.tsx, en mode edit
{mode === 'edit' && (
  <Button
    type="button"
    variant="destructive"
    onClick={onDelete}
    disabled={isLoading}
  >
    Supprimer
  </Button>
)}
```

### UX Design Notes

**Source:** [docs/ux-design-specification.md#Feedback-Patterns]

#### Style du bouton destructive
- Couleur : rouge-orange (`--destructive`)
- Texte : blanc
- Hover : légèrement plus foncé

#### Message de confirmation
- Explicite et en français
- Inclure le titre du livre pour éviter les erreurs
- Mentionner que l'action est irréversible

### Composants Shadcn/ui requis

```bash
npx shadcn@latest add alert-dialog
```

### Project Structure Notes

Fichiers à créer/modifier :
```
src/
├── features/
│   └── books/
│       ├── DeleteBookDialog.tsx # NOUVEAU
│       ├── BookForm.tsx         # MODIFIER (bouton supprimer)
│       ├── EditBookDialog.tsx   # MODIFIER (intégration delete)
│       └── useBooks.ts          # MODIFIER (useDeleteBook)
```

### References

- [Source: docs/architecture.md#Frontend-Architecture]
- [Source: docs/ux-design-specification.md#Button-Hierarchy]
- [Source: docs/epics.md#Story-2.4]

---

## Dev Agent Record

### Agent Model Used
- Story creation: Claude Opus 4.5 (SM Agent - Bob)
- Implementation: Claude Opus 4.5 (Dev Agent - Amelia)

### Implementation Plan
1. Created useDeleteBook mutation hook with cache invalidation
2. Created DeleteBookDialog with AlertDialog from Shadcn/ui
3. Added Supprimer button (destructive) to BookForm in edit mode
4. Integrated delete flow in EditBookDialog
5. Added toast notification for success/error feedback

### Completion Notes
- All 5 tasks implemented and validated
- Build passes (TypeScript strict mode)
- AlertDialog installed via shadcn CLI
- Bouton Supprimer positionné à gauche (séparé des boutons Annuler/Enregistrer)
- Confirmation dialog shows book title for clarity

### File List
**Created:**
- `src/features/books/DeleteBookDialog.tsx`
- `src/components/ui/alert-dialog.tsx` (via shadcn)

**Modified:**
- `src/features/books/useBooks.ts` (added useDeleteBook hook)
- `src/features/books/BookForm.tsx` (added onDelete prop and Supprimer button)
- `src/features/books/EditBookDialog.tsx` (integrated delete flow)

---

## Definition of Done

- [x] Bouton "Supprimer" visible en mode édition
- [x] AlertDialog de confirmation affiché
- [x] Message explicite avec titre du livre
- [x] Suppression dans Supabase fonctionnelle
- [x] Invalidation du cache après suppression
- [x] Toast "Livre supprimé" affiché
- [x] Fermeture des dialogs après suppression
- [x] Annulation fonctionne correctement
- [x] Code commité

---

## Senior Developer Review (AI)

### Review Date: 2025-12-29
### Reviewer: Dev Agent (Amelia)
### Outcome: ✅ APPROVED (with fixes applied)

### Issues Found: 2

| ID | Severity | Category | Description | Status |
|----|----------|----------|-------------|--------|
| SEC-01 | High | Security | Non-null assertion on user in useAddBook | ✅ Fixed |
| A11Y-01 | Medium | Accessibility | Celebration emoji not accessible | ✅ Fixed |

### Fixes Applied:
1. Added user validation before insert in useAddBook
2. Added `role="img" aria-hidden="true"` to celebration emoji

### Build Status: ✅ Passing

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2025-12-29 | Code review completed - 2 issues fixed | Dev Agent (Amelia) |
| 2025-12-29 | Story implementation complete - all ACs satisfied | Dev Agent (Amelia) |

---

*Story générée le 2025-12-18 via le workflow BMAD Create Story*
