import React from "react";

function Dashboard() {
   return (
      <div className="max-w-4xl mx-auto">
         <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Dashboard
         </h1>
         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
               <h2 className="text-xl font-medium text-gray-700">Overview</h2>
               <p className="text-gray-600 mt-2">
                  A quick summary of your stats and activities.
               </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
               <h2 className="text-xl font-medium text-gray-700">
                  Notifications
               </h2>
               <p className="text-gray-600 mt-2">
                  Check the latest updates and messages.
               </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
               <h2 className="text-xl font-medium text-gray-700">Settings</h2>
               <p className="text-gray-600 mt-2">
                  Manage your account and preferences.
               </p>
            </div>
         </div>
      </div>
   );
}

export default Dashboard;
