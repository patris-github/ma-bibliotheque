---
stepsCompleted: [1, 2, 3, 4]
status: 'complete'
completedAt: '2025-12-18'
inputDocuments:
  - docs/prd/index.md
  - docs/prd/1-vision-du-produit.md
  - docs/prd/2-persona.md
  - docs/prd/3-fonctionnalits.md
  - docs/prd/4-hors-scope.md
  - docs/prd/5-parcours-utilisateur-principal.md
  - docs/prd/6-stack-technique.md
  - docs/prd/7-critres-de-succs.md
  - docs/prd/8-donnes.md
  - docs/prd/9-annexes.md
  - docs/architecture.md
  - docs/ux-design-specification.md
workflowType: 'epics-stories'
lastStep: 1
project_name: 'Ma Bibliothèque'
user_name: 'Patris'
date: '2025-12-18'
---

# Ma Bibliothèque - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Ma Bibliothèque, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

| ID | Exigence | Description |
|----|----------|-------------|
| FR1 | Voir la liste des livres | Afficher tous les livres enregistrés avec titre, auteur et statut |
| FR2 | Ajouter un livre | Créer une entrée avec titre, auteur et statut de lecture |
| FR3 | Modifier un livre | Mettre à jour les informations d'un livre existant |
| FR4 | Supprimer un livre | Retirer définitivement un livre de la liste |
| FR5 | Filtrer par statut | Afficher uniquement les livres selon leur statut (À lire, En cours, Lu) |
| FR6 | Création de compte | L'utilisateur peut créer un compte |
| FR7 | Connexion | L'utilisateur peut se connecter à son compte |
| FR8 | Persistance des données | Les données sont liées au compte et persistent entre les sessions |

### NonFunctional Requirements

| ID | Exigence | Critère | Impact Architecture |
|----|----------|---------|---------------------|
| NFR1 | Performance | Consultation < 5 secondes | Chargement initial optimisé, TanStack Query cache |
| NFR2 | Accessibilité | WCAG 2.1 AA | Composants Shadcn/ui (Radix), focus management, contraste, touch targets 44px |
| NFR3 | Responsive | Mobile-first | CSS responsive, breakpoints Tailwind, bottom nav conditionnelle |
| NFR4 | Sécurité | Isolation des données | RLS Supabase, authentification obligatoire, user_id = auth.uid() |

### Additional Requirements

**Depuis l'Architecture :**

- **Starter Template** : `npm create vite@latest ma-bibliotheque -- --template react-ts`
- **State Management** : TanStack Query pour la gestion des données serveur
- **Formulaires** : React Hook Form + Zod pour validation
- **UI Components** : Shadcn/ui + TweakCN
- **Structure Projet** : Organisation par feature (`features/auth/`, `features/books/`)
- **Sécurité DB** : RLS Policy `auth.uid() = user_id` sur la table `livres`
- **Conventions Nommage** : snake_case (DB), PascalCase (composants), camelCase (fonctions)
- **Dépendances Post-Init** : Tailwind CSS, Shadcn/ui, React Router 7.x, Supabase client

**Depuis l'UX Design :**

- **Navigation** : Bottom Navigation 4 onglets (Tous | À lire | En cours | Lu)
- **Action Principale** : FAB (Floating Action Button) pour ajout rapide
- **Style Visuel** : Néo-brutaliste avec ombres dures (3px offset, 0 blur)
- **Typographie** : Lora (titres livres), Poppins (interface)
- **Couleurs Statuts** : Rose (À lire), Jaune (En cours), Bleu-vert (Lu)
- **État Vide** : Message chaleureux avec CTA proéminent
- **Feedback** : Toast notifications via Sonner
- **Loading States** : Skeleton cards pour chargement
- **Formulaire Ajout** : Modal/Sheet avec 3 champs (titre, auteur, statut)

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1 | Epic 2 | Voir la liste des livres |
| FR2 | Epic 2 | Ajouter un livre |
| FR3 | Epic 2 | Modifier un livre |
| FR4 | Epic 2 | Supprimer un livre |
| FR5 | Epic 2 | Filtrer par statut |
| FR6 | Epic 1 | Création de compte |
| FR7 | Epic 1 | Connexion |
| FR8 | Epic 1 | Persistance des données |

**Couverture : 100% des FRs mappés**

## Epic List

### Epic 1 : Accès Utilisateur et Authentification

