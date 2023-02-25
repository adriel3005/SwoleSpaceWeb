// https://javascript.plainenglish.io/creating-a-sign-up-form-in-react-with-typescript-516b1a172913
import React from 'react'
import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Button,
} from '@material-ui/core'
import './App.css'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Database } from '../../types/forecasts'
import SignUpPage from '../SignUpPage/SignUpPage'

let test = true

function App() {
  return <SignUpPage />
}

export default App
