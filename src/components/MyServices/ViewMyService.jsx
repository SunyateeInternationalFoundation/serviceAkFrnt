// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// const ViewMyService = () => {
//   const { id } = useParams();
//   const [therapy, setTherapy] = useState(null);
//   const [sessions, setSessions] = useState([]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     async function fetchingSessions() {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_WEBSITE}/get-sessions/${id}`
//         );

//         console.log(res.data.data);
//         if (res.data.success) {
//           console.log(res.data.data);
//           setTherapy(res.data.data);
//           const totalSessions = res.data.data.serviceId.sessions;

//           const sessionArray = [];
//           for (let i = 1; i <= totalSessions; i++) {
//             sessionArray.push({
//               session: i,
//               status: i === 1 ? "Completed" : i === 2 ? "On Going" : "Upcoming",
//             });
//           }

//           setSessions(sessionArray);
//         }
//       } catch (err) {
//         console.log("Error in getting sessions:", err);
//       }
//     }
//     fetchingSessions();
//   }, [id]);

//   const handleSessionClick = (session) => {
//     console.log(`Session ${session.session} clicked!`);
//   };

//   return (
//     <div className="flex min-h-screen bg-[#f8f9fa]">
//       <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
//       <div className="p-2 border-gray-200">
//       <button
//         onClick={() => navigate('/my-services')}
//         className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5 mr-2"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//         >
//           <path
//             fillRule="evenodd"
//             d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
//             clipRule="evenodd"
//           />
//         </svg>
//         <span className="text-sm font-medium">Back</span>
//       </button>
//     </div>
//         <div className="p-4 border-b border-gray-200">
//           <h2 className="text-xl font-semibold">{`${therapy?.serviceId?.name}'s Sessions`}</h2>
//         </div>
//         <div className="space-y-1">
//           {sessions.map((session) => (
//             <button
//               key={session.session}
//               onClick={() => handleSessionClick(session)}
//               className="w-full text-left p-4 hover:bg-gray-50 flex items-center justify-between"
//             >
//               <span className="font-medium">Session {session.session}</span>
//               <span
//                 className={`text-sm font-medium py-1 px-3 rounded-full ${
//                   session.status === "Completed"
//                     ? "bg-green-100 text-green-600"
//                     : session.status === "On Going"
//                     ? "bg-blue-100 text-blue-600"
//                     : "bg-yellow-100 text-yellow-600"
//                 }`}
//               >
//                 {session.status}
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="flex-1 p-8">
//         <div className="flex items-center justify-center h-full text-gray-500">
//           Select a session to view details
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewMyService;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// const dummyTherapy = {
//   _id: "123456789",
//   childId: "987654321",
//   providerId: "135792468",
//   date: "2023-06-15",
//   time: "14:00",
//   parentId: "246813579",
//   serviceId: {
//     _id: "369258147",
//     name: "Speech Therapy",
//     sessions: 5,
//   },
//   accepted: true,
//   sessions: [
//     {
//       sessionNumber: 1,
//       date: new Date("2023-06-15"),
//       time: "14:00",
//       status: "completed",
//       notes: "First session went well",
//       feedback: {
//         therapyFeedback: "Great progress on pronunciation",
//         assignment: 'Practice "R" sound for 10 minutes daily',
//       },
//       videoUrl: "https://www.youtube.com/watch?v=U9K2gbs7tlU",
//     },
//     {
//       sessionNumber: 2,
//       date: new Date("2023-06-22"),
//       time: "14:00",
//       status: "ongoing",
//       notes: "",
//       feedback: {
//         therapyFeedback: "",
//         assignment: "",
//       },
//       videoUrl: "",
//     },
//     {
//       sessionNumber: 3,
//       date: new Date("2023-06-29"),
//       time: "14:00",
//       status: "pending",
//       notes: "",
//       feedback: {
//         therapyFeedback: "",
//         assignment: "",
//       },
//       videoUrl: "",
//     },
//   ],
// };

