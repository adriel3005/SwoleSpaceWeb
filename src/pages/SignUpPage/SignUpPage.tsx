import React from 'react'
import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Button,
} from '@material-ui/core'
import InputForm, { InputType } from '../../components/InputForm/InputForm'

const SignUpPage = () => {
  return (
    <Container>
      <InputForm inputType={InputType.SignUp} />
    </Container>
  )
}

export default SignUpPage
