---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
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
workflowType: 'ux-design'
lastStep: 0
project_name: 'Ma Bibliothèque'
user_name: 'Patris'
date: '2025-12-17'
---

# UX Design Specification Ma Bibliothèque

**Author:** Patris
**Date:** 2025-12-17

---

## Executive Summary

### Project Vision

Ma Bibliothèque est une application mobile-first conçue pour les lecteurs passionnés qui veulent garder une trace simple et fiable de leur collection de livres. L'expérience doit être aussi naturelle que de feuilleter un carnet personnel - chaleureuse, instantanée, sans friction.

### Target Users

**Persona Principal : Laure**
- Lectrice passionnée, 40 ans, cadre, mère de famille
- Lit sur papier et liseuse, le soir et pendant ses moments libres
- Collection d'environ 50 livres à gérer
- Usage occasionnel : principalement en librairie ("Ce livre, je l'ai ?") et après lecture (mise à jour du statut)
- Cherche la simplicité et la rapidité, pas les fonctionnalités avancées

**Contexte d'Usage Principal :**
- Mobile en situation de mobilité (librairie, transport)
- Consultation rapide en quelques secondes
- Mise à jour ponctuelle du statut de lecture

### Key Design Challenges

1. **Identification sans couvertures** - Sans images, le design typographique doit permettre une identification instantanée des livres
2. **Consultation ultra-rapide** - L'utilisateur doit trouver un livre en moins de 5 secondes
3. **Interface mémorable** - Usage occasionnel = l'interface doit être intuitive à chaque retour
4. **État vide engageant** - Transformer le premier lancement en moment d'accueil chaleureux

### Design Opportunities

1. **Personnalité visuelle unique** - Le style néo-brutaliste avec couleurs chaudes crée une identité "carnet de lecture moderne"
2. **Typographie littéraire** - Lora (serif) pour les titres de livres évoque l'univers du livre
3. **Micro-interactions satisfaisantes** - Les changements de statut peuvent devenir des moments de plaisir
4. **Simplicité comme feature** - L'absence de complexité devient un avantage concurrentiel

## Core User Experience

### Defining Experience

L'expérience centrale de Ma Bibliothèque se résume en une promesse : **trouver n'importe quel livre de sa collection en moins de 5 secondes**. Cette rapidité est non négociable car l'usage principal se fait en situation de mobilité (librairie) où chaque seconde compte.

L'action pivot est la **consultation rapide** - scrolling fluide à travers une liste de ~50 livres avec identification visuelle instantanée grâce à une typographie soignée (Lora pour les titres).

### Platform Strategy

| Aspect | Décision |
|--------|----------|
| **Plateforme** | Web responsive, mobile-first |
| **Interaction** | Touch-first avec zones tactiles généreuses (min 44px) |
| **Offline** | Non requis (hors scope) |
| **PWA** | Optionnel pour installation sur écran d'accueil |

### Effortless Interactions

1. **Scanner la liste** - Scroll natif fluide, pas de pagination
2. **Filtrer par statut** - Un seul tap sur des onglets toujours visibles
3. **Changer un statut** - Maximum 2 taps (sélection livre → nouveau statut)
4. **Ajouter un livre** - Formulaire minimal de 3 champs

### Critical Success Moments

| Moment | Émotion Cible |
|--------|---------------|
| Trouver un livre en librairie | Soulagement, confiance |
| Premier livre ajouté | Fierté, appartenance |
| Livre marqué "Lu" | Accomplissement |
| État vide initial | Accueil chaleureux |

### Experience Principles

1. **Règle des 5 secondes** - Toute action de consultation en moins de 5 secondes
2. **Zéro apprentissage** - Interface auto-explicative, pas de tutoriel
3. **Touch-first** - Conçu pour le pouce, utilisable d'une main
4. **Chaleur du carnet** - Tonalité chaleureuse, pas une base de données froide

## Desired Emotional Response

### Primary Emotional Goals

