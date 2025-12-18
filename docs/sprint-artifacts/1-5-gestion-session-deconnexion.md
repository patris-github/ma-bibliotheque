# Story 1.5: Gestion de Session et Déconnexion

**Status:** ready-for-dev

---

## Story

**As a** utilisateur connecté,
**I want** que ma session persiste et pouvoir me déconnecter,
**So that** je n'aie pas à me reconnecter à chaque visite.

---

## Acceptance Criteria

### AC1: Persistance de session
**Given** je suis authentifié
**When** je ferme et rouvre l'application (ou rafraîchis la page)
**Then** ma session est restaurée automatiquement
**And** je reste sur la page d'accueil sans passer par la connexion

### AC2: Bouton de déconnexion visible
**Given** je suis authentifié
**When** je suis sur n'importe quelle page protégée
**Then** je vois un bouton ou lien "Déconnexion" accessible

### AC3: Déconnexion réussie
**Given** je suis authentifié
**When** je clique sur "Déconnexion"
**Then** ma session est terminée dans Supabase
**And** je suis redirigé vers la page de connexion (`/login`)
**And** un Toast de confirmation s'affiche : "Vous êtes déconnecté"

### AC4: Protection des routes
**Given** je ne suis pas authentifié
**When** j'essaie d'accéder à la page d'accueil (`/`) ou toute route protégée
**Then** je suis automatiquement redirigé vers `/login`

### AC5: Routes publiques accessibles
**Given** je ne suis pas authentifié
**When** j'accède à `/login` ou `/register`
**Then** je peux voir ces pages normalement (pas de redirection)

### AC6: AuthContext disponible
**Given** l'application est chargée
**When** n'importe quel composant a besoin de l'état d'auth
**Then** il peut utiliser le hook `useAuth()` pour accéder à :
- `user` : l'utilisateur courant (ou null)
- `isLoading` : état de chargement initial
- `signOut` : fonction de déconnexion

### AC7: État de chargement initial
**Given** l'application démarre
**When** la session est en cours de vérification
**Then** un état de chargement s'affiche (pas de flash de contenu non autorisé)

---

## Tasks / Subtasks

- [ ] **Task 1: Création de AuthContext** (AC: 6)
  - [ ] Créer `src/features/auth/AuthContext.tsx`
  - [ ] Définir le type `AuthContextType` avec `user`, `isLoading`, `signOut`
  - [ ] Créer le Provider avec gestion de l'état

- [ ] **Task 2: Implémentation de la persistance** (AC: 1, 7)
  - [ ] Utiliser `supabase.auth.getSession()` au démarrage
  - [ ] Écouter les changements avec `supabase.auth.onAuthStateChange()`
  - [ ] Gérer l'état `isLoading` pendant la vérification initiale

- [ ] **Task 3: Création du hook useAuth** (AC: 6)
  - [ ] Créer `src/features/auth/useAuth.ts` (si pas déjà fait)
  - [ ] Exporter le hook qui utilise le context
  - [ ] Inclure les fonctions `signIn`, `signUp`, `signOut`

- [ ] **Task 4: Implémentation de signOut** (AC: 3)
  - [ ] Ajouter la fonction `signOut` dans le context
  - [ ] Appeler `supabase.auth.signOut()`
  - [ ] Rediriger vers `/login` après déconnexion
  - [ ] Afficher Toast de confirmation

- [ ] **Task 5: Création du composant ProtectedRoute** (AC: 4, 5, 7)
  - [ ] Créer `src/components/ProtectedRoute.tsx`
  - [ ] Vérifier l'authentification via `useAuth()`
  - [ ] Rediriger vers `/login` si non authentifié
  - [ ] Afficher loader pendant la vérification

- [ ] **Task 6: Configuration des routes protégées** (AC: 4, 5)
  - [ ] Envelopper les routes privées avec `ProtectedRoute`
  - [ ] Laisser `/login` et `/register` comme routes publiques

- [ ] **Task 7: Ajout du bouton Déconnexion** (AC: 2, 3)
  - [ ] Ajouter un bouton/lien déconnexion dans le header ou menu
  - [ ] Connecter au `signOut` du context

- [ ] **Task 8: Intégration du Provider** (AC: 1, 6)
  - [ ] Envelopper l'app avec `AuthProvider` dans `main.tsx`
  - [ ] Placer après `QueryClientProvider`

---

## Dev Notes

### Architecture Patterns & Constraints

**Source:** [docs/architecture.md#State-Boundaries]

#### Structure AuthContext

```typescript
// src/features/auth/AuthContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Récupérer la session initiale
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    // Écouter les changements d'auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

#### ProtectedRoute Component

```typescript
// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router'
import { useAuth } from '@/features/auth/AuthContext'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
```

#### Configuration des routes (App.tsx)

```typescript
import { BrowserRouter, Routes, Route } from 'react-router'
import { ProtectedRoute } from '@/components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes publiques */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Routes protégées */}
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}
```

### Project Structure Notes

Fichiers à créer :
```
src/
├── components/
│   └── ProtectedRoute.tsx       # NOUVEAU
│
├── features/
│   └── auth/
│       └── AuthContext.tsx      # NOUVEAU
│
└── main.tsx                     # MODIFIER (ajouter AuthProvider)
```

### References

- [Source: docs/architecture.md#State-Boundaries]
- [Source: docs/architecture.md#Authentication-Security]
- [Source: docs/epics.md#Story-1.5]

---

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (SM Agent - Bob)

### File List
_Expected files:_
- `src/features/auth/AuthContext.tsx`
- `src/components/ProtectedRoute.tsx`
- Mise à jour `src/main.tsx`
- Mise à jour `src/App.tsx`

---

## Definition of Done

- [ ] AuthContext créé et fonctionnel
- [ ] Hook `useAuth()` disponible
- [ ] Session persistante après refresh
- [ ] Routes protégées avec redirection
- [ ] Routes publiques accessibles
- [ ] Bouton déconnexion visible et fonctionnel
- [ ] Toast de confirmation à la déconnexion
- [ ] Pas de flash de contenu pendant le chargement
- [ ] Code commité

---

*Story générée le 2025-12-18 via le workflow BMAD Create Story*
