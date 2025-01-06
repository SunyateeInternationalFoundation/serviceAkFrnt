import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
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
        `${import.meta.env.VITE_WEBSITE}/login`,
        formData
      );
      const payload = {};
      if (response.data.success) {
        console.log("data", response.data.data);
        // alert("Sign In Successful!");
        // dispatch(setProviderLogin(response));
        // navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error during sign in", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        className="bg-white w-[500px]  p-8 rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-8">
          {" "}
          <h2 className="text-2xl font-bold mb-2">Welcome</h2>
          <p className="text-lg text-gray-500 font-semibold mb-4">
            Enter your credentials to access your account
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border border-slate-200 rounded mb-4 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow "
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
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
          Sign In
        </button>
        <p className="mt-10 text-center">
          Don't have an account?{" "}
          <Link to="/" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
