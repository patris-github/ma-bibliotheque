import type { Book } from '@/features/books/useBooks'
import { BookCard } from '@/components/BookCard'
import { BookCardSkeleton } from '@/components/BookCardSkeleton'

interface BookListProps {
  books?: Book[]
  isLoading?: boolean
  onBookClick?: (book: Book) => void
}

export function BookList({ books, isLoading = false, onBookClick }: BookListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <BookCardSkeleton key={index} />
        ))}
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
          onClick={() => onBookClick?.(book)}
        />
      ))}
    </div>
  )
}
