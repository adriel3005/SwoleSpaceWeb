import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import InputForm, { InputType } from '../../components/InputForm/InputForm'
import { RootState } from '../../app/store'

const LoginPage = () => {
  const session = useSelector((state: RootState) => state.supabase.session)

  if (session !== null) {
    console.log(session)
    return <Navigate to="/Account" />
  }

  return (
    <div>
      <InputForm inputType={InputType.Login} />
      <Link to="/Signup">Sign Up</Link>
    </div>
  )
}

export default LoginPage
