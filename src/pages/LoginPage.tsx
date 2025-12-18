import { LoginForm } from '@/features/auth/LoginForm'

export function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary font-serif">
            Se connecter
          </h1>
          <p className="mt-2 text-muted-foreground">
            Accédez à votre bibliothèque personnelle
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border-2 border-primary shadow-[var(--shadow-brutal)] shadow-primary/30">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
