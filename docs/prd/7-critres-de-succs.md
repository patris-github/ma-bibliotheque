# 7. Critères de Succès

## 7.1 Critères Fonctionnels

L'application est considérée comme **terminée** lorsque :

| # | Critère | Vérification |
|---|---------|--------------|
| CS1 | Création de compte | Je peux créer un nouveau compte |
| CS2 | Connexion | Je peux me connecter avec mon compte |
| CS3 | Persistance des données | Après déconnexion/reconnexion, mes livres sont toujours là |
| CS4 | État vide guidé | Un nouvel utilisateur voit un message l'invitant à ajouter son premier livre |
| CS5 | Ajouter un livre | Je peux ajouter un livre avec titre, auteur et statut |
| CS6 | Modifier un livre | Je peux modifier les informations d'un livre existant |
| CS7 | Supprimer un livre | Je peux supprimer un livre de ma collection |
| CS8 | Filtrer par statut | Je peux filtrer par "À lire", "En cours" et "Lu" |
| CS9 | Voir tous les livres | Je peux afficher la liste complète sans filtre |
| CS10 | Persistance session | Si je ferme l'app et reviens plus tard, mes données sont conservées |

## 7.2 Démonstration Type

Pour valider le projet, la démonstration suivante doit fonctionner :

1. Créer un compte
2. Voir le message d'accueil (état vide)
3. Ajouter 3 livres avec différents statuts
4. Filtrer sur chaque statut
5. Modifier le statut d'un livre
6. Supprimer un livre
7. Se déconnecter
8. Se reconnecter
9. Vérifier que les livres sont toujours présents

---
