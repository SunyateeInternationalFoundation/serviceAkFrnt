import axios from "axios";
import { Calendar, Clock, MapPin, Pen } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Therapies = () => {
  const navigate = useNavigate();
  const provider = useSelector((state) => state.provider);
  const [activeTab, setActiveTab] = useState("schedule");
  const [providerData, setProviderData] = useState({});
  const [services, setServices] = useState([]);
  console.log("provider", provider.providerId);

  useEffect(() => {
    const getProviderData = async () => {
      try {
        console.log("Component");
        const response = await axios.get(
          `${import.meta.env.VITE_WEBSITE}/provider/${provider.providerId}`
        );
        console.log("response", response);
        if (response.data.success) {
          setProviderData(response.data.data);
          setServices(response.data.services);
        }
      } catch (error) {
        console.error("There was an error fetching the user data!", error);
      }
    };
    getProviderData();
  }, []);

  console.log("providerData", providerData);
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome back, {provider.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's You can update your preferred therapies and availability.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="flex border-b">
                <button
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    activeTab === "schedule"
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("schedule")}
                >
                  Your Schedule
                </button>
                <button
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    activeTab === "therapies"
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("therapies")}
                >
                  Your Therapies
                </button>
              </div>
              <div className="p-6">
                {activeTab === "schedule" ? (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Calendar className="text-purple-600 w-6 h-6" />
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          Available Days
                        </h3>
                        <div className="flex mt-2 space-x-2">
                          {providerData?.days?.length > 0 ? (
                            providerData.days.map((day, index) => (
                              <span
                                key={index}
                                className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {day}
                              </span>
                            ))
                          ) : (
                            <p className="text-gray-500">No available days</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Clock className="text-purple-600 w-6 h-6" />
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          Time Slots
                        </h3>
                        <div className="mt-2 space-y-1">
                          {providerData?.times?.length > 0 ? (
                            providerData.times.map((slot, index) => (
                              <p key={index} className="text-gray-600">
                                {slot}
                              </p>
                            ))
                          ) : (
                            <p className="text-gray-500">
                              No available time slots
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <MapPin className="text-purple-600 w-6 h-6" />
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          Session Type
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {providerData.sessionType}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {providerData?.services.length > 0 &&
                      providerData?.services?.map((therapyId, index) => {
                        const therapy = services.find(
                          (t) => t._id === therapyId
                        );
                        return (
                          <div
                            key={index}
                            className="bg-gray-50 p-4 rounded-lg"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-semibold text-gray-800">
                                {therapy.name}
                              </h3>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg overflow-hidden text-white p-6">
              <div
                className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] z-[-1] opacity-40`}
              />
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl w-full max-w-md overflow-hidden">
                <div className="p-8">
                  <h1 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                    Choose Your Therapies
                  </h1>
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full opacity-20 blur-xl" />
                      <Pen
                        size={80}
                        className="text-purple-600 relative z-10"
                      />
                    </div>
                  </div>
                  <p className="text-gray-600 text-center mb-8">
                    Select your preferred therapies and set your availability
                  </p>
                  <button
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                    onClick={() => navigate("/provider/select-therapies")}
                  >
                    Choose Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="min-h-screen p-8 bg-gray-50">
    //   <div className="max-w-7xl mx-auto">
    //     <header className="mb-10">
    //       <h1 className="text-4xl font-bold text-gray-800">
    //         Welcome back, {provider.name}!
    //       </h1>
    //       <p className="text-gray-600 mt-2">
    //         Manage your therapies and availability
    //       </p>
    //     </header>

    //     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    //       <div className="bg-white rounded-xl shadow-lg p-6">
    //         <div className="mb-4">
    //           <h2 className="text-xl font-bold text-gray-800">Your Schedule</h2>
    //         </div>
    //         <div className="space-y-6">
    //           <div className="flex items-start space-x-4">
    //             <Calendar className="w-5 h-5 text-purple-600 mt-1" />
    //             <div>
    //               <h3 className="font-semibold text-gray-800">
    //                 Available Days
    //               </h3>
    //               <div className="flex flex-wrap gap-2 mt-2">
    //                 {providerData?.days?.map((day, index) => (
    //                   <span
    //                     key={index}
    //                     className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
    //                   >
    //                     {day}
    //                   </span>
    //                 ))}
    //               </div>
    //             </div>
    //           </div>

    //           <div className="flex items-start space-x-4">
    //             <Clock className="w-5 h-5 text-purple-600 mt-1" />
    //             <div>
    //               <h3 className="font-semibold text-gray-800">Time Slots</h3>
    //               <div className="mt-2 space-y-1">
    //                 {providerData?.times?.map((time, index) => (
    //                   <p key={index} className="text-gray-600">
    //                     {time}
    //                   </p>
    //                 ))}
    //               </div>
    //             </div>
    //           </div>

    //           <div className="flex items-start space-x-4">
    //             <MapPin className="w-5 h-5 text-purple-600 mt-1" />
    //             <div>
    //               <h3 className="font-semibold text-gray-800">Session Type</h3>
    //               <p className="text-gray-600 mt-1">
    //                 {providerData.sessionType}
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="bg-white rounded-xl shadow-lg p-6">
    //         <div className="mb-4">
    //           <h2 className="text-xl font-bold text-gray-800">
    //             Your Therapies
    //           </h2>
    //         </div>
    //         <div className="space-y-4">
    //           {providerData?.services?.map((therapyId) => {
    //             const therapy = services.find((t) => t._id === therapyId);
    //             return (
    //               <div
    //                 key={therapy._id}
    //                 className="p-4 rounded-lg bg-gray-50 border border-gray-200"
    //               >
    //                 <h3 className="font-semibold text-gray-800">
    //                   {therapy.name}
    //                 </h3>
    //               </div>
    //             );
    //           })}
    //         </div>
    //       </div>

    //       <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg overflow-hidden text-white p-6">
    //         <div className="bg-white/95 rounded-xl w-full overflow-hidden">
    //           <div className="p-8">
    //             <h2 className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
    //               Choose Your Therapies
    //             </h2>
    //             <p className="text-gray-600 text-center mb-8">
    //               Select your preferred therapies and set your availability
    //             </p>
    //             <button
    //               className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
    //               onClick={() => navigate("/provider/select-therapies")}
    //             >
    //               Choose Now
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Therapies;
