import { RegisterForm } from '@/features/auth/RegisterForm'

export function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary font-serif">
            Créer un compte
          </h1>
          <p className="mt-2 text-muted-foreground">
            Rejoignez Ma Bibliothèque pour gérer vos lectures
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border-2 border-primary shadow-[var(--shadow-brutal)] shadow-primary/30">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