**Objectif :** Les utilisateurs peuvent créer un compte, se connecter et accéder à l'application de manière sécurisée.

**Valeur délivrée :**
- Création de compte avec email/mot de passe
- Connexion sécurisée
- Session persistante entre les visites
- État vide accueillant pour les nouveaux utilisateurs
- Routes protégées

**FRs couverts :** FR6, FR7, FR8

**Notes d'implémentation :**
- Inclut l'initialisation du projet (Vite + dépendances)
- Configuration Supabase (DB + Auth + RLS)
- Composants Shadcn/ui de base
- Structure projet par feature

---

### Epic 2 : Gestion de la Collection de Livres

**Objectif :** Les utilisateurs peuvent gérer complètement leur collection de livres - consulter, ajouter, modifier, supprimer et filtrer.

**Valeur délivrée :**
- Affichage de la liste des livres avec titre, auteur, statut
- Ajout de livres via formulaire (3 champs)
- Modification des informations existantes
- Suppression avec confirmation
- Filtrage par statut (Tous, À lire, En cours, Lu)

**FRs couverts :** FR1, FR2, FR3, FR4, FR5

**Notes d'implémentation :**
- Bottom Navigation pour les filtres
- FAB pour ajout rapide
- Style néo-brutaliste (UX spec)
- TanStack Query pour les mutations

---

## Epic 1 : Accès Utilisateur et Authentification

**Objectif :** Les utilisateurs peuvent créer un compte, se connecter et accéder à l'application de manière sécurisée.

**FRs couverts :** FR6, FR7, FR8

---

### Story 1.1 : Initialisation du Projet avec Stack Technique

**As a** développeur,
**I want** un projet React initialisé avec toutes les dépendances requises,
**So that** je puisse commencer le développement avec une base solide et cohérente.

**Acceptance Criteria:**

**Given** aucun projet n'existe
**When** j'exécute les commandes d'initialisation
**Then** le projet est créé avec Vite + React + TypeScript
**And** Tailwind CSS est configuré et fonctionnel
**And** Shadcn/ui est initialisé avec le thème TweakCN
**And** React Router 7.x est installé
**And** TanStack Query est configuré
**And** React Hook Form + Zod sont installés
**And** la structure de dossiers par feature est en place (`components/`, `features/`, `lib/`, `pages/`, `types/`)
**And** le fichier `.env.example` est créé avec les variables requises

---

### Story 1.2 : Configuration Supabase et Base de Données

**As a** développeur,
**I want** Supabase configuré avec la table `livres` et les policies RLS,
**So that** l'application puisse stocker les données de manière sécurisée.

**Acceptance Criteria:**

**Given** le projet est initialisé (Story 1.1)
**When** je configure Supabase
**Then** le client Supabase est créé dans `lib/supabase.ts`
**And** la table `livres` existe avec les colonnes : `id` (UUID), `user_id` (UUID), `titre` (text), `auteur` (text), `statut` (enum), `created_at`, `updated_at`
**And** l'enum `statut` contient les valeurs : `a_lire`, `en_cours`, `lu`
**And** la policy RLS `auth.uid() = user_id` est active sur la table `livres`
**And** les variables d'environnement `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` sont documentées

---

### Story 1.3 : Inscription Utilisateur

**As a** nouvel utilisateur,
**I want** créer un compte avec mon email et un mot de passe,
**So that** je puisse accéder à ma bibliothèque personnelle.

**Acceptance Criteria:**

**Given** je suis sur la page d'inscription
**When** je remplis le formulaire avec un email valide et un mot de passe
**Then** mon compte est créé dans Supabase Auth
**And** je suis redirigé vers la page d'accueil

**Given** je soumets un email déjà utilisé
**When** le formulaire est validé
**Then** un message d'erreur explicite s'affiche

**Given** je soumets un mot de passe trop court
**When** le formulaire est validé
**Then** un message d'erreur inline s'affiche sous le champ

**And** le formulaire utilise React Hook Form + Zod
**And** les messages d'erreur sont en français
**And** un lien vers la page de connexion est visible

---

### Story 1.4 : Connexion Utilisateur

**As a** utilisateur existant,
**I want** me connecter avec mon email et mot de passe,
**So that** je puisse accéder à mes livres.

**Acceptance Criteria:**

**Given** je suis sur la page de connexion
**When** je saisis des identifiants valides
**Then** je suis authentifié et redirigé vers la page d'accueil

