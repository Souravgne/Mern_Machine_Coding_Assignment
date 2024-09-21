import React, { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom' // Import Navigate
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'
import RefreshHandler from './components/RefreshHandler'

function App() {
  const [isAuthenticated , setIsAuthenticated] = useState(false);
  const PrivateRoute = ({element})=>{
    return isAuthenticated ?element :<Navigate to="/login"/>
  }
  return (
    <div className='dark:bg-slate-800'>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated }/>
      <Routes>
        {/* Redirect from / to /login */}
        <Route path='/' element={<Navigate to="/login" />} /> 
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<PrivateRoute element={<Home />}/>} />
      </Routes>
    </div>
  )
}

export default App
