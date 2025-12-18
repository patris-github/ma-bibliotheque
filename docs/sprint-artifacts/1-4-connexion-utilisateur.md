# Story 1.4: Connexion Utilisateur

**Status:** ready-for-dev

---

## Story

**As a** utilisateur existant,
**I want** me connecter avec mon email et mot de passe,
**So that** je puisse accéder à mes livres.

---

## Acceptance Criteria

### AC1: Affichage de la page de connexion
**Given** je ne suis pas authentifié
**When** j'accède à `/login`
**Then** je vois un formulaire avec les champs Email et Mot de passe
**And** un bouton "Se connecter" est visible
**And** un lien "Pas encore de compte ? S'inscrire" est affiché

### AC2: Connexion réussie
**Given** je suis sur la page de connexion
**When** je saisis des identifiants valides
**And** je clique sur "Se connecter"
**Then** je suis authentifié
**And** je suis redirigé vers la page d'accueil (`/`)

### AC3: Identifiants incorrects
**Given** je suis sur la page de connexion
**When** je saisis un email ou mot de passe incorrect
**And** je soumets le formulaire
**Then** un message d'erreur Toast s'affiche : "Email ou mot de passe incorrect"
**And** le formulaire reste affiché avec l'email saisi (mot de passe effacé)

### AC4: Validation email invalide
**Given** je suis sur la page de connexion
**When** je saisis un email au format invalide
**And** je quitte le champ (blur) ou je soumets
**Then** un message d'erreur inline s'affiche : "Adresse email invalide"

### AC5: Champs requis
**Given** je suis sur la page de connexion
**When** je soumets le formulaire avec un champ vide
**Then** un message d'erreur inline s'affiche sous le champ vide : "Ce champ est requis"

### AC6: État de chargement
**Given** je soumets le formulaire de connexion
**When** la requête est en cours
**Then** le bouton affiche un état de chargement (spinner + désactivé)
**And** les champs du formulaire sont désactivés

### AC7: Lien vers inscription
**Given** je suis sur la page de connexion
**When** je clique sur "Pas encore de compte ? S'inscrire"
**Then** je suis redirigé vers la page d'inscription (`/register`)

---

## Tasks / Subtasks

- [ ] **Task 1: Création de la page LoginPage** (AC: 1, 7)
  - [ ] Créer `src/pages/LoginPage.tsx`
  - [ ] Implémenter le layout avec le formulaire centré
  - [ ] Ajouter le titre "Se connecter"
  - [ ] Ajouter le lien vers la page d'inscription

- [ ] **Task 2: Création du schéma Zod** (AC: 4, 5)
  - [ ] Créer `src/features/auth/loginSchema.ts` (ou réutiliser authSchema partagé)
  - [ ] Définir le schéma avec validations
  - [ ] Messages d'erreur en français

- [ ] **Task 3: Création du composant LoginForm** (AC: 1, 2, 3, 4, 5, 6)
  - [ ] Créer `src/features/auth/LoginForm.tsx`
  - [ ] Intégrer React Hook Form avec le resolver Zod
  - [ ] Implémenter les champs Input de Shadcn/ui
  - [ ] Afficher les erreurs inline sous chaque champ
  - [ ] Gérer l'état de chargement du bouton

- [ ] **Task 4: Intégration Supabase Auth** (AC: 2, 3)
  - [ ] Ajouter la fonction `signIn` dans `src/features/auth/useAuth.ts`
  - [ ] Gérer la connexion avec `supabase.auth.signInWithPassword()`
  - [ ] Gérer les erreurs Supabase (identifiants incorrects)

- [ ] **Task 5: Redirection post-connexion** (AC: 2)
  - [ ] Implémenter la redirection vers `/` après connexion réussie
  - [ ] Utiliser `useNavigate` de React Router

- [ ] **Task 6: Toast notifications** (AC: 3)
  - [ ] Afficher toast d'erreur pour identifiants incorrects
  - [ ] Message en français : "Email ou mot de passe incorrect"

- [ ] **Task 7: Configuration des routes** (AC: 1, 7)
  - [ ] Ajouter la route `/login` dans `App.tsx`
  - [ ] Vérifier le lien vers `/register`

- [ ] **Task 8: Styling et UX** (AC: 1)
  - [ ] Appliquer le style néo-brutaliste
  - [ ] Layout responsive mobile-first
  - [ ] Touch targets 44px minimum

---

## Dev Notes

### Architecture Patterns & Constraints

**Source:** [docs/architecture.md#Frontend-Architecture]

#### Schéma de validation Zod (loginSchema.ts)

```typescript
import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Ce champ est requis')
    .email('Adresse email invalide'),
  password: z
    .string()
    .min(1, 'Ce champ est requis'),
})

export type LoginFormData = z.infer<typeof loginSchema>
```

#### Fonction signIn avec Supabase

```typescript
const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error('Email ou mot de passe incorrect')
  }

  return data
}
```

### Project Structure Notes

Fichiers à créer :
```
src/
├── features/
│   └── auth/
│       ├── LoginForm.tsx        # NOUVEAU
│       └── loginSchema.ts       # NOUVEAU
│
└── pages/
    └── LoginPage.tsx            # NOUVEAU
```

### Error Handling

| Type d'erreur | Affichage | Message |
|---------------|-----------|---------|
| Validation | Inline | "Ce champ est requis" / "Adresse email invalide" |
| Auth failed | Toast | "Email ou mot de passe incorrect" |

### Dependencies from Previous Stories

- Story 1.2 : Client Supabase (`lib/supabase.ts`)
- Story 1.3 : Pattern de formulaire similaire, `useAuth.ts` peut être réutilisé

### References

- [Source: docs/architecture.md#Frontend-Architecture]
- [Source: docs/ux-design-specification.md#Form-Patterns]
- [Source: docs/epics.md#Story-1.4]

---

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (SM Agent - Bob)

### File List
_Expected files:_
- `src/pages/LoginPage.tsx`
- `src/features/auth/LoginForm.tsx`
- `src/features/auth/loginSchema.ts`
- Mise à jour `src/features/auth/useAuth.ts`
- Mise à jour `src/App.tsx`

---

## Definition of Done

- [ ] Page `/login` accessible et fonctionnelle
- [ ] Formulaire avec validation Zod
- [ ] Messages d'erreur en français
- [ ] Toast pour erreur d'authentification
- [ ] Redirection vers `/` après connexion
- [ ] Lien vers `/register` fonctionnel
- [ ] Style néo-brutaliste appliqué
- [ ] Code commité

---

*Story générée le 2025-12-18 via le workflow BMAD Create Story*
