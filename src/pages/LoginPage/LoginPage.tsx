import { Link } from 'react-router-dom'
import InputForm, { InputType } from '../../components/InputForm/InputForm'

const LoginPage = () => {
  return (
    <div>
      <InputForm inputType={InputType.Login} />
      <Link to="/Signup">Sign Up</Link>
    </div>
  )
}

export default LoginPage
