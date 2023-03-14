import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import InputForm, {
  InputType,
} from '../../components/forms/EmailForm/EmailForm'
import { RootState } from '../../app/store'
import EmailForm from '../../components/forms/EmailForm/EmailForm'
import { supabase } from '../../supabase/SupabaseService'

const ForgotPasswordPage = () => {
  // supabase.auth.onAuthStateChange((event, session) => {
  //   if (event === 'PASSWORD_RECOVERY') {
  //     //console.log('PASSWORD_RECOVERY', session)
  //     console.log('password recovery')
  //     // show screen to update user's password
  //     //showPasswordResetScreen(true)
  //   }
  // })

  return (
    <div>
      <EmailForm inputType={InputType.ForgotPassword}></EmailForm>
    </div>
  )
}

export default ForgotPasswordPage
