import axios from "axios";
import React, { useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

const MyservicesData = [
  {
    id: 1,
    service: "Autism Therapy",
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
    bookingDate: "22 Sep 2022, 11:00-12:00",
    amount: "₹50.00",
    location: "Andhra",
    parent: "Quentin Blake",
    contact: "info@quentin.com",
    phone: "3454868777",
  },
];

const MyServices = () => {
  const [myServices, setMyServices] = useState(MyservicesData);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const openModal = (service) => {
    console.log("Opening modal for service:", service);
    setSelectedService(service);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedService(null);
    setNewDate("");
    setNewTime("");
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "20px",
      borderRadius: "8px",
      width: "400px",
      maxWidth: "90%",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  const handleReschedule = async () => {
    try {
      console.log("successfully rescheduled ur time and date..!");
      const response = await axios.put("/api/reschedule", {
        id: selectedService.id,
        newDate,
        newTime,
      });

      if (response.data.success) {
        const updatedServices = myServices.map((service) =>
          service.id === selectedService.id
            ? { ...service, bookingDate: `${newDate}, ${newTime}` }
            : service
        );
        setMyServices(updatedServices);
        closeModal();
      }
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Services</h1>
      </div>
      <div className="space-y-4">
        {myServices.map((service) => (
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
                <h2 className="text-lg font-semibold">{service.service}</h2>
                <p className="mt-3 text-sm text-gray-600">
                  <strong>Booking Date:</strong> {service.bookingDate}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  <strong>Amount:</strong> {service.amount}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  <strong>Location:</strong> {service.location}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  <strong>Parent:</strong> {service.parent}
                  <strong> *</strong> {service.contact}
                  <strong> *</strong> {service.phone}
                </p>
              </div>
            </div>
            <div className="flex space-x-2 mt-4 md:mt-0">
              <button
                onClick={() => openModal(service)}
                className="bg-[#0e7490] text-white px-3 py-1 rounded"
              >
                Reschedule
              </button>
              <button
                onClick={() => handleAction(service.id, "Cancel")}
                className="bg-[#94a3b8] text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Reschedule Appointment"
          style={customStyles}
        >
          <h2 className="text-lg font-bold mb-4">Reschedule Appointment</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label className="block text-sm font-medium mb-2">
              Appointment Date
            </label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="block w-full p-2 border rounded mb-4"
            />
            <label className="block text-sm font-medium mb-2">
              Appointment Time
            </label>
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="block w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleReschedule}
                className="bg-[#0891b2] text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default MyServices;
