import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff, FiCheck } from "react-icons/fi";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleRegister() {
    if (!agreedToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-pink-200 opacity-30 blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-purple-200 opacity-30 blur-xl"></div>
      
      {/* Left side with branding */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden rounded-r-3xl shadow-2xl">
        <div className="absolute inset-0 bg-[url('/login-bg.jpeg')] bg-cover bg-center z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600/70 to-purple-600/70 z-10"></div>
        
        {/* Decorative crystals */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white opacity-20 rotate-45 rounded-lg z-20"></div>
        <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-white opacity-20 rotate-45 rounded-lg z-20"></div>
        
        <div className="m-auto text-center px-10 z-30 relative">
          <div className="bg-white/20 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/30">
            <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
              Crystal Beauty Clear
            </h1>
            <p className="mt-6 text-xl text-white/90 font-light max-w-lg">
              Join our community and discover your natural glow
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-32 h-1 bg-white/50 rounded-full"></div>
            </div>
            <p className="mt-8 text-white/90 italic">
              "Beauty begins the moment you decide to be yourself"
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Registration form */}
      <div className="flex flex-col justify-center w-full md:w-1/2 bg-white p-4 sm:p-8 md:p-12 lg:p-16 relative">
        <div className="max-w-md w-full mx-auto">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="bg-pink-100 p-4 rounded-full">
                <FiUser className="text-pink-600 text-3xl" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">
              Join Crystal Beauty Clear today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* First Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <FiUser className="text-pink-500" />
              </div>
              <input
                name="firstName"
                onChange={handleChange}
                placeholder="First Name"
                value={form.firstName}
                autoComplete="given-name"
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition placeholder-pink-300 bg-pink-50"
              />
            </div>
            
            {/* Last Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <FiUser className="text-pink-500" />
              </div>
              <input
                name="lastName"
                onChange={handleChange}
                placeholder="Last Name"
                value={form.lastName}
                autoComplete="family-name"
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition placeholder-pink-300 bg-pink-50"
              />
            </div>
          </div>
          
          {/* Email */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <FiMail className="text-pink-500" />
            </div>
            <input
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="Email"
              value={form.email}
              autoComplete="email"
              onKeyPress={handleKeyPress}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition placeholder-pink-300 bg-pink-50"
            />
          </div>
          
          {/* Phone */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <FiPhone className="text-pink-500" />
            </div>
            <input
              name="phone"
              onChange={handleChange}
              type="text"
              placeholder="Phone"
              value={form.phone}
              autoComplete="tel"
              onKeyPress={handleKeyPress}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition placeholder-pink-300 bg-pink-50"
            />
          </div>
          
          {/* Password */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <FiLock className="text-pink-500" />
            </div>
            <input
              name="password"
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              autoComplete="new-password"
              onKeyPress={handleKeyPress}
              className="w-full pl-12 pr-12 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition placeholder-pink-300 bg-pink-50"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-pink-500 hover:text-pink-700"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          
          {/* Confirm Password */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <FiLock className="text-pink-500" />
            </div>
            <input
              name="confirmPassword"
              onChange={handleChange}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              autoComplete="new-password"
              onKeyPress={handleKeyPress}
              className="w-full pl-12 pr-12 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition placeholder-pink-300 bg-pink-50"
            />
            <button
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-pink-500 hover:text-pink-700"
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          
          {/* Terms Agreement */}
          <div className="flex items-start mb-8">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 text-pink-600 bg-gray-100 border-pink-300 rounded focus:ring-pink-500 focus:ring-2"
              />
            </div>
            <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
              I agree to the <a href="#" className="text-pink-600 hover:underline">terms and conditions</a> and <a href="#" className="text-pink-600 hover:underline">privacy policy</a>
            </label>
          </div>
          
          {/* Register Button */}
          <button
            onClick={handleRegister}
            disabled={loading || !agreedToTerms}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-semibold py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mb-6 group"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : (
              <>
                <span>Create Account</span>
                <FiCheck className="h-5 w-5 transition-transform group-hover:scale-110" />
              </>
            )}
          </button>
          
          {/* Already have account */}
          <p className="text-center text-gray-600 font-light">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-pink-700 font-semibold hover:text-pink-800 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
        
        {/* Footer */}
        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Crystal Beauty Clear. All rights reserved.
        </div>
      </div>
    </div>
  );
}