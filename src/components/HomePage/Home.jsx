import { Outlet, Route, Routes } from "react-router-dom";

import { matchPath, useLocation } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import JobExecution from "../JobExecution/JobExecution";
import JobRequests from "../JobRequests/JobRequests";
import MyServices from "../MyServices/MyServices";
import ViewMyService from "../MyServices/ViewMyService";
import Payments from "../Payments/Payments";
import Reviews from "../Reviews/Reviews";
import Account from "../Settings/Account";
import Appointments from "../Settings/Appointments";
import ChooseTherapy from "../Settings/ChooseTherapy";
import ProfileVerification from "../Settings/ProfileVerification";

import Therapies from "../Settings/Therapies";
import Sidebar from "../Sidebar/Sidebar";
const Home = () => {
  // const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  // const handleSidebarToggle = (isClose) => {
  //   setIsSidebarClosed(isClose);
  // };
  const location = useLocation();
  const match = ["/my-services/:id", "/provider/select-therapies"];

  const noSideBarPagesList = match.find((path) =>
    matchPath({ path }, location.pathname)
  );
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      <div className="flex">
        {!noSideBarPagesList && (
          <aside className="h-screen sticky top-0">
            <Sidebar />
          </aside>
        )}
        {/* <Sidebar onSidebarToggle={handleSidebarToggle} /> */}
        <main className="flex-1 overflow-y-auto">
          {/* <main
          className={`flex-1 overflow-y-auto bg-gray-100 transition-all duration-300 ${
            isSidebarClosed ? "ml-20" : "ml-64"
          }`}
        ></main> */}

          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-services" element={<MyServices />} />
            <Route path="/my-services/:id" element={<ViewMyService />} />
            <Route path="/job-execution" element={<JobExecution />} />
            <Route path="/job-requests" element={<JobRequests />} />
            <Route path="/payouts" element={<Payments />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route
              path="/settings/verification"
              element={<ProfileVerification />}
            />
            <Route path="/settings/account" element={<Account />} />
            <Route path="/settings/appointments" element={<Appointments />} />
            <Route path="/settings/therapies" element={<Therapies />} />
            <Route
              path="/provider/select-therapies"
              element={<ChooseTherapy />}
            />
          </Routes>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Home;
