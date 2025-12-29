import type { FilterType } from '@/types'

const filterMessages: Record<FilterType, string> = {
  all: 'Votre bibliothèque est vide.',
  a_lire: 'Aucun livre à lire.',
  en_cours: 'Aucun livre en cours de lecture.',
  lu: 'Aucun livre lu pour le moment.',
}

const filterIcons: Record<FilterType, string> = {
  all: '📚',
  a_lire: '📖',
  en_cours: '⏳',
  lu: '✅',
}

interface FilteredEmptyStateProps {
  filter: FilterType
}

export function FilteredEmptyState({ filter }: FilteredEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <span className="text-4xl mb-4" role="img" aria-hidden="true">
        {filterIcons[filter]}
      </span>
      <p className="text-muted-foreground">{filterMessages[filter]}</p>
    </div>
  )
}
