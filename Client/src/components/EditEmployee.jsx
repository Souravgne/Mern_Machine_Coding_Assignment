import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Nav from "./Nav";
import { useForm } from "react-hook-form";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Initialize react-hook-form
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    defaultValues: {
      f_Name: '',
      f_Email: '',
      f_Mobile: '',
      f_Designation: '',
      f_gender: '',
      f_Course: '',
    }
  });

  // Fetch employee details and set values in the form
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:4000/create/employee/${id}`);
        const data = await response.json();

        if (data.success) {
          // Populate form fields with fetched employee data
          reset({
            f_Name: data.employee.f_Name,
            f_Email: data.employee.f_Email,
            f_Mobile: data.employee.f_Mobile,
            f_Designation: data.employee.f_Designation,
            f_gender: data.employee.f_gender,
            f_Course: data.employee.f_Course,
          });
        } else {
          toast.error(data.message);
          navigate('/employees');
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
    console.log(data);
    try {
      const response = await fetch(`http://localhost:4000/create/employee/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      
      if (result.success) {
        toast.success("Employee updated successfully!");
        navigate('/employees');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Error updating employee.");
    }
  };

  return (
    <div>
      <h1>Edit Employee</h1>
      <Nav />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Name:</label>
          <input
            type="text"
            {...register("f_Name", { required: "Name is required" })}
            placeholder="Name"
            className="border p-2 w-full"
          />
          {errors.f_Name && <p className="text-red-500">{errors.f_Name.message}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            {...register("f_Email", { required: "Email is required" })}
            placeholder="Email"
            className="border p-2 w-full"
          />
          {errors.f_Email && <p className="text-red-500">{errors.f_Email.message}</p>}
        </div>

        <div>
          <label>Mobile No:</label>
          <input
            type="text"
            {...register("f_Mobile", { required: "Mobile No is required" })}
            placeholder="Mobile No"
            className="border p-2 w-full"
          />
          {errors.f_Mobile && <p className="text-red-500">{errors.f_Mobile.message}</p>}
        </div>

        <div>
          <label>Designation:</label>
          <select {...register("f_Designation", { required: "Designation is required" })} className="border p-2 w-full">
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          {errors.f_Designation && <p className="text-red-500">{errors.f_Designation.message}</p>}
        </div>

        <div>
          <label>Gender:</label>
          <div className="space-x-4">
            <label>
              <input
                type="radio"
                value="Male"
                {...register("f_gender", { required: "Gender is required" })}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="Female"
                {...register("f_gender", { required: "Gender is required" })}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                value="Other"
                {...register("f_gender", { required: "Gender is required" })}
              />
              Other
            </label>
          </div>
          {errors.f_gender && <p className="text-red-500">{errors.f_gender.message}</p>}
        </div>

        <div>
          <label>Course:</label>
          <div className="space-x-4">
            <label>
              <input
                type="radio"
                value="BSc"
                {...register("f_Course", { required: "Course is required" })}
              />
              BSc
            </label>
            <label>
              <input
                type="radio"
                value="BCA"
                {...register("f_Course", { required: "Course is required" })}
              />
              BCA
            </label>
            <label>
              <input
                type="radio"
                value="MSc"
                {...register("f_Course", { required: "Course is required" })}
              />
              MSc
            </label>
          </div>
          {errors.f_Course && <p className="text-red-500">{errors.f_Course.message}</p>}
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
