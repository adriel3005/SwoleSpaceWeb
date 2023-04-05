import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import InputForm, {
  InputType,
} from '../../components/forms/InputForm/InputForm'
import { RootState } from '../../app/store'
import { Typography } from '@material-ui/core'

const RoutinePage = () => {
  const session = useSelector((state: RootState) => state.supabase.session)

  if (session === null) {
    console.log(session)
    return <Navigate to="/" />
  }

  return (
    <div>
      <Typography>Routine Page</Typography>
    </div>
  )
}

export default RoutinePage
