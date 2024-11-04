import React from "react";
import { useForm } from "react-hook-form";

function TaskAllocation() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const onSubmit = (data) => {
      console.log(data);
      // Handle form submission logic (e.g., API call)
   };

   return (
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6 md:p-8 lg:p-10">
         <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Task Allocation
         </h1>

         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Task Name Field */}
            <div>
               <label className="block text-sm font-medium text-gray-700">
                  Task Name
               </label>
               <input
                  type="text"
                  {...register("taskName", {
                     required: "Task name is required",
                  })}
                  className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                     errors.taskName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter task name"
               />
               {errors.taskName && (
                  <p className="text-sm text-red-600">
                     {errors.taskName.message}
                  </p>
               )}
            </div>

            {/* Task Description Field */}
            <div>
               <label className="block text-sm font-medium text-gray-700">
                  Task Description
               </label>
               <textarea
                  {...register("taskDescription", {
                     required: "Task description is required",
                  })}
                  className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                     errors.taskDescription
                        ? "border-red-500"
                        : "border-gray-300"
                  }`}
                  rows="4"
                  placeholder="Enter task description"
               />
               {errors.taskDescription && (
                  <p className="text-sm text-red-600">
                     {errors.taskDescription.message}
                  </p>
               )}
            </div>

            {/* Project Start Timestamp Field */}
            <div>
               <label className="block text-sm font-medium text-gray-700">
                  Project Start Timestamp
               </label>
               <input
                  type="datetime-local"
                  {...register("startTimestamp", {
                     required: "Start timestamp is required",
                  })}
                  className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                     errors.startTimestamp
                        ? "border-red-500"
                        : "border-gray-300"
                  }`}
               />
               {errors.startTimestamp && (
                  <p className="text-sm text-red-600">
                     {errors.startTimestamp.message}
                  </p>
               )}
            </div>

            {/* Deadline Field with Calendar */}
            <div>
               <label className="block text-sm font-medium text-gray-700">
                  Deadline
               </label>
               <input
                  type="datetime-local"
                  {...register("deadline", {
                     required: "Deadline is required",
                  })}
                  className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                     errors.deadline ? "border-red-500" : "border-gray-300"
                  }`}
               />
               {errors.deadline && (
                  <p className="text-sm text-red-600">
                     {errors.deadline.message}
                  </p>
               )}
            </div>

            {/* Estimated Hours Field */}
            <div>
               <label className="block text-sm font-medium text-gray-700">
                  Estimated Hours
               </label>
               <input
                  type="number"
                  {...register("estimatedHours", {
                     required: "Estimated hours are required",
                     min: { value: 0.5, message: "Must be at least 0.5 hours" },
                  })}
                  className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                     errors.estimatedHours
                        ? "border-red-500"
                        : "border-gray-300"
                  }`}
                  placeholder="e.g., 5"
               />
               {errors.estimatedHours && (
                  <p className="text-sm text-red-600">
                     {errors.estimatedHours.message}
                  </p>
               )}
            </div>

            {/* Submit Button */}
            <button
               type="submit"
               className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
               Create Task
            </button>
         </form>
      </div>
   );
}

export default TaskAllocation;
