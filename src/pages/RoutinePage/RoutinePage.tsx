import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { Button, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import Modal from '../../components/modals/ExerciseModal/ExerciseModal'
import {
  addRoutineExercise,
  retrieveExercises,
} from '../../components/Services/Backend/SwoleBackend'
import { v4 as uuidv4 } from 'uuid'

const RoutinePage = () => {
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

  let dataSet: RoutineExercise[] | null = []
  let modalDataSet: ExerciseItem[] | null = []
  const session = useSelector((state: RootState) => state.supabase.session)
  const [itemData, setItemData] = useState(dataSet)
  const [itemModalData, setItemModalData] = useState(modalDataSet)
  const [isOpen, setisOpen] = useState(false)

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

  async function PopulateModal() {
    await retrieveExercises().then(response => {
      console.log(response.data)
      setItemModalData(response.data ?? [])
    })
  }

  useEffect(() => {
    // Populate Modal with DB items
    if (session !== null && itemModalData.length < 1) {
      PopulateModal()
      console.log('Modal was populated')
    }
  })

  async function SaveRoutine() {
    try {
      for (let index = 0; index < itemData.length; index++) {
        const e = itemData[index]
        await addRoutineExercise(
          e.uuid,
          e.exercise.exercise_id,
          e.repetitions,
          e.sets,
          session?.user.id!
        )
      }
      alert('Routine Added')
      // TODO: redirect user to page with Routines
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return (
    <div>
      <Typography>Routine Page</Typography>
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
        <Button onClick={toggle}>Available Items</Button>
      </div>
      <Modal
        children={itemModalData?.map((element, i) => (
          <div key={i}>
            Item {i}
            <br />
            <p>created_at: {element.created_at}</p>
            <p>exercise_description: {element.exercise_description}</p>
            <p>exercise_id: {element.exercise_id}</p>
            <p>exercise_name: {element.exercise_name}</p>
            <p>exercise_type: {element.exercise_type}</p>
            <Button
              onClick={() => {
                console.log(element)
                let item: RoutineExercise = {
                  uuid: uuidv4(),
                  exercise: element,
                  repetitions: 8,
                  sets: 3,
                }
                setItemData(itemData.concat(item))
                closeModal()
              }}
            >
              Add Item
            </Button>
            <hr />
          </div>
        ))}
        isOpen={isOpen}
        toggle={toggle}
      ></Modal>
      {itemData?.map((element, i) => (
        <div key={i}>
          Item {i}
          <br />
          <p>Exercise: {element.exercise.exercise_name}</p>
          <p>Description: {element.exercise.exercise_description}</p>
          <div>
            <p>Repetitions</p>
            <input
              type="number"
              min="0"
              max="200"
              value={element.repetitions}
              onChange={e => {
                // TODO: This seems very slow. Is there a more efficient way to do this?
                let updateArr = [...itemData]
                updateArr[i].repetitions = e.target.valueAsNumber
                setItemData(updateArr)
              }}
            />
          </div>
          <div>
            <p>Sets:</p>
            <input
              type="number"
              min="0"
              max="50"
              value={element.sets}
              onChange={e => {
                // TODO: This seems very slow. Is there a more efficient way to do this?
                let updateArr = [...itemData]
                updateArr[i].sets = e.target.valueAsNumber
                setItemData(updateArr)
              }}
            />
          </div>
          <hr />
        </div>
      ))}
      <div>
        <Button onClick={SaveRoutine}>Save Test</Button>
      </div>
    </div>
  )
}

export default RoutinePage
