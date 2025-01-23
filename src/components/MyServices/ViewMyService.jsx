import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ViewMyService = () => {
  const { id } = useParams();
  const [therapy, setTherapy] = useState(null);
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchingSessions() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_WEBSITE}/get-sessions/${id}`
        );

        console.log(res.data.data);
        if (res.data.success) {
          console.log(res.data.data);
          setTherapy(res.data.data);
          const totalSessions = res.data.data.serviceId.sessions;

          const sessionArray = [];
          for (let i = 1; i <= totalSessions; i++) {
            sessionArray.push({
              session: i,
              status: i === 1 ? "Completed" : i === 2 ? "On Going" : "Upcoming",
            });
          }

          setSessions(sessionArray);
        }
      } catch (err) {
        console.log("Error in getting sessions:", err);
      }
    }
    fetchingSessions();
  }, [id]);

  const handleSessionClick = (session) => {
    console.log(`Session ${session.session} clicked!`);
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-2 border-gray-200">
      <button
        onClick={() => navigate('/my-services')} 
        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm font-medium">Back</span>
      </button>
    </div>
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">{`${therapy?.serviceId?.name}'s Sessions`}</h2>
        </div>
        <div className="space-y-1">
          {sessions.map((session) => (
            <button
              key={session.session}
              onClick={() => handleSessionClick(session)}
              className="w-full text-left p-4 hover:bg-gray-50 flex items-center justify-between"
            >
              <span className="font-medium">Session {session.session}</span>
              <span
                className={`text-sm font-medium py-1 px-3 rounded-full ${
                  session.status === "Completed"
                    ? "bg-green-100 text-green-600"
                    : session.status === "On Going"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {session.status}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-8">
        <div className="flex items-center justify-center h-full text-gray-500">
          Select a session to view details
        </div>
      </div>
    </div>
  );
};

export default ViewMyService;
