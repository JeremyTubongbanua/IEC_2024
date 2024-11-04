import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
   const navigate = useNavigate();

   const handleNavigate = () => {
      navigate("/app");
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 flex items-center justify-center px-4">
         <div className="max-w-5xl w-full bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-sky-500 px-8 py-10 text-center">
               <h1 className="text-5xl font-bold text-white mb-4">
                  Welcome to Taskly
               </h1>
               <p className="text-xl text-white opacity-90 font-light">
                  Management and productivity tool
               </p>
            </div>

            <div className="p-12">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="bg-blue-50 rounded-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                     <div className="text-blue-600 mb-4">
                        <svg
                           className="w-10 h-10"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                           />
                        </svg>
                     </div>
                     <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        Task Management
                     </h3>
                     <p className="text-gray-600 leading-relaxed">
                        Organize and track your team's tasks
                     </p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                     <div className="text-blue-600 mb-4">
                        <svg
                           className="w-10 h-10"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                           />
                        </svg>
                     </div>
                     <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        Time Tracking
                     </h3>
                     <p className="text-gray-600 leading-relaxed">
                        Monitor working hours and optimize schedules
                     </p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                     <div className="text-blue-600 mb-4">
                        <svg
                           className="w-10 h-10"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                           />
                        </svg>
                     </div>
                     <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        Team Collaboration
                     </h3>
                     <p className="text-gray-600 leading-relaxed">
                        Easy communication across your entire team
                     </p>
                  </div>
               </div>

               <div className="text-center">
                  <button
                     onClick={handleNavigate}
                     className="bg-gradient-to-r from-blue-500 to-sky-500 text-white text-xl font-semibold px-12 py-4 rounded-xl hover:from-blue-600 hover:to-sky-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                     Get Started
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Home;
