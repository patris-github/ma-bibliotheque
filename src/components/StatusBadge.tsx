import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Database } from '@/types/database'

type Statut = Database['public']['Enums']['statut_lecture']

const statusConfig: Record<Statut, { label: string; className: string }> = {
  a_lire: {
    label: 'À lire',
    className: 'bg-primary text-primary-foreground',
  },
  en_cours: {
    label: 'En cours',
    className: 'bg-accent text-accent-foreground',
  },
  lu: {
    label: 'Lu',
    className: 'bg-secondary text-secondary-foreground',
  },
}

interface StatusBadgeProps {
  statut: Statut
}

export function StatusBadge({ statut }: StatusBadgeProps) {
  const config = statusConfig[statut]
  return (
    <Badge className={cn('font-medium border-0', config.className)}>
      {config.label}
    </Badge>
  )
}
