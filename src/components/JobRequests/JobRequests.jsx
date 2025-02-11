import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// const jobRequestsData = [
//   {
//     id: 1,
//     service: "Autism Therapy",
//     status: "Rejected",
//     bookingDate: "27 Sep, 17:00-18:00",
//     amount: "₹100.00",

//     location: "hyd",
//     parent: "John Doe",
//     contact: "info@johndoe.com",
//     phone: "1234567890",
//   },
//   {
//     id: 2,
//     service: "Speech Therapy",
//     status: "Accepted",
//     bookingDate: "23 Sep 2022, 10:00-11:00",
//     amount: "₹50.00",

//     location: "Tamil Nadu",
//     parent: "Jane Smith",
//     contact: "info@janesmith.com",
//     phone: "9876543210",
//   },
//   {
//     id: 3,
//     service: "Special Education",
//     status: "Rejected",
//     bookingDate: "22 Sep 2022, 11:00-12:00",
//     amount: "₹50.00",
//     location: "Andhra",
//     parent: "Quentin Blake",
//     contact: "info@quentin.com",
//     phone: "3454868777",
//   },
// ];

const JobRequests = () => {
  const providerId = useSelector((state) => state.provider.providerId);
  const navigate = useNavigate();
  const [jobRequests, setJobRequests] = useState([]);

  useEffect(() => {
    const fetchJobRequests = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_WEBSITE}/my-bookings/${providerId}`
        );
        const filteredBookings = res.data.data.filter(
          (booking) =>
            booking.accepted === false && booking.status === "On Going"
        );
        setJobRequests(filteredBookings);
      } catch (error) {
        console.error("Error fetching job requests:", error);
        toast.error("Failed to fetch job requests. Please try again.");
      }
    };
    if (providerId) fetchJobRequests();
  }, [providerId]);

  // const handleAction = async (id, status) => {
  //   try {
  //     console.log(id, status);
  //     await axios.patch(
  //       `${import.meta.env.VITE_WEBSITE}/update-booking-status`,
  //       {
  //         id,
  //         status,
  //       }
  //     );
  //     toast.success(`Booking status updated to ${status}.`);
  //     setJobRequests((prev) =>
  //       prev.map((request) =>
  //         request.id === id ? { ...request, status } : request
  //       )
  //     );
  //   } catch (error) {
  //     toast.error("Failed to update booking status. Please try again.");
  //   }
  // };
  const handleAction = async (id, status) => {
    try {
      console.log(id, status);
      const res = await axios.patch(
        `${import.meta.env.VITE_WEBSITE}/update-booking-status`,
        {
          id,
          status,
        }
      );
      console.log("response", res);
      toast.success(
        `Booking status updated to ${
          status === "true" ? "Accepted" : "Cancelled"
        }.`
      );
      setJobRequests(res.data.data);
      if (status === "true") {
        navigate("/my-services");
      } else {
        navigate("/job-execution");
      }
    } catch (error) {
      toast.error("Failed to update booking status. Please try again.", error);
    }
  };
  console.log("job requests", jobRequests);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">New Therapies</h1>
      </div>
      <div className="space-y-4 px-2 sm:px-4">
        {jobRequests.map((request) => (
          <div
            key={request._id}
            className="bg-white shadow rounded-lg p-4 md:p-6 flex flex-col md:flex-row justify-between items-start gap-4"
          >
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="shrink-0 mx-auto sm:mx-0">
                <img
                  src={request?.childId?.image || "default-image-url"}
                  alt={request.service}
                  className="w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover rounded-lg"
                />
              </div>

              <div className="flex-1 space-y-2 min-w-0">
                <h2 className="text-xl md:text-xl font-semibold truncate">
                  {request?.serviceId?.name}
                </h2>

                <span
                  className={`text-sm md:text-base font-semibold ${
                    request.status === "Rejected"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {request.status}
                </span>

                <div className="space-y-1 text-gray-600">
                  <p className="text-sm md:text-base">
                    <strong>Booking:</strong> {request.date} {request.time}
                  </p>
                  <p className="text-sm md:text-base">
                    <strong>Amount:</strong> ₹{request?.serviceId?.price}
                  </p>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-1">
                    <p className="text-sm md:text-base">
                      <strong>Parent:</strong> {request?.parentId?.name}
                      <strong> * </strong>
                      {request?.parentId?.email}
                      <strong> * </strong>
                      {request?.parentId?.phone}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-1">
                    <p className="text-sm md:text-base ">
                      <strong>Child:</strong>{" "}
                      {request?.childId?.basicInfo?.childFullName}
                      <strong> * </strong>
                      {request?.childId?.basicInfo?.dateOfBirth}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-2 justify-end">
              {request.status === "Cancelled" ||
              request.status === "Completed" ? (
                <button
                  className="w-full md:w-32 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm md:text-base"
                  disabled
                >
                  No Actions
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleAction(request._id, "true")}
                    className="w-full md:w-32 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm md:text-base hover:bg-blue-600 transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(request._id, "false")}
                    className="w-full md:w-32 bg-[#94a3b8] text-white px-4 py-2 rounded-lg text-sm md:text-base hover:bg-[#93a6c2] transition-colors"
                  >
                    Reject
                  </button>
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
