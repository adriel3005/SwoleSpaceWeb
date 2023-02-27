import { Link } from 'react-router-dom'
import InputForm, { InputType } from '../../components/InputForm/InputForm'

const SignUpPage = () => {
  return (
    <div>
      <InputForm inputType={InputType.SignUp} />
      <Link to="/">Login</Link>
    </div>
  )
}

export default SignUpPage
