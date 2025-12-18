# Story 1.3: Inscription Utilisateur

**Status:** ready-for-dev

---

## Story

**As a** nouvel utilisateur,
**I want** créer un compte avec mon email et un mot de passe,
**So that** je puisse accéder à ma bibliothèque personnelle.

---

## Acceptance Criteria

### AC1: Affichage de la page d'inscription
**Given** je ne suis pas authentifié
**When** j'accède à `/register`
**Then** je vois un formulaire avec les champs Email et Mot de passe
**And** un bouton "Créer mon compte" est visible
**And** un lien "Déjà un compte ? Se connecter" est affiché

### AC2: Inscription réussie
**Given** je suis sur la page d'inscription
**When** je remplis le formulaire avec un email valide et un mot de passe valide
**And** je clique sur "Créer mon compte"
**Then** mon compte est créé dans Supabase Auth
**And** je suis automatiquement connecté
**And** je suis redirigé vers la page d'accueil (`/`)

### AC3: Email déjà utilisé
**Given** je suis sur la page d'inscription
**When** je soumets un email déjà enregistré
**Then** un message d'erreur Toast s'affiche : "Cette adresse email est déjà utilisée"
**And** le formulaire reste affiché avec les données saisies

### AC4: Validation email invalide
**Given** je suis sur la page d'inscription
**When** je saisis un email au format invalide
**And** je quitte le champ (blur) ou je soumets
**Then** un message d'erreur inline s'affiche sous le champ : "Adresse email invalide"

### AC5: Validation mot de passe trop court
**Given** je suis sur la page d'inscription
**When** je saisis un mot de passe de moins de 6 caractères
**And** je quitte le champ (blur) ou je soumets
**Then** un message d'erreur inline s'affiche : "Le mot de passe doit contenir au moins 6 caractères"

### AC6: Champs requis
**Given** je suis sur la page d'inscription
**When** je soumets le formulaire avec un champ vide
**Then** un message d'erreur inline s'affiche sous le champ vide : "Ce champ est requis"

### AC7: État de chargement
**Given** je soumets le formulaire d'inscription
**When** la requête est en cours
**Then** le bouton affiche un état de chargement (spinner + désactivé)
**And** les champs du formulaire sont désactivés

### AC8: Lien vers connexion
**Given** je suis sur la page d'inscription
**When** je clique sur "Déjà un compte ? Se connecter"
**Then** je suis redirigé vers la page de connexion (`/login`)

---

## Tasks / Subtasks

- [ ] **Task 1: Création de la page RegisterPage** (AC: 1, 8)
  - [ ] Créer `src/pages/RegisterPage.tsx`
  - [ ] Implémenter le layout de base avec le formulaire centré
  - [ ] Ajouter le titre "Créer un compte"
  - [ ] Ajouter le lien vers la page de connexion

- [ ] **Task 2: Création du schéma Zod** (AC: 4, 5, 6)
  - [ ] Créer `src/features/auth/registerSchema.ts`
  - [ ] Définir le schéma avec validations email et mot de passe
  - [ ] Messages d'erreur en français

- [ ] **Task 3: Création du composant RegisterForm** (AC: 1, 2, 3, 4, 5, 6, 7)
  - [ ] Créer `src/features/auth/RegisterForm.tsx`
  - [ ] Intégrer React Hook Form avec le resolver Zod
  - [ ] Implémenter les champs Input de Shadcn/ui
  - [ ] Afficher les erreurs inline sous chaque champ
  - [ ] Gérer l'état de chargement du bouton

- [ ] **Task 4: Intégration Supabase Auth** (AC: 2, 3)
  - [ ] Créer la fonction `signUp` dans `src/features/auth/useAuth.ts`
  - [ ] Gérer la création de compte avec `supabase.auth.signUp()`
  - [ ] Gérer la session automatique après inscription
  - [ ] Gérer les erreurs Supabase (email déjà utilisé, etc.)

- [ ] **Task 5: Redirection post-inscription** (AC: 2)
  - [ ] Implémenter la redirection vers `/` après inscription réussie
  - [ ] Utiliser `useNavigate` de React Router

- [ ] **Task 6: Toast notifications** (AC: 3)
  - [ ] Intégrer Sonner pour les notifications
  - [ ] Afficher toast d'erreur pour email déjà utilisé
  - [ ] Afficher toast de succès optionnel

- [ ] **Task 7: Configuration des routes** (AC: 1, 8)
  - [ ] Ajouter la route `/register` dans `App.tsx`
  - [ ] Vérifier que la route `/login` existe (ou créer placeholder)

- [ ] **Task 8: Styling et UX** (AC: 1)
  - [ ] Appliquer le style néo-brutaliste (ombres dures)
  - [ ] Utiliser Poppins pour le texte interface
  - [ ] Respecter les touch targets 44px minimum
  - [ ] Layout responsive mobile-first

- [ ] **Task 9: Tests et validation** (AC: tous)
  - [ ] Tester inscription avec email valide
  - [ ] Tester tous les cas d'erreur de validation
  - [ ] Tester email déjà utilisé
  - [ ] Vérifier la redirection
  - [ ] Vérifier le responsive

---

## Dev Notes

### Architecture Patterns & Constraints

