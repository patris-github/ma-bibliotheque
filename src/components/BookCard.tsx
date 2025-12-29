import { Card, CardContent } from '@/components/ui/card'
import { StatusBadge } from '@/components/StatusBadge'
import type { Book } from '@/features/books/useBooks'

interface BookCardProps {
  book: Book
  onClick?: () => void
}

export function BookCard({ book, onClick }: BookCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.()
    }
  }

  return (
    <Card
      role="button"
      tabIndex={0}
      className="cursor-pointer border-2 border-border rounded-[0.4rem] shadow-[var(--shadow-brutal)] hover:shadow-[var(--shadow-brutal-hover)] transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-lg font-medium truncate">
              {book.titre}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {book.auteur}
            </p>
          </div>
          <StatusBadge statut={book.statut} />
        </div>
      </CardContent>
    </Card>
  )
}
