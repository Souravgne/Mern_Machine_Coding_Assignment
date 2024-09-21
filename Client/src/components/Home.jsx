
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Nav from './Nav';

function Home() {
    

  
  return (
    <div>
    <Nav/>
        <h1 className='text-4xl'>Dashboard</h1>
       
        
        <ToastContainer/>
    </div>
    
  )
}


export default Home