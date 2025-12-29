import { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { BookCoverPlaceholder } from '@/components/BookCoverPlaceholder'
import type { Database } from '@/types/database'

type Statut = Database['public']['Enums']['statut_lecture']

interface BookCoverProps {
  coverUrl: string | null
  titre: string
  statut: Statut
  className?: string
}

export function BookCover({
  coverUrl,
  titre,
  statut,
  className = 'w-16 h-24',
}: BookCoverProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // If no cover URL or error occurred, show placeholder
  if (!coverUrl || hasError) {
    return (
      <BookCoverPlaceholder titre={titre} statut={statut} className={className} />
    )
  }

  return (
    <div className={className}>
      {isLoading && (
        <Skeleton className="w-full h-full rounded-[0.3rem]" />
      )}
      <img
        src={coverUrl}
        alt={`Couverture de ${titre}`}
        loading="lazy"
        className={`w-full h-full object-cover rounded-[0.3rem] border-2 border-border ${
          isLoading ? 'hidden' : 'block'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
      />
    </div>
  )
}
