// https://javascript.plainenglish.io/creating-a-sign-up-form-in-react-with-typescript-516b1a172913
import './App.css'
import LoginPage from '../../pages/LoginPage/LoginPage'
import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from 'react-router-dom'
import SignUpPage from '../../pages/SignUpPage/SignUpPage'
import AccountPage from '../../pages/AccountPage/AccountPage'
import ForgotPasswordPage from '../../pages/ForgotPassword/ForgotPassword'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Signup" element={<SignUpPage />} />
          <Route path="/Account" element={<AccountPage />} />
          <Route path="/ForgotPassword" element={<ForgotPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
