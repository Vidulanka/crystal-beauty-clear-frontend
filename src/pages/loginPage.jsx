import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { GrGoogle } from "react-icons/gr";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUserPlus } from "react-icons/fi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (res) => {
      setLoading(true);
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/user/google", {
          accessToken: res.access_token,
        })
        .then((response) => {
          toast.success("Login successful");
          localStorage.setItem("token", response.data.token);
          const user = response.data.user;
          navigate(user.role === "admin" ? "/admin" : "/");
          setLoading(false);
        })
        .catch(() => {
          toast.error("Google login failed");
          setLoading(false);
        });
    },
  });

  function handleLogin() {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/user/login", {
        email,
        password,
      })
      .then((res) => {
        toast.success("Login successful");
        localStorage.setItem("token", res.data.token);
        const user = res.data.user;
        navigate(user.role === "admin" ? "/admin" : "/");
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Login failed");
        setLoading(false);
      });
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-pink-200 opacity-30 blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-purple-200 opacity-30 blur-xl"></div>
      
      {/* Left side with pink gradient and floral pattern */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden rounded-r-3xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 z-0"></div>
        
        {/* Floral pattern overlay */}
        <div className="absolute inset-0 bg-[url('/login-bg.jpeg')] bg-repeat opacity-20 z-10"></div>
        
        {/* Decorative crystals */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white opacity-20 rotate-45 rounded-lg z-10"></div>
        <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-white opacity-20 rotate-45 rounded-lg z-10"></div>
        
        <div className="m-auto text-center px-10 z-20 relative">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
            <h1 className="text-5xl font-extrabold text-pink-300 drop-shadow-lg">
              Crystal Beauty Clear
            </h1>
            <p className="mt-6 text-xl text-black-100 font-light max-w-lg">
              Discover your inner glow with our premium skincare collection
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-32 h-1 bg-white bg-opacity-50 rounded-full"></div>
            </div>
            <p className="mt-8 text-pink-100 italic">
              "Your skin deserves the crystal clear treatment"
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex flex-col justify-center w-full md:w-1/2 bg-white p-4 sm:p-8 md:p-12 lg:p-16 relative">
        <div className="max-w-md w-full mx-auto">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="bg-pink-100 p-4 rounded-full">
                <FiLock className="text-pink-600 text-3xl" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Sign in to your Crystal Beauty Clear account
            </p>
          </div>

          {/* Email Input */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <FiMail className="text-pink-500" />
            </div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              onKeyPress={handleKeyPress}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition placeholder-pink-300 bg-pink-50"
            />
          </div>

          {/* Password Input */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <FiLock className="text-pink-500" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              onKeyPress={handleKeyPress}
              className="w-full pl-12 pr-12 py-4 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition placeholder-pink-300 bg-pink-50"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-pink-500 hover:text-pink-700"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-pink-600 bg-gray-100 border-pink-300 rounded focus:ring-pink-500 focus:ring-2"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <Link to="/forgot-password" className="text-sm text-pink-600 hover:text-pink-800 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-semibold py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mb-6 group"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              <>
                <span>Login</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or continue with</span>
            </div>
          </div>

          {/* Google Login */}
          <button
            onClick={loginWithGoogle}
            disabled={loading}
            className="w-full flex justify-center items-center gap-3 bg-white border border-pink-300 hover:border-pink-400 text-pink-600 font-semibold py-4 rounded-xl shadow-sm hover:shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed group"
          >
            <GrGoogle size={20} className="text-pink-600" />
            {loading ? "Loading..." : "Login with Google"}
          </button>

          {/* Register Link */}
          <p className="mt-10 text-center text-gray-600 font-light">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-pink-700 font-semibold hover:text-pink-800 hover:underline flex items-center justify-center gap-1"
            >
              <FiUserPlus className="inline" /> Create account
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