| Priorité | Émotion | Description |
|----------|---------|-------------|
| **1** | Soulagement | Le moment "ouf, je l'ai déjà" en librairie |
| **2** | Confiance | Certitude que l'app reflète fidèlement la collection |
| **3** | Chaleur | Sentiment d'un compagnon de lecture, pas d'un outil froid |
| **4** | Accomplissement | Satisfaction de voir sa progression de lecteur |

### Emotional Journey Mapping

| Étape | Émotion Cible | Comment l'atteindre |
|-------|---------------|---------------------|
| Première visite | Bienvenue, simplicité | Message d'accueil chaleureux, interface épurée |
| Ajout premier livre | Fierté, début | Célébration subtile, encouragement |
| Consultation rapide | Soulagement, contrôle | Résultat en <5 secondes |
| Changement statut "Lu" | Accomplissement | Micro-animation satisfaisante |
| Retour après absence | Familiarité | Interface identique, données intactes |

### Micro-Emotions

**À cultiver :**
- Confiance → Feedback immédiat, données fiables
- Contrôle → Filtres clairs, vue d'ensemble accessible
- Appartenance → "C'est MA bibliothèque"

**À éviter :**
- Doute → Interface toujours réactive
- Chaos → Organisation visuelle claire
- Froideur → Tonalité chaleureuse, pas de jargon technique

### Design Implications

| Principe | Application Concrète |
|----------|---------------------|
| Soulagement instantané | Liste scannable, filtres one-tap |
| Confiance construite | Pas de loading spinners longs, feedback visuel |
| Chaleur du carnet | Lora pour titres, couleurs roses/jaunes, ombres douces |
| Accomplissement célébré | Animation au passage "Lu", compteur visible |

### Emotional Design Principles

1. **Jamais d'incertitude** - L'utilisateur sait toujours ce qui se passe
2. **Célébrer les petites victoires** - Chaque livre ajouté/terminé mérite reconnaissance
3. **Parler comme un ami** - Messages en langage naturel, pas technique
4. **Chaleur visuelle** - Le design évoque un carnet personnel, pas une base de données

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

| Produit | Forces UX | Leçons pour Ma Bibliothèque |
|---------|-----------|----------------------------|
| **Goodreads** | Statuts de lecture établis | Simplifier drastiquement l'expérience |
| **Apple Rappels** | Satisfaction du check, simplicité | Modèle de complétion et navigation |
| **Todoist** | Micro-célébrations | Animation au passage "Lu" |
| **Notion** | Typographie, espacement | Esthétique épurée, filtres visibles |

### Transferable UX Patterns

**Navigation :**
- Onglets/Chips pour filtres statut (toujours visibles, un tap)
- Liste scrollable sans pagination
- FAB (bouton flottant) pour ajout rapide

**Interaction :**
- Tap sur livre pour éditer
- Swipe pour actions rapides (supprimer)
- Pull to refresh standard

**Visuel :**
- Lora (serif) pour titres de livres → identité littéraire
- Cards néo-brutalistes avec ombres dures
- Badges colorés par statut

### Anti-Patterns to Avoid

| Anti-Pattern | Impact Négatif | Notre Alternative |
|--------------|----------------|-------------------|
| Chargements longs | Frustration | Feedback instantané |
| Formulaires complexes | Abandon | 3 champs max |
| Menu hamburger caché | Découvrabilité | Filtres visibles |
| Tutoriel forcé | Friction | Interface auto-explicative |
| Gamification excessive | Pression | Célébration légère |

### Design Inspiration Strategy

**Adopter :**
- Onglets de filtres visibles (Apple Rappels)
- Animation de satisfaction (Todoist)
- Typographie serif pour titres (Notion)
- FAB pour ajout (Material Design)

**Adapter :**
- Swipe actions simplifiées
- Compteur de progression léger
- État vide chaleureux avec CTA

**Éviter :**
- Complexité de Goodreads
- Chargements visibles
- Onboarding forcé
- Design froid

## Design System Foundation

### Design System Choice

**Système choisi :** Shadcn/ui avec personnalisation TweakCN

Shadcn/ui offre des composants React accessibles et performants, tandis que TweakCN permet une personnalisation complète via variables CSS. Cette combinaison assure rapidité de développement ET identité visuelle unique.

