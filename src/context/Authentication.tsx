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
import { type } from 'os'

//redux.js recommends to avoid using action types
// see: https://redux.js.org/usage/usage-with-typescript#avoid-action-type-unions

const AuthContext = React.createContext()

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

const supabase = createClient<Database>('placeholder', 'placeholder')

const Authentication = () => {
  const initialState: Auth = { session: null, userData: null }

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

  /*
  const [userInfo, setUserInfo] = useState(defaultUser)

  async function SignInUser() {
    const { error } = await supabase.auth.signInWithPassword({
      email: userInfo.email,
      password: userInfo.password,
    })

    if (!error) {
      alert('Successfully logged in!')
    } else {
      alert(error)
      // TODO: there should be a better way than to throw an error. If an error is thrown
      // every time a user can't sign in then this could overwhelm logging
      throw error
    }
  }*/

  return (
    <div>
      <AuthContext.Provider value={}></AuthContext.Provider>
    </div>
  )
}

export default Authentication
