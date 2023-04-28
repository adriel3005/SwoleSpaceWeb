// https://javascript.plainenglish.io/creating-a-sign-up-form-in-react-with-typescript-516b1a172913
import './App.css'
import LoginPage from '../../pages/LoginPage/LoginPage'
import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
  Link,
  Navigate,
} from 'react-router-dom'
import SignUpPage from '../../pages/SignUpPage/SignUpPage'
import AccountPage from '../../pages/AccountPage/AccountPage'
import ForgotPasswordPage from '../../pages/ForgotPassword/ForgotPassword'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { logout, retrieveSession } from '../../supabase/SupabaseSlice'
import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core'
import { useEffect } from 'react'
import RoutinePage from '../../pages/RoutinePage/RoutinePage'
import UserRoutinePage from '../../pages/UserRoutinePage/UserRoutinePage'

function App() {
  const loading = useSelector((state: RootState) => state.supabase.loading)
  const session = useSelector((state: RootState) => state.supabase.session)
  const dispatch = useDispatch()

  // Attempt to retrieve session once
  useEffect(() => {
    if (session === null) {
      console.log('trying to retrieve session')
      dispatch(retrieveSession())
    }
  }, [])

  // TODO: We will eventually want to move out the Toolbar to its own component when it gets too complex.
  return (
    <div>
      <div className="App">
        <BrowserRouter>
          {session !== null && (
            <Box>
              <AppBar className="none" position="static">
                <Toolbar style={styling.toolbar}>
                  <Button
                    component={Link}
                    to="/UserRoutine"
                    style={styling.toolbarButton}
                  >
                    My Routines
                  </Button>
                  <Button
                    onClick={async () => {
                      console.log('dispatched logout from toolbar button')
                      await dispatch(logout())
                    }}
                    style={styling.toolbarButton}
                  >
                    Log out
                  </Button>
                </Toolbar>
              </AppBar>
            </Box>
          )}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/Signup" element={<SignUpPage />} />
            <Route path="/Account" element={<AccountPage />} />
            <Route path="/ForgotPassword" element={<ForgotPasswordPage />} />
            <Route path="/Routine" element={<RoutinePage />} />
            <Route path="/UserRoutine" element={<UserRoutinePage />} />
          </Routes>
          {!session && <Navigate to="/" replace={true} />}
        </BrowserRouter>
      </div>
    </div>
  )
}

const styling = {
  toolbar: {
    color: 'inherit',
    marginRight: 0,
    marginLeft: 'auto',
  },
  toolbarButton: {
    color: 'inherit',
  },
}

export default App
