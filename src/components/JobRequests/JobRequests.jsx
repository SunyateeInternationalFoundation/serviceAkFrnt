import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const jobRequestsData = [
  {
    id: 1,
    service: "Autism Therapy",
    status: "Rejected",
    bookingDate: "27 Sep, 17:00-18:00",
    amount: "₹100.00",

    location: "hyd",
    parent: "John Doe",
    contact: "info@johndoe.com",
    phone: "1234567890",
  },
  {
    id: 2,
    service: "Speech Therapy",
    status: "Accepted",
    bookingDate: "23 Sep 2022, 10:00-11:00",
    amount: "₹50.00",

    location: "Tamil Nadu",
    parent: "Jane Smith",
    contact: "info@janesmith.com",
    phone: "9876543210",
  },
  {
    id: 3,
    service: "Special Education",
    status: "Rejected",
    bookingDate: "22 Sep 2022, 11:00-12:00",
    amount: "₹50.00",
    location: "Andhra",
    parent: "Quentin Blake",
    contact: "info@quentin.com",
    phone: "3454868777",
  },
];

const JobRequests = () => {
  const [jobRequests, setJobRequests] = useState(jobRequestsData);

  const handleAction = (id, action) => {
    const updatedRequests = jobRequests.map((req) =>
      req.id === id ? { ...req, status: action } : req
    );

    setJobRequests(updatedRequests);

    if (action === "Accepted") {
      toast.success(
        "You have successfully accepted the job request. Please prepare for the session."
      );
    } else if (action === "Rejected") {
      toast.error("The job request has been rejected.");
    }
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job Requests</h1>
      </div>
      <div className="space-y-4">
        {jobRequests.map((request) => (
          <div
            key={request.id}
            className="bg-white shadow rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="flex items-start space-x-4">
              <img
                src="https://www.shutterstock.com/shutterstock/photos/524271736/display_1500/stock-photo-cheerful-boy-with-disability-at-rehabilitation-center-for-kids-with-special-needs-524271736.jpg"
                alt={request.service}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">{request.service}</h2>
                <span
                  className={`text-sm font-medium ${
                    request.status === "Rejected"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {request.status}
                </span>
                <p className="mt-2 text-sm text-gray-600">
                  <strong>Booking Date:</strong> {request.bookingDate}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  <strong>Amount:</strong> {request.amount}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  <strong>Location:</strong> {request.location}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  <strong>Parent:</strong> {request.parent}
                  <strong> *</strong> {request.contact}
                  <strong> *</strong> {request.phone}
                </p>
              </div>
            </div>
            <div className="flex space-x-2 mt-4 md:mt-0">
              {request.status === "Cancelled" ||
              request.status === "Completed" ? (
                <button
                  className="bg-gray-300 text-gray-700 px-2 py-1 rounded"
                  disabled
                >
                  No Actions
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleAction(request.id, "Accepted")}
                    className="bg-[#0d9488] text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(request.id, "Rejected")}
                    className="bg-[#f43f5e] text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                  {/* <button
                    onClick={() => handleAction(request.id, "Rescheduled")}
                    className="bg-[#9ca3af] text-white px-2 py-1 rounded"
                  >
                    Reschedule
                  </button> */}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobRequests;
