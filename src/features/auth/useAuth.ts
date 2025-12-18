import { supabase } from '@/lib/supabase'

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    // Handle specific Supabase errors with French messages
    if (error.message.includes('already registered') || error.message.includes('User already registered')) {
      throw new Error('Cette adresse email est déjà utilisée')
    }
    if (error.message.includes('Invalid email')) {
      throw new Error('Adresse email invalide')
    }
    if (error.message.includes('Password')) {
      throw new Error('Le mot de passe ne respecte pas les critères requis')
    }
    // Network or other errors
    throw new Error('Erreur de connexion. Veuillez réessayer.')
  }

  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      throw new Error('Email ou mot de passe incorrect')
    }
    throw new Error('Erreur de connexion. Veuillez réessayer.')
  }

  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error('Erreur lors de la déconnexion')
  }
}
