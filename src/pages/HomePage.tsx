import { Header } from '@/components/Header'
import { EmptyState } from '@/components/EmptyState'
// import { BookList } from '@/features/books/BookList' // Epic 2

export function HomePage() {
  // Pour l'instant, toujours afficher l'état vide
  // La logique avec useBooks() sera ajoutée dans Epic 2
  const hasBooks = false

  const handleAddBook = () => {
    // Sera connecté au FAB/Dialog dans Story 2.2
    console.log('Ajouter un livre - à implémenter dans Epic 2')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        {hasBooks ? (
          // <BookList /> sera ajouté dans Story 2.1
          <div>Liste des livres</div>
        ) : (
          <EmptyState onAddBook={handleAddBook} />
        )}
      </main>
    </div>
  )
}