// const ViewMyService = () => {
//   const navigate = useNavigate();
//   const [therapy, setTherapy] = useState(dummyTherapy);
//   const [selectedSession, setSelectedSession] = useState(
//     dummyTherapy.sessions[0]
//   );
//   const [assignment, setAssignment] = useState("");
//   const [feedback, setFeedback] = useState("");
//   const [videoFile, setVideoFile] = useState(null);

//   useEffect(() => {
//     setTherapy(dummyTherapy);
//     setSelectedSession(dummyTherapy.sessions[0]);
//   }, []);

//   const handleSessionClick = (session) => {
//     setSelectedSession(session);
//     setAssignment(session.feedback.assignment);
//     setFeedback(session.feedback.therapyFeedback);
//   };

//   const handleAssignmentSubmit = () => {
//     if (selectedSession) {
//       const updatedSessions = therapy.sessions.map((s) =>
//         s.sessionNumber === selectedSession.sessionNumber
//           ? { ...s, feedback: { ...s.feedback, assignment } }
//           : s
//       );
//       setTherapy({ ...therapy, sessions: updatedSessions });
//       setSelectedSession({
//         ...selectedSession,
//         feedback: { ...selectedSession.feedback, assignment },
//       });
//     }
//   };

//   const handleVideoUpload = (event) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setVideoFile(file);
//       if (selectedSession) {
//         const updatedSessions = therapy.sessions.map((s) =>
//           s.sessionNumber === selectedSession.sessionNumber
//             ? { ...s, videoUrl: URL.createObjectURL(file) }
//             : s
//         );
//         setTherapy({ ...therapy, sessions: updatedSessions });
//         setSelectedSession({
//           ...selectedSession,
//           videoUrl: URL.createObjectURL(file),
//         });
//       }
//     }
//   };

//   const handleFeedbackSubmit = () => {
//     if (selectedSession) {
//       const updatedSessions = therapy.sessions.map((s) =>
//         s.sessionNumber === selectedSession.sessionNumber
//           ? { ...s, feedback: { ...s.feedback, therapyFeedback: feedback } }
//           : s
//       );
//       setTherapy({ ...therapy, sessions: updatedSessions });
//       setSelectedSession({
//         ...selectedSession,
//         feedback: { ...selectedSession.feedback, therapyFeedback: feedback },
//       });
//     }
//   };

//   const handleMarkAsDone = () => {
//     if (selectedSession) {
//       const updatedSessions = therapy.sessions.map((s) =>
//         s.sessionNumber === selectedSession.sessionNumber
//           ? { ...s, status: "completed" }
//           : s
//       );
//       setTherapy({ ...therapy, sessions: updatedSessions });
//       setSelectedSession({ ...selectedSession, status: "completed" });
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
//         <div className="p-4 border-b border-gray-200">
//           <button
//             className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
//             onClick={() => navigate("/my-services")}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 mr-2"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <span className="text-sm font-medium">Back</span>
//           </button>
//         </div>
//         <div className="p-4 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-800">{`${therapy.serviceId.name}'s Sessions`}</h2>
//         </div>
//         <div className="space-y-1">
//           {therapy.sessions.map((session) => (
//             <button
//               key={session.sessionNumber}
//               onClick={() => handleSessionClick(session)}
//               className={`w-full text-left p-4 hover:bg-gray-50 flex items-center justify-between ${
//                 selectedSession.sessionNumber === session.sessionNumber
//                   ? "bg-blue-50"
//                   : ""
//               }`}
//             >
//               <span className="font-medium text-gray-700">
//                 Session {session.sessionNumber}
//               </span>
//               <span
//                 className={`text-xs font-medium py-1 px-2 rounded-full ${
//                   session.status === "completed"
//                     ? "bg-green-100 text-green-800"
//                     : session.status === "ongoing"
//                     ? "bg-blue-100 text-blue-800"
//                     : "bg-yellow-100 text-yellow-800"
//                 }`}
//               >
//                 {session.status}
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="flex-1 p-8">
//         <div className="flex justify-end mb-10">
//           {selectedSession.status === "ongoing" ? (
//             <select
//               value={selectedSession.status}
//               onChange={(e) =>
//                 handleMarkAsDone(selectedSession.sessionNumber, e.target.value)
//               }
//               className={`ml-2 text-base font-medium rounded-full px-4 py-2 ${
//                 selectedSession.status === "completed"
//                   ? "bg-green-100 text-green-800"
//                   : "bg-blue-100 text-blue-800"
//               }`}
//             >
//               <option value="ongoing">Ongoing</option>
//               <option value="completed">Completed</option>
//             </select>
//           ) : (
//             <p className="ml-2 text-base font-medium rounded-full px-4 py-2 bg-green-100 text-green-800">
//               Completed
//             </p>
//           )}
//         </div>

