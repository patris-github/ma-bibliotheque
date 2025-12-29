import { Button } from '@/components/ui/button'
import { BookOpen } from 'lucide-react'

interface EmptyStateProps {
  onAddBook?: () => void
}

export function EmptyState({ onAddBook }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="space-y-6 max-w-sm">
        {/* Icon */}
        <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border-2 border-foreground shadow-brutal">
          <BookOpen className="w-12 h-12 text-primary" aria-hidden="true" />
        </div>

        {/* Welcome message */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground font-sans">
            Bienvenue dans votre bibliothèque !
          </h2>
          <p className="text-muted-foreground font-sans">
            Votre collection est vide pour l'instant.
            Commencez par ajouter votre premier livre et suivez vos lectures.
          </p>
        </div>

        {/* CTA Button */}
        <Button
          size="lg"
          onClick={onAddBook}
          className="w-full sm:w-auto border-2 border-foreground shadow-brutal hover:shadow-none transition-shadow font-sans"
        >
          Ajouter mon premier livre
        </Button>
      </div>
    </div>
  )
}
