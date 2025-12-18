import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth/AuthContext'
import { LogOut } from 'lucide-react'

export function HomePage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Vous êtes déconnecté')
      navigate('/login', { replace: true })
    } catch {
      toast.error('Erreur lors de la déconnexion')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with logout button */}
      <header className="border-b-2 border-foreground bg-card">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary font-serif">Ma Bibliothèque</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user?.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground font-serif">
            Bienvenue sur votre bibliothèque
          </h2>
          <p className="mt-4 text-muted-foreground">
            Gérez votre collection de livres personnelle.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow-brutal border-2 border-foreground">
              À lire
            </span>
            <span className="px-4 py-2 bg-accent text-accent-foreground rounded-lg shadow-brutal border-2 border-foreground">
              En cours
            </span>
            <span className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg shadow-brutal border-2 border-foreground">
              Lu
            </span>
          </div>
        </div>
      </main>
    </div>
  )
}
