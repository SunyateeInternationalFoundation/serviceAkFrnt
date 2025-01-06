// import { useState } from "React";
// // import { useDispatch } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// const Register = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     email: "",
//     phone: "",
//     password: "",
//   });
//   // const navigate = useNavigate();
//   // const dispatch = useDispatch();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (formData.email.trim().length == 0) {
//   //     alert("Invalid Form, Email Address can not be empty");
//   //     return;
//   //   }

//   //   // if (formData.password.length < 8) {
//   //   //   alert(
//   //   //     "Invalid Form, Password must contain greater than or equal to 8 characters."
//   //   //   );
//   //   //   return;
//   //   // }
//   //   try {
//   //     console.log(formData);
//   //     const response = await axios.post(
//   //       `${import.meta.env.VITE_WEBSITE}/register`,
//   //       formData
//   //     );

//   //     if (response.data.success) {
//   //       console.log("response.data.admin", response.data.admin);
//   //       const data = response.data.admin;
//   //       const payload = {
//   //         providerId: data._id,
//   //         email: data.email,
//   //         isRegister: true,
//   //         firstName: data?.firstName || "",
//   //         phone: data?.phone,
//   //       };
//   //       setMessage("Login successful!");
//   //       alert("Login successful!");
//   //       setIsError(false);
//   //       dispatch(setProviderRegister(payload));
//   //       navigate("/manage-parents");
//   //     } else {
//   //       setMessage(response.data.message || "Login failed.");
//   //       setIsError(true);
//   //     }
//   //   } catch (err) {
//   //     setMessage(err.response?.data?.message);
//   //     setIsError(true);
//   //   }
//   // };
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-semibold text-center mb-4">
//           Provider Register
//         </h2>
//         <p className="text-center text-gray-500 mb-6">
//           Enter your credentials to access your account
//         </p>
//         <form>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               First Name
//             </label>
//             <input
//               type="text"
//               name="firstName"
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="First Name"
//               value={formData.firstName}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               name="phone"
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="Must be 8 Characters at Least"
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mb-4 flex items-center">
//             <input
//               type="checkbox"
//               className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//             />
//             <label className="ml-2 block text-sm text-gray-900">
//               I agree to{" "}
//               <a href="#" className="text-indigo-600 hover:underline">
//                 Terms of use
//               </a>{" "}
//               &{" "}
//               <a href="#" className="text-indigo-600 hover:underline">
//                 Privacy policy
//               </a>
//             </label>
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//             >
//               Sign Up
//             </button>
//           </div>
//         </form>
//         <div className="text-center mt-6">
//           <p className="mt-4">
//             Already have an account?{" "}
//             <a href="#" className="text-indigo-600 hover:underline">
//               Sign In
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_WEBSITE}/register`, formData);
      alert("Sign Up Successful!");
    } catch (error) {
      console.error("Error during sign up", error);
    }
    console.log("formdata", formData);
  };

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-50">
      <form
        className="bg-white w-[500px] p-8 items-center rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-8">
          {" "}
          <h2 className="text-2xl font-bold mb-2">Provider Register</h2>
          <p className="text-lg text-gray-500 font-semibold mb-4">
            Enter your credentials to access your account
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First name
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full p-2 border rounded mb-4 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-4 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            className="w-full p-2 border rounded mb-4 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="flex justify-between">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <p className="text-gray-400 text-sm">
              Must be 8 characters atleast{" "}
            </p>
          </div>

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-4 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded"
        >
          Sign Up
        </button>
        <p className="mt-10 text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
