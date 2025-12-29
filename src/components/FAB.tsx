import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface FABProps {
  onClick: () => void
}

export function FAB({ onClick }: FABProps) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className="fixed bottom-20 right-4 h-14 w-14 rounded-full border-2 border-border shadow-[var(--shadow-brutal)] hover:shadow-[var(--shadow-brutal-hover)] z-50"
    >
      <Plus className="h-6 w-6" />
      <span className="sr-only">Ajouter un livre</span>
    </Button>
  )
}
