"use client";

import { Button, Label, TextInput, Radio, FileInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import Nav from './Nav';
import { toast, ToastContainer } from "react-toastify";

function CreateEmployee() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = useState(null); // State to hold image preview

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    
    try {
      const url = "http://localhost:4000/create/createemployee";
      
      const formData = new FormData();

      if (data.f_Image && data.f_Image.length > 0) {
        formData.append("f_Image", data.f_Image[0]);
      } else {
        console.error("No file selected");
        return;
      }
      
      formData.append("f_Name", data.f_Name);
      formData.append("f_Email", data.f_Email);
      formData.append("f_Mobile", data.f_Mobile);
      formData.append("f_Designation", data.f_Designation);
      formData.append("f_gender", data.f_gender);
      formData.append("f_Course", data.f_Course);
      
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        toast.success("Employee created successfully!");
        reset();
        setImagePreview(null);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Nav />
      <div className="w-2/3 flex justify-center items-center bg-gray-50 dark:bg-gray-700 border-gray-600 border rounded-md mx-auto mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-16 items-center">
        <div className="flex gap-8 w-full">
          {/* Image Upload and Preview */}
          <div className="flex flex-col items-center">
            <Label htmlFor="f_Image" value="Upload Image" />
            <div className="w-48 h-48 border border-gray-300 rounded-md overflow-hidden flex items-center justify-center bg-white">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-400">No image uploaded</span>
              )}
            </div>
            <FileInput
              id="f_Image"
              type="file"
              accept="image/*"
              {...register("f_Image", { required: "Image is required", onChange: handleFileChange })}
              className="mt-2"
            />
            {errors.f_Image && <span className="text-red-500">{errors.f_Image.message}</span>}
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-2 gap-4">
              <Label htmlFor="f_Name" value="Name" />
              <TextInput
                id="f_Name"
                type="text"
                placeholder="John Doe"
                {...register("f_Name", { required: "Name is required" })}
                color={errors.f_Name ? "failure" : ""}
              />
              {errors.f_Name && <span className="text-red-500">{errors.f_Name.message}</span>}

              <Label htmlFor="f_Email" value="Email" />
              <TextInput
                id="f_Email"
                type="email"
                placeholder="name@example.com"
                {...register("f_Email", { required: "Email is required" })}
                color={errors.f_Email ? "failure" : ""}
              />
              {errors.f_Email && <span className="text-red-500">{errors.f_Email.message}</span>}

              <Label htmlFor="f_Mobile" value="Mobile No" />
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

              <Label htmlFor="f_Designation" value="Designation" />
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
            </div>

            {/* Gender Radio Buttons */}
            <Label htmlFor="f_gender" value="Gender" />
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
            <Label htmlFor="f_Course" value="Course" />
            <div className="flex gap-4">
              <Radio id="mca" value="MCA" {...register("f_Course", { required: "Course selection is required" })} />
              <Label htmlFor="mca">MCA</Label>
              <Radio id="bca" value="BCA" {...register("f_Course", { required: "Course selection is required" })} />
              <Label htmlFor="bca">BCA</Label>
              <Radio id="bsc" value="BSC" {...register("f_Course", { required: "Course selection is required" })} />
              <Label htmlFor="bsc">BSC</Label>
            </div>
            {errors.f_Course && <span className="text-red-500">{errors.f_Course.message}</span>}
          </div>
        </div>

        <Button type="submit" className="mt-6 w-1/4">
          Submit
        </Button>
      </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateEmployee;
