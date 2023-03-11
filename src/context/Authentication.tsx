import {
  AuthResponse,
  AuthSession,
  createClient,
  Session,
  User,
  UserIdentity,
} from '@supabase/supabase-js'
import React, { useReducer, useState } from 'react'
import {
  Action,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { Database } from '../types/forecasts'

//redux.js recommends to avoid using action types
// see: https://redux.js.org/usage/usage-with-typescript#avoid-action-type-unions

interface Auth {
  session: Session | null
  userData: User | null
}

type UserData = {
  email: string
  password: string
}

export interface UserAction extends Action {
  type: string
  payload?: UserData
}

const initialState: Auth = { session: null, userData: null }

const supabase = createClient<Database>()

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // will result in an action of type `auth/increment`
    // login(state, UserAction) {
    //   const { data, error } = await supabase.auth.signInWithPassword({
    //     email: UserAction.payload?.email,
    //     password: UserAction.payload?.password,
    //   })
    //   // state values can be modified mutably thanks to `immer` integration
    //   state.session = data?.session
    // },
    // incrementBy(state, { payload }: PayloadAction<number>) {
    //   state.value += payload
    // },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      if (!action.payload.error) {
        // update session if no error
        state.session = action.payload.data.session
      }
    })
  },
})

const fetchUserById = createAsyncThunk(
  'auth/login',
  async (userData: UserData) => {
    return await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password,
    })
  }
)

export const AuthContext = React.createContext({ initialState, authSlice })

const Authentication = () => {
  return (
    <AuthContext.Provider
      value={{ initialState, authSlice }}
    ></AuthContext.Provider>
  )
}

export default Authentication
