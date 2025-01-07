import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

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
    languages: [],
  });
  const providerId = useSelector((state) => state.provider).providerId;

  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    // Fetch user data from the backend
    axios
      .get(`${import.meta.env.VITE_WEBSITE}/provider/${providerId}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the user data!", error);
      });
  }, []);
  console.log("providerId", providerId);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const storageRef = ref(storage, `profile_pictures/${file.name}`);
  //     const uploadTask = uploadBytesResumable(storageRef, file);

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         // Optional: Track the upload progress
  //       },
  //       (error) => {
  //         console.error("File upload error", error);
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           setUserData({ ...userData, profilePicture: downloadURL });
  //         });
  //       }
  //     );
  //   }
  // };

  const handleLanguageChange = (e) => {
    const { options } = e.target;
    const selectedLanguages = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedLanguages.push(options[i].value);
      }
    }
    setUserData({ ...userData, languages: selectedLanguages });
  };

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };
  const handleSubmit = () => {
    axios
      .put(`${import.meta.env.VITE_WEBSITE}/provider`, userData)
      .then((response) => {
        alert("User data updated successfully!");
      })
      .catch((error) => {
        console.error("There was an error updating the user data!", error);
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 ml-10">Account Settings</h2>
      <div className="container mx-auto p-3 bg-white shadow rounded mb-10 mt-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Profile Picture
          </label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <img
                src={
                  userData.profilePicture ||
                  "https://www.alansonsample.com/images/Alanson_Headshot.jpg"
                }
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex flex-row gap-2 ml-5">
                <label
                  htmlFor="file-upload"
                  className="flex cursor-pointer bg-[#3f3f46] text-sm text-white px-2 py-1 rounded text-center"
                >
                  <IoCloudUploadOutline className="mr-1 mt-1" />{" "}
                  <span>Upload </span>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  // onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() =>
                    setUserData({ ...userData, profilePicture: "" })
                  }
                  className="bg-gray-100 text-black text-sm px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
          {/* <p className="text-sm text-gray-500 mt-2">
            *Image size should be at least 320px big, and less than 500kb.
            Allowed files: .png and .jpg.
          </p> */}
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
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Languages
          </label>
          <select
            name="languages"
            value={userData.languages}
            onChange={handleLanguageChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Bengali">Bengali</option>
            <option value="Telugu">Telugu</option>
            <option value="Marathi">Marathi</option>
            <option value="Tamil">Tamil</option>
            <option value="Urdu">Urdu</option>
            <option value="Gujarati">Gujarati</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Kannada">Kannada</option>
            <option value="Odia">Odia</option>
            <option value="Punjabi">Punjabi</option>
            <option value="Assamese">Assamese</option>
            <option value="Maithili">Maithili</option>
            <option value="Sanskrit">Sanskrit</option>
            <option value="Konkani">Konkani</option>
            <option value="Sindhi">Sindhi</option>
            <option value="Dogri">Dogri</option>
            <option value="Manipuri">Manipuri</option>
            <option value="Bodo">Bodo</option>
            <option value="Santali">Santali</option>
            <option value="Kashmiri">Kashmiri</option>
            <option value="Nepali">Nepali</option>
            <option value="Sikh (Gurmukhi)">Sikh (Gurmukhi)</option>
            <option value="Rajasthani">Rajasthani</option>
          </select>
        </div>

        {/* <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </div> */}
        <div className="mt-6 flex justify-end">
          {isEditing ? (
            <>
              <button
                onClick={toggleEditMode}
                className="bg-gray-200 text-black px-4 py-2 text-sm rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-[#3f3f46] text-white px-4 py-2 text-sm rounded ml-5"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={toggleEditMode}
              className="bg-[#3f3f46] text-white px-8 text-sm py-2 rounded"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
