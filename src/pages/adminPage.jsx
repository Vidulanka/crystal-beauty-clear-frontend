import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaUsers, FaSignOutAlt } from "react-icons/fa";
import { MdWarehouse } from "react-icons/md";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { LuMessageSquareMore } from "react-icons/lu";
import AdminProductsPage from "./admin/product";
import AddProductForm from "./admin/addProductForm"
import EditProductForm from "./admin/editProoduct";
import AdminOrdersPage from "./admin/adminOrders";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import axios from "axios";
import toast from "react-hot-toast";
import ContactMessages from "./admin/contactMessages";

export default function AdminPage() {
  const [userValidated, setUserValidated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const validateAdmin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not logged in");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/user/current",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.data.user.role === "admin") {
          setUserValidated(true);
          setAdminName(response.data.user.name);
        } else {
          toast.error("You are not authorized to access this page");
          navigate("/login");
        }
      } catch (error) {
        console.error("Validation error:", error);
        toast.error("Session expired. Please login again");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    validateAdmin();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {userValidated && (
        <>
          {/* Sidebar */}
          <div className="w-64 bg-gray-800 text-white flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-gray-400">Welcome, {adminName}</p>
            </div>
            
            <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
              <Link 
                to="/admin/users" 
                className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors"
              >
                <FaUsers className="mr-3" />
                Users
              </Link>
              <Link 
                to="/admin/products" 
                className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors"
              >
                <MdWarehouse className="mr-3" />
                Products
              </Link>
              <Link 
                to="/admin/orders" 
                className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors"
              >
                <LiaFileInvoiceSolid className="mr-3" />
                Orders
              </Link>
              <Link 
                to="/admin/contact" 
                className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors"
              >
                <LuMessageSquareMore className="mr-3" />
                Messages
              </Link>
            </nav>
            
            <div className="p-4 border-t border-gray-700">
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center w-full p-2 text-red-400 hover:bg-gray-700 rounded transition-colors"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="bg-white shadow-sm p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                Admin Panel
              </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto bg-white m-4 rounded-lg shadow-sm">
              <Routes>
                <Route path="/users" element={<h1>Users Management</h1>} />
                <Route path="/products" element={<AdminProductsPage />} />
                <Route path="/orders" element={<AdminOrdersPage />} />
                <Route path="/contact" element={<ContactMessages />} />
                <Route path="/addProduct" element={<AddProductForm />} />
                <Route path="/editProduct" element={<EditProductForm />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}