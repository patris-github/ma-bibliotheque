import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/features/auth/AuthContext'
import { fetchBookCover } from '@/lib/openLibrary'
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
      if (!user) {
        throw new Error('Utilisateur non connecté')
      }

      // Fetch cover from Open Library
      const cover_url = await fetchBookCover(data.titre, data.auteur)

      const { data: book, error } = await supabase
        .from('livres')
        .insert({
          ...data,
          cover_url,
          user_id: user.id,
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

interface UpdateBookParams {
  id: string
  data: Partial<BookFormData>
  originalBook: Book
}

export function useUpdateBook() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data, originalBook }: UpdateBookParams) => {
      // Check if title or author changed - if so, fetch new cover
      const titleChanged = data.titre && data.titre !== originalBook.titre
      const authorChanged = data.auteur && data.auteur !== originalBook.auteur

      let cover_url = originalBook.cover_url
      if (titleChanged || authorChanged) {
        const newTitre = data.titre || originalBook.titre
        const newAuteur = data.auteur || originalBook.auteur
        cover_url = await fetchBookCover(newTitre, newAuteur)
      }

      const { data: book, error } = await supabase
        .from('livres')
        .update({ ...data, cover_url })
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
