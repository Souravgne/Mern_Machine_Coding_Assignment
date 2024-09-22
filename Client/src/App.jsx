import React, { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom' // Import Navigate
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'
import RefreshHandler from './components/RefreshHandler'
import CreateEmployee from './components/CreateEmployee'
import GetEmployees from './components/GetEmployees'
import UpdateEmployee from './components/UpdateEmployee'
import EditEmployee from './components/EditEmployee'

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
        <Route path='/createemployee' element={<PrivateRoute element={<CreateEmployee />}/>} />
        <Route path='/employees' element={<PrivateRoute element={<GetEmployees />}/>} />
        <Route path='/employee/:id' element={<PrivateRoute element={<UpdateEmployee />}/>} />
        <Route path="/editemployee/:id" element={<PrivateRoute element={<EditEmployee />}/> } />

      </Routes>
    </div>
  )
}

export default App
