import { configureStore } from '@reduxjs/toolkit'
//import counterReducer  from './counterReducer'
import { supabaseReducer } from '../supabase/SupabaseSlice'

export const store = configureStore({
  reducer: {
    supabase: supabaseReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
