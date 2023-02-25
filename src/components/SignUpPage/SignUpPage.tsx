import React from 'react'
import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Button,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Database } from '../../types/forecasts'

const supabase = createClient<Database>('placeholder', 'placeholder')

const useStyles = makeStyles(theme => ({
  heading: {
    textAlign: 'center',
    margin: theme.spacing(1, 0, 4),
  },
  submitButton: {
    marginTop: theme.spacing(4),
  },
}))

interface IFormInput {
  email: string
  firstName: string
  password: string
}

const SignUpPage = () => {
  const { register, handleSubmit } = useForm<IFormInput>()

  const { heading, submitButton } = useStyles()

  const onSubmit = async (formData: IFormInput) => {
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    })

    if (!error) {
      alert('Please confirm your registration through your email')
    } else {
      alert(error)
    }
  }

  return (
    <Container>
      <Typography>Sign up</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          {...register('email')}
          variant="outlined"
          margin="normal"
          label="Email"
          fullWidth
          required
        />
        <TextField
          {...register('password')}
          variant="outlined"
          margin="normal"
          label="Password"
          type="password"
          fullWidth
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={submitButton}
        >
          Sign Up
        </Button>
      </form>
    </Container>
  )
}

export default SignUpPage
