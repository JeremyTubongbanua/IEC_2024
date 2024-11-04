import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ManagerDashboard() {
   const [startDate, setStartDate] = useState(new Date());
   const [endDate, setEndDate] = useState(new Date());
   const [errorMessage, setErrorMessage] = useState(null);
   const [successMessage, setSuccessMessage] = useState(null);

   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm();


   const onSubmit = async (data) => {
      // Log start and end dates for debugging
      console.log("Start Date:", startDate);
      console.log("End Date:", endDate);
   
      // Prepare the task data
      const formData = {
         task_name: data.taskName,
         description: data.taskDescription,
         deadline: endDate.toISOString().split(".")[0], // Remove milliseconds and "Z"
         hours: parseFloat(data.estimatedHours), // Ensure it's a number
         start: startDate.toISOString().split(".")[0] // Remove milliseconds and "Z"
      };
   
      try {
         const response = await fetch("http://67.217.243.8:8080/tasks", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
         });
   
         if (!response.ok) {
            throw new Error("Failed to create task");
         }
   
         const result = await response.json();
         setSuccessMessage(
            `Task "${result.task.task_name}" created successfully!`
         );
         setErrorMessage(null);
         resetForm(); // Reset form fields after successful submission
      } catch (error) {
         setErrorMessage(error.message);
         setSuccessMessage(null);
      }
   };
   
   

   const resetForm = () => {
      setValue("taskName", "");
      setValue("taskDescription", "");
      setValue("estimatedHours", "");
      setStartDate(new Date());
      setEndDate(new Date());
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
         <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
               <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Manager Dashboard
               </h1>
               <p className="text-lg text-gray-600">
                  Create and manage your team's tasks efficiently
               </p>
            </div>

            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
               <div className="bg-gradient-to-r from-blue-500 to-blue-500 px-8 py-4">
                  <h2 className="text-xl text-white font-semibold">
                     New Task Creation
                  </h2>
               </div>

               <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
               >
                  <div className="md:col-span-2">
                     <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Task Name
                     </label>
                     <input
                        type="text"
                        {...register("taskName", {
                           required: "Task name is required",
                        })}
                        className={`w-full px-4 py-3 rounded-lg border-2 bg-gray-50 focus:bg-white transition-colors duration-200 ease-in-out ${
                           errors.taskName
                              ? "border-red-500"
                              : "border-gray-200 focus:border-blue-500"
                        }`}
                        placeholder="Enter a descriptive task name"
                     />
                     {errors.taskName && (
                        <p className="mt-1 text-sm text-red-600">
                           {errors.taskName.message}
                        </p>
                     )}
                  </div>

                  <div className="md:col-span-2">
                     <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Task Description
                     </label>
                     <textarea
                        {...register("taskDescription", {
                           required: "Task description is required",
                        })}
                        className={`w-full px-4 py-3 rounded-lg border-2 bg-gray-50 focus:bg-white transition-colors duration-200 ease-in-out ${
                           errors.taskDescription
                              ? "border-red-500"
                              : "border-gray-200 focus:border-blue-500"
                        }`}
                        rows="4"
                        placeholder="Provide detailed task description and requirements"
                     />
                     {errors.taskDescription && (
                        <p className="mt-1 text-sm text-red-600">
                           {errors.taskDescription.message}
                        </p>
                     )}
                  </div>

                  <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Start Date & Time
                     </label>
                     <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                           setStartDate(date);
                           setValue("startDate", date);
                        }}
                        showTimeSelect
                        timeFormat="h:mm aa"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="w-full min-w-[250px] px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors duration-200 ease-in-out"
                     />
                  </div>

                  <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Deadline
                     </label>
                     <DatePicker
                        selected={endDate}
                        onChange={(date) => {
                           setEndDate(date);
                           setValue("endDate", date);
                        }}
                        showTimeSelect
                        timeFormat="h:mm aa"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="w-full min-w-[250px] px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors duration-200 ease-in-out"
                     />
                  </div>

                  <div className="md:col-span-2">
                     <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Estimated Hours
                     </label>
                     <input
                        type="number"
                        step="0.5"
                        {...register("estimatedHours", {
                           required: "Estimated hours are required",
                           min: {
                              value: 0.5,
                              message: "Must be at least 0.5 hours",
                           },
                        })}
                        className={`w-full px-4 py-3 rounded-lg border-2 bg-gray-50 focus:bg-white transition-colors duration-200 ease-in-out ${
                           errors.estimatedHours
                              ? "border-red-500"
                              : "border-gray-200 focus:border-blue-500"
                        }`}
                        placeholder="Enter estimated hours (e.g., 5.5)"
                     />
                     {errors.estimatedHours && (
                        <p className="mt-1 text-sm text-red-600">
                           {errors.estimatedHours.message}
                        </p>
                     )}
                  </div>

                  <div className="md:col-span-2">
                     <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-500 text-white text-lg font-semibold py-4 rounded-lg hover:from-blue-600 hover:to-blue-600 transition-all duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                     >
                        Create New Task
                     </button>
                  </div>

                  {errorMessage && (
                     <div className="md:col-span-2 mt-4">
                        <p className="text-sm text-red-600">{errorMessage}</p>
                     </div>
                  )}
                  {successMessage && (
                     <div className="md:col-span-2 mt-4">
                        <p className="text-sm text-green-600">
                           {successMessage}
                        </p>
                     </div>
                  )}
               </form>
            </div>
         </div>
      </div>
   );
}

export default ManagerDashboard;