//         {selectedSession ? (
//           <div className="space-y-6">
//             <div className="bg-white shadow rounded-lg overflow-hidden">
//               <div className="px-4 py-5 sm:p-6">
//                 <h3 className="text-lg font-medium leading-6 text-gray-900">
//                   Assignment
//                 </h3>
//                 <div className="mt-2">
//                   {selectedSession.status === "completed" ? (
//                     <p className="text-gray-600">
//                       {selectedSession.feedback.assignment}
//                     </p>
//                   ) : (
//                     <>
//                       <textarea
//                         value={assignment}
//                         onChange={(e) => setAssignment(e.target.value)}
//                         placeholder="Enter assignment details"
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                         rows={4}
//                       />
//                       <button
//                         onClick={handleAssignmentSubmit}
//                         className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                       >
//                         Submit Assignment
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white shadow rounded-lg overflow-hidden">
//               <div className="px-4 py-5 sm:p-6">
//                 <h3 className="text-lg font-medium leading-6 text-gray-900">
//                   Video Upload
//                 </h3>
//                 <div className="mt-2">
//                   {selectedSession.status === "completed" ? (
//                     <p className="text-gray-600">
//                       {selectedSession.videoUrl ? (
//                         <a
//                           href={selectedSession.videoUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 hover:text-blue-800"
//                         >
//                           View Uploaded Video
//                         </a>
//                       ) : (
//                         "No video uploaded"
//                       )}
//                     </p>
//                   ) : (
//                     <>
//                       <input
//                         type="link"
//                         onChange={handleVideoUpload}
//                         placeholder="Enter Video Link"
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       />
//                       <button className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//                         Upload Video
//                       </button>
//                       {videoFile && (
//                         <p className="mt-2 text-sm text-gray-500">
//                           Video selected: {videoFile.name}
//                         </p>
//                       )}
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white shadow rounded-lg overflow-hidden">
//               <div className="px-4 py-5 sm:p-6">
//                 <h3 className="text-lg font-medium leading-6 text-gray-900">
//                   Feedback
//                 </h3>
//                 <div className="mt-2">
//                   {selectedSession.status === "completed" ? (
//                     <p className="text-gray-600">
//                       {selectedSession.feedback.therapyFeedback}
//                     </p>
//                   ) : (
//                     <>
//                       <textarea
//                         value={feedback}
//                         onChange={(e) => setFeedback(e.target.value)}
//                         placeholder="Enter feedback"
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                         rows={4}
//                       />
//                       <button
//                         onClick={handleFeedbackSubmit}
//                         className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                       >
//                         Submit Feedback
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="flex items-center justify-center h-full text-gray-500">
//             Select a session to view details
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewMyService;
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// const dummyTherapy = {
//   _id: "123456789",
//   childId: "987654321",
//   providerId: "135792468",
//   date: "2023-06-15",
//   time: "14:00",
//   parentId: "246813579",
//   serviceId: {
//     _id: "369258147",
//     name: "Speech Therapy",
//     sessions: 5,
//   },
//   accepted: true,
//   sessions: [
//     {
//       sessionNumber: 1,
//       date: new Date("2023-06-15"),
//       time: "14:00",
//       status: "completed",
//       notes: "First session went well",
//       feedback: {
//         therapyFeedback: "Great progress on pronunciation",
//         assignment: 'Practice "R" sound for 10 minutes daily',
//       },
//       videoUrl: "https://www.youtube.com/watch?v=U9K2gbs7tlU",
//     },
//     {
//       sessionNumber: 2,
//       date: new Date("2023-06-22"),
//       time: "14:00",
//       status: "ongoing",
//       notes: "",
//       feedback: {
//         therapyFeedback: "",
//         assignment: "",
//       },
//       videoUrl: "",
//     },
//     {
//       sessionNumber: 3,
//       date: new Date("2023-06-29"),
//       time: "14:00",
//       status: "pending",
//       notes: "",
//       feedback: {
//         therapyFeedback: "",
//         assignment: "",
//       },
//       videoUrl: "",
//     },
//   ],
// };

