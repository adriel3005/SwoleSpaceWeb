import React from 'react'
import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Button,
} from '@material-ui/core'
import InputForm, { InputType } from '../../components/InputForm/InputForm'

const LoginPage = () => {
  return (
    <Container>
      <InputForm inputType={InputType.Login} />
    </Container>
  )
}

export default LoginPage
