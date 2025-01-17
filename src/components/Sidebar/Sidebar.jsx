// import { useState } from "react";
// import {
//   FaBriefcase,
//   FaChartBar,
//   FaCog,
//   FaMoneyBillAlt,
//   FaStar,
//   FaTools,
// } from "react-icons/fa";
// import { MdLogout, MdManageAccounts, MdVerified } from "react-icons/md";
// import { useDispatch } from "react-redux";
// import { Link, useLocation } from "react-router-dom";
// import { setProviderLogout } from "../../store/ProviderSlice";

// const Sidebar = ({ onSidebarToggle }) => {
//   const [isClose, setIsClose] = useState(false);
//   const [isSettingsOpen, setIsSettingsOpen] = useState(false);
//   const location = useLocation();
//   const dispatch = useDispatch();

//   console.log("location", location);
//   const menuItems = [
//     { name: "Dashboard", path: "/dashboard", icon: <FaChartBar /> },
//     { name: "My Services", path: "/my-services", icon: <FaTools /> },
//     { name: "Job Requests", path: "/job-requests", icon: <FaBriefcase /> },
//     { name: "Job Execution", path: "/job-execution", icon: <FaTools /> },
//     { name: "Payments", path: "/payouts", icon: <FaMoneyBillAlt /> },
//     { name: "Reviews", path: "/reviews", icon: <FaStar /> },
//   ];

//   const settingsItems = [
//     { name: "Account", path: "/settings/account", icon: <MdManageAccounts /> },
//     {
//       name: "Profile Verification",
//       path: "/settings/verification",
//       icon: <MdVerified />,
//     },
//     {
//       name: "Appointments",
//       path: "/settings/appointments",
//       icon: <MdVerified />,
//     },
//   ];

//   function handleLogout() {
//     dispatch(setProviderLogout());
//     window.location.href = "/";
//   }

//   const toggleSidebar = () => {
//     const newIsClose = !isClose;
//     setIsClose(newIsClose);
//     setIsSettingsOpen(false);
//     onSidebarToggle(newIsClose);
//   };

//   return (
//     <div
//       className={`flex flex-col

//       text-white transition-all duration-300 overflow-y-auto h-fit mt-10`}
//     >
//       {/* className={`flex flex-col ${
//         isClose ? "w-20" : "w-64"
//       } bg-white text-blue-500 transition-all duration-300 shadow-lg overflow-y-auto h-full`} */}

//       <div className="flex items-center justify-end p-2 border-b border-white">
//         {!isClose && (
//           <div className="flex items-center space-x-2">
//             <h2 className="text-2xl font-bold text-blue-500">Ausum Kids</h2>
//           </div>
//         )}
//         {/* <button className="p-2 rounded-md text-black" onClick={toggleSidebar}>
//           {isClose ? (
//             <FaChevronRight className="ml-[-40px]" />s
//           ) : (
//             <FaChevronLeft />
//           )}
//         </button> */}
//       </div>
//       {/* <hr />//${
//                 // location.pathname === item.path ? "bg-blue-700" : ""
//               } */}
//       <div className="flex flex-col p-4 space-y-4 overflow-y-auto flex-grow">
//         {menuItems.map((item, index) => (
//           <Link key={index} to={item.path} className="cursor-pointer">
//             <div
//               className={`group flex items-center space-x-4 p-2 rounded-md transition-all duration-300`}
//             >
//               <span
//                 className={`text-lg  ${
//                   location.pathname === item.path
//                     ? "text-blue-500 "
//                     : "text-black "
//                 }`}
//               >
//                 {item.icon}
//               </span>
//               {!isClose && (
//                 <span
//                   className={` ${
//                     location.pathname === item.path
//                       ? "text-blue-500 "
//                       : "text-black "
//                   }`}
//                 >
//                   {item.name}
//                 </span>
//               )}
//             </div>
//           </Link>
//         ))}