**Given** je saisis des identifiants incorrects
**When** je soumets le formulaire
**Then** un message d'erreur explicite s'affiche (Toast)

**And** le formulaire utilise React Hook Form + Zod
**And** les messages sont en français
**And** un lien vers la page d'inscription est visible

---

### Story 1.5 : Gestion de Session et Déconnexion

**As a** utilisateur connecté,
**I want** que ma session persiste et pouvoir me déconnecter,
**So that** je n'aie pas à me reconnecter à chaque visite.

**Acceptance Criteria:**

**Given** je suis authentifié
**When** je ferme et rouvre l'application
**Then** ma session est restaurée automatiquement

**Given** je suis authentifié
**When** je clique sur "Déconnexion"
**Then** ma session est terminée et je suis redirigé vers la page de connexion

**Given** je ne suis pas authentifié
**When** j'essaie d'accéder à la page d'accueil
**Then** je suis redirigé vers la page de connexion

**And** un composant `ProtectedRoute` encapsule les routes authentifiées
**And** un hook `useAuth()` fournit l'état d'authentification
**And** un `AuthContext` gère l'état utilisateur global

---

### Story 1.6 : Page d'Accueil avec État Vide

**As a** nouvel utilisateur connecté,
**I want** voir un message d'accueil chaleureux quand ma bibliothèque est vide,
**So that** je me sente bienvenu et encouragé à ajouter mon premier livre.

**Acceptance Criteria:**

**Given** je suis connecté et ma bibliothèque est vide
**When** j'accède à la page d'accueil
**Then** je vois un message d'accueil personnalisé
**And** un CTA proéminent m'invite à ajouter mon premier livre
**And** l'interface suit le style néo-brutaliste (ombres dures, couleurs chaudes)

**And** la page utilise la typographie Poppins pour l'interface
**And** le layout est mobile-first avec padding approprié
**And** la structure est prête pour recevoir la liste de livres (Epic 2)

---

## Epic 2 : Gestion de la Collection de Livres

**Objectif :** Les utilisateurs peuvent gérer complètement leur collection de livres - consulter, ajouter, modifier, supprimer et filtrer.

**FRs couverts :** FR1, FR2, FR3, FR4, FR5

---

### Story 2.1 : Affichage de la Liste des Livres

**As a** utilisateur connecté,
**I want** voir la liste de tous mes livres avec leur titre, auteur et statut,
**So that** je puisse consulter ma collection d'un coup d'œil.

**Acceptance Criteria:**

**Given** je suis connecté et j'ai des livres dans ma collection
**When** j'accède à la page d'accueil
**Then** je vois la liste de mes livres sous forme de cards
**And** chaque card affiche le titre (typographie Lora), l'auteur et un badge de statut coloré

**Given** la liste est en cours de chargement
**When** les données ne sont pas encore disponibles
**Then** des Skeleton cards s'affichent

**And** le composant `BookCard` utilise le style néo-brutaliste (ombres dures 3px)
**And** le composant `StatusBadge` affiche les couleurs : Rose (À lire), Jaune (En cours), Bleu-vert (Lu)
**And** le hook `useBooks` utilise TanStack Query pour récupérer les livres
**And** la liste est scrollable sans pagination

---

### Story 2.2 : Ajouter un Livre

**As a** utilisateur connecté,
**I want** ajouter un livre avec son titre, auteur et statut,
**So that** je puisse enrichir ma collection.

**Acceptance Criteria:**

**Given** je suis sur la page d'accueil
**When** je clique sur le bouton FAB (+)
**Then** un formulaire s'ouvre (Sheet sur mobile, Dialog sur desktop)
**And** le formulaire contient 3 champs : Titre, Auteur, Statut

**Given** je remplis le formulaire avec des données valides
**When** je soumets
**Then** le livre est créé dans Supabase
**And** la liste se met à jour automatiquement (invalidation TanStack Query)
**And** un Toast de succès s'affiche
**And** le formulaire se ferme

**Given** je soumets un formulaire incomplet
**When** la validation échoue
**Then** des messages d'erreur inline s'affichent sous les champs concernés

**And** le statut par défaut est "À lire"
**And** le composant `FAB` est positionné en bas à droite, au-dessus de la navigation
**And** le formulaire utilise React Hook Form + Zod avec validation en français

---

### Story 2.3 : Modifier un Livre

**As a** utilisateur connecté,
**I want** modifier les informations d'un livre existant,
**So that** je puisse corriger une erreur ou mettre à jour le statut de lecture.

