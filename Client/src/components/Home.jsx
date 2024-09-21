import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function Home() {
    const navigate = useNavigate()
    const [loggedInUser , setLoggedInUser] = useState(''); 
    useEffect(()=>{
        setLoggedInUser(localStorage.getItem('loggedInUser'));
        
    },[])

    const handleLogOut = (e)=>{
        localStorage.removeItem('token')
        toast.success("LogOut Success")
        setLoggedInUser(null);
        setTimeout(() => {
            navigate('/login'); 
        }, 1000);
    }
  return (

   
    <div>
        <h1 className='text-4xl'>{loggedInUser}</h1>
       
        <button onClick={handleLogOut}>LogOut</button>
        <ToastContainer/>
    </div>
    
  )
}

export default Home