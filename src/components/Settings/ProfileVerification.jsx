import React from "react";
import { FiFileText, FiMail, FiPhone } from "react-icons/fi";

const ProfileVerification = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Profile Verification
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-6xl">
        {verificationItems.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg p-6 shadow-lg bg-white flex flex-col"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                {item.icon}
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </div>
            <hr className="border-t border-gray-300 mb-4" />
            <div className="mt-auto flex items-center justify-between">
              <span className="text-red-700 font-semibold bg-red-200 px-2 py-1 rounded-sm">
                • Not Verified
              </span>
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all">
                {item.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const verificationItems = [
  {
    icon: <FiPhone className="text-gray-700 text-2xl" />,
    title: "Phone Number Verification",
    description: "Authentication for Login, OTP, Settings, transfers",
    buttonText: "Verify",
  },
  {
    icon: <FiMail className="text-gray-700 text-2xl" />,
    title: "Email Address Verification",
    description: "For account Login & Retrieve of your Account",
    buttonText: "Verify",
  },
  {
    icon: <FiFileText className="text-gray-700 text-2xl" />,
    title: "Documentation Verification",
    description:
      "You will not be able to give therapies until the real name is confirmed",
    buttonText: "Upload Document",
  },
];

export default ProfileVerification;
