import React from 'react'
import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Button,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
import InputForm, { InputType } from '../../components/InputForm/InputForm'

const useStyles = makeStyles(theme => ({
  heading: {
    textAlign: 'center',
    margin: theme.spacing(1, 0, 4),
  },
  submitButton: {
    marginTop: theme.spacing(4),
  },
}))

const SignUpPage = () => {
  return (
    <Container>
      <InputForm inputType={InputType.SignUp} />
    </Container>
  )
}

export default SignUpPage
