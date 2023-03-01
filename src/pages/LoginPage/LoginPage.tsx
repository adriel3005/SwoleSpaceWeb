import { Link } from 'react-router-dom'
import InputForm, { InputType } from '../../components/InputForm/InputForm'

const LoginPage = () => {
  return (
    <div>
      <InputForm inputType={InputType.Login} callbackFunction={formCallback} />
      <Link to="/Signup">Sign Up</Link>
    </div>
  )
}

function formCallback() {
  // TODO: Once user has signed in, redirect to different page with data
  console.log('Log from login page!')
}

export default LoginPage
