"use client";

import { Button, Card, Label, TextInput } from "flowbite-react";
import React from "react";
import { ToastContainer, toast } from "react-toastify"; // Make sure toast is imported
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function SignUp() {
  const navigate =useNavigate(); 
  const {
    register, // Used to register form inputs
    handleSubmit, // Handles form submission
    formState: { errors }, // Object to access validation errors
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    try {
      const url = "http://localhost:4000/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        setTimeout(() => {
            navigate("/login")
        }, 1000);
        toast.success("Account created successfully!");
      }
      else{
        // Show error toast
        toast.error(result.message);
      }
    } catch (err) {
      // Show error toast
      toast.error("Error creating account. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100">
  
      <Card className="w-[30%]">
     <h1 className="text-4xl text-semibold">SignUp</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Name" />
            </div>
            <TextInput
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

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
              Already have an account? <Link to="/login">Login</Link>
            </span>
          </div>
        </form>
      </Card>
      {/* Toast container to display the notifications */}
      <ToastContainer />
    </div>
  );
}

export default SignUp;