// const ViewMyService = () => {
//   const navigate = useNavigate();
//   const [therapy, setTherapy] = useState(dummyTherapy);
//   const [selectedSession, setSelectedSession] = useState(
//     dummyTherapy.sessions[0]
//   );
//   const [assignment, setAssignment] = useState("");
//   const [feedback, setFeedback] = useState("");
//   const [videoFile, setVideoFile] = useState(null);

//   useEffect(() => {
//     setTherapy(dummyTherapy);
//     setSelectedSession(dummyTherapy.sessions[0]);
//   }, []);

//   const handleSessionClick = (session) => {
//     setSelectedSession(session);
//     setAssignment(session.feedback.assignment);
//     setFeedback(session.feedback.therapyFeedback);
//   };

//   const handleAssignmentSubmit = () => {
//     if (selectedSession) {
//       const updatedSessions = therapy.sessions.map((s) =>
//         s.sessionNumber === selectedSession.sessionNumber
//           ? { ...s, feedback: { ...s.feedback, assignment } }
//           : s
//       );
//       setTherapy({ ...therapy, sessions: updatedSessions });
//       setSelectedSession({
//         ...selectedSession,
//         feedback: { ...selectedSession.feedback, assignment },
//       });
//     }
//   };

//   const handleVideoUpload = (event) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setVideoFile(file);
//       if (selectedSession) {
//         const updatedSessions = therapy.sessions.map((s) =>
//           s.sessionNumber === selectedSession.sessionNumber
//             ? { ...s, videoUrl: URL.createObjectURL(file) }
//             : s
//         );
//         setTherapy({ ...therapy, sessions: updatedSessions });
//         setSelectedSession({
//           ...selectedSession,
//           videoUrl: URL.createObjectURL(file),
//         });
//       }
//     }
//   };

//   const handleFeedbackSubmit = () => {
//     if (selectedSession) {
//       const updatedSessions = therapy.sessions.map((s) =>
//         s.sessionNumber === selectedSession.sessionNumber
//           ? { ...s, feedback: { ...s.feedback, therapyFeedback: feedback } }
//           : s
//       );
//       setTherapy({ ...therapy, sessions: updatedSessions });
//       setSelectedSession({
//         ...selectedSession,
//         feedback: { ...selectedSession.feedback, therapyFeedback: feedback },
//       });
//     }
//   };

