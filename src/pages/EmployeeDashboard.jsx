import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Set up localizer by providing the moment Object to the correct localizer.
const localizer = momentLocalizer(moment);

function EmployeeDashboard() {
   const [users, setUsers] = useState([]);
   const [selectedUserId, setSelectedUserId] = useState(null);
   const [tasks, setTasks] = useState([]);
   const [events, setEvents] = useState([]);
   const [workingHours, setWorkingHours] = useState({
      start_time: "",
      end_time: "",
   });

   // Fetch users from the API
   useEffect(() => {
      const fetchUsers = async () => {
         const response = await fetch("http://67.217.243.8:8080/users/list");
         const data = await response.json();
         setUsers(data.users);
         if (data.users.length > 0) {
            setSelectedUserId(data.users[0].id); // Select the first user by default
         }
      };
      fetchUsers();
   }, []);

   // Fetch tasks and working hours for the selected user
   useEffect(() => {
      const fetchUserData = async () => {
         if (selectedUserId) {
            const tasksResponse = await fetch(
               `http://67.217.243.8:8080/employees/${selectedUserId}/tasks`
            );
            const tasksData = await tasksResponse.json();
            setTasks(tasksData.tasks);
   
            // Prepare events for the calendar
            const userEvents = tasksData.tasks.map((task) => {
               const startTime = new Date(task.start);
               const endTime = new Date(
                  startTime.getTime() + task.hours * 60 * 60 * 1000
               );
               return {
                  title: task.task_name,
                  start: startTime,
                  end: endTime,
               };
            });
            setEvents(userEvents);
   
            // Debugging: Check the events being set
            console.log("Events:", userEvents);
   
            // Fetch working hours for the selected user
            const userName = users.find(
               (user) => user.id === selectedUserId
            )?.name;
            if (userName) {
               const hoursResponse = await fetch(
                  `http://67.217.243.8:8080/employees/hours/${userName}`
               );
               const hoursData = await hoursResponse.json();
               if (hoursData.working_hours) {
                  setWorkingHours(hoursData.working_hours);
                  // Log manager form times to the console
                  console.log("Manager Form Times:", hoursData.working_hours);
               }
            }
         }
      };
      fetchUserData();
   }, [selectedUserId, users]);
   

   const handleUserChange = (e) => {
      const newUserId = Number(e.target.value);
      setSelectedUserId(newUserId);
   };

   return (
      <div className="flex flex-col lg:flex-row p-4">
         {/* Left Column - Task List */}
         <div className="lg:w-1/2 p-4">
            <h2 className="text-2xl font-bold mb-4">Select User</h2>
            <select
               value={selectedUserId || ""}
               onChange={handleUserChange}
               className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            >
               {users.map((user) => (
                  <option key={user.id} value={user.id}>
                     {user.name}
                  </option>
               ))}
            </select>

            <h2 className="text-2xl font-bold mb-4">
               Tasks Assigned to{" "}
               {selectedUserId
                  ? users.find((user) => user.id === selectedUserId)?.name
                  : ""}
            </h2>
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
               {tasks.length === 0 ? (
                  <p>No tasks assigned to this employee.</p>
               ) : (
                  <ul>
                     {tasks.map((task) => (
                        <li key={task.id} className="mb-2">
                           <h3 className="font-bold">{task.task_name}</h3>
                           <p>Description: {task.description}</p>
                           <p>Due Date: {task.deadline}</p>
                           <p>Hours Allocated: {task.hours}</p>
                           <p>
                              Start Time:{" "}
                              {new Date(task.start).toLocaleString()}
                           </p>
                        </li>
                     ))}
                  </ul>
               )}
            </div>

            <h2 className="text-2xl font-bold mb-4">Employee Working Hours</h2>
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
               {workingHours.start_time && workingHours.end_time ? (
                  <p>
                     Working Hours: {workingHours.start_time} -{" "}
                     {workingHours.end_time}
                  </p>
               ) : (
                  <p>Select a user to see their working hours.</p>
               )}
            </div>

            <h2 className="text-2xl font-bold mb-4">Employee Form</h2>
            <form className="bg-white p-6 rounded-lg shadow-md">
               {/* Input fields for Start Hour and End Hour */}
               <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                     Start Hour
                  </label>
                  <input
                     type="time"
                     name="startHour"
                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                     required
                     value={workingHours.start_time} // Set the value from workingHours state
                  />
               </div>
               <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                     End Hour
                  </label>
                  <input
                     type="time"
                     name="endHour"
                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                     required
                     value={workingHours.end_time} // Set the value from workingHours state
                  />
               </div>
               <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-150"
               >
                  Submit
               </button>
            </form>
         </div>

         {/* Right Column - Calendar */}
         <div className="lg:w-1/2 p-4">
            <h2 className="text-2xl font-bold mb-4">Task Calendar</h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
               <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 500 }}
                  defaultView="week"
                  views={["month", "week", "day"]}
               />
            </div>
         </div>
      </div>
   );
}

export default EmployeeDashboard;
