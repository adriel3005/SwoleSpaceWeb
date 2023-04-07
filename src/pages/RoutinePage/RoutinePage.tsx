import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import InputForm, {
  InputType,
} from '../../components/forms/InputForm/InputForm'
import { RootState } from '../../app/store'
import { Button, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import Modal from '../../components/modals/ExerciseModal/ExerciseModal'

const RoutinePage = () => {
  type Item = {
    itemName: string
    repetitions: number
    sets: number
  }

  let dataSet: Item[] | null = []
  let modalDataSet: Item[] | null = []
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

  // TODO: look into why this sends to Account when signed in
  //   if (session === null) {
  //     console.log(session)
  //     return <Navigate to="/" />
  //   }

  function AddItem(item: Item) {
    setItemData(itemData.concat(item))
    closeModal()
  }

  // TODO: this should be moved out to own class where we retrieve the data.
  // this data should then populate the modal
  // Add hardcoded item for now
  function AddModalItem() {
    let newItem: Item = { itemName: 'Item Name', repetitions: 3, sets: 3 }
    setItemModalData(itemModalData.concat(newItem))
  }

  useEffect(() => {
    // Add 10 dummy items
    if (itemModalData.length < 10) {
      AddModalItem()
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
            <p>Name: {element.itemName}</p>
            <p>Reps: {element.repetitions}</p>
            <p>Sets: {element.sets}</p>
            <Button onClick={() => AddItem(element)}>Add Item</Button>
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
