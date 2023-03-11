// good resource: https://blog.logrocket.com/using-redux-toolkits-createasyncthunk/
import { Action, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Session, User } from '@supabase/supabase-js'
import { Interface } from 'readline'

import { signInWithPassword, UserData } from './SupabaseService'

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

export const supabaseSlice = createSlice({
  name: 'supabase',
  initialState,
  reducers: {},
  // reducers: {
  //   login(state, param: UserAction) {
  //     const promise = signInWithPassword(
  //       param.payload?.email,
  //       param.payload?.password
  //     )
  //     promise.then(
  //       value => {
  //         console.log(value.data)
  //         state.session = value.data.session
  //         state.userData = value.data.user
  //       },
  //       () => {
  //         console.log('failed login promise')
  //       }
  //     )
  //   },
  // },
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
  },
})

const { actions, reducer } = supabaseSlice
//export const { login } = actions
export const supabaseReducer = supabaseSlice.reducer
