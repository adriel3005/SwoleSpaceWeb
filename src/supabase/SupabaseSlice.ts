// good resource: https://blog.logrocket.com/using-redux-toolkits-createasyncthunk/
import { Action, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Session, User } from '@supabase/supabase-js'
import {
  signInWithPassword,
  signupWithPassword,
  UserData,
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
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData: UserData) => {
    return await signupWithPassword(userData.email, userData.password)
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
  },
})

export const supabaseReducer = supabaseSlice.reducer
