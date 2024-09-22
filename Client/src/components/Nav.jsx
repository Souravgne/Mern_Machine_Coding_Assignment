"use client";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { Navbar , Button } from "flowbite-react";

function Nav() {
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
    <div className="">
      <Navbar fluid rounded className="border-b-2 mx-10">
        <Navbar.Brand as={Link} to="/home">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Admin
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          
          <Navbar.Link as={Link} to="/" active>
            Home
          </Navbar.Link>
          <Navbar.Link as={Link} to="/createemployee">
           Create Employee 
          </Navbar.Link>
          <Navbar.Link as={Link} to="/employees">
          Employee List
          </Navbar.Link>
          <Navbar.Link className="text-2xl" to="">
          {loggedInUser}
          </Navbar.Link>
          <Navbar.Link as={Link} to="/login">
          <Button onClick={handleLogOut} color="info">LogOut</Button>
         
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Nav;
