import { Container, Typography } from '@material-ui/core'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, redirect } from 'react-router-dom'
import { RootState } from '../../app/store'
import { retrieveExercises } from '../../components/Services/Backend/SwoleBackend'
const AccountPage = () => {
  let dataSet:
    | {
        Date: string
        Summary: string | null
        TemperatureC: number | null
        TemperatureF: number | null
      }[]
    | null = []

  const [weatherData, setWeatherData] = useState(dataSet)
  const [loading, setLoading] = useState(false)
  const session = useSelector((state: RootState) => state.supabase.session)

  // Retrieve forecasts only once
  useEffect(() => {
    RenderForecasts()
  }, [])

  // Don't allow user to access this if session is null
  if (session === null) {
    console.log('null session: ' + session)
    return <Navigate to="/" />
  }

  async function RenderForecasts() {
    setLoading(true)

    await retrieveExercises().then(response => {
      setWeatherData(response.data ?? [])
    })

    setLoading(false)
  }

  return (
    <Container>
      <Typography>Account Page</Typography>
      {loading && <p>Loading...</p>}
      <>
        {weatherData?.map((element, i) => (
          <div key={i}>
            Element {i}
            <br />
            <p>Date: {element.Date}</p>
            <p>Temp F: {element.TemperatureF}</p>
            <p>Temp C: {element.TemperatureC}</p>
            <p>Summary: {element.Summary}</p>
            <hr />
          </div>
        ))}
      </>
    </Container>
  )
}

export default AccountPage
