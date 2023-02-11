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

function App() {
  const { register, handleSubmit } = useForm<IFormInput>()

  const { heading, submitButton } = useStyles()

  const [json, setJson] = useState<string>()

  const onSubmit = (data: IFormInput) => {
    setJson(JSON.stringify(data))
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
          {...register('firstName')}
          variant="outlined"
          margin="normal"
          label="First Name"
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

export default App
