# Story 2.4: Supprimer un Livre

**Status:** ready-for-dev

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

- [ ] **Task 1: Création du mutation hook useDeleteBook** (AC: 3)
  - [ ] Ajouter `useDeleteBook` dans `src/features/books/useBooks.ts`
  - [ ] Utiliser `useMutation` avec `supabase.delete()`
  - [ ] Invalider `['livres']` après succès

- [ ] **Task 2: Création du composant DeleteBookDialog** (AC: 2, 4, 5)
  - [ ] Créer `src/features/books/DeleteBookDialog.tsx`
  - [ ] Utiliser AlertDialog de Shadcn/ui
  - [ ] Afficher le message de confirmation avec le titre du livre
  - [ ] Boutons "Annuler" et "Supprimer"
  - [ ] Style destructive pour le bouton Supprimer

- [ ] **Task 3: Ajout du bouton Supprimer dans BookForm** (AC: 1)
  - [ ] Ajouter bouton "Supprimer" dans BookForm (mode edit uniquement)
  - [ ] Style `variant="destructive"`
  - [ ] Déclencher l'ouverture du DeleteBookDialog

- [ ] **Task 4: Intégration dans EditBookDialog** (AC: 1, 3, 4)
  - [ ] Gérer l'état du DeleteBookDialog
  - [ ] Fermer EditBookDialog après suppression réussie
  - [ ] Callback onDelete pour fermer les deux dialogs

- [ ] **Task 5: Toast de confirmation** (AC: 3)
  - [ ] Afficher "Livre supprimé" après delete réussi

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
Claude Opus 4.5 (SM Agent - Bob)

### File List
_Expected files:_
- `src/features/books/DeleteBookDialog.tsx`
- Mise à jour `src/features/books/BookForm.tsx`
- Mise à jour `src/features/books/EditBookDialog.tsx`
- Mise à jour `src/features/books/useBooks.ts`

---

## Definition of Done

- [ ] Bouton "Supprimer" visible en mode édition
- [ ] AlertDialog de confirmation affiché
- [ ] Message explicite avec titre du livre
- [ ] Suppression dans Supabase fonctionnelle
- [ ] Invalidation du cache après suppression
- [ ] Toast "Livre supprimé" affiché
- [ ] Fermeture des dialogs après suppression
- [ ] Annulation fonctionne correctement
- [ ] Code commité

---

*Story générée le 2025-12-18 via le workflow BMAD Create Story*
