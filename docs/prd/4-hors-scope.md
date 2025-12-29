# 4. Hors Scope

Les éléments suivants sont **explicitement exclus** du projet :

| Élément exclu | Raison |
|---------------|--------|
| Recherche de livres via API externe | Complexité hors cadre formation |
| Upload d'images (couvertures custom) | Contrainte Supabase (pas de Storage) |
| Partage de bibliothèque entre utilisateurs | Hors scope |
| Notes, critiques ou commentaires détaillés | Hors scope |
| Scan de code-barres ou ISBN | Hors scope |
| Catégories ou genres de livres | Hors scope |
| Système de prêt | Hors scope |
| Recommandations | Hors scope |

## Éléments ajoutés au scope (v1.1)

| Élément ajouté | Justification |
|----------------|---------------|
| Affichage couvertures via Open Library API | Amélioration UX critique - reconnaissance visuelle des livres |

**Note :** L'affichage de couvertures utilise des URLs externes (Open Library). Aucun stockage d'images côté Supabase.

---
