import { useEffect, useRef, useState } from "react";
import {
  FaBriefcase,
  FaChartBar,
  FaChevronLeft,
  FaChevronRight,
  FaMoneyBillAlt,
  FaStar,
  FaTools,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { setAdminLogout } from "../../store/AdminSlice";

const Sidebar = () => {
  const [isClose, setIsClose] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const location = useLocation();
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaChartBar /> },
    { name: "My Services", path: "/my-services", icon: <FaTools /> },
    { name: "Job Requests", path: "/job-requests", icon: <FaBriefcase /> },
    { name: "Job Execution", path: "/job-execution", icon: <FaTools /> },
    { name: "Payments", path: "/payments", icon: <FaMoneyBillAlt /> },
    { name: "Reviews", path: "/reviews", icon: <FaStar /> },
  ];

  const settingsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`flex flex-col ${
        isClose ? "w-20" : "w-64"
      } h-screen text-white transition-all duration-300 shadow-lg overflow-y-auto`}
    >
      <div className="flex items-center justify-between p-4 border-b border-white">
        {!isClose && (
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold text-pink-500">Services</h2>
          </div>
        )}
        <button
          className="p-2 rounded-md bg-pink-600 hover:bg-pink-700"
          onClick={() => setIsClose(!isClose)}
        >
          {isClose ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>
      <hr />
      <div className="flex flex-col p-4 space-y-4 overflow-y-auto">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.path} className="cursor-pointer">
            <div
              className={`group flex items-center space-x-4 p-2 rounded-md transition-all duration-300 ${
                location.pathname === item.path ? "bg-pink-700" : ""
              } hover:bg-pink-700`}
            >
              <span
                className={`text-lg  group-hover:text-white ${
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
      </div>

      {/* <div className="mt-auto p-4 border-t border-white flex items-center justify-between relative">
        {!isClose && (
          <div ref={settingsRef}>
            <button
              className="flex items-center space-x-4 hover:bg-pink-700 p-2 rounded-md transition-all duration-300"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <IoIosSettings className="text-lg mr-2 text-pink-300" />
              <span className="text-pink-300">Settings</span>
            </button>

            {isOpen && (
              <div className="absolute bottom-14 right-14 bg-white shadow-md border rounded-md w-40 z-50">
                <button
                  className="flex w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  //   onClick={() => {
                  //     setIsOpen(false);
                  //     navigate("/admin-profile");
                  //   }}
                >
                  <span className="text-pink-500">Profile</span>
                  <FaUser className="mt-1 ml-2" />
                </button>
                <button
                  className="flex w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  //   onClick={() => {
                  //     dispatch(setAdminLogout());
                  //     window.location.href = "http://localhost:3000";
                  //   }}
                >
                  <span className="text-pink-500">Log Out</span>
                  <FiLogOut className="mt-1 ml-2" />
                </button>
              </div>
            )}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Sidebar;
