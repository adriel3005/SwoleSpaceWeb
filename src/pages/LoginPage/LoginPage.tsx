import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import InputForm, { InputType } from '../../components/InputForm/InputForm'

const LoginPage = () => {
  const [toAccountPage, setToAccountPage] = useState(false)

  function formCallback() {
    // TODO: check if user has signed in successfully
    setToAccountPage(true)
  }

  if (toAccountPage === true) {
    return <Navigate to="/Account" />
  }

  return (
    <div>
      <InputForm inputType={InputType.Login} callbackFunction={formCallback} />
      <Link to="/Signup">Sign Up</Link>
    </div>
  )
}

export default LoginPage
