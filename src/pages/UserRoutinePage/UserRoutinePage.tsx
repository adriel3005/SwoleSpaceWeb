import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { Button, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import Modal from '../../components/modals/ExerciseModal/ExerciseModal'
import {
  addRoutineExercise,
  retrieveExercises,
  retrieveUserRoutines,
} from '../../components/Services/Backend/SwoleBackend'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'
import { fontWeight } from '@material-ui/system'

const UserRoutinePage = () => {
  type ExerciseItem = {
    created_at: string
    exercise_description: string | null
    exercise_id: string
    exercise_name: string
    exercise_type: string
  }

  type RoutineExercise = {
    uuid: string
    exercise: ExerciseItem
    repetitions: number
    sets: number
  }

  type Routines = {
    user_routine_id: string
    created_at: string
    routine_name: string
    routine_description: string
  }

  let dataSet: Routines[] | null = []
  const session = useSelector((state: RootState) => state.supabase.session)
  const [itemData, setItemData] = useState(dataSet)

  //TODO: look into why this sends to Account when signed in
  if (session === null) {
    console.log(session)
    //return <Navigate to="/" />
  }

  async function RetrieveUserRoutines() {
    // TODO: retrieve user routine exercises created
    await retrieveUserRoutines(session?.user.id!).then(response => {
      console.log(response.data)
      setItemData(response.data ?? [])
    })
  }

  useEffect(() => {
    // Populate Modal with DB items
    if (session !== null && itemData.length < 1) {
      RetrieveUserRoutines()
    }
  })

  return (
    <div>
      <Typography>User Routine Page</Typography>
      {/* Add super generic item  */}
      <div
        style={{
          color: 'inherit',
          marginRight: 0,
          marginLeft: 'auto',
          alignItems: 'end',
          display: 'table',
        }}
      >
        <Button component={Link} to="/Routine">
          Create New Routine
        </Button>
      </div>
      {itemData?.map((element, i) => (
        <div key={i}>
          <hr />
          <h3 style={{ fontWeight: 'normal', lineHeight: '0' }}>
            {element.routine_name}
          </h3>
          <h5 style={{ fontWeight: 'normal', lineHeight: '1' }}>
            {element.routine_description}
          </h5>
          <p>Routine ID: {element.user_routine_id}</p>
          <p>Created At: {element.created_at}</p>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default UserRoutinePage
