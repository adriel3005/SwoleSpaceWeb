import { InputType } from '../../components/forms/EmailForm/EmailForm'
import EmailForm from '../../components/forms/EmailForm/EmailForm'

const ForgotPasswordPage = () => {
  return (
    <div>
      <EmailForm inputType={InputType.ForgotPassword}></EmailForm>
    </div>
  )
}

export default ForgotPasswordPage
