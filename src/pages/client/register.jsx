import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleRegister() {
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/user/", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        password: form.password
      })
      .then(() => {
        toast.success("Registration successful! Please login.");
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Registration failed");
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
      <div className="w-[50%] h-full"></div>
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[450px] h-[720px] backdrop-blur-xl shadow-xl rounded-xl flex flex-col justify-center items-center">
          {/* First Name */}
          <input
            name="firstName"
            onChange={handleChange}
            className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
            type="text"
            placeholder="First Name"
            value={form.firstName}
            autoComplete="given-name"
          />
          {/* Last Name */}
          <input
            name="lastName"
            onChange={handleChange}
            className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
            type="text"
            placeholder="Last Name"
            value={form.lastName}
            autoComplete="family-name"
          />
          {/* Email */}
          <input
            name="email"
            onChange={handleChange}
            className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
            type="email"
            placeholder="Email"
            value={form.email}
            autoComplete="email"
          />
          {/* Phone */}
          <input
            name="phone"
            onChange={handleChange}
            className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
            type="text"
            placeholder="Phone"
            value={form.phone}
            autoComplete="tel"
          />
          {/* Password */}
          <input
            name="password"
            onChange={handleChange}
            className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
            type="password"
            placeholder="Password"
            value={form.password}
            autoComplete="new-password"
          />
          {/* Confirm Password */}
          <input
            name="confirmPassword"
            onChange={handleChange}
            className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            autoComplete="new-password"
          />
          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="w-[400px] h-[50px] bg-green-500 text-white rounded-xl cursor-pointer"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          {/* Link to Login */}
          <p className="text-gray-600 text-center m-[10px]">
            Already have an account?
            &nbsp;
            <span className="text-green-500 cursor-pointer hover:text-green-600">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
