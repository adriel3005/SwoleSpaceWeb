import { Container, makeStyles, Typography } from '@material-ui/core'
import { render } from '@testing-library/react'
import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  useState,
  useEffect,
} from 'react'
import { JsxElement } from 'typescript'
import { string } from 'yup'
import { supabase } from '../../components/InputForm/InputForm'

const AccountPage = () => {
  let listItems: JSX.Element[] | undefined

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
    // console.log(data)
    //console.log(await supabase.from('forecasts').select('*'))

    //return { messages: data ?? [] }
    setWeatherData(data ?? [])

    console.log('this was ran')
    console.log(weatherData)
    // listItems = data?.map(element => {
    //   return (
    //     <ul key={element.Date}>
    //       <li>{element.Date}</li>
    //       <li>{element.TemperatureC}</li>
    //       <li>{element.TemperatureF}</li>
    //       <li>{element.Summary}</li>
    //     </ul>
    //   )
    // })

    // return <div>{listItems}</div>
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
