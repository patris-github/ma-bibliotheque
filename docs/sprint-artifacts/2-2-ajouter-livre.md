# Story 2.2: Ajouter un Livre

**Status:** Done

---

## Story

**As a** utilisateur connecté,
**I want** ajouter un livre avec son titre, auteur et statut,
**So that** je puisse enrichir ma collection.

---

## Acceptance Criteria

### AC1: FAB visible
**Given** je suis sur la page d'accueil
**When** je regarde l'écran
**Then** je vois un bouton FAB (+) en bas à droite
**And** il est positionné au-dessus de la Bottom Navigation

### AC2: Ouverture du formulaire
**Given** je suis sur la page d'accueil
**When** je clique sur le bouton FAB (+)
**Then** un formulaire s'ouvre (Sheet sur mobile, Dialog sur desktop)
**And** le formulaire contient 3 champs : Titre, Auteur, Statut

### AC3: Statut par défaut
**Given** le formulaire d'ajout est ouvert
**When** je regarde le champ Statut
**Then** la valeur par défaut est "À lire"

### AC4: Ajout réussi
**Given** je remplis le formulaire avec des données valides
**When** je soumets (bouton "Ajouter")
**Then** le livre est créé dans Supabase
**And** la liste se met à jour automatiquement (invalidation TanStack Query)
**And** un Toast de succès s'affiche : "Livre ajouté"
**And** le formulaire se ferme

### AC5: Validation des champs requis
**Given** je soumets un formulaire incomplet
**When** la validation échoue
**Then** des messages d'erreur inline s'affichent sous les champs concernés
**And** "Le titre est requis" / "L'auteur est requis"

### AC6: État de chargement
**Given** je soumets le formulaire
**When** la création est en cours
**Then** le bouton affiche un état de chargement
**And** les champs sont désactivés

### AC7: Fermeture sans sauvegarde
**Given** le formulaire est ouvert
**When** je clique en dehors ou sur le bouton fermer
**Then** le formulaire se ferme sans créer de livre
**And** les données saisies sont perdues

---

## Tasks / Subtasks

- [x] **Task 1: Création du composant FAB** (AC: 1)
  - [x] Créer `src/components/FAB.tsx`
  - [x] Position fixed, bottom-right
  - [x] Taille 56px, couleur primary
  - [x] Icône + (Plus)
  - [x] Ombre dure néo-brutaliste
  - [x] Z-index au-dessus de tout

- [x] **Task 2: Création du schéma Zod** (AC: 5)
  - [x] Créer `src/features/books/bookSchema.ts`
  - [x] Valider titre (requis), auteur (requis), statut (enum)
  - [x] Messages en français

- [x] **Task 3: Création du composant BookForm** (AC: 2, 3, 5, 6, 7)
  - [x] Créer `src/features/books/BookForm.tsx`
  - [x] Intégrer React Hook Form + Zod
  - [x] Champ Input pour Titre
  - [x] Champ Input pour Auteur
  - [x] Champ Select pour Statut (avec options en français)
  - [x] Statut par défaut : "a_lire"
  - [x] Bouton "Ajouter" avec état de chargement

- [x] **Task 4: Création du mutation hook** (AC: 4)
  - [x] Ajouter `useAddBook` dans `src/features/books/useBooks.ts`
  - [x] Utiliser `useMutation` de TanStack Query
  - [x] Invalider `['livres']` après succès
  - [x] Insérer avec `user_id` de l'utilisateur courant

- [x] **Task 5: Création du Dialog/Sheet** (AC: 2, 7)
  - [x] Créer `src/features/books/AddBookDialog.tsx`
  - [x] Utiliser Sheet sur mobile (< 768px)
  - [x] Utiliser Dialog sur desktop (≥ 768px)
  - [x] Gérer l'état ouvert/fermé

- [x] **Task 6: Toast de succès** (AC: 4)
  - [x] Afficher toast "Livre ajouté" après création
  - [x] Utiliser Sonner

- [x] **Task 7: Intégration dans HomePage** (AC: 1, 2)
  - [x] Ajouter FAB dans HomePage
  - [x] Connecter FAB à l'ouverture du Dialog/Sheet
  - [x] Gérer l'état du modal

---

## Dev Notes

### Architecture Patterns & Constraints