//   const handleMarkAsDone = () => {
//     if (selectedSession) {
//       const updatedSessions = therapy.sessions.map((s) =>
//         s.sessionNumber === selectedSession.sessionNumber
//           ? { ...s, status: "completed" }
//           : s
//       );
//       setTherapy({ ...therapy, sessions: updatedSessions });
//       setSelectedSession({ ...selectedSession, status: "completed" });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F8F7FD]">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-100 px-8 py-4">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => navigate("/my-services")}
//               className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-50"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//             <h1 className="text-xl font-semibold">{therapy.serviceId.name}</h1>
//           </div>
//           <div className="flex items-center space-x-2">
//             {selectedSession.status === "ongoing" ? (
//               <select
//                 value={selectedSession.status}
//                 onChange={(e) => handleMarkAsDone()}
//                 className="px-4 py-2 rounded-full text-sm font-medium bg-violet-100 text-violet-700 border-0 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               >
//                 <option value="ongoing">Ongoing</option>
//                 <option value="completed">Completed</option>
//               </select>
//             ) : (
//               <span className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-700">
//                 Completed
//               </span>
//             )}
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-8 py-6 flex gap-8">
//         {/* Sessions Sidebar */}
//         <div className="w-80 flex-shrink-0">
//           <div className="bg-white rounded-2xl p-4 shadow-sm">
//             <h2 className="text-lg font-semibold mb-4">Sessions</h2>
//             <div className="space-y-2">
//               {therapy.sessions.map((session) => (
//                 <button
//                   key={session.sessionNumber}
//                   onClick={() => handleSessionClick(session)}
//                   className={`w-full text-left p-4 rounded-xl transition-colors ${
//                     selectedSession.sessionNumber === session.sessionNumber
//                       ? "bg-violet-50 text-violet-700"
//                       : "hover:bg-gray-50"
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span className="font-medium">
//                       Session {session.sessionNumber}
//                     </span>
//                     <span
//                       className={`text-xs font-medium px-3 py-1 rounded-full ${
//                         session.status === "completed"
//                           ? "bg-green-100 text-green-700"
//                           : session.status === "ongoing"
//                           ? "bg-violet-100 text-violet-700"
//                           : "bg-amber-100 text-amber-700"
//                       }`}
//                     >
//                       {session.status}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-500 mt-1">
//                     {new Date(session.date).toLocaleDateString()}
//                   </p>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 space-y-6">
//           {selectedSession ? (
//             <>
//               {/* Assignment Card */}
//               <div className="bg-white rounded-2xl p-6 shadow-sm">
//                 <h3 className="text-lg font-semibold mb-4">Assignment</h3>
//                 {selectedSession.status === "completed" ? (
//                   <p className="text-gray-600">
//                     {selectedSession.feedback.assignment}
//                   </p>
//                 ) : (
//                   <div className="space-y-4">
//                     <textarea
//                       value={assignment}
//                       onChange={(e) => setAssignment(e.target.value)}
//                       placeholder="Enter assignment details"
//                       className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-violet-500"
//                       rows={4}
//                     />
//                     <button
//                       onClick={handleAssignmentSubmit}
//                       className="px-6 py-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-colors"
//                     >
//                       Submit Assignment
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Video Upload Card */}
//               <div className="bg-white rounded-2xl p-6 shadow-sm">
//                 <h3 className="text-lg font-semibold mb-4">Video</h3>
//                 {selectedSession.status === "completed" ? (
//                   <div className="text-gray-600">
//                     {selectedSession.videoUrl ? (
//                       <a
//                         href={selectedSession.videoUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-violet-600 hover:text-violet-700"
//                       >
//                         View Uploaded Video
//                       </a>
//                     ) : (
//                       "No video uploaded"
//                     )}
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     <input
//                       type="link"
//                       onChange={handleVideoUpload}
//                       placeholder="Enter Video Link"
//                       className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-violet-500"
//                     />
//                     <button className="px-6 py-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-colors">
//                       Upload Video
//                     </button>
//                     {videoFile && (
//                       <p className="text-sm text-gray-500">
//                         Video selected: {videoFile.name}
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Feedback Card */}
//               <div className="bg-white rounded-2xl p-6 shadow-sm">
//                 <h3 className="text-lg font-semibold mb-4">Feedback</h3>
//                 {selectedSession.status === "completed" ? (
//                   <p className="text-gray-600">
//                     {selectedSession.feedback.therapyFeedback}
//                   </p>
//                 ) : (
//                   <div className="space-y-4">
//                     <textarea
//                       value={feedback}
//                       onChange={(e) => setFeedback(e.target.value)}
//                       placeholder="Enter feedback"
//                       className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-violet-500"
//                       rows={4}
//                     />
//                     <button
//                       onClick={handleFeedbackSubmit}
//                       className="px-6 py-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-colors"
//                     >
//                       Submit Feedback
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </>
//           ) : (
//             <div className="flex items-center justify-center h-64 bg-white rounded-2xl">
//               <p className="text-gray-500">Select a session to view details</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewMyService;
import axios from "axios";
import { AlertCircle, Calendar, CheckCircle, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const dummyTherapy = {
  _id: "123456789",
  childId: "987654321",
  providerId: "135792468",
  date: "2023-06-15",
  time: "14:00",
  parentId: "246813579",
  serviceId: {
    _id: "369258147",
    name: "Speech Therapy",
    sessions: 5,
  },
  accepted: true,
  sessions: [
    {
      sessionNumber: 1,
      date: new Date("2023-06-15"),
      time: "14:00",
      status: "completed",
      notes: "First session went well",
      feedback: {
        therapyFeedback: "Great progress on pronunciation",
        assignment: 'Practice "R" sound for 10 minutes daily',
      },
      videoUrl: "https://www.youtube.com/watch?v=U9K2gbs7tlU",
    },
    {
      sessionNumber: 2,
      date: new Date("2023-06-22"),
      time: "14:00",
      status: "ongoing",
      notes: "",
      feedback: {
        therapyFeedback: "",
        assignment: "",
      },
      videoUrl: "",
    },
    {
      sessionNumber: 3,
      date: new Date("2023-06-29"),
      time: "14:00",
      status: "pending",
      notes: "",
      feedback: {
        therapyFeedback: "",
        assignment: "",
      },
      videoUrl: "",
    },
  ],
};

const ViewMyService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [therapy, setTherapy] = useState(dummyTherapy);
  const [selectedSession, setSelectedSession] = useState(
    dummyTherapy.sessions[0]
  );
  const [assignment, setAssignment] = useState("");
  const [feedback, setFeedback] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  //   useEffect(() => {
  //     setTherapy(dummyTherapy);
  //     setSelectedSession(dummyTherapy.sessions[0]);
  //   }, []);
  useEffect(() => {
    const fetchTherapy = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_WEBSITE}/sessions/${id}`
        );
        if (response.data.success) {
          const fetchedTherapy = response.data.data;
          let sessionNumber = 1;

          const updatedSessions = fetchedTherapy.sessions.map((session) => {
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
            for (let i = 1; i <= fetchedTherapy.serviceId.sessions; i++) {
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
          setSelectedSession(fetchedTherapy.sessions[0]);
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
    setAssignment(session.feedback.assignment);
    setFeedback(session.feedback.therapyFeedback);
  };

  //   const handleAssignmentSubmit = () => {
  //     if (selectedSession) {
  //       const updatedSessions = therapy.sessions.map((s) =>
  //         s.sessionNumber === selectedSession.sessionNumber
  //           ? { ...s, feedback: { ...s.feedback, assignment } }
  //           : s
  //       );
  //       setTherapy({ ...therapy, sessions: updatedSessions });
  //       setSelectedSession({
  //         ...selectedSession,
  //         feedback: { ...selectedSession.feedback, assignment },
  //       });
  //     }
  //   };
  const handleAssignmentSubmit = async () => {
    if (selectedSession) {
      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_WEBSITE}/sessions/${
            selectedSession.sessionNumber
          }`,
          assignment
        );

        if (response.data.success) {
          const updatedSessions = response.data.data.sessions.map((s) =>
            s.sessionNumber === selectedSession.sessionNumber
              ? { ...s, feedback: { ...s.feedback, assignment } }
              : s
          );
          setTherapy({ ...therapy, sessions: updatedSessions });
          setSelectedSession({
            ...selectedSession,
            feedback: { ...selectedSession.feedback, assignment },
          });
        } else {
          console.error("Failed to update assignment");
        }
      } catch (error) {
        console.error("Error updating assignment:", error);
      }
    }
  };
  console.log("selectedSession>>>>", selectedSession);
  const handleVideoUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      if (selectedSession) {
        const updatedSessions = therapy.sessions.map((s) =>
          s.sessionNumber === selectedSession.sessionNumber
            ? { ...s, videoUrl: URL.createObjectURL(file) }
            : s
        );
        setTherapy({ ...therapy, sessions: updatedSessions });
        setSelectedSession({
          ...selectedSession,
          videoUrl: URL.createObjectURL(file),
        });
      }
    }
  };

  const handleFeedbackSubmit = () => {
    if (selectedSession) {
      const updatedSessions = therapy.sessions.map((s) =>
        s.sessionNumber === selectedSession.sessionNumber
          ? { ...s, feedback: { ...s.feedback, therapyFeedback: feedback } }
          : s
      );
      setTherapy({ ...therapy, sessions: updatedSessions });
      setSelectedSession({
        ...selectedSession,
        feedback: { ...selectedSession.feedback, therapyFeedback: feedback },
      });
    }
  };

  const handleMarkAsDone = () => {
    if (selectedSession) {
      const updatedSessions = therapy.sessions.map((s) =>
        s.sessionNumber === selectedSession.sessionNumber
          ? { ...s, status: "completed" }
          : s
      );
      setTherapy({ ...therapy, sessions: updatedSessions });
      setSelectedSession({ ...selectedSession, status: "completed" });
    }
  };

  const getTotalCompletedSessions = () => {
    return therapy.sessions.filter((s) => s.status === "completed").length;
  };

  const getNextSession = () => {
    return therapy.sessions.find(
      (s) => s.status === "pending" || s.status === "ongoing"
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F7FD]">
      {/* Header */}
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
            <h1 className="text-xl font-semibold">{therapy.serviceId.name}</h1>
          </div>
          <div className="flex items-center space-x-2">
            {selectedSession?.status === "ongoing" ? (
              <select
                value={selectedSession.status}
                onChange={(e) => handleMarkAsDone()}
                className="px-4 py-2 rounded-full text-sm font-medium bg-violet-100 text-violet-700 border-0 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            ) : (
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-700">
                Completed
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-6">
        {/* Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Progress Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Overall Progress</h3>
                <div className="flex items-center space-x-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>
                    {getTotalCompletedSessions()} of {therapy.sessions.length}{" "}
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
                            therapy.sessions.length) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Session Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Next Session</h3>
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
                {therapy.sessions.map((session) => (
                  <button
                    key={session.sessionNumber}
                    onClick={() => handleSessionClick(session)}
                    className={`w-full text-left p-4 rounded-xl transition-colors ${
                      selectedSession?.sessionNumber === session.sessionNumber
                        ? "bg-violet-50 text-violet-700"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        Session {session.sessionNumber}
                      </span>
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          session.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : session.status === "ongoing"
                            ? "bg-violet-100 text-violet-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {session.status}
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

          {/* Session Details */}
          <div className="flex-1 space-y-6">
            {selectedSession ? (
              <>
                {/* Assignment Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Assignment</h3>
                  {selectedSession.status === "completed" ? (
                    <p className="text-gray-600">
                      {selectedSession.feedback.assignment}
                    </p>
                  ) : (
                    <div className="space-y-4">
                      <textarea
                        value={assignment}
                        onChange={(e) => setAssignment(e.target.value)}
                        placeholder="Enter assignment details"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-violet-500"
                        rows={4}
                      />
                      <button
                        onClick={handleAssignmentSubmit}
                        className="px-6 py-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-colors"
                      >
                        Submit Assignment
                      </button>
                    </div>
                  )}
                </div>

                {/* Video Upload Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Video</h3>
                  {selectedSession.status === "completed" ? (
                    <div className="text-gray-600">
                      {selectedSession.videoUrl ? (
                        <a
                          href={selectedSession.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-violet-600 hover:text-violet-700"
                        >
                          View Uploaded Video
                        </a>
                      ) : (
                        "No video uploaded"
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <input
                        type="link"
                        onChange={handleVideoUpload}
                        placeholder="Enter Video Link"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-violet-500"
                      />
                      <button className="px-6 py-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-colors">
                        Upload Video
                      </button>
                      {videoFile && (
                        <p className="text-sm text-gray-500">
                          Video selected: {videoFile.name}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Feedback Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Feedback</h3>
                  {selectedSession.status === "completed" ? (
                    <p className="text-gray-600">
                      {selectedSession.feedback.therapyFeedback}
                    </p>
                  ) : (
                    <div className="space-y-4">
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Enter feedback"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-violet-500"
                        rows={4}
                      />
                      <button
                        onClick={handleFeedbackSubmit}
                        className="px-6 py-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-colors"
                      >
                        Submit Feedback
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-64 bg-white rounded-2xl">
                <p className="text-gray-500">
                  Select a session to view details
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