### Rationale for Selection

| Facteur | Justification |
|---------|---------------|
| **Stack technique** | Aligné avec React 18 + Vite + Tailwind |
| **Personnalisation** | TweakCN permet le style néo-brutaliste souhaité |
| **Accessibilité** | Basé sur Radix UI, ARIA compliance native |
| **Maintenance** | Composants copiés = pas de breaking changes |
| **Performance** | Tree-shakeable, pas de bloat |

### Implementation Approach

1. **Installer Shadcn/ui** via CLI dans le projet React/Vite
2. **Appliquer le thème TweakCN** (variables CSS fournies)
3. **Importer les composants** nécessaires : Card, Button, Dialog, Tabs, Input, Select, AlertDialog
4. **Personnaliser** les composants avec les styles néo-brutalistes (ombres dures)

### Customization Strategy

**Variables CSS appliquées :**
- Couleurs : Rose primary, jaune accent, bleu-vert secondary
- Typographie : Poppins (UI), Lora (titres livres)
- Ombres : Hard shadows (3px offset, 0 blur)
- Border radius : 0.4rem

**Composants à personnaliser :**
- `Card` : Ombre dure, bordure rose, Lora pour les titres
- `Button` : Ombre dure au hover, transitions satisfaisantes
- `Tabs` : Couleurs distinctes par statut de lecture
- État vide : Illustration + message chaleureux custom

## Defining User Experience

### The Signature Experience

**L'expérience définissante de Ma Bibliothèque :**

> "Savoir si j'ai un livre en moins de 5 secondes"

Ce moment transforme l'anxiété de l'incertitude en librairie en soulagement et confiance. C'est LE moment que l'app doit réussir parfaitement.

### User Mental Model

**Comportement actuel :** Laure utilise sa mémoire (peu fiable), des photos (difficiles à parcourir), ou des apps complexes (trop lentes).