**Source:** [docs/architecture.md#Frontend-Architecture]

#### Schéma de validation Zod

```typescript
// src/features/books/bookSchema.ts
import { z } from 'zod'

export const bookSchema = z.object({
  titre: z.string().min(1, 'Le titre est requis'),
  auteur: z.string().min(1, "L'auteur est requis"),
  statut: z.enum(['a_lire', 'en_cours', 'lu']),
})

export type BookFormData = z.infer<typeof bookSchema>
```

#### Mutation hook useAddBook

```typescript
// Dans src/features/books/useBooks.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/features/auth/AuthContext'

export function useAddBook() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: async (data: BookFormData) => {
      const { data: book, error } = await supabase
        .from('livres')
        .insert({
          ...data,
          user_id: user!.id,
        })
        .select()
        .single()

      if (error) throw error
      return book
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['livres'] })
    },
  })
}
```

#### Composant FAB

```typescript
// src/components/FAB.tsx
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface FABProps {
  onClick: () => void
}

export function FAB({ onClick }: FABProps) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-brutal hover:shadow-brutal-hover z-50"
    >
      <Plus className="h-6 w-6" />
      <span className="sr-only">Ajouter un livre</span>
    </Button>
  )
}
```

#### Select pour le statut

```typescript
<Select
  value={field.value}
  onValueChange={field.onChange}
>
  <SelectTrigger>
    <SelectValue placeholder="Statut de lecture" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="a_lire">À lire</SelectItem>
    <SelectItem value="en_cours">En cours</SelectItem>
    <SelectItem value="lu">Lu</SelectItem>
  </SelectContent>
</Select>
```

### UX Design Notes

**Source:** [docs/ux-design-specification.md#Component-Strategy]

#### FAB (Floating Action Button)
- Position : fixed, bottom-right
- Taille : 56px (h-14 w-14)
- Couleur : primary (rose)
- Ombre dure au repos et au hover
- Positionné AU-DESSUS de la bottom navigation (bottom: 80px environ)

#### Formulaire
- 3 champs uniquement : Titre, Auteur, Statut
- Statut par défaut : "À lire"
- Validation temps réel
- Messages en français

#### Modal responsive
- Mobile (< 768px) : Sheet (slide from bottom)
- Desktop (≥ 768px) : Dialog (centered modal)

### Composants Shadcn/ui requis

```bash
npx shadcn@latest add sheet
npx shadcn@latest add dialog
npx shadcn@latest add select
```

### Project Structure Notes

Fichiers à créer :
```
src/
├── components/
│   └── FAB.tsx                  # NOUVEAU
│
├── features/
│   └── books/
│       ├── bookSchema.ts        # NOUVEAU
│       ├── BookForm.tsx         # NOUVEAU
│       ├── AddBookDialog.tsx    # NOUVEAU
│       └── useBooks.ts          # MODIFIER (ajouter useAddBook)
```

### References

- [Source: docs/architecture.md#Frontend-Architecture]
- [Source: docs/ux-design-specification.md#Flow-2-Ajouter-un-Livre]
- [Source: docs/epics.md#Story-2.2]

---

## Dev Agent Record

### Agent Model Used
- Story Creation: Claude Opus 4.5 (SM Agent - Bob)
- Implementation: Claude Opus 4.5 (DEV Agent - Amelia)

### Implementation Notes
- FAB avec style néo-brutaliste, position fixed bottom-right
- BookForm avec React Hook Form + Zod validation
- AddBookDialog responsive: Sheet sur mobile, Dialog sur desktop
- useAddBook mutation avec invalidation du cache
- Toast Sonner pour feedback utilisateur
- Build réussi sans erreurs TypeScript

### File List
**Created:**
- `src/components/FAB.tsx`
- `src/features/books/bookSchema.ts`
- `src/features/books/BookForm.tsx`
- `src/features/books/AddBookDialog.tsx`
- `src/components/ui/sheet.tsx` (shadcn)
- `src/components/ui/dialog.tsx` (shadcn)
- `src/components/ui/select.tsx` (shadcn)

**Modified:**
- `src/features/books/useBooks.ts` (ajout useAddBook)
- `src/pages/HomePage.tsx` (intégration FAB + Dialog)

---

## Definition of Done

- [x] FAB visible et positionné correctement
- [x] Formulaire s'ouvre au clic sur FAB
- [x] 3 champs : Titre, Auteur, Statut
- [x] Statut par défaut "À lire"
- [x] Validation avec messages français
- [x] Création dans Supabase avec user_id
- [x] Invalidation du cache après ajout
- [x] Toast de succès
- [x] Fermeture du formulaire après ajout
- [ ] Code commité

---

## Senior Developer Review (AI)

### Review Date: 2025-12-29
### Reviewer: Dev Agent (Amelia)
### Outcome: ✅ APPROVED (with fixes applied)

### Issues Found: 1

| ID | Severity | Category | Description | Status |
|----|----------|----------|-------------|--------|
| SEC-01 | High | Security | Non-null assertion on user in useAddBook | ✅ Fixed |

### Fixes Applied:
1. Added user validation with proper error message before insert

### Build Status: ✅ Passing

---

## Change Log

| Date | Description |
|------|-------------|
| 2025-12-29 | Code review completed - 1 issue fixed |
| 2025-12-18 | Story implémentée - FAB, formulaire, dialog responsive, mutation |

---

*Story générée le 2025-12-18 via le workflow BMAD Create Story*
