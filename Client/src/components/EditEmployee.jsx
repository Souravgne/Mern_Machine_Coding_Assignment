import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import Nav from "./Nav";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      f_Name: "",
      f_Email: "",
      f_Mobile: "",
      f_Designation: "",
      f_gender: "",
      f_Course: "",
    },
  });

  const [imagePreview, setImagePreview] = useState(null); // State to hold image preview

  // Fetch employee details and set values in the form
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:4000/create/employee/${id}`);
        const data = await response.json();

        if (data.success) {
          reset({
            f_Name: data.employee.f_Name,
            f_Email: data.employee.f_Email,
            f_Mobile: data.employee.f_Mobile,
            f_Designation: data.employee.f_Designation,
            f_gender: data.employee.f_gender,
            f_Course: data.employee.f_Course,
          });
          setImagePreview(data.employee.f_Image);
        } else {
          toast.error(data.message);
          navigate("/employees");
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
        toast.error("Error fetching employee data.");
      }
    };

    fetchEmployee();
  }, [id, navigate, reset]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:4000/create/employee/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.success) {
        toast.success("Employee updated successfully!");
        setTimeout(() => {
          navigate("/employees");
        }, 1000);
        
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Error updating employee.");
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
    <div className="min-h-screen dark:text-white bg-gray-100 dark:bg-gray-900">
      <Nav />
      <div className="w-2/3 flex justify-center items-center bg-gray-50 dark:bg-gray-700 border-gray-600 border rounded-md mx-auto mt-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-16 items-center"
        >
          <div className="flex gap-8 w-full">
            {/* Image Upload and Preview */}
            <div className="flex flex-col items-center">
              <label htmlFor="f_Image" className="mb-2">
                Upload Image
              </label>
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
              <input
                id="f_Image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2 rounded-md"
              />
              {errors.f_Image && <span className="text-red-500">{errors.f_Image.message}</span>}
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-4 w-full">
              <div className="grid grid-cols-2 gap-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="f_Name">Name</label>
                  <input
                    id="f_Name"
                    type="text"

                    {...register("f_Name", { required: "Name is required" })}
                    className="border  rounded-md p-2 w-full"
                    placeholder="John Doe"
                   
                  />
                  {errors.f_Name && (
                    <span className="text-red-500">{errors.f_Name.message}</span>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="f_Email">Email</label>
                  <input
                    id="f_Email"
                    type="email"
                    {...register("f_Email", { required: "Email is required" })}
                    className="border p-2 rounded-md  w-full"
                    placeholder="name@example.com"
                  />
                  {errors.f_Email && (
                    <span className="text-red-500">{errors.f_Email.message}</span>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <label htmlFor="f_Mobile">Mobile No</label>
                  <input
                    id="f_Mobile"
                    type="tel"
                    {...register("f_Mobile", {
                      required: "Mobile number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Mobile number must be 10 digits",
                      },
                    })}
                    className="border p-2 rounded-md  w-full"
                    placeholder="1234567890"
                  />
                  {errors.f_Mobile && (
                    <span className="text-red-500">{errors.f_Mobile.message}</span>
                  )}
                </div>

                {/* Designation Field */}
                <div>
                  <label htmlFor="f_Designation">Designation</label>
                  <select
                    id="f_Designation"
                    {...register("f_Designation", { required: "Designation is required" })}
                    className="border rounded-md  p-2 w-full"
                  >
                    <option value="">Select Designation</option>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="Sales">Sales</option>
                  </select>
                  {errors.f_Designation && (
                    <span className="text-red-500">{errors.f_Designation.message}</span>
                  )}
                </div>
              </div>

              {/* Gender Radio Buttons */}
              <div>
                <label htmlFor="f_gender">Gender</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Male"
                      {...register("f_gender", { required: "Gender is required" })}
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Female"
                      {...register("f_gender", { required: "Gender is required" })}
                    />
                    <span className="ml-2">Female</span>
                  </label>
                </div>
                {errors.f_gender && (
                  <span className="text-red-500">{errors.f_gender.message}</span>
                )}
              </div>

              {/* Course Selection */}
              <div>
                <label htmlFor="f_Course">Course</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="BSc"
                      {...register("f_Course", { required: "Course is required" })}
                    />
                    <span className="ml-2">BSc</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="BCA"
                      {...register("f_Course", { required: "Course is required" })}
                    />
                    <span className="ml-2">BCA</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="MSc"
                      {...register("f_Course", { required: "Course is required" })}
                    />
                    <span className="ml-2">MSc</span>
                  </label>
                </div>
                {errors.f_Course && (
                  <span className="text-red-500">{errors.f_Course.message}</span>
                )}
              </div>
            </div>
          </div>

          <button type="submit" className="mt-6 w-1/4 bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default EditEmployee;
