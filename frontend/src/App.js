import React from 'react'
import { Route,Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Login from './Pages/Login'
import EmailVerify from './Pages/EmailVerify'
import ForgotPassword from './Pages/ForgotPassword'
import NewPasword from './Pages/NewPasword'
import {ToastContainer} from 'react-toastify'
import Instructions from './Pages/Instructions'
import QuizComponent from './Components/QuizComponent'
import Profile from './Pages/Profile'
const App = () => {
  return (
    <div className='container'>
        <ToastContainer />
        <Routes>
          <Route path='/' element = {<HomePage />}/>
          <Route path='/login' element = {<Login />}/>
          <Route path='/verifyEmail' element = {<EmailVerify />}/>
          <Route path='/forgotPassword' element = {<ForgotPassword />}/>
          <Route path='/newPassword' element = {<NewPasword />}/>
          <Route path='/instructions' element = {<Instructions />}/>
          <Route path='/quiz' element={<QuizComponent />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
    </div>
  )
}

export default App