**Acceptance Criteria:**

**Given** je vois la liste de mes livres
**When** je clique sur une BookCard
**Then** le formulaire d'édition s'ouvre avec les données pré-remplies

**Given** je modifie les informations et je soumets
**When** la validation réussit
**Then** le livre est mis à jour dans Supabase
**And** la liste se rafraîchit automatiquement
**And** un Toast de succès s'affiche
**And** le formulaire se ferme

**Given** je change le statut d'un livre vers "Lu"
**When** la mise à jour est effectuée
**Then** une micro-animation de célébration s'affiche (accomplissement)

**And** le même composant `BookForm` est réutilisé pour l'ajout et l'édition
**And** un bouton "Annuler" permet de fermer sans sauvegarder

---

### Story 2.4 : Supprimer un Livre

**As a** utilisateur connecté,
**I want** supprimer un livre de ma collection,
**So that** je puisse retirer les livres que je ne souhaite plus suivre.

**Acceptance Criteria:**

**Given** je suis dans le formulaire d'édition d'un livre
**When** je clique sur "Supprimer"
**Then** une boîte de dialogue de confirmation s'affiche (AlertDialog)

**Given** la confirmation de suppression est affichée
**When** je confirme la suppression
**Then** le livre est supprimé de Supabase
**And** la liste se met à jour automatiquement
**And** un Toast de confirmation s'affiche
**And** le formulaire se ferme

**Given** la confirmation de suppression est affichée
**When** j'annule
**Then** rien n'est supprimé et je reviens au formulaire

**And** le bouton de suppression est de style "destructive" (rouge-orange)
**And** le message de confirmation est explicite : "Êtes-vous sûr de vouloir supprimer ce livre ?"

---

### Story 2.5 : Filtrer par Statut

**As a** utilisateur connecté,
**I want** filtrer ma liste de livres par statut,
**So that** je puisse voir rapidement mes livres "À lire", "En cours" ou "Lu".

**Acceptance Criteria:**

**Given** je suis sur la page d'accueil
**When** je regarde le bas de l'écran
**Then** je vois une Bottom Navigation avec 4 onglets : Tous | À lire | En cours | Lu

**Given** je clique sur l'onglet "À lire"
**When** le filtre est appliqué
**Then** seuls les livres avec le statut "À lire" sont affichés
**And** l'onglet actif est visuellement mis en évidence

**Given** je filtre et aucun livre ne correspond
**When** la liste filtrée est vide
**Then** un message contextuel s'affiche : "Aucun livre à lire" (ou équivalent selon le filtre)

**And** le filtre est appliqué côté client (pas de requête serveur)
**And** la Bottom Navigation est fixée en bas avec support des safe areas
**And** chaque onglet a une icône et un label
**And** la consultation après filtrage reste < 5 secondes (NFR1)

---

## Validation et Résumé

### Couverture des Exigences

| FR | Epic | Story | Statut |
|----|------|-------|--------|
| FR1 | Epic 2 | Story 2.1 | ✅ |
| FR2 | Epic 2 | Story 2.2 | ✅ |
| FR3 | Epic 2 | Story 2.3 | ✅ |
| FR4 | Epic 2 | Story 2.4 | ✅ |
| FR5 | Epic 2 | Story 2.5 | ✅ |
| FR6 | Epic 1 | Story 1.3 | ✅ |
| FR7 | Epic 1 | Story 1.4 | ✅ |
| FR8 | Epic 1 | Story 1.5 | ✅ |

**Couverture : 100% (8/8 FRs)**

### Métriques du Document

| Métrique | Valeur |
|----------|--------|
| Epics | 2 |
| Stories totales | 11 |
| Epic 1 stories | 6 |
| Epic 2 stories | 5 |

### Séquence d'Implémentation Recommandée

1. **Epic 1** : Accès Utilisateur et Authentification
   - Story 1.1 → 1.2 → 1.3 → 1.4 → 1.5 → 1.6

2. **Epic 2** : Gestion de la Collection de Livres
   - Story 2.1 → 2.2 → 2.3 → 2.4 → 2.5

### Document Status

- **Statut** : PRÊT POUR L'IMPLÉMENTATION
- **Date de complétion** : 2025-12-18
- **Validé par** : Workflow BMAD Create Epics & Stories

---

*Document généré via le workflow BMAD Method v6*
