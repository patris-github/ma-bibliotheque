import { useState, useMemo } from 'react'
import { Header } from '@/components/Header'
import { EmptyState } from '@/components/EmptyState'
import { BookList } from '@/features/books/BookList'
import { useBooks, type Book } from '@/features/books/useBooks'
import { FAB } from '@/components/FAB'
import { AddBookDialog } from '@/features/books/AddBookDialog'
import { EditBookDialog } from '@/features/books/EditBookDialog'
import { BottomNavigation } from '@/components/BottomNavigation'
import type { FilterType } from '@/types'
import { FilteredEmptyState } from '@/components/FilteredEmptyState'

export function HomePage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [filter, setFilter] = useState<FilterType>('all')
  const { data: books, isLoading } = useBooks()

  const filteredBooks = useMemo(() => {
    if (!books) return []
    if (filter === 'all') return books
    return books.filter((book) => book.statut === filter)
  }, [books, filter])

  const hasBooks = !isLoading && books && books.length > 0
  const hasFilteredBooks = filteredBooks.length > 0

  const handleAddBook = () => {
    setIsAddDialogOpen(true)
  }

  const handleBookClick = (book: Book) => {
    setSelectedBook(book)
    setIsEditDialogOpen(true)
  }

  const handleEditDialogClose = (open: boolean) => {
    setIsEditDialogOpen(open)
    if (!open) {
      setSelectedBook(null)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main className="container mx-auto px-4 py-6">
        {isLoading ? (
          <BookList isLoading />
        ) : !hasBooks ? (
          <EmptyState onAddBook={handleAddBook} />
        ) : hasFilteredBooks ? (
          <BookList books={filteredBooks} onBookClick={handleBookClick} />
        ) : (
          <FilteredEmptyState filter={filter} />
        )}
      </main>
      <BottomNavigation activeFilter={filter} onFilterChange={setFilter} />
      <FAB onClick={handleAddBook} />
      <AddBookDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
      <EditBookDialog
        book={selectedBook}
        open={isEditDialogOpen}
        onOpenChange={handleEditDialogClose}
      />
    </div>
  )
}
