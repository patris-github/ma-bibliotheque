import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Ce champ est requis')
    .email('Adresse email invalide'),
  password: z
    .string()
    .min(1, 'Ce champ est requis'),
})

export type LoginFormData = z.infer<typeof loginSchema>
