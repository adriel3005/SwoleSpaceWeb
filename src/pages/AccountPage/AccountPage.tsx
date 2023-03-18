import { Container, Typography } from '@material-ui/core'
import axios from 'axios'
import { useState, useEffect } from 'react'

import { supabase } from '../../supabase/SupabaseService'

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

  // Retrieve forecasts only once
  useEffect(() => {
    RenderForecasts()
  }, [])

  async function RenderForecasts() {
    setLoading(true)
    console.log('before axios')
    axios
      .get(process.env.REACT_APP_SWOLE_BACKEND_URL! + '/WeatherForecast')
      .then(response => {
        console.log('got a response from axios')
        console.log(response.data)
      })
    console.log('after axios')

    // const { data, error } = await supabase.from('forecasts').select('*')
    // // render data to user
    // setWeatherData(data ?? [])
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
