import { configureStore } from '@reduxjs/toolkit'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import InputForm, { InputType } from '../../components/InputForm/InputForm'
import { RootState } from '../../app/store'

const LoginPage = () => {
  const [toAccountPage, setToAccountPage] = useState(false)

  const session = useSelector((state: RootState) => state.supabase.session)
  const dispatch = useDispatch()

  function formCallback() {
    // TODO: check if user has signed in successfully
    setToAccountPage(true)
  }

  if (session !== null) {
    console.log(session)
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
