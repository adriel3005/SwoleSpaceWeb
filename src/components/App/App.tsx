// https://javascript.plainenglish.io/creating-a-sign-up-form-in-react-with-typescript-516b1a172913
import './App.css'
import LoginPage from '../../pages/LoginPage/LoginPage'
import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
  Link,
} from 'react-router-dom'
import SignUpPage from '../../pages/SignUpPage/SignUpPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Signup" element={<SignUpPage />} />
        </Routes>
        <Link to="/Signup">Sign Up</Link>
      </BrowserRouter>
    </div>
  )
}

export default App
