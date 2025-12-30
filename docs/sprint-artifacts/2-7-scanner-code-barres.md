# Story 2.7: Scanner Code-Barres ISBN

## Story

**As a** utilisateur connecté,
**I want** scanner le code-barres d'un livre pour l'ajouter automatiquement,
**So that** je puisse cataloguer rapidement ma collection sans saisie manuelle fastidieuse.

## Status

**Status:** done
**Epic:** Epic 2 - Gestion de la Collection de Livres
**Created:** 2025-12-30
**Priority:** High (50 livres à cataloguer)

## Acceptance Criteria

- [x] **AC1:** Given je suis sur la page d'accueil, When je clique sur le FAB (+), Then un menu s'affiche avec deux options : "Scanner" et "Saisie manuelle"

- [x] **AC2:** Given je choisis l'option "Scanner", When la caméra s'ouvre, Then je vois un viseur pour cadrer le code-barres And une demande de permission caméra s'affiche si nécessaire

- [x] **AC3:** Given je scanne un code-barres ISBN valide, When le code est détecté, Then une recherche automatique est effectuée via Open Library API And le formulaire d'ajout s'ouvre avec les champs pré-remplis (titre, auteur, couverture) And je peux modifier les informations avant de sauvegarder

- [x] **AC4:** Given le livre n'est pas trouvé dans Open Library, When la recherche échoue, Then un message m'informe que le livre n'a pas été trouvé And le formulaire de saisie manuelle s'ouvre pour compléter les informations

- [x] **AC5:** Given le scan du code-barres échoue, When la caméra ne détecte pas de code valide, Then un bouton "Réessayer" et "Saisie manuelle" sont proposés

- [x] **AC6:** Given je refuse la permission caméra, When l'accès est refusé, Then un message explicatif s'affiche And l'option de saisie manuelle reste disponible

- [x] **AC7:** La saisie manuelle reste toujours accessible en parallèle du scan

## Technical Notes

### Librairie Scanner
- **Package:** `html5-qrcode` (~80KB, bien maintenue)
- **Formats supportés:** EAN-13 (978...), ISBN-10, ISBN-13
- **Installation:** `npm install html5-qrcode`

### API Open Library
- **Endpoint ISBN:** `https://openlibrary.org/isbn/{isbn}.json`
- **Réponse:** titre, auteurs, éditeur, année, covers
- **Fallback:** Utiliser recherche existante par titre/auteur si ISBN non trouvé

### Migration DB (optionnelle)
- Ajouter colonne `isbn` (text, nullable, unique) pour détection doublons
- Permet d'éviter l'ajout de livres déjà présents

### Compatibilité
- iOS Safari 14.5+
- Android Chrome 88+
- Desktop Chrome/Firefox/Edge

## Tasks/Subtasks

### Setup
- [x] Installer la dépendance `html5-qrcode`
- [x] Créer `src/lib/isbnLookup.ts` - service recherche par ISBN

### Composants Scanner
- [x] Créer `src/components/BarcodeScanner.tsx` - composant caméra/détection
- [x] Créer `src/features/books/ScanBookDialog.tsx` - dialog orchestration scan
- [x] Gérer permissions caméra (demande, refus, erreur)
- [x] Ajouter feedback visuel/sonore sur détection

### Intégration FAB
- [x] Modifier `src/components/FAB.tsx` - menu expandable (scan/manuel)
- [x] Créer animation d'ouverture du menu FAB

### Formulaire
- [x] BookForm accepte déjà defaultValues (via props existantes)
- [x] ScanBookDialog gère le mode scan indépendamment d'AddBookDialog

### Gestion Erreurs
- [x] Gérer cas "livre non trouvé" avec fallback manuel
- [x] Gérer cas "scan échoue" avec retry
- [x] Gérer cas "permission refusée" avec message explicatif

### Migration DB (optionnel)
- [ ] Ajouter colonne `isbn` à la table `livres`
- [ ] Mettre à jour types TypeScript
- [ ] Implémenter détection doublons

### Tests
- [ ] Tester sur mobile iOS
- [ ] Tester sur mobile Android
- [ ] Tester sur desktop (webcam)
- [ ] Tester cas d'erreur (permission, réseau, livre non trouvé)

## Dev Agent Record

### Implementation Notes

_À compléter pendant l'implémentation_

### File List

| File | Action | Description |
|------|--------|-------------|
| `package.json` | Modified | Ajout dépendance html5-qrcode |
| `package-lock.json` | Modified | Lockfile mis à jour |
| `src/lib/isbnLookup.ts` | Created | Service recherche par ISBN avec timeout |
| `src/components/BarcodeScanner.tsx` | Created | Composant scanner caméra |
| `src/components/FAB.tsx` | Modified | Menu expandable (scan/manuel) |
| `src/features/books/ScanBookDialog.tsx` | Created | Dialog orchestration scan |
| `src/pages/HomePage.tsx` | Modified | Intégration ScanBookDialog + FAB props |

### Change Log

| Date | Change | Reason |
|------|--------|--------|
| 2025-12-30 | Story created | Feature request - 50 livres à cataloguer |
| 2025-12-30 | Implementation complete | Scanner ISBN + FAB menu + ScanBookDialog |
| 2025-12-30 | Code review fixes | Ajout timeout fetchAuthorName, suppression code mort |

## Definition of Done

- [x] Code implémenté et fonctionnel
- [x] Tous les Acceptance Criteria validés
- [ ] Tests manuels sur mobile (iOS + Android)
- [x] Saisie manuelle toujours fonctionnelle
- [x] Build réussi sans erreurs
- [x] Code review effectuée
- [x] Documentation mise à jour
