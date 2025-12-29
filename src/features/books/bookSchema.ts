import { z } from 'zod'

export const bookSchema = z.object({
  titre: z.string().min(1, 'Le titre est requis'),
  auteur: z.string().min(1, "L'auteur est requis"),
  statut: z.enum(['a_lire', 'en_cours', 'lu']),
})

export type BookFormData = z.infer<typeof bookSchema>
