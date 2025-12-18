# 8. Données

## 8.1 Modèle de Données — Livre

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| id | UUID | Oui | Identifiant unique |
| user_id | UUID | Oui | Référence à l'utilisateur propriétaire |
| titre | String | Oui | Titre du livre |
| auteur | String | Oui | Nom de l'auteur |
| statut | Enum | Oui | "a_lire", "en_cours", "lu" |
| created_at | Timestamp | Oui | Date de création |
| updated_at | Timestamp | Oui | Date de dernière modification |

---
