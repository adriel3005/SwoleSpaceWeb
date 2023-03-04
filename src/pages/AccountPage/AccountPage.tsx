import { Container, Typography } from '@material-ui/core'
import { useState, useEffect } from 'react'

import { supabase } from '../../components/InputForm/InputForm'

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

  // Retrieve forecasts only once
  useEffect(() => {
    RenderForecasts()
  }, [])

  async function RenderForecasts() {
    const { data, error } = await supabase.from('forecasts').select('*')
    // render data to user
    setWeatherData(data ?? [])
  }

  return (
    <Container>
      <Typography>Account Page</Typography>
      <p>Todo: Show sample DB data</p>
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
