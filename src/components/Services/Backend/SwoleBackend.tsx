import axios from 'axios'
import { store } from '../../../app/store'

export async function retrieveWeather(): Promise<any> {
  return await axios.get(
    process.env.REACT_APP_SWOLE_BACKEND_URL! + '/WeatherForecast',
    {
      headers: {
        Authorization: store.getState().supabase.session?.access_token,
      },
    }
  )
}

export async function retrieveExercises(): Promise<any> {
  return await axios.get(
    process.env.REACT_APP_SWOLE_BACKEND_URL! + '/GetExercises',
    {
      headers: {
        Authorization: store.getState().supabase.session?.access_token,
      },
    }
  )
}
