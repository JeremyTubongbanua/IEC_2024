import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
   return (
      <nav className="bg-blue-600 p-4">
         <div className="container mx-auto flex justify-between items-center">
            <Link to={"/"}>
               <h1 className="text-white text-2xl font-bold">Taskly</h1>
            </Link>
            <ul className="flex space-x-6">
               <li>
                  <Link to="/app" className="text-white hover:underline">
                     Dashboard
                  </Link>
               </li>
               <li>
                  <Link
                     to="/app/employee-dashboard"
                     className="text-white hover:underline"
                  >
                     Employee Dashboard
                  </Link>
               </li>
               <li>
                  <Link
                     to="/app/manager-dashboard"
                     className="text-white hover:underline"
                  >
                     Manager Dashboard
                  </Link>
               </li>
            </ul>
         </div>
      </nav>
   );
}

export default Navbar;
