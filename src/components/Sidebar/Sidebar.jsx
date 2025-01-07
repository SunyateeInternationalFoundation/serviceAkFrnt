import { useState } from "react";
import {
  FaBriefcase,
  FaChartBar,
  FaChevronLeft,
  FaChevronRight,
  FaCog,
  FaMoneyBillAlt,
  FaStar,
  FaTools,
  FaUserCircle
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setProviderLogout } from "../../store/ProviderSlice";

const Sidebar = ({ onSidebarToggle }) => {
  const [isClose, setIsClose] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  console.log("location", location);
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaChartBar /> },
    { name: "My Services", path: "/my-services", icon: <FaTools /> },
    { name: "Job Requests", path: "/job-requests", icon: <FaBriefcase /> },
    { name: "Job Execution", path: "/job-execution", icon: <FaTools /> },
    { name: "Payments", path: "/payouts", icon: <FaMoneyBillAlt /> },
    { name: "Reviews", path: "/reviews", icon: <FaStar /> },
  ];

  const settingsItems = [
    { name: "Account", path: "/settings/account" },
    { name: "Profile Verification", path: "/settings/verification" },
  ];

  function handleLogout() {
    dispatch(setProviderLogout());
    window.location.href = "http://localhost:3000";
  }

  const toggleSidebar = () => {
    const newIsClose = !isClose;
    setIsClose(newIsClose);
    setIsSettingsOpen(false);
    onSidebarToggle(newIsClose);
  };

  return (
    <div
      className={`fixed top-0 left-0 flex flex-col ${
        isClose ? "w-20" : "w-64"
      } text-white transition-all duration-300 shadow-lg overflow-y-auto h-screen`}
    >
      <div className="flex items-center justify-between p-4 border-b border-white">
        {!isClose && (
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold text-pink-500">Services</h2>
          </div>
        )}
        <button
          className="p-2 rounded-md bg-pink-600 hover:bg-pink-700"
          onClick={toggleSidebar}
        >
          {isClose ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>
      <hr />
      <div className="flex flex-col p-4 space-y-4 overflow-y-auto flex-grow">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.path} className="cursor-pointer">
            <div
              className={`group flex items-center space-x-4 p-2 rounded-md transition-all duration-300 ${
                location.pathname === item.path ? "bg-pink-700" : ""
              } hover:bg-pink-700`}
            >
              <span
                className={`text-lg group-hover:text-white ${
                  location.pathname === item.path
                    ? "text-white"
                    : "text-pink-500 "
                }`}
              >
                {item.icon}
              </span>
              {!isClose && (
                <span
                  className={`group-hover:text-white ${
                    location.pathname === item.path
                      ? "text-white"
                      : "text-pink-500 "
                  }`}
                >
                  {item.name}
                </span>
              )}
            </div>
          </Link>
        ))}

        <div>
          <div
            className="group flex items-center space-x-4 p-2 rounded-md cursor-pointer hover:bg-pink-700"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          >
            <FaCog className="text-lg text-pink-500 group-hover:text-white" />
            {!isClose && (
              <span
                className={`group-hover:text-white ${
                  isSettingsOpen ? "text-pink-500" : "text-pink-500"
                }`}
              >
                Settings
              </span>
            )}
          </div>
          {isSettingsOpen && (
            <div className="ml-8">
              {settingsItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`group flex items-center space-x-4 p-2 rounded-md transition-all duration-300 mb-1 ${
                    location.pathname === item.path ? "bg-pink-700" : ""
                  } hover:bg-pink-700`}
                >
                  <span
                    className={`group-hover:text-white ${
                      location.pathname === item.path
                        ? "text-white"
                        : "text-pink-500 "
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-auto p-4">
        {isClose ? (
          <button className="p-2">
            <FaUserCircle className="text-xl text-pink-500 hover:text-pink-700" />
          </button>
        ) : (
          <button
            className="w-full p-2 rounded-md bg-pink-600 hover:bg-pink-700 text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
