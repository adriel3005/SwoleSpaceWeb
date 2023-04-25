import axios from 'axios'
import { store } from '../../../app/store'
import { v4 as uuidv4 } from 'uuid'

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
// reID requires UUID
export async function addRoutineExercise(
  reID: string,
  eID: string,
  rep: number,
  set: number
): Promise<any> {
  return await axios.post(
    process.env.REACT_APP_SWOLE_BACKEND_URL! + '/AddRoutineExercise',
    {
      routine_exercise_id: reID,
      exercise_id: eID,
      repetition: rep,
      sets: set,
    },
    {
      headers: {
        Authorization: store.getState().supabase.session?.access_token,
      },
    }
  )
}