**Source:** [docs/architecture.md#Frontend-Architecture]

#### Schéma de validation Zod (registerSchema.ts)

```typescript
import { z } from 'zod'

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'Ce champ est requis')
    .email('Adresse email invalide'),
  password: z
    .string()
    .min(1, 'Ce champ est requis')
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
})

export type RegisterFormData = z.infer<typeof registerSchema>
```

#### Intégration React Hook Form + Zod

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormData } from './registerSchema'

const form = useForm<RegisterFormData>({
  resolver: zodResolver(registerSchema),
  defaultValues: {
    email: '',
    password: '',
  },
})
```

#### Fonction signUp avec Supabase

```typescript
// Dans useAuth.ts ou directement dans le composant
const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    // Gérer les erreurs spécifiques
    if (error.message.includes('already registered')) {
      throw new Error('Cette adresse email est déjà utilisée')
    }
    throw error
  }

  return data
}
```

### Project Structure Notes

**Source:** [docs/architecture.md#Project-Structure]

Fichiers à créer :
```
src/
├── features/
│   └── auth/
│       ├── RegisterForm.tsx     # NOUVEAU
│       └── registerSchema.ts    # NOUVEAU (ou authSchema.ts partagé)
│
├── pages/
│   └── RegisterPage.tsx         # NOUVEAU
│
└── lib/
    └── supabase.ts              # Déjà créé (Story 1.2)
```

### Technical Requirements

**Source:** [docs/architecture.md#Form-Patterns]

#### Pattern de formulaire standard

```typescript
// Structure du composant RegisterForm
export function RegisterForm() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    try {
      await signUp(data.email, data.password)
      navigate('/')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Champs avec erreurs inline */}
    </form>
  )
}
```

#### Affichage des erreurs inline

```tsx
<div>
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    {...form.register('email')}
    disabled={isLoading}
  />
  {form.formState.errors.email && (
    <p className="text-sm text-destructive mt-1">
      {form.formState.errors.email.message}
    </p>
  )}
</div>
```

### UX Design Notes

**Source:** [docs/ux-design-specification.md#Form-Patterns]

#### Règles de formulaire
- Validation temps réel (on blur)
- Messages explicites en **français**
- Focus automatique sur le premier champ en erreur
- Bouton submit désactivé pendant le chargement

#### Style néo-brutaliste
- Inputs avec bordure rose (`border-primary`)
- Ombre dure sur focus (`shadow-brutal`)
- Bouton primary avec ombre dure
- Border radius : 0.4rem

#### Toast notifications
- Position : haut-centre de l'écran
- Erreur API → Toast rouge (persist jusqu'au dismiss)
- Erreur validation → Inline sous le champ (pas de toast)

### Error Handling

**Source:** [docs/architecture.md#Process-Patterns]

| Type d'erreur | Affichage | Composant |
|---------------|-----------|-----------|
| Validation (email invalide) | Inline sous le champ | React Hook Form |
| Validation (champ requis) | Inline sous le champ | React Hook Form |
| API (email déjà utilisé) | Toast notification | Sonner |
| API (erreur réseau) | Toast notification | Sonner |

#### Codes d'erreur Supabase Auth
- `User already registered` → "Cette adresse email est déjà utilisée"
- `Invalid email` → "Adresse email invalide"
- Erreur réseau → "Erreur de connexion. Veuillez réessayer."

### Composants Shadcn/ui requis

**À installer si pas déjà présents :**
```bash
npx shadcn@latest add input
npx shadcn@latest add button
npx shadcn@latest add label
npx shadcn@latest add card
npx shadcn@latest add sonner
```

### Dependencies from Previous Stories

**Story 1.1 :**
- React Hook Form + Zod + @hookform/resolvers installés
- Tailwind CSS configuré
- Structure de dossiers en place

**Story 1.2 :**
- Client Supabase dans `lib/supabase.ts`
- Types générés

### References

- [Source: docs/architecture.md#Frontend-Architecture]
- [Source: docs/architecture.md#Form-Patterns]
- [Source: docs/architecture.md#Process-Patterns]
- [Source: docs/ux-design-specification.md#Form-Patterns]
- [Source: docs/ux-design-specification.md#Feedback-Patterns]
- [Source: docs/epics.md#Story-1.3]

---

## Dev Agent Record

### Context Reference

Story context created by SM agent via create-story workflow.

### Agent Model Used

Claude Opus 4.5 (SM Agent - Bob)

### Debug Log References

_To be filled during implementation_

### Completion Notes List

_To be filled during implementation_

### File List

_To be filled during implementation - expected files:_
- `src/pages/RegisterPage.tsx`
- `src/features/auth/RegisterForm.tsx`
- `src/features/auth/registerSchema.ts`
- `src/features/auth/useAuth.ts` (si pas déjà créé)
- Mise à jour de `src/App.tsx` (routes)

---

## Definition of Done

- [ ] Toutes les Acceptance Criteria validées
- [ ] Page `/register` accessible et fonctionnelle
- [ ] Formulaire avec validation Zod fonctionnelle
- [ ] Messages d'erreur en français
- [ ] Erreurs inline sous les champs
- [ ] Toast pour erreur API (email déjà utilisé)
- [ ] État de chargement sur le bouton
- [ ] Redirection vers `/` après inscription réussie
- [ ] Lien vers `/login` fonctionnel
- [ ] Style néo-brutaliste appliqué
- [ ] Responsive mobile-first
- [ ] Code commité avec message descriptif

---

*Story générée le 2025-12-18 via le workflow BMAD Create Story*
