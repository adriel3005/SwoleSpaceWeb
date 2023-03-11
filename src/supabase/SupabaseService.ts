import { AuthResponse, createClient } from '@supabase/supabase-js'
import { Database } from '../types/forecasts'

export const supabase = createClient<Database>(supabaseURL, supabaseKey)

export interface UserData {
  email: string
  password: string
}

export async function signInWithPassword(
  email: string,
  password: string
): Promise<AuthResponse> {
  return await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })
}

export async function signupWithPassword(
  email: string,
  password: string
): Promise<AuthResponse> {
  return await supabase.auth.signUp({
    email: email,
    password: password,
  })
}
