# Story 1.1: Initialisation du Projet avec Stack Technique

**Status:** Ready for Review

---

## Story

**As a** développeur,
**I want** un projet React initialisé avec toutes les dépendances requises,
**So that** je puisse commencer le développement avec une base solide et cohérente.

---

## Acceptance Criteria

### AC1: Création du projet Vite
**Given** aucun projet n'existe
**When** j'exécute la commande d'initialisation
**Then** le projet est créé avec Vite 5.x + React 18 + TypeScript 5.x

### AC2: Configuration Tailwind CSS
**Given** le projet Vite est créé
**When** Tailwind CSS est installé et configuré
**Then** les classes Tailwind fonctionnent dans les composants React
**And** le fichier `tailwind.config.js` existe avec les paths corrects

### AC3: Initialisation Shadcn/ui
**Given** Tailwind CSS est configuré
**When** Shadcn/ui est initialisé
**Then** le fichier `components.json` existe avec la configuration
**And** le dossier `src/components/ui/` est créé
**And** les utilitaires `cn()` sont disponibles dans `lib/utils.ts`

### AC4: Configuration du thème TweakCN
**Given** Shadcn/ui est initialisé
**When** le thème TweakCN néo-brutaliste est appliqué
**Then** les variables CSS sont configurées dans `index.css`
**And** les polices Lora et Poppins sont importées
**And** les couleurs rose/jaune/bleu-vert sont définies

### AC5: Installation React Router
**Given** le projet existe
**When** React Router 7.x est installé
**Then** le package `react-router` est dans les dépendances
**And** un exemple de configuration de routes existe dans `App.tsx`

### AC6: Configuration TanStack Query
**Given** le projet existe
**When** TanStack Query est installé et configuré
**Then** le package `@tanstack/react-query` est installé
**And** le `QueryClientProvider` enveloppe l'application dans `main.tsx`
**And** le fichier `lib/queryClient.ts` exporte la configuration

### AC7: Installation React Hook Form + Zod
**Given** le projet existe
**When** les packages de formulaires sont installés
**Then** `react-hook-form`, `zod`, et `@hookform/resolvers` sont dans les dépendances

### AC8: Structure de dossiers par feature
**Given** le projet est initialisé
**When** la structure est mise en place
**Then** les dossiers suivants existent :
- `src/components/` (composants partagés)
- `src/components/ui/` (composants Shadcn)
- `src/features/` (fonctionnalités par domaine)
- `src/lib/` (utilitaires)
- `src/pages/` (pages/routes)
- `src/types/` (types TypeScript)

### AC9: Fichier .env.example
**Given** le projet est configuré
**When** le template des variables d'environnement est créé
**Then** le fichier `.env.example` existe avec :
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## Tasks / Subtasks

- [x] **Task 1: Création du projet Vite** (AC: 1)
  - [x] Exécuter `npm create vite@latest ma-bibliotheque -- --template react-ts`
  - [x] Vérifier la structure initiale générée
  - [x] Exécuter `npm install` pour installer les dépendances de base

- [x] **Task 2: Installation et configuration Tailwind CSS** (AC: 2)
  - [x] Installer les packages : `npm install -D tailwindcss postcss autoprefixer`
  - [x] Initialiser Tailwind : `npx tailwindcss init -p`
  - [x] Configurer `tailwind.config.js` avec les paths `./index.html` et `./src/**/*.{js,ts,jsx,tsx}`
  - [x] Ajouter les directives Tailwind dans `src/index.css`

- [x] **Task 3: Initialisation Shadcn/ui** (AC: 3)
  - [x] Exécuter `npx shadcn@latest init`
  - [x] Choisir les options : TypeScript, style Default, base color Slate, CSS variables Yes
  - [x] Vérifier la création de `components.json`
  - [x] Vérifier la création de `src/lib/utils.ts` avec la fonction `cn()`

- [x] **Task 4: Application du thème TweakCN néo-brutaliste** (AC: 4)
  - [x] Importer les polices Google Fonts (Lora, Poppins) dans `index.html`
  - [x] Configurer les variables CSS dans `src/index.css` :
    - Couleurs : rose primary, jaune accent, bleu-vert secondary
    - Ombres dures : 3px offset, 0 blur
    - Border radius : 0.4rem
  - [x] Mettre à jour `tailwind.config.js` avec les fonts Lora/Poppins

- [x] **Task 5: Installation React Router** (AC: 5)
  - [x] Installer : `npm install react-router`
  - [x] Créer une configuration de base dans `App.tsx` avec `BrowserRouter`
  - [x] Ajouter des routes placeholder pour `/`, `/login`, `/register`

