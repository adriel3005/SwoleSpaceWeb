import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { Button, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import {
  retrieveExercises,
  retrieveRoutineExercises,
  retrieveUserRoutines,
} from '../../components/Services/Backend/SwoleBackend'
import { Link } from 'react-router-dom'
import Modal from '../../components/modals/ExerciseModal/ExerciseModal'
import { number } from 'yup'

const UserRoutinePage = () => {
  type Routines = {
    user_routine_id: string
    created_at: string
    routine_name: string
    routine_description: string
  }

  type ExerciseItem = {
    created_at: string
    exercise_description: string | null
    exercise_id: string
    exercise_name: string
    exercise_type: string
  }

  type RoutineExercise = {
    exercise_id: number
    routine_exercise_id: string
    repetitions: number
    sets: number
    user_routine_id: string
  }

  let dataSet: Routines[] | null = []
  let modalDataSet: RoutineExercise[] | null = []
  let exerciseSet: ExerciseItem[] | null = []

  const session = useSelector((state: RootState) => state.supabase.session)
  const [itemData, setItemData] = useState(dataSet)
  const [itemModalData, setItemModalData] = useState(modalDataSet)
  const [isOpen, setisOpen] = useState(false)
  // Note: retrieving all exercises like this seems like a bad practice. Is there a better way to do this?
  const [exerciseData, setExerciseData] = useState(exerciseSet)

  const toggle = () => {
    setisOpen(!isOpen)
  }
  const closeModal = () => {
    setisOpen(false)
  }

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

  async function RetrieveSpecificRoutine(routine_id: string) {
    await retrieveRoutineExercises(routine_id).then(response => {
      console.log(response.data)
      setItemModalData(response.data ?? [])
      // TODO: After we retrieve the routine exercises associated with user routine, we should display the routine
      // exercises int the modal. When the page loads, we retrieve all exercises. Let's use this exercise data
      // to retrieve from. The exercise_id is a unique field that we can use for this purpose
      toggle()
    })

    // Then we have to retrieve specific data on exercise by exercise id
    // Should we retrieve this on the first call to prevent making a second call?
  }

  function findSpecificExercise(eID: number): ExerciseItem | undefined {
    console.log(eID)
    console.log(exerciseData)
    var e = exerciseData.find(obj => {
      return obj.exercise_id.toString() === eID.toString()
    })

    console.log(e)
    return e
  }

  useEffect(() => {
    // Populate with DB items
    if (session !== null && itemData.length < 1) {
      RetrieveUserRoutines()
    }

    // Populate Exercises
    if (session !== null && itemData.length < 1) {
      retrieveExercises().then(response => {
        setExerciseData(response.data ?? [])
        console.log(exerciseData)
        console.log()
      })
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
          <Button
            onClick={() => RetrieveSpecificRoutine(element.user_routine_id)}
          >
            View
          </Button>
          {/* //TODO: <Button onClick={}>Start</Button> */}
          <hr />
        </div>
      ))}
      <div>
        <Modal
          children={itemModalData?.map((element, i) => (
            <div key={i}>
              <p>
                exercise_name:{' '}
                {findSpecificExercise(element.exercise_id)?.exercise_name}
              </p>
              <p>
                exercise_description:{' '}
                {
                  findSpecificExercise(element.exercise_id)
                    ?.exercise_description
                }
              </p>
              <p>exercise_id: {element.exercise_id}</p>
              <p>repetitions: {element.repetitions}</p>
              <p>sets: {element.sets}</p>
              <p>routine_exercise_id: {element.routine_exercise_id}</p>
              <hr />
            </div>
          ))}
          isOpen={isOpen}
          toggle={toggle}
        ></Modal>
      </div>
    </div>
  )
}

export default UserRoutinePage
