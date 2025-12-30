import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, X, Camera, PenLine } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FABProps {
  onManualAdd: () => void
  onScanAdd: () => void
}

export function FAB({ onManualAdd, onScanAdd }: FABProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleMainClick = () => {
    setIsExpanded(!isExpanded)
  }

  const handleScan = () => {
    setIsExpanded(false)
    onScanAdd()
  }

  const handleManual = () => {
    setIsExpanded(false)
    onManualAdd()
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col-reverse items-end gap-2">
      {/* Expanded options */}
      <div
        className={cn(
          'flex flex-col-reverse gap-2 transition-all duration-200',
          isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        )}
      >
        {/* Manual entry button */}
        <div className="flex items-center gap-2">
          <span className="bg-card px-2 py-1 rounded text-sm border-2 border-border shadow-sm">
            Saisie manuelle
          </span>
          <Button
            onClick={handleManual}
            size="icon"
            variant="secondary"
            className="h-12 w-12 rounded-full border-2 border-border shadow-[var(--shadow-brutal)]"
          >
            <PenLine className="h-5 w-5" />
            <span className="sr-only">Saisie manuelle</span>
          </Button>
        </div>

        {/* Scan button */}
        <div className="flex items-center gap-2">
          <span className="bg-card px-2 py-1 rounded text-sm border-2 border-border shadow-sm">
            Scanner ISBN
          </span>
          <Button
            onClick={handleScan}
            size="icon"
            variant="secondary"
            className="h-12 w-12 rounded-full border-2 border-border shadow-[var(--shadow-brutal)]"
          >
            <Camera className="h-5 w-5" />
            <span className="sr-only">Scanner un code-barres</span>
          </Button>
        </div>
      </div>

      {/* Main FAB button */}
      <Button
        onClick={handleMainClick}
        size="icon"
        className={cn(
          'h-14 w-14 rounded-full border-2 border-border shadow-[var(--shadow-brutal)] hover:shadow-[var(--shadow-brutal-hover)] transition-transform duration-200',
          isExpanded && 'rotate-45'
        )}
      >
        {isExpanded ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        <span className="sr-only">
          {isExpanded ? 'Fermer le menu' : 'Ajouter un livre'}
        </span>
      </Button>

      {/* Backdrop when expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setIsExpanded(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