//         <div>
//           <div
//             className="group flex items-center space-x-4 p-2 rounded-md cursor-pointer"
//             onClick={() => setIsSettingsOpen(!isSettingsOpen)}
//           >
//             <FaCog className="text-lg text-black" />
//             {!isClose && (
//               <span
//                 className={` ${isSettingsOpen ? "text-black" : "text-black"}`}
//               >
//                 Settings
//               </span>
//             )}
//           </div>
//           {isSettingsOpen && (
//             <div className="ml-8">
//               {settingsItems.map((item, index) => (
//                 <Link
//                   key={index}
//                   to={item.path}
//                   className={`group flex items-center space-x-4 p-2 rounded-md transition-all duration-300 mb-1 ${
//                     location.pathname === item.path ? "text-blue-700" : ""
//                   }`}
//                 >
//                   <span
//                     className={` ${
//                       location.pathname === item.path
//                         ? "text-blue-500 "
//                         : "text-black "
//                     }`}
//                   >
//                     {isClose ? (
//                       <span>{item.icon}</span>
//                     ) : (
//                       <span>{item.name}</span>
//                     )}
//                   </span>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>

//         <div
//           className="group flex items-center space-x-4 p-2 rounded-md cursor-pointer transition-all duration-300"
//           onClick={handleLogout}
//         >
//           <MdLogout className="text-lg text-black" />
//           {!isClose && <span className="text-black">Logout</span>}
//         </div>
//       </div>
//       {/* <div className="mt-4">
//         {isClose ? (
//           <button className="p-2">
//             <FaUserCircle className="text-xl text-blue-500 hover:text-blue-700" />
//           </button>
//         ) : (
//           <button
//             className="w-full p-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         )}
//       </div> */}
//     </div>
//   );
// };

// export default Sidebar;
// import axios from "axios";
// import { useEffect, useState } from "react";
// import {
//   FaBriefcase,
//   FaChartBar,
//   FaMoneyBillAlt,
//   FaStar,
//   FaTools,
// } from "react-icons/fa";
// import { MdLogout, MdManageAccounts, MdVerified } from "react-icons/md";

// import { ChevronDown } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { setProviderLogout } from "../../store/ProviderSlice";
// const Sidebar = ({ onSidebarToggle }) => {
//   const [isClose, setIsClose] = useState(false);
//   const [isSettingsOpen, setIsSettingsOpen] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const provider = useSelector((state) => state.provider);

//   useEffect(() => {
//     const fetchProviderDetails = async () => {
//       try {
//         const providerDetails = await axios.get(
//           `${import.meta.env.VITE_API_URL}/${provider.providerId}`
//         );
//         if (providerDetails.data.success) {
//           setUserData(providerDetails.data.data);
//         }
//       } catch (err) {
//         console.log("Error in fetching provider details", err);
//       }
//     };
//     fetchProviderDetails();
//   }, []);

//   const menuItems = [
//     { name: "Dashboard", path: "/dashboard", icon: <FaChartBar /> },
//     { name: "New Therapies", path: "/job-requests", icon: <FaBriefcase /> },
//     { name: "OnGoing Therapies", path: "/my-services", icon: <FaTools /> },
//     { name: "Therapies History", path: "/job-execution", icon: <FaTools /> },
//     { name: "Payments", path: "/payouts", icon: <FaMoneyBillAlt /> },
//     { name: "Reviews", path: "/reviews", icon: <FaStar /> },
//   ];

//   const settingsItems = [
//     { name: "Account", path: "/settings/account", icon: <MdManageAccounts /> },
//     {
//       name: "Profile Verification",
//       path: "/settings/verification",
//       icon: <MdVerified />,
//     },
//     {
//       name: "Appointments",
//       path: "/settings/appointments",
//       icon: <MdVerified />,
//     },
//   ];

//   const handleLogout = () => {
//     dispatch(setProviderLogout());
//     navigate("/");
//   };

//   return (
//     <div
//       className={`fixed top-0 left-0 h-screen w-72 bg-white shadow-sm text-black pt-4 overflow-y-auto`}
//     >
//       <div className="p-6 border-b">
//         <div className="text-center">
//           <div className="relative w-24 h-24 mx-auto">
//             <img
//               src="https://ausumkids.com/wp-content/uploads/2024/08/Untitled-design-6-e1723961711858.png"
//               alt="Profile"
//               className="rounded-full w-full h-full"
//             />
//           </div>
//           <h2 className="text-lg font-bold text-blue-600">Ausum Kids</h2>
//         </div>
//       </div>

//       <div className="flex-1 overflow-y-auto py-4">
//         <ul className="space-y-1 px-3">
//           {menuItems.map((item) => (
//             <li key={item.name}>
//               <Link to={item.path}>
//                 <button
//                   className={`w-full flex items-center gap-3 px-5 py-3 rounded-lg text-lg hover:text-blue-600 ${
//                     location.pathname === item.path
//                       ? "bg-primary/10 text-primary font-medium text-blue-600 bg-gray-100"
//                       : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   {/* {item.icon} */}
//                   <span>{item.name}</span>
//                 </button>
//               </Link>
//             </li>
//           ))}

