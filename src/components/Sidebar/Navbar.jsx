import { useEffect, useRef, useState } from "react";
import { FaBell, FaGlobe, FaMoon, FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setProviderLogout } from "../../store/ProviderSlice";
const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const dispatch = useDispatch();
  const logoutRef = useRef();
  const handleLogout = () => {
    dispatch(setProviderLogout());
    window.location.href = "/";
  };

  const toggleLogoutMenu = () => {
    setShowLogout(!showLogout);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-1 bg-white z-50 border border-b">
      <div className="ml-8 text-pink-600 font-bold text-2xl">
        {/* <img
          src="https://ausumkids.com/wp-content/uploads/2024/08/Untitled-design-6-e1723961711858.png"
          alt="Truely Sell"
          className="h-8"
        /> */}
        {/* <button className="text-gray-600 hover:text-gray-900">
          <FaBars size={20} />
        </button> */}
        Ausum Kids
      </div>

      <div className="flex items-center space-x-4">
        <div className="mx-4 w-96">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
        </div>
        <button className="text-gray-600 hover:text-gray-900">
          <FaGlobe size={15} />
        </button>
        <button className="text-gray-600 hover:text-gray-900">
          <FaMoon size={15} />
        </button>
        <button className="text-gray-600 hover:text-gray-900">
          <FaBell size={15} />
        </button>
        <div ref={logoutRef} className="relative">
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={toggleLogoutMenu}
          >
            <FaUserCircle size={15} />
          </button>
          {showLogout && (
            <div className="absolute right-0 top-full mt-2 w-32 bg-white border rounded-md shadow-lg">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
