import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setProviderRegister } from "../../store/ProviderSlice";
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_WEBSITE}/register`,
        formData
      );
      if (response.data.success) {
        console.log("data", response.data.data);
        const data = response.data.data;
        const payload = {
          providerId: data._id,
          name: data?.name,
          email: data?.email,
          phone: data?.phone,
          isRegister: true,
          isLogin: false,
        };
        alert("Sign In Successful!");
        dispatch(setProviderRegister(payload));
        navigate("/dashboard");
      }
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
            name="name"
            placeholder="First Name"
            className="w-full p-2 border rounded mb-4 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            value={formData.name}
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
            name="phone"
            placeholder="Phone Number"
            className="w-full p-2 border rounded mb-4 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            value={formData.phone}
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
