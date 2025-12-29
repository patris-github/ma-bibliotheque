# Story 1.4: Connexion Utilisateur

**Status:** Done

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

- [x] **Task 1: Création de la page LoginPage** (AC: 1, 7)
  - [x] Créer `src/pages/LoginPage.tsx`
  - [x] Implémenter le layout avec le formulaire centré
  - [x] Ajouter le titre "Se connecter"
  - [x] Ajouter le lien vers la page d'inscription

- [x] **Task 2: Création du schéma Zod** (AC: 4, 5)
  - [x] Créer `src/features/auth/loginSchema.ts` (ou réutiliser authSchema partagé)
  - [x] Définir le schéma avec validations
  - [x] Messages d'erreur en français

- [x] **Task 3: Création du composant LoginForm** (AC: 1, 2, 3, 4, 5, 6)
  - [x] Créer `src/features/auth/LoginForm.tsx`
  - [x] Intégrer React Hook Form avec le resolver Zod
  - [x] Implémenter les champs Input de Shadcn/ui
  - [x] Afficher les erreurs inline sous chaque champ
  - [x] Gérer l'état de chargement du bouton

- [x] **Task 4: Intégration Supabase Auth** (AC: 2, 3)
  - [x] Ajouter la fonction `signIn` dans `src/features/auth/useAuth.ts`
  - [x] Gérer la connexion avec `supabase.auth.signInWithPassword()`
  - [x] Gérer les erreurs Supabase (identifiants incorrects)

- [x] **Task 5: Redirection post-connexion** (AC: 2)
  - [x] Implémenter la redirection vers `/` après connexion réussie
  - [x] Utiliser `useNavigate` de React Router

- [x] **Task 6: Toast notifications** (AC: 3)
  - [x] Afficher toast d'erreur pour identifiants incorrects
  - [x] Message en français : "Email ou mot de passe incorrect"

- [x] **Task 7: Configuration des routes** (AC: 1, 7)
  - [x] Ajouter la route `/login` dans `App.tsx`
  - [x] Vérifier le lien vers `/register`

- [x] **Task 8: Styling et UX** (AC: 1)
  - [x] Appliquer le style néo-brutaliste
  - [x] Layout responsive mobile-first
  - [x] Touch targets 44px minimum

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
- SM Agent: Claude Opus 4.5 (Bob) - Story creation
- Dev Agent: Claude Opus 4.5 (Amelia) - Implementation

### Debug Log References
- Build: `npm run build` - SUCCESS
- Lint: `npm run lint` - SUCCESS (1 warning Shadcn - expected)

### Completion Notes
1. **LoginPage:** Created with centered layout, neo-brutalist card styling
2. **LoginSchema:** Zod validation with French error messages (email + password required)
3. **LoginForm:** React Hook Form with inline errors, loading state, password clear on error
4. **Auth:** Reused signIn function from useAuth.ts (created in Story 1.3)

### File List
**New Files:**
- `src/pages/LoginPage.tsx` - Login page component
- `src/features/auth/LoginForm.tsx` - Login form with validation
- `src/features/auth/loginSchema.ts` - Zod validation schema

**Modified Files:**
- `src/App.tsx` - Updated to use real LoginPage component

### Change Log
- 2025-12-18: Story 1.4 implemented - User login with form validation and Supabase Auth

---

## Definition of Done

- [x] Page `/login` accessible et fonctionnelle
- [x] Formulaire avec validation Zod
- [x] Messages d'erreur en français
- [x] Toast pour erreur d'authentification
- [x] Redirection vers `/` après connexion
- [x] Lien vers `/register` fonctionnel
- [x] Style néo-brutaliste appliqué
- [x] Code commité (a791654)

---

*Story générée le 2025-12-18 via le workflow BMAD Create Story*