//           <li>
//             <button
//               className="w-full flex items-center gap-3 px-5 py-3 rounded-lg text-gray-600 text-lg hover:text-blue-600"
//               onClick={() => setIsSettingsOpen(!isSettingsOpen)}
//             >
//               {/* <FaCog className="w-6 h-6" /> */}
//               <span>Settings</span>
//               <ChevronDown
//                 className={`ml-auto h-4 w-4 transition-transform duration-200 ${
//                   isSettingsOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </button>
//             {isSettingsOpen && (
//               <ul className="mt-1 ml-4 space-y-1">
//                 {settingsItems.map((item) => (
//                   <li key={item.name}>
//                     <Link to={item.path}>
//                       <button
//                         className={`w-full flex items-center gap-3 px-5 py-3 rounded-lg text-lg hover:text-blue-600 ${
//                           location.pathname === item.path
//                             ? "bg-primary/10 text-primary font-medium text-blue-600 bg-gray-100"
//                             : "text-gray-600 hover:bg-gray-100"
//                         }`}
//                       >
//                         {item.name}
//                       </button>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         </ul>
//       </div>

//       <div className="border-t p-4">
//         <button
//           className="w-full flex items-center gap-3 px-5 py-3 rounded-lg text-lg text-red-500 hover:bg-red-50"
//           onClick={handleLogout}
//         >
//           <MdLogout className="w-6 h-6" />
//           <span>Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import axios from "axios";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaChartBar,
  FaMoneyBillAlt,
  FaStar,
  FaTools,
} from "react-icons/fa";
import { MdLogout, MdManageAccounts, MdVerified } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setProviderLogout } from "../../store/ProviderSlice";

const Sidebar = ({ onSidebarToggle }) => {
  const [isClose, setIsClose] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const provider = useSelector((state) => state.provider);

  useEffect(() => {
    const fetchProviderDetails = async () => {
      try {
        const providerDetails = await axios.get(
          `${import.meta.env.VITE_API_URL}/${provider.providerId}`
        );
        if (providerDetails.data.success) {
          setUserData(providerDetails.data.data);
        }
      } catch (err) {
        console.log("Error in fetching provider details", err);
      }
    };
    fetchProviderDetails();
  }, []);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaChartBar /> },
    { name: "New Therapies", path: "/job-requests", icon: <FaBriefcase /> },
    { name: "OnGoing Therapies", path: "/my-services", icon: <FaTools /> },
    { name: "Therapies History", path: "/job-execution", icon: <FaTools /> },
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

  const handleLogout = () => {
    dispatch(setProviderLogout());
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-72 bg-white shadow-sm text-black flex flex-col">
      <div className="p-3 border-b">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto">
            <img
              src="https://ausumkids.com/wp-content/uploads/2024/08/Untitled-design-6-e1723961711858.png"
              alt="Profile"
              className="rounded-full w-full h-full"
            />
          </div>
          <h2 className="text-lg font-bold text-blue-600">Ausum Kids</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link to={item.path}>
                <button
                  className={`w-full flex items-center gap-3 px-5 py-3 rounded-lg text-lg hover:text-blue-600 ${
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary font-medium text-blue-600 bg-gray-100"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span>{item.name}</span>
                </button>
              </Link>
            </li>
          ))}

          <li>
            <button
              className="w-full flex items-center gap-3 px-5 py-3 rounded-lg text-gray-600 text-lg hover:text-blue-600"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              <span>Settings</span>
              <ChevronDown
                className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                  isSettingsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isSettingsOpen && (
              <ul className="mt-1 ml-4 space-y-1">
                {settingsItems.map((item) => (
                  <li key={item.name}>
                    <Link to={item.path}>
                      <button
                        className={`w-full flex items-center gap-3 px-5 py-3 rounded-lg text-lg hover:text-blue-600 ${
                          location.pathname === item.path
                            ? "bg-primary/10 text-primary font-medium text-blue-600 bg-gray-100"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {item.name}
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>

      <div className="border-t p-4">
        <button
          className="w-full flex items-center gap-3 px-5 py-3 rounded-lg text-lg text-red-500 hover:bg-red-50"
          onClick={handleLogout}
        >
          <MdLogout className="w-6 h-6" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
