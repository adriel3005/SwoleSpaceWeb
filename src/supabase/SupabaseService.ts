import { AuthResponse, createClient } from '@supabase/supabase-js'
import process from 'process'
import { Database } from '../types/forecasts'

require('dotenv').config()

export const supabase = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
)

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

export async function forgotPasswordWithEmail(email: string) {
  return await supabase.auth.resetPasswordForEmail(email)
}

supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session)
})
