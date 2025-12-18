import { useBooks } from '@/features/books/useBooks'
import { BookCard } from '@/components/BookCard'
import { BookCardSkeleton } from '@/components/BookCardSkeleton'

export function BookList() {
  const { data: books, isLoading, error } = useBooks()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <BookCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">
          Erreur lors du chargement des livres
        </p>
      </div>
    )
  }

  if (!books || books.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onClick={() => {
            // Sera connecté à l'édition dans Story 2.3
            console.log('Éditer livre:', book.id)
          }}
        />
      ))}
    </div>
  )
}
