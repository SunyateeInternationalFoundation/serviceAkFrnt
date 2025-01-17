import React from "react";
import { FiFileText, FiMail, FiPhone } from "react-icons/fi";

const ProfileVerification = () => {
  return (
    <div className="p-6 mt-5">
      <h1 className="text-2xl font-bold mb-6">Profile Verification</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border rounded-lg p-6 shadow-sm bg-white">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
              <FiPhone className="text-gray-700 text-lg" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium">Phone Number Verification</h2>
              <p className="text-gray-600 text-sm mb-2">
                Authentication for Login, OTP, Settings, transfers
              </p>
            </div>
          </div>
          <hr className="border-t border-gray-300 mb-4" />
          <div className="mt-4 flex items-center justify-between">
            <span className="text-red-700 font-semibold mr-2 bg-red-200 rounded-sm px-1">
              • Not Verified
            </span>
            <div className="flex items-center">
              <button className="bg-black text-white px-2 py-1 rounded-lg mr-2">
                Verify
              </button>
              {/* <button className="text-red-500 px-2 py-2">
                <FiTrash className="text-lg" />
              </button> */}
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6 shadow-sm bg-white">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
              <FiMail className="text-gray-700 text-lg" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium">
                Email Address Verification
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                For account Login & Retrieve of your Account
              </p>
            </div>
          </div>
          <hr className="border-t border-gray-300 mb-4" />
          <div className="mt-4 flex items-center justify-between">
            <span className="text-red-700 font-semibold bg-red-200 mr-2 rounded-sm px-1">
              • Not Verified
            </span>
            <div className="flex items-center">
              <button className="bg-black text-white px-2 py-1 rounded-lg mr-2">
                Verify
              </button>
              {/* <button className="text-red-500 px-2 py-2">
                <FiTrash className="text-lg" />
              </button> */}
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6 shadow-sm bg-white">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
              <FiFileText className="text-gray-700 text-lg" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium">
                Documentation Verification
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                You will not be able to place orders until the real name is
                confirmed
              </p>
            </div>
          </div>
          <hr className="border-t border-gray-300 mb-4" />
          <div className="mt-4 flex items-center justify-between">
            <span className="text-red-700 font-semibold bg-red-200 mr-2 rounded-sm px-1">
              • Not Verified
            </span>
            <div className="flex items-center">
              <button className="bg-black text-white px-2 py-1 rounded-lg mr-2">
                Upload Document
              </button>
              {/* <button className="text-red-500 px-2 py-2">
                <FiTrash className="text-lg" />
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileVerification;
