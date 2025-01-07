import { FaBell, FaGlobe, FaMoon, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-1 bg-white">
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
        <button className="text-gray-600 hover:text-gray-900">
          <FaUserCircle size={15} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
