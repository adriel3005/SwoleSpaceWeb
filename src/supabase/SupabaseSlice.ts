// good resource: https://blog.logrocket.com/using-redux-toolkits-createasyncthunk/
import { Action, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Session, User } from '@supabase/supabase-js'
import { useEffect } from 'react'
import {
  signInWithPassword,
  signupWithPassword,
  UserData,
  forgotPasswordWithEmail,
  getUserSession,
  signOut,
} from './SupabaseService'

interface Auth {
  session: Session | null
  userData: User | null
}

interface AuthState extends Auth {
  loading: boolean
}

export interface UserAction extends Action {
  payload: UserData
}

const initialState: AuthState = {
  session: null,
  userData: null,
  loading: false,
}

// async supabase call to login
export const login = createAsyncThunk(
  'auth/login',
  async (userData: UserData) => {
    return await signInWithPassword(userData.email, userData.password)
  }
)

// async supabase call to login
export const logout = createAsyncThunk('auth/logout', async () => {
  return await signOut()
})

// async supabase call to login
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData: UserData) => {
    return await signupWithPassword(userData.email, userData.password)
  }
)

export const forgotPassword = createAsyncThunk(
  'auth/forgot',
  async (email: string) => {
    return await forgotPasswordWithEmail(email)
  }
)

export const retrieveSession = createAsyncThunk(
  'auth/retrieveSession',
  async () => {
    return await getUserSession()
  }
)

export const supabaseSlice = createSlice({
  name: 'supabase',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.loading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload.error) {
        // update session if no error
        state.session = action.payload.data.session
      }
      state.loading = false
    })
    builder.addCase(login.rejected, state => {
      state.loading = false
    })
    builder.addCase(logout.pending, state => {
      state.loading = true
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      if (!action.payload.error) {
        // update session if no error
        state.session = null
        console.log('logged out')
        console.log(state.session)
      }
      state.loading = false
    })
    builder.addCase(logout.rejected, state => {
      state.loading = false
    })
    builder.addCase(signup.pending, state => {
      state.loading = true
    })
    builder.addCase(signup.fulfilled, (state, action) => {
      if (!action.payload.error) {
        // TODO: check if signup returns session data
        // update session if no error
        state.session = action.payload.data.session
      }
      state.loading = false
    })
    builder.addCase(signup.rejected, state => {
      state.loading = false
    })
    // forgot
    builder.addCase(forgotPassword.pending, state => {
      state.loading = true
    })
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      if (!action.payload.error) {
        // TODO: return some indicator if email was not sent successfully
        alert('check email for password reset, if email exists')
      }
      state.loading = false
    })
    builder.addCase(forgotPassword.rejected, state => {
      state.loading = false
    })
    // get Session
    builder.addCase(retrieveSession.pending, state => {
      state.loading = true
    })
    builder.addCase(retrieveSession.fulfilled, (state, action) => {
      if (!action.payload.error) {
        // TODO: set session data to one retrieved
        console.log(action.payload.data.session)
        state.session = action.payload.data.session
      }
      state.loading = false
    })
    builder.addCase(retrieveSession.rejected, state => {
      state.loading = false
    })
  },
})

export const supabaseReducer = supabaseSlice.reducer
