// https://www.thisdot.co/blog/how-to-create-reusable-form-components-with-react-hook-forms-and-typescript
// https://www.section.io/engineering-education/how-to-create-a-reusable-react-form/#:~:text=A%20Reusable%20component%20is%20a,Inside%20the%20Input.

import React from 'react'
import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Button,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { createClient } from '@supabase/supabase-js'
import { Database } from '../../types/forecasts'

const supabase = createClient<Database>('placeholder', 'placeholder')

interface IFormInput {
  email: string
  password: string
}

interface InputInterface {
  inputType: InputType
  callbackFunction?: () => void
}

export enum InputType {
  Login = 'Login',
  SignUp = 'Sign up',
}

const useStyles = makeStyles(theme => ({
  heading: {
    textAlign: 'center',
    margin: theme.spacing(1, 0, 4),
  },
  submitButton: {
    marginTop: theme.spacing(4),
  },
}))

const InputForm: React.FC<InputInterface> = (userInput: InputInterface) => {
  const { register, handleSubmit } = useForm<IFormInput>()
  // Styling
  const { heading, submitButton } = useStyles()

  const onSubmit = async (formData: IFormInput) => {
    try {
      switch (userInput.inputType) {
        case InputType.Login:
          await signInUser(formData)
          break

        case InputType.SignUp:
          // TODO: copy similar login structure
          await registerUser(formData)
          break

        default:
          console.log('Input type undefined')
          break
      }

      // callback if no error
      formCallback()
    } catch (error) {
      console.log('error caught')
    }
  }

  function formCallback() {
    if (typeof userInput.callbackFunction !== 'undefined') {
      userInput.callbackFunction()
    }
  }

  const registerUser = async (formData: IFormInput) => {
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    })
    if (!error) {
      alert('Please confirm your registration through your email')
    } else {
      alert(error)
    }
  }

  const signInUser = async (formData: IFormInput) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })

    if (!error) {
      alert('Successfully logged in!')
    } else {
      alert(error)
      // TODO: there should be a better way than to throw an error. If an error is thrown
      // every time a user can't sign in then this could overwhelm logging
      throw error
    }
  }

  return (
    <Container>
      <Typography>{userInput.inputType}</Typography>
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
          {userInput.inputType}
        </Button>
      </form>
    </Container>
  )
}

export default InputForm
