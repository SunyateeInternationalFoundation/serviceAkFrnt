import axios from "axios";
import { Check, Pen } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// const therapies = [
//   "Autism Therapy",
//   "Behavior Therapy",
//   "Special Education",
//   "Psychological Education",
//   "Speech Therapy",
//   "Occupational Therapy",
// ];

const ChooseTherapy = () => {
  const provider = useSelector((state) => state.provider);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState("therapies");
  const [selectedTherapies, setSelectedTherapies] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedSessionType, setSelectedSessionType] = useState("");
  const [therapies, setTherapies] = useState([]);

  const timeSlots = [
    { label: "Morning", time: "6:00 - 9:00" },
    { label: "Late Morning", time: "9:00 - 12:00" },
    { label: "Afternoon", time: "12:00 - 15:00" },
    { label: "Late Afternoon", time: "15:00 - 18:00" },
    { label: "Evening", time: "18:00 - 21:00" },
    { label: "Night", time: "21:00 - 00:00" },
    { label: "Late Night", time: "00:00 - 06:00" },
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const sessionTypes = ["Online", "Offline", "Both"];
  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_WEBSITE}/get-services`
      );
      setTherapies(response.data.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  useEffect(() => {
    async function getProviderData() {
      axios
        .get(`${import.meta.env.VITE_WEBSITE}/provider/${provider.providerId}`)
        .then((response) => {
          console.log(response.data.data);
          setSelectedDays(response.data.data.days);
          setSelectedTimes(response.data.data.times);
          setSelectedSessionType(response.data.data.sessionType);
          setSelectedTherapies(response.data.data.services);
        })
        .catch((error) => {
          console.error("There was an error fetching the user data!", error);
        });
    }
    getProviderData();
  }, []);
  useEffect(() => {
    fetchServices();
  }, []);
  const handleTherapyClick = (therapyId) => {
    setSelectedTherapies((prev) =>
      prev.includes(therapyId)
        ? prev.filter((t) => t !== therapyId)
        : [...prev, therapyId]
    );
  };
  const handleDayClick = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleTimeClick = (time) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_WEBSITE}/provider/${provider.providerId}`,
        {
          services: selectedTherapies,
          days: selectedDays,
          times: selectedTimes,
          sessionType: selectedSessionType,
        }
      );
      if (response.data.success) {
        navigate("/settings/therapies");
      }
      setSelectedDays([]);
      setSelectedTimes([]);
      setSelectedTherapies([]);
      setSelectedSessionType("");
      console.log(response);
    } catch (error) {
      console.error("Error submitting therapy:", error);
    }
    console.log({
      therapies: selectedTherapies,
      days: selectedDays,
      times: selectedTimes,
      sessionType: selectedSessionType,
    });
  };
  console.log("therapies", therapies);
  return (
    <div className="flex min-h-screen">
      <div className="w-[40%] bg-gradient-to-br from-purple-100 to-indigo-100 p-8 flex flex-col justify-center items-center">
        {currentStep === "therapies" && selectedTherapies.length === 0 ? (
          <>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full opacity-20 blur-xl animate-pulse" />
              <Pen
                size={80}
                className="text-purple-600 relative z-10 animate-bounce"
              />
            </div>
            <h1 className="text-3xl font-bold text-center mt-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Choose Your Therapies
            </h1>
            <p className="text-gray-600 text-center mt-4">
              Select your preferred therapies and set your availability
            </p>
          </>
        ) : (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-purple-600">
              Selected Therapies
            </h2>
            {selectedTherapies.map((therapyId) => {
              const therapy = therapies.find((t) => t._id === therapyId);
              return (
                <div key={therapy.name} className="flex items-center space-x-2">
                  <Check className="text-green-500" size={24} />
                  <span className="text-xl font-semibold">{therapy.name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="w-[60%] p-8 flex flex-col">
        {currentStep !== "therapies" && (
          <button
            onClick={() => {
              if (currentStep === "availability") setCurrentStep("therapies");
              if (currentStep === "sessionType") setCurrentStep("availability");
            }}
            className="self-start mb-4 text-gray-600 hover:text-purple-600 transition-colors"
          >
            ← Back
          </button>
        )}
        <div className="mx-60 flex-grow flex justify-center items-center">
          {currentStep === "therapies" && (
            <div className="space-y-20">
              <div className="space-y-12">
                <h2 className="text-3xl font-bold">
                  Which therapies would you like to take?
                </h2>
                <div className="grid grid-cols-3 gap-6">
                  {therapies.map((therapy) => (
                    <button
                      key={therapy._id}
                      onClick={() => handleTherapyClick(therapy._id)}
                      className={`flex flex-col items-center p-4 rounded-lg border transition-all ${
                        selectedTherapies.includes(therapy._id)
                          ? "bg-purple-100 border-purple-600"
                          : "border-gray-300 hover:border-purple-600"
                      }`}
                    >
                      <img
                        src={therapy.image || "/placeholder.svg"}
                        alt={therapy.name}
                        className="w-24 h-24 object-cover rounded-full mb-2"
                      />
                      <span
                        className={`text-center ${
                          selectedTherapies.includes(therapy._id)
                            ? "text-purple-600 font-semibold"
                            : ""
                        }`}
                      >
                        {therapy.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setCurrentStep("availability")}
                disabled={selectedTherapies.length === 0}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {currentStep === "availability" && (
            <div className="space-y-20">
              <div className="space-y-12">
                <h2 className="text-3xl font-bold">
                  When would you like to take therapy?
                </h2>
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Days</h3>
                  <div className="flex flex-wrap gap-3">
                    {days.map((day) => (
                      <button
                        key={day}
                        onClick={() => handleDayClick(day)}
                        className={`px-4 py-2 rounded-full border text-base transition-all ${
                          selectedDays.includes(day)
                            ? "bg-purple-600 text-white border-purple-600"
                            : "border-gray-300 hover:border-purple-600"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold">Time Slots</h3>
                  <div className="flex flex-wrap gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => handleTimeClick(slot.time)}
                        className={`px-4 py-2 rounded-full border text-base transition-all ${
                          selectedTimes.includes(slot.time)
                            ? "bg-purple-600 text-white border-purple-600"
                            : "border-gray-300 hover:border-purple-600"
                        }`}
                      >
                        {slot.label} ({slot.time})
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setCurrentStep("sessionType")}
                disabled={
                  selectedTimes.length === 0 || selectedDays.length === 0
                }
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {currentStep === "sessionType" && (
            <div className="space-y-20">
              <div className="space-y-12">
                <h2 className="text-3xl font-bold">
                  How would you like to take your sessions?
                </h2>
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Session Type</h3>
                  <div className="flex flex-wrap flex-col gap-6">
                    {sessionTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedSessionType(type)}
                        className={`px-10 py-3 rounded-full border text-lg transition-all ${
                          selectedSessionType === type
                            ? "bg-purple-600 text-white border-purple-600"
                            : "border-gray-300 hover:border-purple-600"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={selectedSessionType === ""}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChooseTherapy;
