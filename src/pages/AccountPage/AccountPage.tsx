import { Container, Typography } from '@material-ui/core'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, redirect } from 'react-router-dom'
import { RootState } from '../../app/store'

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

  // TODO: Find a way to store session in cache so it isn't lost on refresh

  // Don't allow user to access this if session is null
  if (session === null) {
    console.log('null session: ' + session)
    return <Navigate to="/" />
  }

  async function RenderForecasts() {
    setLoading(true)

    const config = {
      headers: {},
    }

    axios
      .get(process.env.REACT_APP_SWOLE_BACKEND_URL! + '/WeatherForecast', {
        headers: { Authorization: session?.access_token },
      })
      .then(response => {
        setWeatherData(response.data ?? [])
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          console.log('Account Error: ' + error.response.data.message)

          // TODO: send user back to login page
        } else if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data)
          alert(error.response.data.message)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
          alert('Error: ' + error.message)
        }
        console.log(error.config)
      })
    setLoading(false)
  }

  return (
    <Container>
      {}
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
