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
} from "react-icons/fa";
import { MdLogout, MdManageAccounts, MdVerified } from "react-icons/md";
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
    { name: "Account", path: "/settings/account", icon: <MdManageAccounts /> },
    {
      name: "Profile Verification",
      path: "/settings/verification",
      icon: <MdVerified />,
    },
    {
      name: "Appointments",
      path: "/settings/appointments",
      icon: <MdVerified />,
    },
  ];

  function handleLogout() {
    dispatch(setProviderLogout());
    window.location.href = "/";
  }

  const toggleSidebar = () => {
    const newIsClose = !isClose;
    setIsClose(newIsClose);
    setIsSettingsOpen(false);
    onSidebarToggle(newIsClose);
  };

  return (
    <div
      className={`fixed left-0 flex flex-col ${
        isClose ? "w-20" : "w-64"
      } text-white transition-all duration-300 overflow-y-auto h-fit mt-10`}
    >
      {/* className={`flex flex-col ${
        isClose ? "w-20" : "w-64"
      } bg-white text-pink-500 transition-all duration-300 shadow-lg overflow-y-auto h-full`} */}

      <div className="flex items-center justify-end p-2 border-b border-white">
        {/* {!isClose && (
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold text-pink-500">Services</h2>
          </div>
        )} */}
        <button className="p-2 rounded-md text-black" onClick={toggleSidebar}>
          {isClose ? (
            <FaChevronRight className="ml-[-40px]" />
          ) : (
            <FaChevronLeft />
          )}
        </button>
      </div>
      {/* <hr />//${
                // location.pathname === item.path ? "bg-pink-700" : ""
              } */}
      <div className="flex flex-col p-4 space-y-4 overflow-y-auto flex-grow">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.path} className="cursor-pointer">
            <div
              className={`group flex items-center space-x-4 p-2 rounded-md transition-all duration-300`}
            >
              <span
                className={`text-lg  ${
                  location.pathname === item.path
                    ? "text-pink-500 "
                    : "text-black "
                }`}
              >
                {item.icon}
              </span>
              {!isClose && (
                <span
                  className={` ${
                    location.pathname === item.path
                      ? "text-pink-500 "
                      : "text-black "
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
            className="group flex items-center space-x-4 p-2 rounded-md cursor-pointer"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          >
            <FaCog className="text-lg text-black" />
            {!isClose && (
              <span
                className={` ${isSettingsOpen ? "text-black" : "text-black"}`}
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
                    location.pathname === item.path ? "text-pink-700" : ""
                  }`}
                >
                  <span
                    className={` ${
                      location.pathname === item.path
                        ? "text-pink-500 "
                        : "text-black "
                    }`}
                  >
                    {isClose ? (
                      <span className="ml-[-200px]">{item.icon}</span>
                    ) : (
                      <span>{item.name}</span>
                    )}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div
          className="group flex items-center space-x-4 p-2 rounded-md cursor-pointer transition-all duration-300"
          onClick={handleLogout}
        >
          <MdLogout className="text-lg text-black" />
          {!isClose && <span className="text-black">Logout</span>}
        </div>
      </div>
      {/* <div className="mt-4">
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
      </div> */}
    </div>
  );
};

export default Sidebar;
