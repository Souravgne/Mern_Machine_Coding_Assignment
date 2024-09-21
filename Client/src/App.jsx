import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom' // Import Navigate
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'

function App() {
  return (
    <div >
      <Routes>
        {/* Redirect from / to /login */}
        <Route path='/' element={<Navigate to="/login" />} /> 
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
