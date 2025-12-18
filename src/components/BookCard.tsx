import { Card, CardContent } from '@/components/ui/card'
import { StatusBadge } from '@/components/StatusBadge'
import type { Book } from '@/features/books/useBooks'

interface BookCardProps {
  book: Book
  onClick?: () => void
}

export function BookCard({ book, onClick }: BookCardProps) {
  return (
    <Card
      className="cursor-pointer border-2 border-border rounded-[0.4rem] shadow-[var(--shadow-brutal)] hover:shadow-[var(--shadow-brutal-hover)] transition-shadow"
      onClick={onClick}
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
