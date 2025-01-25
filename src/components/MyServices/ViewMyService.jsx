import axios from "axios";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewMyService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [therapy, setTherapy] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [assignment, setAssignment] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchTherapy = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_WEBSITE}/sessions/${id}`
        );
        console.log("response>>>>", response);
        if (response.data.success) {
          const fetchedTherapy = response.data.data;
          let sessionNumber = 1;

          const updatedSessions = fetchedTherapy?.sessions.map((session) => {
            if (session.status === "completed") {
              return {
                ...session,
                sessionNumber: sessionNumber++,
                status: "completed",
              };
            }

            return {
              ...session,
              sessionNumber: sessionNumber++,
              status: "pending",
            };
          });
          console.log("updated sessions>>>>", updatedSessions);
          if (updatedSessions.length === 0) {
            const newSessions = [];
            for (let i = 1; i <= fetchedTherapy?.serviceId?.sessions; i++) {
              newSessions.push({
                sessionNumber: i,
                date: new Date(),
                time: "10:00 AM",
                status: i === 1 ? "ongoing" : "pending",
              });
            }
            fetchedTherapy.sessions = newSessions;
          } else {
            fetchedTherapy.sessions = updatedSessions;
          }

          setTherapy(fetchedTherapy);
          setSelectedSession(fetchedTherapy?.sessions[0]);
        } else {
          console.error("Failed to fetch therapy");
        }
      } catch (error) {
        console.error("Error fetching therapy:", error);
      }
    };
    fetchTherapy();
  }, [id]);

  console.log("sessions", therapy);
  const handleSessionClick = (session) => {
    setSelectedSession(session);
    setAssignment(session?.feedback?.assignment);
    setFeedback(session?.feedback?.therapyFeedback);
  };

  const getTotalCompletedSessions = () => {
    return therapy?.sessions.filter((s) => s.status === "completed").length;
  };

  return (
    <div className="min-h-screen bg-[#F8F7FD]">
      <header className="bg-white border-b border-gray-100 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/my-services")}
              className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <h1 className="text-xl font-semibold">
              {therapy?.serviceId?.name}
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-700">
              {selectedSession?.status}
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Overall Progress</h3>
                <div className="flex items-center space-x-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>
                    {getTotalCompletedSessions()} of {therapy?.sessions?.length}{" "}
                    Sessions Completed
                  </span>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-violet-500 h-2 rounded-full"
                      style={{
                        width: `${
                          (getTotalCompletedSessions() /
                            therapy?.sessions?.length) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Sessions</h2>
              <div className="space-y-2">
                {therapy?.sessions.map((session) => (
                  <button
                    key={session?.sessionNumber}
                    onClick={() => handleSessionClick(session)}
                    className={`w-full text-left p-4 rounded-xl transition-colors ${
                      selectedSession?.sessionNumber === session?.sessionNumber
                        ? "bg-violet-50 text-violet-700"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        Session {session?.sessionNumber}
                      </span>
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          session?.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : session?.status === "ongoing"
                            ? "bg-violet-100 text-violet-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {session?.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(session.date).toLocaleDateString()}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMyService;
