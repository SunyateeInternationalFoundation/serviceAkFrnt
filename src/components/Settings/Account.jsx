import axios from "axios";
import React, { useEffect, useState } from "react";

function Account() {
  const [userData, setUserData] = useState({
    profilePicture: "",
    name: "",
    userName: "",
    email: "",
    mobileNumber: "",
    gender: "",
    dateOfBirth: "",
    bio: "",
    address: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
  });

  useEffect(() => {
    // Fetch user data from the backend
    axios
      .get("/api/user/details")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the user data!", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = () => {
    // Send updated data to the backend
    axios
      .post("/api/user/update", userData)
      .then((response) => {
        alert("User data updated successfully!");
      })
      .catch((error) => {
        console.error("There was an error updating the user data!", error);
      });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
      <div className="container mx-auto p-3 bg-white shadow rounded mb-10 mt-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Profile Picture
          </label>
          <input type="file" className="mb-2" />
          <img
            // src={userData.profilePicture}
            src="https://www.alansonsample.com/images/Alanson_Headshot.jpg"
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              type="text"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              User Name
            </label>
            <input
              name="userName"
              value={userData.userName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              type="text"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              type="email"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mobile Number
            </label>
            <input
              name="mobileNumber"
              value={userData.mobileNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              type="text"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={userData.gender}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date of Birth
            </label>
            <input
              name="dateOfBirth"
              value={userData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              type="date"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Your Bio
          </label>
          <textarea
            name="bio"
            value={userData.bio}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            rows="2"
          ></textarea>
        </div>

        {/* <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Address
          </label>
          <input
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            type="text"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Country
          </label>
          <input
            name="country"
            value={userData.country}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            type="text"
          />
        </div>
      </div> */}
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Address
          </label>
          <input
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            type="text"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              State
            </label>
            <input
              name="state"
              value={userData.state}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              type="text"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              City
            </label>
            <input
              name="city"
              value={userData.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              type="text"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Postal Code
            </label>
            <input
              name="postalCode"
              value={userData.postalCode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              type="text"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Country
            </label>
            <input
              name="country"
              value={userData.country}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              type="text"
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;
