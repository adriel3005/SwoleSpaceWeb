import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/App/App'
import reportWebVitals from './reportWebVitals'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createClient } from '@supabase/supabase-js'
import { Database } from '../src/types/forecasts'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()


const supabase = createClient<Database>('url', 'key')

export async function getForecasts() {
  //return await supabase.from('forecasts').select()
  const { data, error } = await supabase.from('forecasts').select('*')
  console.log(data)
  console.log(error)

  console.log(await supabase.from('forecasts').select('*'))

  //return { messages: data ?? [] }
}
getForecasts()
//console.log(getForecasts())

type forecastsResponse = Awaited<ReturnType<typeof getForecasts>>
//export type forecastsResponseSuccess = forecastsResponse['data']
//export type forecastsResponseError = forecastsResponse['error']
