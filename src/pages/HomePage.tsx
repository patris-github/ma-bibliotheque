import { useState } from 'react'
import { Header } from '@/components/Header'
import { EmptyState } from '@/components/EmptyState'
import { BookList } from '@/features/books/BookList'
import { useBooks, type Book } from '@/features/books/useBooks'
import { FAB } from '@/components/FAB'
import { AddBookDialog } from '@/features/books/AddBookDialog'
import { EditBookDialog } from '@/features/books/EditBookDialog'

export function HomePage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const { data: books, isLoading } = useBooks()
  const hasBooks = !isLoading && books && books.length > 0

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
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        {isLoading ? (
          <BookList />
        ) : hasBooks ? (
          <BookList onBookClick={handleBookClick} />
        ) : (
          <EmptyState onAddBook={handleAddBook} />
        )}
      </main>
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
