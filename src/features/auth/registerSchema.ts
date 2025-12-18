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
