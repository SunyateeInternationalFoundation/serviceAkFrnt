import { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";

import Dashboard from "../Dashboard/Dashboard";
import JobExecution from "../JobExecution/JobExecution";
import JobRequests from "../JobRequests/JobRequests";
import MyServices from "../MyServices/MyServices";
import Payments from "../Payments/Payments";
import Reviews from "../Reviews/Reviews";
import Account from "../Settings/Account";
import Appointments from "../Settings/Appointments";
import ProfileVerification from "../Settings/ProfileVerification";
import Navbar from "../Sidebar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const Home = () => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  const handleSidebarToggle = (isClose) => {
    setIsSidebarClosed(isClose);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar onSidebarToggle={handleSidebarToggle} />
        <main
          className={`flex-1 overflow-y-auto bg-gray-100 transition-all duration-300 ${
            isSidebarClosed ? "ml-20" : "ml-64"
          }`}
        >
          <div className="p-4">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/my-services" element={<MyServices />} />
              <Route path="/job-execution" element={<JobExecution />} />
              <Route path="/job-requests" element={<JobRequests />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route
                path="/settings/verification"
                element={<ProfileVerification />}
              />
              <Route path="/settings/account" element={<Account />} />
              <Route path="/settings/appointments" element={<Appointments />} />
            </Routes>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
