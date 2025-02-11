import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  FileVideo,
  LockKeyhole,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { storage } from "../../firebase";

const ViewMyService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [therapy, setTherapy] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [assignment, setAssignment] = useState("");
  const [feedback, setFeedback] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchTherapy = async () => {
      try {
        const response = await axios.get(
          ` ${import.meta.env.VITE_WEBSITE}/get-sessions/${id}`
        );
        console.log("response>>>>", response);
        if (response.data.success) {
          const fetchedTherapy = response.data.data;

          const updatedSessions = fetchedTherapy?.sessions.map((session) => {
            return { ...session };
          });
          console.log("updated sessions>>>>", updatedSessions);
          if (updatedSessions.length === 0) {
            const newSessions = [];
            for (let i = 1; i <= fetchedTherapy?.serviceId?.sessions; i++) {
              newSessions.push({
                sessionNumber: i,
                date: new Date(),
                time: "10:00 AM",
                status: i === 1 ? "ongoing" : "upcoming",
                completed: false,
              });
            }
            fetchedTherapy.sessions = newSessions;
          } else {
            fetchedTherapy.sessions = updatedSessions;
          }

          setTherapy(fetchedTherapy);
          setSelectedSession(
            fetchedTherapy?.sessions.find((s) => s.status === "ongoing")
          );
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

  const getNextSession = () => {
    return therapy?.sessions.find((s) => s.status === "upcoming");
  };

  const handleAssignmentChange = (e) => {
    setAssignment(e.target.value);
  };

  const uploadVideo = async (e) => {
    const videoFile = e.target.files[0];
    if (!videoFile) return;
    setIsUploading(true);
    const storageRef = ref(storage, `videos/${Date.now()}_${videoFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, videoFile);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload failed:", error);
          setIsUploading(false);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("Video uploaded successfully:", downloadURL);
            setVideoFile(downloadURL);
            setIsUploading(false);
            resolve(downloadURL);
          } catch (error) {
            console.error("Error getting download URL:", error);
            setIsUploading(false);
            reject(error);
          }
        }
      );
    });
  };
  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedSessions = therapy?.sessions.map((session) => {
        if (session.sessionNumber === selectedSession.sessionNumber) {
          return {
            ...session,
            status: "completed",
            feedback,
            assignment,
            videoUrl: videoFile || null,
            completed: true,
          };
        }
        if (session.sessionNumber === selectedSession.sessionNumber + 1) {
          return {
            ...session,
            status: "ongoing",
          };
        }

        return session;
      });
      let completed = false;
      const completedStatus = updatedSessions.every(
        (session) => session.completed
      );
      if (completedStatus) {
        completed = true;
      }

      console.log("updated sessions", updatedSessions);
      const response = await axios.put(
        `${import.meta.env.VITE_WEBSITE}/sessions/${id}`,
        {
          updatedSessions,
          completed,
        }
      );
      console.log("response>>>>", response);
      if (response.data.success) {
        alert("Session submitted successfully");
        setTherapy({ ...therapy, sessions: updatedSessions });

        setSelectedSession(
          updatedSessions.find(
            (s) => s.sessionNumber === selectedSession.sessionNumber
          )
        );
        setVideoFile(null);
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };
  console.log("video file", videoFile);
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
              {therapy?.sessions?.every(
                (session) => session.status === "completed"
              )
                ? "Completed"
                : therapy?.sessions?.some(
                    (session) => session.status === "ongoing"
                  )
                ? "Ongoing"
                : "Upcoming"}
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

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Next Session{" "}
                  {getNextSession()
                    ? `- ${getNextSession().sessionNumber}`
                    : ""}
                </h3>
                {getNextSession() ? (
                  <>
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <Calendar className="w-5 h-5 text-violet-500" />
                      <span>
                        {new Date(getNextSession().date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-5 h-5 text-violet-500" />
                      <span>{getNextSession().time}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    <span>No upcoming sessions</span>
                  </div>
                )}
              </div>
              {getNextSession() && (
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    getNextSession().status === "ongoing"
                      ? "bg-violet-100 text-violet-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {getNextSession().status}
                </span>
              )}
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
                      <div className="flex items-center space-x-2">
                        {session?.status === "upcoming" && (
                          <LockKeyhole className="h-4 w-4 text-amber-600" />
                        )}
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
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(session.date).toLocaleDateString()}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            {selectedSession?.status === "ongoing" ||
            selectedSession?.status === "completed" ? (
              <>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">Assignment</h3>
                  </div>
                  <div className="p-6">
                    {selectedSession.status === "completed" ? (
                      <p className="text-gray-600">
                        {selectedSession?.assignment ||
                          "No assignment given for this session."}
                      </p>
                    ) : (
                      <textarea
                        placeholder="Enter your assignment here"
                        value={assignment}
                        onChange={handleAssignmentChange}
                        className="w-full min-h-[100px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">Video</h3>
                  </div>
                  <div className="p-6">
                    {selectedSession.status === "completed" &&
                    selectedSession.videoUrl ? (
                      <div className="flex items-center space-x-2">
                        <FileVideo className="h-5 w-5 text-violet-500" />
                        <a
                          href={selectedSession.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-violet-600 hover:text-violet-700 underline"
                        >
                          View Uploaded Video
                        </a>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <input
                          type="file"
                          accept="video/*"
                          onChange={uploadVideo}
                          className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-600
                        hover:file:bg-violet-100"
                          disabled={isUploading}
                        />
                        {isUploading && (
                          <div className="mt-2">
                            <div className="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                              <div
                                className="bg-violet-600 h-2.5 rounded-full"
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              Uploading: {uploadProgress.toFixed(0)}%
                            </p>
                          </div>
                        )}
                        {videoFile !== null && !isUploading && (
                          <div className="flex items-center space-x-2 bg-green-100 p-2 rounded-md">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-sm font-medium text-green-700">
                              Video uploaded successfully. Now You can submit
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">Feedback</h3>
                  </div>
                  <div className="p-6">
                    {selectedSession.status === "completed" ? (
                      <p className="text-gray-600">
                        {selectedSession?.feedback ||
                          "No feedback given for this session."}
                      </p>
                    ) : (
                      <textarea
                        placeholder="Enter your feedback here"
                        value={feedback}
                        onChange={handleFeedbackChange}
                        className="w-full min-h-[100px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    )}
                  </div>
                </div>
                <div className="flex justify-end">
                  {selectedSession.status !== "completed" && (
                    <button
                      onClick={handleSubmit}
                      className="w-fit px-5 mt-4 bg-purple-600 text-white py-2 rounded-md focus:outline-none"
                    >
                      Submit Session
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-64 bg-white rounded-2xl">
                <p className="text-gray-500">
                  {therapy?.sessions?.every(
                    (session) => session.status === "completed"
                  )
                    ? "Select session to view details"
                    : " Session Details Unavailable (Upcoming Session)"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMyService;
