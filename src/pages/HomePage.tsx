import { Header } from '@/components/Header'
import { EmptyState } from '@/components/EmptyState'
import { BookList } from '@/features/books/BookList'
import { useBooks } from '@/features/books/useBooks'

export function HomePage() {
  const { data: books, isLoading } = useBooks()
  const hasBooks = !isLoading && books && books.length > 0

  const handleAddBook = () => {
    // Sera connecté au FAB/Dialog dans Story 2.2
    console.log('Ajouter un livre - à implémenter dans Story 2.2')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        {isLoading ? (
          <BookList />
        ) : hasBooks ? (
          <BookList />
        ) : (
          <EmptyState onAddBook={handleAddBook} />
        )}
      </main>
    </div>
  )
}
