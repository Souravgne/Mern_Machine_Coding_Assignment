"use client";

import { Button, Card, Label, TextInput } from "flowbite-react";
import React from "react";
import { ToastContainer, toast } from "react-toastify"; // Make sure toast is imported
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
  const navigate =useNavigate(); 
  const {
    register, // Used to register form inputs
    handleSubmit, // Handles form submission
    formState: { errors }, // Object to access validation errors
  } = useForm();

  const onSubmit = async (data) => {


    try {
      const url = "http://localhost:4000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      const {success , message ,jwtToken , name,  error } = result;
      if (success) {
        toast.success(message);
        localStorage.setItem('token',jwtToken);
        localStorage.setItem('loggedInUser', name); 
        
        setTimeout(() => {
            navigate("/home")
        }, 1000);
        
      }
      else if(error){
        const details = error?.details[0].message; 
        toast.error(details);
        
      }
    } catch (err) {
      // Show error toast
      toast.error("Error creating account. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100 dark:text-white">
      <Card className="w-[30%]">
     <h1 className="text-4xl text-semibold">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          

          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@gmail.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit">Submit</Button>

          <div>
            <span>
              Do not have an account? <Link to="/signup">SignUp</Link>
            </span>
          </div>
        </form>
      </Card>
      {/* Toast container to display the notifications */}
      <ToastContainer />
    </div>
  );
}

export default Login;
