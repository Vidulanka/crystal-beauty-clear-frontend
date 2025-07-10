import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserData() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token != null) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((e) => {
          console.log(e);
          setUser(null);
        });
    }
  }, []);

  const buttonBaseClasses =
    "px-4 py-2 rounded-full font-semibold shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400";

  return (
    <>
      {user == null ? (
        <div className="h-full flex justify-center items-center space-x-4">
          <Link
            to="/login"
            className={`${buttonBaseClasses} bg-pink-600 text-white hover:bg-pink-700 active:bg-pink-800`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`${buttonBaseClasses} bg-pink-300 text-pink-900 hover:bg-pink-400 active:bg-pink-500`}
          >
            Register
          </Link>
        </div>
      ) : (
        <div className="h-full flex justify-center items-center">
          <button
            className={`${buttonBaseClasses} bg-pink-600 text-white hover:bg-pink-700 active:bg-pink-800`}
            onClick={() => {
              localStorage.removeItem("token");
              setUser(null);
              window.location = "/login";
            }}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}
