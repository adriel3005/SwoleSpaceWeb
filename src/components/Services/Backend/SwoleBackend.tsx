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
  urID: string,
  eID: string,
  rep: number,
  set: number,
  userID: string,
  eO: number
): Promise<any> {
  return await axios.post(
    process.env.REACT_APP_SWOLE_BACKEND_URL! + '/AddRoutineExercise',
    {
      routine_exercise_id: reID,
      user_routine_id: urID,
      exercise_id: eID,
      repetition: rep,
      sets: set,
      user_id: userID,
      exercise_order: eO,
    },
    {
      headers: {
        Authorization: store.getState().supabase.session?.access_token,
      },
    }
  )
}

// urID requires UUID
// userID requires UUID
export async function addUserRoutine(
  urID: string,
  userID: string
): Promise<any> {
  return await axios.post(
    process.env.REACT_APP_SWOLE_BACKEND_URL! + '/AddUserRoutine',
    {
      user_routine_id: urID,
      user_id: userID,
    },
    {
      headers: {
        Authorization: store.getState().supabase.session?.access_token,
      },
    }
  )
}

export async function retrieveUserRoutines(userID: string): Promise<any> {
  return await axios.get(
    process.env.REACT_APP_SWOLE_BACKEND_URL! + '/GetUserRoutines',
    {
      params: { userID: userID },
      headers: {
        Authorization: store.getState().supabase.session?.access_token,
      },
    }
  )
}
