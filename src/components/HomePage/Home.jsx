import { Outlet, Route, Routes } from "react-router-dom";

import Dashboard from "../Dashboard/Dashboard";
import JobExecution from "../JobExecution/JobExecution";
import JobRequests from "../JobRequests/JobRequests";
import MyServices from "../MyServices/MyServices";
import Payments from "../Payments/Payments";
import Reviews from "../Reviews/Reviews";
import Sidebar from "../Sidebar/Sidebar";

const Home = () => {
  return (
    <>
      <div className="flex">
          <Sidebar />
        
        <div style={{ width: "100%" }} className="bg-gray-100">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-services" element={<MyServices />} />
            <Route path="job-execution" element={<JobExecution />} />
            <Route path="/job-requests" element={<JobRequests />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;
