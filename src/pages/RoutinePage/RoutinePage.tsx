import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import InputForm, {
  InputType,
} from '../../components/forms/InputForm/InputForm'
import { RootState } from '../../app/store'
import { Button, Typography } from '@material-ui/core'
import { useState } from 'react'
import Modal from '../../components/modals/ExerciseModal/ExerciseModal'

const RoutinePage = () => {
  type Item = {
    itemName: string
    repetitions: number
    sets: number
  }

  let dataSet: Item[] | null = []
  const session = useSelector((state: RootState) => state.supabase.session)
  const [itemData, setItemData] = useState(dataSet)
  const [isOpen, setisOpen] = useState(false)

  const toggle = () => {
    console.log('toggling')
    setisOpen(!isOpen)
  }

  // TODO: look into why this sends to Account when signed in
  //   if (session === null) {
  //     console.log(session)
  //     return <Navigate to="/" />
  //   }

  // Add hardcoded item for now
  function AddItem() {
    let newItem: Item = { itemName: 'Item Name', repetitions: 3, sets: 3 }
    setItemData(itemData.concat(newItem))
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
        <Button onClick={AddItem}>Add</Button>
        <Button onClick={toggle}>Toggle</Button>
      </div>
      <Modal isOpen={isOpen} toggle={toggle}></Modal>
      {itemData?.map((element, i) => (
        <div key={i}>
          Item {i}
          <br />
          <p>Name: {element.itemName}</p>
          <p>Reps: {element.repetitions}</p>
          <p>Sets: {element.sets}</p>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default RoutinePage
