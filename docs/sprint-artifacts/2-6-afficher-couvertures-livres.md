# Story 2.6: Afficher les Couvertures de Livres

## Story

**As a** utilisateur connecté,
**I want** voir la couverture de mes livres sur chaque carte,
**So that** je puisse reconnaître mes livres visuellement et rendre ma collection plus attrayante.

## Status

**Status:** done
**Epic:** Epic 2 - Gestion de la Collection de Livres
**Created:** 2025-12-29
**Completed:** 2025-12-29

## Acceptance Criteria

- [x] **AC1:** Given je consulte ma liste de livres, When un livre a une couverture disponible sur Open Library, Then la couverture s'affiche sur la BookCard (taille M) And l'image est chargée depuis l'URL externe Open Library

- [x] **AC2:** Given un livre est ajouté ou modifié, When le formulaire est soumis, Then une recherche automatique de couverture est effectuée via Open Library API And l'URL de couverture est stockée dans le champ `cover_url` de la table `livres`

- [x] **AC3:** Given aucune couverture n'est trouvée sur Open Library, When la carte du livre s'affiche, Then un placeholder stylisé s'affiche avec les initiales du titre And le placeholder suit le style néo-brutaliste (couleur basée sur le statut)

- [x] **AC4:** Given la couverture est en cours de chargement, When la carte s'affiche, Then un Skeleton de la taille de l'image s'affiche

- [x] **AC5:** Given une erreur réseau survient lors du chargement de l'image, When l'image échoue à charger, Then le placeholder s'affiche à la place (fallback gracieux)

## Technical Notes

- API Open Library : `https://openlibrary.org/search.json?title={titre}&author={auteur}&limit=1`
- URL couverture : `https://covers.openlibrary.org/b/olid/{OLID}-M.jpg`
- Migration DB : Colonne `cover_url` (text, nullable) ajoutée à la table `livres`
- Images utilisent `loading="lazy"` pour optimiser le chargement

## Tasks/Subtasks

- [x] Créer le service `lib/openLibrary.ts` pour l'API Open Library
- [x] Créer le composant `BookCoverPlaceholder.tsx` avec initiales et couleurs statut
- [x] Créer le composant `BookCover.tsx` avec gestion loading/error
- [x] Modifier `BookCard.tsx` pour afficher la couverture
- [x] Modifier `useBooks.ts` pour fetcher la couverture à l'ajout/modification
- [x] Modifier `EditBookDialog.tsx` pour passer originalBook
- [x] Mettre à jour `BookCardSkeleton.tsx` avec le layout couverture
- [x] Ajouter `cover_url` aux types TypeScript
- [x] Appliquer la migration DB (colonne cover_url)
- [x] Mettre à jour la documentation (PRD, Architecture, Epics, CLAUDE.md)

## Dev Agent Record

### Implementation Notes

**Design Decision:** Au lieu de créer un hook `useBookCover` séparé avec TanStack Query (comme prévu initialement), la logique de récupération des couvertures a été intégrée directement dans les mutations `useAddBook` et `useUpdateBook`. Cette approche est plus efficace car :
1. La couverture est récupérée UNE SEULE fois (à la création/modification)
2. L'URL est stockée en base de données
3. Pas de requêtes répétées à chaque rendu
4. Meilleure performance et moins de complexité

### File List

| File | Action | Description |
|------|--------|-------------|
| `src/lib/openLibrary.ts` | Created | Service API Open Library |
| `src/components/BookCover.tsx` | Created | Composant affichage couverture |
| `src/components/BookCoverPlaceholder.tsx` | Created | Placeholder avec initiales |
| `src/components/BookCard.tsx` | Modified | Intégration couverture |
| `src/components/BookCardSkeleton.tsx` | Modified | Layout avec couverture |
| `src/features/books/useBooks.ts` | Modified | Fetch couverture dans mutations |
| `src/features/books/EditBookDialog.tsx` | Modified | Pass originalBook pour update |
| `src/types/database.ts` | Modified | Ajout cover_url type |
| `docs/prd/4-hors-scope.md` | Modified | Mise à jour scope |
| `docs/architecture.md` | Modified | Ajout Open Library integration |
| `docs/epics.md` | Modified | Ajout Story 2.6 |
| `CLAUDE.md` | Modified | Mise à jour documentation |
| `docs/sprint-artifacts/sprint-status.yaml` | Modified | Ajout story 2-6 |

### Change Log

| Date | Change | Reason |
|------|--------|--------|
| 2025-12-29 | Story created and implemented | Feature request from user |
| 2025-12-29 | Code review fixes applied | Accessibility and code quality |

## Definition of Done

- [x] Code implémenté et fonctionnel
- [x] Acceptance Criteria validés
- [x] Tests manuels effectués (ajout livre, modification, fallback)
- [x] Commit créé et pushé
- [x] Documentation mise à jour
- [x] Code review effectuée