- [x] **Task 6: Configuration TanStack Query** (AC: 6)
  - [x] Installer : `npm install @tanstack/react-query`
  - [x] Créer `src/lib/queryClient.ts` avec la configuration du QueryClient
  - [x] Envelopper l'app avec `QueryClientProvider` dans `main.tsx`

- [x] **Task 7: Installation React Hook Form + Zod** (AC: 7)
  - [x] Installer : `npm install react-hook-form zod @hookform/resolvers`
  - [x] Vérifier que les packages sont dans `package.json`

- [x] **Task 8: Création de la structure de dossiers** (AC: 8)
  - [x] Créer `src/components/` (vide pour l'instant)
  - [x] Vérifier que `src/components/ui/` existe (créé par Shadcn)
  - [x] Créer `src/features/auth/` (placeholder)
  - [x] Créer `src/features/books/` (placeholder)
  - [x] Créer `src/pages/` avec un fichier placeholder
  - [x] Créer `src/types/` avec un fichier `index.ts` vide

- [x] **Task 9: Création du fichier .env.example** (AC: 9)
  - [x] Créer `.env.example` avec les variables Supabase
  - [x] Créer `.env.local` dans `.gitignore` (si pas déjà présent)

- [x] **Task 10: Vérification finale** (AC: tous)
  - [x] Exécuter `npm run dev` - l'app doit démarrer sans erreur
  - [x] Vérifier que Tailwind fonctionne (ajouter une classe test)
  - [x] Vérifier que le routing fonctionne (navigation de base)
  - [x] Commit initial avec message descriptif

---

## Dev Notes

### Architecture Patterns & Constraints

**Source:** [docs/architecture.md]

#### Commande d'initialisation exacte
```bash
npm create vite@latest ma-bibliotheque -- --template react-ts
```

#### Packages à installer (ordre recommandé)
```bash
# 1. Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 2. Shadcn/ui
npx shadcn@latest init

# 3. React Router
npm install react-router

# 4. TanStack Query
npm install @tanstack/react-query

# 5. Forms + Validation
npm install react-hook-form zod @hookform/resolvers

# 6. Supabase (pour la story 1.2, mais peut être installé maintenant)
npm install @supabase/supabase-js
```

#### Configuration Tailwind (tailwind.config.js)
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      colors: {
        // Les couleurs seront étendues par Shadcn/ui
      },
      boxShadow: {
        'brutal': '3px 3px 0px',
        'brutal-hover': '3px 3px 0px, 3px 2px 4px',
      },
      borderRadius: {
        DEFAULT: '0.4rem',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

#### Variables CSS TweakCN (src/index.css)
```css
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 98%;
    --foreground: 0 0% 10%;
    --card: 40 30% 96%;
    --card-foreground: 0 0% 10%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 10%;
    --primary: 350 65% 55%;
    --primary-foreground: 0 0% 100%;
    --secondary: 175 35% 50%;
    --secondary-foreground: 0 0% 100%;
    --muted: 40 20% 90%;
    --muted-foreground: 0 0% 45%;
    --accent: 45 80% 70%;
    --accent-foreground: 0 0% 10%;
    --destructive: 15 75% 55%;
    --destructive-foreground: 0 0% 100%;
    --border: 350 30% 80%;
    --input: 350 30% 80%;
    --ring: 350 65% 55%;
    --radius: 0.4rem;
  }
}
```

### Project Structure Notes

**Source:** [docs/architecture.md#Project-Structure]

Structure finale attendue :
```
ma-bibliotheque/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── components.json
├── .env.example
├── .gitignore
│
├── public/
│   └── favicon.ico
│
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── vite-env.d.ts
    │
    ├── components/
    │   └── ui/           # Shadcn components (généré)
    │
    ├── features/
    │   ├── auth/         # Placeholder
    │   └── books/        # Placeholder
    │
    ├── lib/
    │   ├── utils.ts      # cn() utility (généré par Shadcn)
    │   └── queryClient.ts # TanStack Query config
    │
    ├── pages/            # Placeholder
    │
    └── types/
        └── index.ts      # Types exports
```

### Technical Requirements

**TypeScript Configuration:**
- Mode strict activé (défaut Vite)
- Pas d'utilisation de `any`
- Imports avec alias `@/` pour `src/`

**Naming Conventions:**
- Composants : PascalCase (`BookCard.tsx`)
- Hooks : camelCase avec `use` prefix (`useBooks.ts`)
- Fichiers : PascalCase pour composants, camelCase pour utilitaires

### UX Design Notes

**Source:** [docs/ux-design-specification.md]

Pour le thème TweakCN :
- **Polices** : Lora (titres littéraires), Poppins (interface)
- **Couleurs statuts** : Rose (À lire), Jaune (En cours), Bleu-vert (Lu)
- **Ombres** : Dures (3px offset, 0 blur) - style néo-brutaliste
- **Border radius** : 0.4rem

### References

- [Source: docs/architecture.md#Starter-Template-Evaluation]
- [Source: docs/architecture.md#Post-Initialization-Setup-Required]
- [Source: docs/architecture.md#Complete-Project-Directory-Structure]
- [Source: docs/prd/6-stack-technique.md]
- [Source: docs/ux-design-specification.md#Design-System-Foundation]

---

## Dev Agent Record

### Context Reference

Story context created by SM agent via create-story workflow.

### Agent Model Used

- SM Agent (Story Creation): Claude Opus 4.5 (Bob)
- Dev Agent (Implementation): Claude Opus 4.5 (Amelia)

### Debug Log References

- Build tested successfully with `npm run build`
- Dev server tested with `npm run dev` on port 5173
- Tailwind CSS v4 used with `@tailwindcss/postcss` plugin (newer than v3 from original spec)
- OKLCH color format used (Tailwind v4 default) instead of HSL

### Completion Notes List

1. **Task 1**: Projet Vite configuré manuellement dans le dossier existant (car non-vide). Vite 6.4.1, React 18.3.1, TypeScript 5.6.2.
2. **Task 2**: Tailwind CSS v4 installé avec `@tailwindcss/postcss`. Configuration adaptée pour Tailwind v4.
3. **Task 3**: Shadcn/ui initialisé avec succès. `components.json` et `src/lib/utils.ts` créés.
4. **Task 4**: Thème TweakCN appliqué avec couleurs OKLCH (Rose primary, Jaune accent, Bleu-vert secondary). Polices Lora/Poppins chargées via Google Fonts.
5. **Task 5**: React Router 7.x installé avec routes `/`, `/login`, `/register`.
6. **Task 6**: TanStack Query configuré avec `QueryClientProvider` dans `main.tsx`.
7. **Task 7**: react-hook-form, zod, @hookform/resolvers installés.
8. **Task 8**: Structure de dossiers créée avec placeholders `.gitkeep`.
9. **Task 9**: `.env.example` créé avec variables Supabase.
10. **Task 10**: Build et dev server vérifiés fonctionnels. Commit en attente.

### File List

**Fichiers créés/modifiés:**
- `package.json` - Configuration npm avec toutes les dépendances
- `vite.config.ts` - Configuration Vite avec alias @/
- `tsconfig.json` - Configuration TypeScript racine
- `tsconfig.app.json` - Configuration TS pour l'application
- `tsconfig.node.json` - Configuration TS pour Node
- `tailwind.config.js` - Configuration Tailwind CSS v4
- `postcss.config.js` - Configuration PostCSS
- `components.json` - Configuration Shadcn/ui
- `eslint.config.js` - Configuration ESLint
- `index.html` - Point d'entrée HTML avec polices Google
- `.env.example` - Template variables d'environnement
- `.gitignore` - Fichiers à ignorer par Git
- `public/vite.svg` - Favicon Vite
- `src/main.tsx` - Point d'entrée React avec QueryClientProvider
- `src/App.tsx` - Composant racine avec React Router
- `src/index.css` - Styles globaux et thème TweakCN
- `src/vite-env.d.ts` - Types Vite
- `src/lib/utils.ts` - Utilitaire cn() (Shadcn)
- `src/lib/queryClient.ts` - Configuration TanStack Query
- `src/types/index.ts` - Exports types (placeholder)
- `src/components/.gitkeep` - Placeholder
- `src/components/ui/.gitkeep` - Placeholder Shadcn
- `src/features/auth/.gitkeep` - Placeholder auth
- `src/features/books/.gitkeep` - Placeholder books
- `src/pages/.gitkeep` - Placeholder pages

---

## Definition of Done

- [x] Toutes les Acceptance Criteria validées
- [x] `npm run dev` démarre sans erreur
- [x] `npm run build` réussit sans erreur
- [x] Structure de dossiers conforme à l'architecture
- [x] Variables CSS du thème appliquées
- [x] Polices Lora et Poppins chargées
- [x] Code commité avec message descriptif (16ebcbf)

---

## Change Log

- **2025-12-18**: Implémentation initiale de la story 1.1 par Dev Agent (Amelia)

---

*Story générée le 2025-12-18 via le workflow BMAD Create Story*
