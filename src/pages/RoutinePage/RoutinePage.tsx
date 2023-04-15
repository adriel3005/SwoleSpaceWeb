import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import InputForm, {
  InputType,
} from '../../components/forms/InputForm/InputForm'
import { RootState } from '../../app/store'
import { Button, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import Modal from '../../components/modals/ExerciseModal/ExerciseModal'
import { retrieveExercises } from '../../components/Services/Backend/SwoleBackend'

const RoutinePage = () => {
  type Item = {
    itemName: string
    repetitions: number
    sets: number
  }

  type ExerciseItem = {
    created_at: string
    exercise_description: string | null
    exercise_id: number
    exercise_name: string
    exercise_type: string
  }

  let dataSet: ExerciseItem[] | null = []
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

  function AddItem(item: Item) {
    //setItemData(itemData.concat(item))
    closeModal()
  }

  // TODO: this should be moved out to own class where we retrieve the data.
  // this data should then populate the modal
  // Add hardcoded item for now
  function AddModalItem() {
    let newItem: Item = { itemName: 'Item Name', repetitions: 3, sets: 3 }
    //setItemModalData(itemModalData.concat(newItem))

    // TODO: Retrieve From backend and populate
  }

  async function PopulateModal() {
    await retrieveExercises().then(response => {
      console.log(response.data)
      setItemModalData(response.data ?? [])
    })
  }

  useEffect(() => {
    // Add 10 dummy items
    if (session !== null && itemModalData.length < 1) {
      PopulateModal()
      console.log('Modal was populated')
      //AddModalItem()
    }
  })

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
        <Button onClick={toggle}>Toggle</Button>
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
                setItemData(itemData.concat(element))
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
          <p>created_at: {element.created_at}</p>
          <p>exercise_description: {element.exercise_description}</p>
          <p>exercise_id: {element.exercise_id}</p>
          <p>exercise_name: {element.exercise_name}</p>
          <p>exercise_type: {element.exercise_type}</p>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default RoutinePage
