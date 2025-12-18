import { BrowserRouter, Routes, Route, Link } from 'react-router'
import { Toaster } from '@/components/ui/sonner'
import { ThemeToggle } from './components/ThemeToggle'
import { RegisterPage } from '@/pages/RegisterPage'
import { LoginPage } from '@/pages/LoginPage'

function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-primary font-serif text-center">Ma Bibliothèque</h1>
      <p className="mt-4 text-foreground font-sans text-center">Bienvenue sur votre gestionnaire de lecture personnel.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <span className="px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow-md">À lire</span>
        <span className="px-4 py-2 bg-accent text-accent-foreground rounded-lg shadow-md">En cours</span>
        <span className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg shadow-md">Lu</span>
      </div>
      <nav className="mt-8 flex gap-6">
        <Link to="/login" className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">Connexion</Link>
        <Link to="/register" className="px-6 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">Inscription</Link>
      </nav>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ThemeToggle />
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
