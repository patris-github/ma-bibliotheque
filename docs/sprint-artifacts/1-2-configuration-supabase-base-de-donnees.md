# Story 1.2: Configuration Supabase et Base de Données

**Status:** ready-for-dev

---

## Story

**As a** développeur,
**I want** Supabase configuré avec la table `livres` et les policies RLS,
**So that** l'application puisse stocker les données de manière sécurisée.

---

## Acceptance Criteria

### AC1: Client Supabase créé
**Given** le projet est initialisé (Story 1.1)
**When** je configure le client Supabase
**Then** le fichier `lib/supabase.ts` existe et exporte le client configuré
**And** le client utilise les variables d'environnement `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`

### AC2: Table `livres` créée
**Given** un projet Supabase existe
**When** je crée la table `livres`
**Then** la table existe avec les colonnes :
- `id` (UUID, primary key, default: gen_random_uuid())
- `user_id` (UUID, references auth.users, NOT NULL)
- `titre` (text, NOT NULL)
- `auteur` (text, NOT NULL)
- `statut` (enum statut_lecture, NOT NULL, default: 'a_lire')
- `created_at` (timestamptz, default: now())
- `updated_at` (timestamptz, default: now())

### AC3: Enum `statut_lecture` créé
**Given** je crée les types personnalisés
**When** l'enum est défini
**Then** le type `statut_lecture` contient exactement les valeurs : `a_lire`, `en_cours`, `lu`

### AC4: Policy RLS active
**Given** la table `livres` existe
**When** RLS est activé
**Then** la policy `auth.uid() = user_id` est appliquée pour SELECT, INSERT, UPDATE, DELETE
**And** un utilisateur ne peut accéder qu'à ses propres livres

### AC5: Trigger updated_at
**Given** la table `livres` existe
**When** un livre est modifié
**Then** la colonne `updated_at` est automatiquement mise à jour

### AC6: Types TypeScript générés
**Given** la table est créée
**When** les types sont générés via Supabase CLI
**Then** le fichier `types/database.ts` contient les types correspondant au schéma

### AC7: Variables d'environnement documentées
**Given** le client Supabase est configuré
**When** je consulte la documentation
**Then** le fichier `.env.example` contient `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`
**And** le fichier `.env.local` est dans `.gitignore`

---

## Tasks / Subtasks

- [ ] **Task 1: Création du projet Supabase** (AC: 2, 3, 4, 5)
  - [ ] Créer un nouveau projet sur supabase.com (si pas déjà fait)
  - [ ] Noter l'URL du projet et la clé anon

- [ ] **Task 2: Création de l'enum et de la table** (AC: 2, 3)
  - [ ] Exécuter le SQL de création de l'enum `statut_lecture`
  - [ ] Exécuter le SQL de création de la table `livres`
  - [ ] Vérifier la structure dans le Dashboard Supabase

- [ ] **Task 3: Configuration RLS** (AC: 4)
  - [ ] Activer RLS sur la table `livres`
  - [ ] Créer la policy pour SELECT
  - [ ] Créer la policy pour INSERT
  - [ ] Créer la policy pour UPDATE
  - [ ] Créer la policy pour DELETE
  - [ ] Tester que RLS fonctionne (via Dashboard ou SQL)

- [ ] **Task 4: Création du trigger updated_at** (AC: 5)
  - [ ] Créer la fonction `handle_updated_at()`
  - [ ] Créer le trigger sur la table `livres`

- [ ] **Task 5: Configuration des variables d'environnement** (AC: 7)
  - [ ] Mettre à jour `.env.example` avec les variables Supabase
  - [ ] Créer `.env.local` avec les vraies valeurs (ne pas committer)
  - [ ] Vérifier que `.env.local` est dans `.gitignore`

- [ ] **Task 6: Création du client Supabase** (AC: 1)
  - [ ] Créer `src/lib/supabase.ts`
  - [ ] Configurer le client avec les variables d'environnement
  - [ ] Exporter le client typé

- [ ] **Task 7: Génération des types TypeScript** (AC: 6)
  - [ ] Installer Supabase CLI si nécessaire : `npm install -D supabase`
  - [ ] Générer les types : `npx supabase gen types typescript --project-id <project-id> > src/types/database.ts`
  - [ ] Vérifier que les types correspondent au schéma

- [ ] **Task 8: Vérification finale** (AC: tous)
  - [ ] Tester la connexion au client Supabase dans l'app
  - [ ] Vérifier que les types s'importent correctement
  - [ ] Commit avec message descriptif

---

## Dev Notes

### Architecture Patterns & Constraints

