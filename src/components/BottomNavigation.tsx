import { BookOpen, BookMarked, Clock, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FilterType } from '@/types'

export type { FilterType }

interface NavItem {
  id: FilterType
  label: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { id: 'all', label: 'Tous', icon: <BookOpen className="h-5 w-5" /> },
  { id: 'a_lire', label: 'À lire', icon: <BookMarked className="h-5 w-5" /> },
  { id: 'en_cours', label: 'En cours', icon: <Clock className="h-5 w-5" /> },
  { id: 'lu', label: 'Lu', icon: <CheckCircle className="h-5 w-5" /> },
]

interface BottomNavigationProps {
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

export function BottomNavigation({ activeFilter, onFilterChange }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t-2 border-border pb-[max(0px,env(safe-area-inset-bottom))]">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = activeFilter === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onFilterChange(item.id)}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isActive
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {item.icon}
              <span className="text-xs">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
