import { BrowserRouter, Routes, Route, Link } from 'react-router'

function HomePage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold text-primary font-serif">Ma Bibliothèque</h1>
      <p className="mt-4 text-foreground font-sans">Bienvenue sur votre gestionnaire de lecture personnel.</p>
      <div className="mt-8 flex gap-4">
        <span className="px-3 py-1 bg-primary text-primary-foreground rounded-lg">À lire (Rose)</span>
        <span className="px-3 py-1 bg-accent text-accent-foreground rounded-lg">En cours (Jaune)</span>
        <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-lg">Lu (Bleu-vert)</span>
      </div>
      <nav className="mt-8 flex gap-4">
        <Link to="/login" className="text-primary underline">Connexion</Link>
        <Link to="/register" className="text-primary underline">Inscription</Link>
      </nav>
    </div>
  )
}

function LoginPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold text-primary font-serif">Connexion</h1>
      <p className="mt-4 text-muted-foreground">Page de connexion (à implémenter)</p>
      <Link to="/" className="mt-4 inline-block text-primary underline">Retour à l'accueil</Link>
    </div>
  )
}

function RegisterPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold text-primary font-serif">Inscription</h1>
      <p className="mt-4 text-muted-foreground">Page d'inscription (à implémenter)</p>
      <Link to="/" className="mt-4 inline-block text-primary underline">Retour à l'accueil</Link>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
