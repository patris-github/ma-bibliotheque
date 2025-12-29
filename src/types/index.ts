// Types exports for Ma Bibliothèque
// This file will export all TypeScript types used in the application

import type { Database } from '@/types/database'

// Book type from Supabase database
export type Book = Database['public']['Tables']['livres']['Row']

// Status type
export type StatutLecture = Database['public']['Enums']['statut_lecture']

// Filter type for bottom navigation
export type FilterType = 'all' | 'a_lire' | 'en_cours' | 'lu'
