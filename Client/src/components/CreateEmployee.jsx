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
      
      // Create a new FormData object
      const formData = new FormData();

      // Append the first file from the FileList
      if (data.f_Image && data.f_Image.length > 0) {
        formData.append("f_Image", data.f_Image[0]);
      } else {
        console.error("No file selected");
        return;
      }
      
      // Append other form data
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
        reset(); // Reset form fields after successful submission
        setImagePreview(null); // Reset image preview
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
      // Create a URL for the selected file
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Nav />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-16">
      {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Image Preview" className=" w-1/2 mx-auto h-auto border rounded" />
            </div>
          )}
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

          <Label htmlFor="f_Image" value="Upload Image" className="text-right" />
          <FileInput
            id="f_Image"
            type="file"
            accept="image/*"
            {...register("f_Image", { required: "Image is required", onChange: handleFileChange })}
            className="p-2 border border-gray-300 rounded"
          />
          {errors.f_Image && <span className="text-red-500">{errors.f_Image.message}</span>}

          {/* Image Preview */}
         

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
