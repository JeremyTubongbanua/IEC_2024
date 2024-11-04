import {
   BrowserRouter as Router,
   Routes,
   Route,
   Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import TaskAllocation from "./pages/TaskAllocation";
import Navbar from "./components/Navbar"; // Assume you have a Navbar component

function App() {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/app" element={<AppLayout />}>
               <Route index element={<Dashboard />} />
               <Route
                  path="employee-dashboard"
                  element={<EmployeeDashboard />}
               />
               <Route path="manager-dashboard" element={<ManagerDashboard />} />
               <Route path="task-allocation" element={<TaskAllocation />} />
            </Route>
         </Routes>
      </Router>
   );
}

function AppLayout() {
   return (
      <div>
         <Navbar />
         <div className="p-4">
            <Outlet />
         </div>
      </div>
   );
}

export default App;
