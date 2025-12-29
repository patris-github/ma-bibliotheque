import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/features/auth/AuthContext'
import type { Database } from '@/types/database'
import type { BookFormData } from '@/features/books/bookSchema'

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

export function useAddBook() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: async (data: BookFormData) => {
      const { data: book, error } = await supabase
        .from('livres')
        .insert({
          ...data,
          user_id: user!.id,
        })
        .select()
        .single()

      if (error) throw error
      return book
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['livres'] })
    },
  })
}

export function useUpdateBook() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<BookFormData> }) => {
      const { data: book, error } = await supabase
        .from('livres')
        .update(data)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return book
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['livres'] })
      queryClient.invalidateQueries({ queryKey: ['livre', variables.id] })
    },
  })
}

export function useDeleteBook() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('livres')
        .delete()
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['livres'] })
    },
  })
}
