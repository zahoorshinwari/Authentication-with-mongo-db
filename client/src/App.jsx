import { BrowserRouter , Routes, Route} from 'react-router-dom'
import Signup from './Signup.jsx'
import Login from './Login.jsx'
import Home from './Home.jsx'
import ForgotPassword from './ForgotPassword.jsx'
import ResetPassword from './ResetPassword.jsx'
import Dashboard from './Dashboard.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/forgotpassword' element={<ForgotPassword />}></Route>
        <Route path='/resetPassword/:token' element={<ResetPassword />}></Route>
        <Route path='/dashboard' element={<Dashboard />} ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
