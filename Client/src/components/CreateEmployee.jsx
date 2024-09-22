"use client";

import { Button, Label, TextInput, Radio, Checkbox } from "flowbite-react";
import { useForm } from "react-hook-form";
import React from 'react';
import Nav from './Nav';
import { toast, ToastContainer } from "react-toastify";

function CreateEmployee() {
  const { register, handleSubmit,reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // Create a new object without f_Image
    const { f_Image, ...formData } = data; // Exclude f_Image
  
    try {
      const url = "http://localhost:4000/create/createemployee";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData), // Only send the rest of the data
      });
  
      const result = await response.json();
      console.log(result);
      const { success, message, error } = result; 
      if (success) {
        setTimeout(() => {
          reset();
        }, 1000);
        toast.success(message);
      } else {
        toast.error(error);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Nav />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-16">
        <div className="grid grid-cols-2 gap-4 w-1/2 items-center">
          <Label htmlFor="f_Name" value="Name" className="text-right" />
          <TextInput
            id="f_Name"
            type="text"
            placeholder="John Doe"
            {...register("f_Name", { required: "Name is required" })}
            color={errors.f_Name ? "failure" : ""}
          />
          {errors.f_Name && <span className="text-red-500">{errors.f_Name.message}</span>}

          <Label htmlFor="f_Email" value="Email" className="text-right" />
          <TextInput
            id="f_Email"
            type="email"
            placeholder="name@example.com"
            {...register("f_Email", { required: "Email is required" })}
            color={errors.f_Email ? "failure" : ""}
          />
          {errors.f_Email && <span className="text-red-500">{errors.f_Email.message}</span>}

          <Label htmlFor="f_Mobile" value="Mobile No" className="text-right" />
          <TextInput
            id="f_Mobile"
            type="tel"
            placeholder="1234567890"
            {...register("f_Mobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Mobile number must be 10 digits",
              },
            })}
            color={errors.f_Mobile ? "failure" : ""}
          />
          {errors.f_Mobile && <span className="text-red-500">{errors.f_Mobile.message}</span>}

          <Label htmlFor="f_Designation" value="Designation" className="text-right" />
          <select
            id="f_Designation"
            {...register("f_Designation", { required: "Designation is required" })}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          {errors.f_Designation && <span className="text-red-500">{errors.f_Designation.message}</span>}

          {/* Gender Radio Buttons */}
          <Label htmlFor="f_gender" value="Gender" className="text-right" />
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Radio id="male" value="Male" {...register("f_gender", { required: "Gender is required" })} />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio id="female" value="Female" {...register("f_gender", { required: "Gender is required" })} />
              <Label htmlFor="female">Female</Label>
            </div>
          </div>
          {errors.f_gender && <span className="text-red-500">{errors.f_gender.message}</span>}

          {/* Course Radio Buttons */}
          <Label htmlFor="f_Course" value="Course" className="text-right" />
<div className="flex flex-col gap-2">
  <div className="flex items-center gap-2">
    <Radio
      id="mca"
      value="MCA"
      {...register("f_Course", { required: "Course selection is required" })}
    />
    <Label htmlFor="mca">MCA</Label>
  </div>
  <div className="flex items-center gap-2">
    <Radio
      id="bca"
      value="BCA"
      {...register("f_Course", { required: "Course selection is required" })}
    />
    <Label htmlFor="bca">BCA</Label>
  </div>
  <div className="flex items-center gap-2">
    <Radio
      id="bsc"
      value="BSC"
      {...register("f_Course", { required: "Course selection is required" })}
    />
    <Label htmlFor="bsc">BSC</Label>
  </div>
</div>
{errors.f_Course && <span className="text-red-500">{errors.f_Course.message}</span>}

          {/* Image Upload */}
          {/* <Label htmlFor="f_Image" value="Upload Image" className="text-right" />
          <TextInput
            id="f_Image"
            type="file"
            {...register("f_Image")}
            color={errors.f_Image ? "failure" : ""}
          /> */}
          {/* {errors.f_Image && <span className="text-red-500">{errors.f_Image.message}</span>} */}
        </div>

       

        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default CreateEmployee;
