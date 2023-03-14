import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Button,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { UserData } from '../../../supabase/SupabaseService'
import { RootState } from '../../../app/store'
import { forgotPassword, login, signup } from '../../../supabase/SupabaseSlice'
import type {} from 'redux-thunk/extend-redux'

interface InputInterface {
  inputType: InputType
}

// TODO: Should probably look into moving this logic out. Otherwise not as reusable
// As of now, it isn't as messy since it is only used for reset password... but having to add logic and conditions
// for other use-cases is not neat.

export enum InputType {
  ForgotPassword = 'Forgot Password',
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
        // case InputType.ForgotPassword:
        //   dispatch(login(formData))
        //   break
        // case InputType.SignUp:
        //   dispatch(signup(formData))
        //   break
        case InputType.ForgotPassword:
          console.log('dispatching forgot password')
          dispatch(forgotPassword(formData.email))
          break
        default:
          console.log('Input type undefined')
          break
      }
    } catch (error) {
      console.log('error caught: ' + error)
    }
  }

  function SubmitButton(formType: InputInterface) {
    if (formType.inputType === InputType.ForgotPassword) {
      return (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={submitButton}
        >
          Reset Password
        </Button>
      )
    } else {
      return (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={submitButton}
        ></Button>
      )
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
        <SubmitButton inputType={InputType.ForgotPassword}></SubmitButton>
      </form>
    </Container>
  )
}

export default InputForm
