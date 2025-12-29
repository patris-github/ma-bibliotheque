import { cn } from '@/lib/utils'
import type { Database } from '@/types/database'

type Statut = Database['public']['Enums']['statut_lecture']

const statusColors: Record<Statut, string> = {
  a_lire: 'bg-primary/20',
  en_cours: 'bg-accent/20',
  lu: 'bg-secondary/20',
}

interface BookCoverPlaceholderProps {
  titre: string
  statut: Statut
  className?: string
}

function getInitials(titre: string): string {
  const words = titre.trim().split(/\s+/)
  if (words.length === 1) {
    return titre.substring(0, 2).toUpperCase()
  }
  return (words[0][0] + words[1][0]).toUpperCase()
}

export function BookCoverPlaceholder({
  titre,
  statut,
  className,
}: BookCoverPlaceholderProps) {
  const initials = getInitials(titre)

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-[0.3rem] border-2 border-border',
        statusColors[statut],
        className
      )}
      aria-hidden="true"
    >
      <span className="font-serif text-lg font-bold text-foreground/60">
        {initials}
      </span>
    </div>
  )
}
