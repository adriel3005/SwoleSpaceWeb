// https://www.thisdot.co/blog/how-to-create-reusable-form-components-with-react-hook-forms-and-typescript
// https://www.section.io/engineering-education/how-to-create-a-reusable-react-form/#:~:text=A%20Reusable%20component%20is%20a,Inside%20the%20Input.

import React, { useContext } from 'react'
import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Button,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { UserData } from '../../supabase/SupabaseService'
import { RootState } from '../../app/store'
import { login, signup } from '../../supabase/SupabaseSlice'
import type {} from 'redux-thunk/extend-redux'

interface InputInterface {
  inputType: InputType
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
  const { register, handleSubmit } = useForm<UserData>()
  const { heading, submitButton } = useStyles()
  const loading = useSelector((state: RootState) => state.supabase.loading)
  const dispatch = useDispatch()

  const onSubmit = async (formData: UserData) => {
    try {
      switch (userInput.inputType) {
        case InputType.Login:
          dispatch(login(formData))
          break
        case InputType.SignUp:
          dispatch(signup(formData))
          break
        default:
          console.log('Input type undefined')
          break
      }
    } catch (error) {
      console.log('error caught: ' + error)
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
