import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// const JobExecutionData = [
//   {
//     id: 1,
//     service: "Autism Therapy",
//     bookingDate: "27 Sep, 17:00-18:00",
//     amount: "₹100.00",
//     location: "hyd",
//     parent: "John Doe",
//     contact: "info@johndoe.com",
//     phone: "1234567890",
//     status: "Completed",
//   },
//   {
//     id: 2,
//     service: "Speech Therapy",
//     bookingDate: "23 Sep 2022, 10:00-11:00",
//     amount: "₹50.00",
//     location: "Tamil Nadu",
//     parent: "Jane Smith",
//     contact: "info@janesmith.com",
//     phone: "9876543210",
//     status: "Rejected",
//   },
//   {
//     id: 3,
//     service: "Special Education",
//     bookingDate: "22 Sep 2022, 11:00-12:00",
//     amount: "₹50.00",
//     location: "Andhra",
//     parent: "Quentin Blake",
//     contact: "info@quentin.com",
//     phone: "3454868777",
//     status: "Rejected",
//   },
// ];

const JobExecution = () => {
  const [jobExecution, setJobExecution] = useState([]);
  const providerId = useSelector((state) => state.provider.providerId);

  useEffect(() => {
    const fetchJobExecution = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_WEBSITE}/my-bookings/${providerId}`
        );
        const filteredBookings = res.data.data.filter(
          (booking) =>
            booking.accepted === false && booking.status === "Cancelled"
        );
        setJobExecution(filteredBookings);
      } catch (error) {
        console.error("Error fetching job services:", error);
      }
    };
    fetchJobExecution();
  }, [providerId]);
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Therapies History</h1>
      </div>
      <div className="space-y-4">
        {jobExecution.map((service) => (
          <div
            key={service.id}
            className="bg-gray-50 border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="flex items-start space-x-4">
              <img
                src="https://www.shutterstock.com/shutterstock/photos/524271736/display_1500/stock-photo-cheerful-boy-with-disability-at-rehabilitation-center-for-kids-with-special-needs-524271736.jpg"
                alt={service.service}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">
                  {service?.serviceId?.name}
                </h2>
                <p className="mt-3 text-sm text-gray-600">
                  <strong>Booking Date:</strong> {service.date} {service.time}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  <strong>Amount:</strong> {service?.serviceId?.price}
                </p>
                {/* <p className="mt-1 text-sm text-gray-600">
                  <strong>Location:</strong> {service.location}
                </p> */}
                <p className="mt-1 text-sm text-gray-600">
                  <strong>Parent:</strong> {service?.parentId?.name}
                  <strong> *</strong> {service?.parentId?.email}
                  <strong> *</strong> {service?.parentId?.phone}
                </p>
              </div>
            </div>
            <div className="flex space-x-2 mt-4 md:mt-0">
              <button
                className={`text-white px-3 py-1 rounded ${
                  service.status === "Rejected"
                    ? "bg-[#e11d48]"
                    : "bg-[#0f766e]"
                }`}
              >
                {service.status}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobExecution;
