import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import Select from "react-select";

function Account() {
  const [userData, setUserData] = useState({
    profilePicture: "",
    name: "",
    userName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    bio: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    languages: [],
    services: [],
  });
  const providerId = useSelector((state) => state.provider).providerId;

  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_WEBSITE}/provider/${providerId}`)
      .then((response) => {
        console.log("response", response.data.data);
        setUserData(response.data.data);
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

  // const handleLanguageChange = (e) => {
  //   const { options } = e.target;
  //   const selectedLanguages = [];
  //   for (let i = 0; i < options.length; i++) {
  //     if (options[i].selected) {
  //       selectedLanguages.push(options[i].value);
  //     }
  //   }
  //   setUserData({ ...userData, languages: selectedLanguages });
  // };
  const serviceOptions = [
    { value: 1, label: "Books" },
    { value: 2, label: "Movies, Music & Games" },
    { value: 3, label: "Electronics & Computers" },
    { value: 4, label: "Home, Garden & Tools" },
    { value: 5, label: "Health & Beauty" },
    { value: 6, label: "Toys, Kids & Baby" },
    { value: 7, label: "Clothing & Jewelry" },
    { value: 8, label: "Sports & Outdoors" },
    { value: 9, label: "Automotive & Industrial" },
  ];
  const languages = [
    { value: 1, label: "Assamese" },
    { value: 2, label: "Bengali" },
    { value: 3, label: "Bodo" },
    { value: 4, label: "Dogri" },
    { value: 5, label: "Gujarati" },
    { value: 6, label: "Hindi" },
    { value: 7, label: "Kannada" },
    { value: 8, label: "Kashmiri" },
    { value: 9, label: "Konkani" },
    { value: 10, label: "Maithili" },
    { value: 11, label: "Malayalam" },
    { value: 12, label: "Manipuri" },
    { value: 13, label: "Marathi" },
    { value: 14, label: "Nepali" },
    { value: 15, label: "Odia" },
    { value: 16, label: "Punjabi" },
    { value: 17, label: "Sanskrit" },
    { value: 18, label: "Santali" },
    { value: 19, label: "Sindhi" },
    { value: 20, label: "Tamil" },
    { value: 21, label: "Telugu" },
    { value: 22, label: "Urdu" },
    { value: 23, label: "English" },
    { value: 24, label: "Hindi" },
  ];

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };
  const handleServicesChange = (selectedOptions) => {
    setUserData({
      ...userData,
      services: selectedOptions.map((option) => option.value),
    });
  };
  const handleLanguages = (selectedOptions) => {
    setUserData({
      ...userData,
      languages: selectedOptions.map((option) => option.value),
    });
  };
  const handleSubmit = () => {
    axios
      .put(`${import.meta.env.VITE_WEBSITE}/provider/${providerId}`, userData)
      .then((response) => {
        alert("User data updated successfully!");
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("There was an error updating the user data!", error);
      });
  };

  return (
    <div className="mt-10">
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
              disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mobile Number
            </label>
            <input
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              type="text"
              disabled
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
              disabled={!isEditing}
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
              name="dob"
              value={userData.dob}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              type="date"
              disabled={!isEditing}
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
            disabled={!isEditing}
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
 disabled={!isEditing}
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
 disabled={!isEditing}
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
            disabled={!isEditing}
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
              disabled={!isEditing}
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
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Postal Code
            </label>
            <input
              name="pincode"
              value={userData.pincode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              type="text"
              disabled={!isEditing}
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
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Languages
          </label>
          {/* <input
            name="languages"
            value={userData.languages}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            type="text"
            disabled={!isEditing}
          /> */}
          <Select
            options={languages}
            value={languages?.filter(
              (option) =>
                Array.isArray(userData.languages) &&
                userData.languages.includes(option.value)
            )}
            onChange={handleLanguages}
            isMulti
            isDisabled={!isEditing}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Services
          </label>
          <Select
            options={serviceOptions}
            value={serviceOptions?.filter(
              (option) =>
                Array.isArray(userData.services) &&
                userData.services.includes(option.value)
            )}
            onChange={handleServicesChange}
            isMulti
            isDisabled={!isEditing}
            className="basic-multi-select"
            classNamePrefix="select"
          />
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
