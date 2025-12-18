import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/database'

export type Book = Database['public']['Tables']['livres']['Row']

export function useBooks() {
  return useQuery({
    queryKey: ['livres'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('livres')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as Book[]
    },
  })
}