**Attentes :**
- Rapidité absolue (pas le temps de chercher)
- Certitude totale (pas de doute)
- Simplicité (pas de réflexion)
- Personnalisation (c'est SA bibliothèque)

### Success Criteria

| Critère | Objectif |
|---------|----------|
| Temps de consultation | < 5 secondes |
| Niveau de certitude | 100% (pas de doute) |
| Émotion résultante | Soulagement / Confiance |
| Action post-consultation | Décision d'achat sereine |

### Pattern Strategy

**Approche : Patterns établis, exécution parfaite**

Pas d'innovation sur les interactions - l'innovation réside dans :
- L'optimisation pour la rapidité
- Le style visuel chaleureux (carnet personnel)
- Les micro-célébrations émotionnelles

### Experience Mechanics

**Flow "Est-ce que j'ai ce livre ?" :**

1. **Initiation** (0-1s) : Ouvrir l'app → Liste visible immédiatement
2. **Interaction** (1-3s) : Scroll ou filtre → Titres lisibles (Lora)
3. **Feedback** (instantané) : Livre trouvé avec badge statut / Non trouvé
4. **Completion** (<5s total) : Décision prise → Soulagement ou achat serein

## Visual Design Foundation

### Color System

**Palette Principale (Mode Clair) :**

| Token | Usage | Couleur |
|-------|-------|---------|
| `--primary` | Actions, CTA, bordures | Rose framboise |
| `--secondary` | Éléments secondaires | Bleu-vert doux |
| `--accent` | Highlights, statut "En cours" | Jaune crème |
| `--background` | Fond de page | Rose très pâle |
| `--card` | Fond des cards | Beige doré |
| `--destructive` | Actions destructives | Rouge-orange |

**Couleurs par Statut de Lecture :**
- À lire : `--primary` (rose)
- En cours : `--accent` (jaune)
- Lu : `--secondary` (bleu-vert)

### Typography System

| Élément | Police | Taille |
|---------|--------|--------|
| Titres de page | Lora | 2rem |
| Titres de livres | Lora | 1.125rem |
| Interface | Poppins | 1rem |
| Labels, auteurs | Poppins | 0.875rem |

**Principe :** Lora pour l'univers littéraire (titres), Poppins pour l'interface (actions).

### Spacing & Layout Foundation

**Système d'espacement :** Base 4px (0.25rem), multiplicateurs 1x-8x

**Layout mobile-first :**
- Padding container : 16px (4x)
- Gap entre cards : 12px (3x)
- Padding cards : 16px (4x)

**Border radius :** 0.4rem (6.4px) - doux mais pas rond

### Shadow System (Neo-brutalist)

| Usage | Shadow |
|-------|--------|
| Cards repos | 3px 3px 0px - rose 50% |
| Cards hover | 3px 3px 0px + 3px 2px 4px |
| Boutons actifs | Ombre réduite (pressed effect) |

**Caractère :** Ombres dures sans blur, style "carnet avec post-its".

### Accessibility Considerations

- Contraste WCAG AA (4.5:1 minimum)
- Touch targets 44px minimum
- Focus states visibles (ring rose)
- Support mode sombre complet
- Tailles en rem pour scaling

## Design Direction Decision

### Design Directions Explored

4 directions visuelles ont été explorées :
1. **Carnet Classique** - Cards aérées, élégance littéraire
2. **Liste Compacte** - Efficacité, haute densité
3. **Étagère Visuelle** - Grille, métaphore bibliothèque
4. **Focus Mobile** - Bottom nav, gestes modernes

### Chosen Direction

**Hybride : Direction 1 (Carnet Classique) + Bottom Navigation (Direction 4)**

Cette combinaison marie l'élégance littéraire des cards aérées avec la navigation moderne par onglets fixes en bas d'écran.

### Design Rationale

| Choix | Justification |
|-------|---------------|
| Cards aérées (Dir. 1) | Lisibilité des titres Lora, sensation carnet |
| Bottom nav (Dir. 4) | Navigation accessible au pouce, toujours visible |
| FAB flottant | Action d'ajout proéminente |
| Ombres dures | Identité néo-brutaliste unique |

### Implementation Approach

**Structure des écrans :**
- Header fixe avec titre + compteur
- Zone scrollable avec cards de livres
- FAB flottant au-dessus de la bottom nav
- Bottom navigation 4 onglets : Tous | À lire | Lu | Profil

**Composants Shadcn/ui :**
- `Card` pour les livres (customisé avec ombres dures)
- `Button` pour le FAB
- Custom bottom navigation (ou composant tiers)
- `Badge` pour les statuts colorés

## User Journey Flows

### Flow 1: Premier Lancement

**Objectif :** Accueillir l'utilisateur et l'amener à ajouter son premier livre.

**Étapes clés :**
1. Authentification (création compte ou connexion)
2. Écran bibliothèque vide avec message chaleureux
3. CTA proéminent "Ajouter un livre"
4. Guidage vers le premier ajout

**État vide :** Message d'accueil personnalisé, pas de sensation de vide anxiogène.

### Flow 2: Ajouter un Livre

**Objectif :** Permettre l'ajout rapide d'un livre avec minimum de friction.

**Étapes clés :**
1. Tap FAB (+)
2. Modal avec 3 champs : Titre, Auteur, Statut
3. Statut par défaut : "À lire"
4. Validation → Fermeture → Retour liste avec nouveau livre visible

**Optimisation :** 3 champs uniquement, validation temps réel, feedback visuel immédiat.

### Flow 3: Vérifier en Librairie (CRITIQUE)

**Objectif :** Permettre de vérifier si un livre est déjà dans la collection en moins de 5 secondes.

**Étapes clés :**
1. Ouvrir l'app → Liste visible immédiatement
2. Scroll ou filtre par statut
3. Livre trouvé ou non → Décision d'achat

**KPI :** Temps total < 5 secondes de l'ouverture à la réponse.

### Flow 4-5: Changer le Statut (Commencer/Terminer)

**Objectif :** Permettre le changement de statut en 2 taps maximum.

**Étapes clés :**
1. Filtrer par statut actuel
2. Tap sur le livre
3. Sélectionner nouveau statut
4. Sauvegarde automatique + feedback

**Célébration :** Animation subtile au passage "Lu" (accomplissement).

### Journey Patterns

**Navigation :**
- Bottom nav pour filtrage par statut
- FAB pour action d'ajout
- Tap card pour détails/édition

**Feedback :**
- Toast pour confirmations
- Animations pour transitions de statut
- Micro-célébrations pour accomplissements

### Flow Optimization Principles

1. **Zéro friction** - Minimum de taps pour chaque action
2. **Feedback immédiat** - Chaque action a une réponse visuelle
3. **Récupération gracieuse** - Erreurs gérées sans bloquer l'utilisateur
4. **Célébration des succès** - Moments de satisfaction intégrés

## Component Strategy

### Design System Components (Shadcn/ui)

**Composants utilisés directement :**
- `Card` - Base pour BookCard
- `Button` - Actions, base pour FAB
- `Dialog` - Modal ajout/édition (desktop)
- `Sheet` - Bottom sheet (mobile)
- `Input` - Champs de formulaire
- `Select` - Sélecteur de statut
- `Badge` - Base pour StatusBadge
- `AlertDialog` - Confirmation suppression
- `Sonner` - Notifications toast
- `Skeleton` - États de chargement

### Custom Components

**BookCard**
- Composition : Card + StatusBadge
- Titre en Lora, auteur en Poppins
- Ombre dure néo-brutaliste
- Touch target : toute la card

**BottomNavigation**
- 4 items : Tous | À lire | Lu | Profil
- Position fixed bottom
- Safe area support
- État actif avec highlight

**FAB (Floating Action Button)**
- Position fixed, bottom-right
- 56px, primary color
- Ombre dure, animation hover
- Au-dessus de BottomNavigation

**StatusBadge**
- 3 variantes colorées par statut
- À lire (rose), En cours (jaune), Lu (bleu-vert)

### Component Implementation Strategy

**Approche :**
1. Installer les composants Shadcn/ui de base
2. Créer les composants custom en réutilisant les primitives
3. Appliquer les tokens du design system (couleurs, ombres, fonts)
4. Tester l'accessibilité (ARIA, keyboard nav)

**Customisation Shadcn :**
- Override des variables CSS avec le thème TweakCN
- Extension des composants pour les ombres dures
- Ajout de Lora pour les éléments littéraires

### Implementation Roadmap

**Phase 1 (MVP) :** BookCard, BottomNavigation, FAB, StatusBadge
**Phase 2 (Formulaires) :** AddBookDialog, EditBookSheet, DeleteConfirmDialog
**Phase 3 (Polish) :** EmptyState, ToastFeedback, LoadingSkeleton

## UX Consistency Patterns

### Button Hierarchy

| Type | Style | Usage |
|------|-------|-------|
| Primary | Plein rose, ombre dure | Action principale |
| Secondary | Outline rose | Action secondaire |
| Destructive | Plein rouge-orange | Suppression |
| Ghost | Transparent | Actions tertiaires |

**Règles :** Un seul Primary par écran, libellés explicites, touch targets 44px min.

### Feedback Patterns

| Type | Usage | Durée |
|------|-------|-------|
| Success (toast) | Action réussie | 3s auto-dismiss |
| Error (toast) | Échec | Persist |
| Inline error | Champ invalide | Jusqu'à correction |
| Celebration | Statut → Lu | Animation 1-2s |

**Position :** Toasts en haut-centre de l'écran.

### Form Patterns

**Structure :** Label → Input → Message erreur (si applicable)

**Validation :**
- Temps réel (on blur)
- Messages explicites en français
- Focus automatique sur erreur
- Submit désactivé si invalide

**Formulaire Ajout :** Titre (required) → Auteur (required) → Statut (default: À lire)

### Navigation Patterns

**Bottom Navigation :**
- 4 items max : Tous | À lire | Lu | Profil
- Icône + Label toujours
- État actif : primary color + bold

**Transitions :** Instantanées, scroll reset en haut

### Empty & Loading States

**État vide global :** Message chaleureux + CTA prominent
**État vide filtre :** "Aucun livre [statut]" + suggestion
**Chargement :** Skeleton cards, pas de spinner plein écran
**Actions :** Loading state sur boutons

## Responsive Design & Accessibility

### Responsive Strategy

**Approche :** Mobile-first

Ma Bibliothèque est conçue pour un usage mobile principal (vérification en librairie). Le design desktop est une extension du mobile, pas l'inverse.

| Plateforme | Stratégie |
|------------|-----------|
| **Mobile** | Layout de référence, bottom nav, FAB, cards pleines largeur |
| **Tablet** | Grille 2 colonnes de cards, navigation adaptée |
| **Desktop** | Grille 3-4 colonnes, sidebar optionnelle, navigation top |

### Breakpoint Strategy

**Framework :** Tailwind CSS breakpoints standards

| Breakpoint | Taille | Comportement |
|------------|--------|--------------|
| `sm` | ≥640px | Grille 2 colonnes |
| `md` | ≥768px | Navigation latérale possible |
| `lg` | ≥1024px | Layout desktop complet |

**Principe mobile-first :**
- CSS de base = mobile
- `@media (min-width)` pour agrandir
- Pas de masquage de contenu (tout accessible partout)

### Accessibility Strategy

**Niveau cible :** WCAG 2.1 AA

| Exigence | Implémentation |
|----------|----------------|
| Contraste | Minimum 4.5:1 (texte), 3:1 (grands textes) |
| Touch targets | Minimum 44×44px |
| Focus visible | Ring rose 2px offset |
| Navigation clavier | Tab order logique, skip links |
| Screen readers | ARIA labels, rôles sémantiques |

**Semantic HTML :**
- `<main>` pour le contenu principal
- `<nav>` pour la navigation
- `<article>` pour chaque BookCard
- `<button>` pour toutes les actions

### Testing Strategy

**Tests Responsive :**
- Chrome DevTools device emulation
- Tests réels sur iOS Safari + Android Chrome
- Lighthouse responsive audit

**Tests Accessibilité :**
- Lighthouse accessibility score ≥90
- axe DevTools extension
- Navigation clavier complète
- Test VoiceOver (macOS/iOS) et TalkBack (Android)

**Checklist validation :**
- [ ] Tous les éléments interactifs accessibles au clavier
- [ ] Focus visible sur tous les éléments interactifs
- [ ] Contraste suffisant en mode clair et sombre
- [ ] Labels ARIA sur les icônes sans texte
- [ ] Touch targets ≥44px sur mobile

### Implementation Guidelines

**Développement Responsive :**
```css
/* Mobile-first base styles */
.book-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

/* Tablet+ */
@media (min-width: 640px) {
  .book-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .book-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

**Développement Accessible :**
- Utiliser les composants Shadcn/ui (Radix = ARIA-compliant)
- `sr-only` pour textes screen-reader uniquement
- `focus-visible:` pour états focus clavier
- Test systématique avec Tab/Shift+Tab

---

## Summary & Next Steps

### Document de Référence

Ce UX Design Specification définit l'ensemble des décisions UX pour Ma Bibliothèque :

1. **Vision Produit** : Application mobile-first pour gérer sa bibliothèque personnelle
2. **Persona** : Laure, lectrice passionnée cherchant simplicité et rapidité
3. **Expérience Clé** : Trouver un livre en moins de 5 secondes
4. **Émotions Cibles** : Soulagement, confiance, chaleur, accomplissement
5. **Design System** : Shadcn/ui + TweakCN, style néo-brutaliste
6. **Navigation** : Bottom nav 4 onglets + FAB pour ajout
7. **Composants** : BookCard, StatusBadge, BottomNavigation personnalisés
8. **Accessibilité** : WCAG 2.1 AA, mobile-first responsive

### Prochaines Étapes Recommandées

1. **Architecture Technique** - Définir la structure du code React/Supabase
2. **Création des Epics** - Découper en user stories pour le développement
3. **Prototype Interactif** - Valider les flows avec un prototype cliquable
4. **Implémentation** - Développer selon les specs UX définies

---

*Document généré le 17 décembre 2025 via le workflow BMAD UX Design.*