**Source:** [docs/architecture.md#Data-Architecture]

#### SQL de création complet

```sql
-- 1. Création de l'enum statut_lecture
CREATE TYPE statut_lecture AS ENUM ('a_lire', 'en_cours', 'lu');

-- 2. Création de la table livres
CREATE TABLE livres (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  titre TEXT NOT NULL,
  auteur TEXT NOT NULL,
  statut statut_lecture NOT NULL DEFAULT 'a_lire',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Index sur user_id pour les performances
CREATE INDEX idx_livres_user_id ON livres(user_id);

-- 4. Activation de RLS
ALTER TABLE livres ENABLE ROW LEVEL SECURITY;

-- 5. Policy pour SELECT
CREATE POLICY "Users can view their own books"
  ON livres FOR SELECT
  USING (auth.uid() = user_id);

-- 6. Policy pour INSERT
CREATE POLICY "Users can insert their own books"
  ON livres FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 7. Policy pour UPDATE
CREATE POLICY "Users can update their own books"
  ON livres FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 8. Policy pour DELETE
CREATE POLICY "Users can delete their own books"
  ON livres FOR DELETE
  USING (auth.uid() = user_id);

-- 9. Fonction pour le trigger updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 10. Trigger pour updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON livres
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();
```

#### Client Supabase (src/lib/supabase.ts)

```typescript
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
```

#### Variables d'environnement (.env.example)

```
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Project Structure Notes

**Source:** [docs/architecture.md#Project-Structure]

Fichiers à créer/modifier :
```
src/
├── lib/
│   └── supabase.ts     # Client Supabase (NOUVEAU)
│
└── types/
    └── database.ts     # Types générés Supabase (NOUVEAU)
```

### Technical Requirements

**Source:** [docs/architecture.md#Naming-Patterns]

#### Conventions de nommage DB (snake_case)
- Table : `livres` (snake_case, pluriel)
- Colonnes : `user_id`, `created_at`, `updated_at` (snake_case)
- Enum values : `a_lire`, `en_cours`, `lu` (snake_case)

#### IMPORTANT : Pas de conversion camelCase
Les données Supabase restent en **snake_case** dans le code TypeScript :
```typescript
// CORRECT
const book = data // { id, user_id, titre, auteur, statut }

// INCORRECT - NE PAS FAIRE
const book = { ...data, userId: data.user_id } // Conversion inutile
```

### Sécurité

**Source:** [docs/architecture.md#Authentication-Security]

#### Row Level Security (RLS)
- **Obligatoire** : RLS doit être activé sur la table `livres`
- **Policy** : `auth.uid() = user_id` pour isoler les données par utilisateur
- **Cascade** : ON DELETE CASCADE sur `user_id` pour nettoyer les données si l'utilisateur est supprimé

#### Validation des policies
Pour tester que RLS fonctionne :
1. Créer 2 utilisateurs test
2. Insérer des livres pour chaque utilisateur
3. Vérifier qu'un utilisateur ne voit que ses propres livres

### Génération des Types

**Source:** [docs/architecture.md#Data-Architecture]

#### Commande de génération
```bash
# Via Supabase CLI (recommandé)
npx supabase gen types typescript --project-id <project-ref> > src/types/database.ts

# OU via l'URL du projet
npx supabase gen types typescript --project-id <project-ref> --schema public > src/types/database.ts
```

#### Structure attendue des types (database.ts)
```typescript
export type Database = {
  public: {
    Tables: {
      livres: {
        Row: {
          id: string
          user_id: string
          titre: string
          auteur: string
          statut: 'a_lire' | 'en_cours' | 'lu'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          titre: string
          auteur: string
          statut?: 'a_lire' | 'en_cours' | 'lu'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          titre?: string
          auteur?: string
          statut?: 'a_lire' | 'en_cours' | 'lu'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Enums: {
      statut_lecture: 'a_lire' | 'en_cours' | 'lu'
    }
  }
}
```

### Learnings from Previous Story (1.1)

**Source:** [docs/sprint-artifacts/1-1-initialisation-projet-stack-technique.md]

La Story 1.1 a préparé :
- Structure de dossiers `src/lib/` et `src/types/` déjà créée
- Package `@supabase/supabase-js` peut déjà être installé
- `.env.example` existe déjà (à mettre à jour)
- `.gitignore` configuré

### References

- [Source: docs/architecture.md#Data-Architecture]
- [Source: docs/architecture.md#Authentication-Security]
- [Source: docs/architecture.md#Naming-Patterns]
- [Source: docs/epics.md#Story-1.2]
- [Source: docs/prd/8-donnes.md]

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
- `src/lib/supabase.ts`
- `src/types/database.ts`
- `.env.example` (mise à jour)
- `.env.local` (créé, non commité)

---

## Definition of Done

- [ ] Toutes les Acceptance Criteria validées
- [ ] Enum `statut_lecture` créé dans Supabase
- [ ] Table `livres` créée avec toutes les colonnes
- [ ] RLS activé avec les 4 policies (SELECT, INSERT, UPDATE, DELETE)
- [ ] Trigger `updated_at` fonctionnel
- [ ] Client Supabase configuré dans `lib/supabase.ts`
- [ ] Types générés dans `types/database.ts`
- [ ] Variables d'environnement documentées
- [ ] Connexion testée et fonctionnelle
- [ ] Code commité avec message descriptif

---

*Story générée le 2025-12-18 via le workflow BMAD Create Story*
