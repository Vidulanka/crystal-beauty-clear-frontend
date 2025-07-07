import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [modalIsDisplaying, setModalIsDisplaying] = useState(false);
  const [displayingOrder, setDisplayingOrder] = useState(null);

  useEffect(() => {
    if (!loaded) {
      const token = localStorage.getItem("token");
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setOrders(response.data);
          setLoaded(true);
        })
        .catch(error => {
          toast.error("Failed to load orders");
          console.error("Error fetching orders:", error);
        });
    }
  }, [loaded]);

  function changeOrderStatus(orderId, status) {
    const token = localStorage.getItem("token");
    axios.put(import.meta.env.VITE_BACKEND_URL + "/api/order/" + orderId, {
      status: status
    }, {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then(() => {
      toast.success("Order status changed successfully");
      setLoaded(false);
    }).catch(error => {
      toast.error("Failed to update order status");
      console.error("Error updating order:", error);
    });
  }

  return (
    <div className="w-full min-h-screen p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Order Management</h1>
      
      {loaded ? (
        <div className="w-full overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Customer Email</th>
                <th className="p-3 text-left">Customer Name</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.orderId}
                  className="border-b border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <td className="p-3">{order.orderId}</td>
                  <td className="p-3 text-blue-600 hover:underline">
                    <a href={`mailto:${order.email}`}>{order.email}</a>
                  </td>
                  <td className="p-3">{order.name}</td>
                  <td className="p-3 max-w-[200px] truncate">{order.address}</td>
                  <td className="p-3">
                    <a href={`tel:${order.phoneNumber}`} className="text-blue-600 hover:underline">
                      {order.phoneNumber}
                    </a>
                  </td>
                  <td className="p-3">
                    <select 
                      value={order.status} 
                      className={`px-2 py-1 rounded text-sm ${
                        order.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                        order.status === "Processing" ? "bg-blue-100 text-blue-800" :
                        order.status === "Delivered" ? "bg-green-100 text-green-800" :
                        "bg-red-100 text-red-800"
                      }`}
                      onChange={(e) => changeOrderStatus(order.orderId, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-3 font-medium">LKR {order.total.toFixed(2)}</td>
                  <td className="p-3 text-sm text-gray-600">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                      onClick={() => {
                        setModalIsDisplaying(true);
                        setDisplayingOrder(order);
                      }}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {modalIsDisplaying && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">Order ID:</span> {displayingOrder.orderId}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Date:</span> {new Date(displayingOrder.date).toLocaleString()}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Status:</span> 
                          <span className={`ml-1 px-2 py-1 rounded text-xs ${
                            displayingOrder.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                            displayingOrder.status === "Processing" ? "bg-blue-100 text-blue-800" :
                            displayingOrder.status === "Delivered" ? "bg-green-100 text-green-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {displayingOrder.status}
                          </span>
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Total:</span> LKR {displayingOrder.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setModalIsDisplaying(false)}
                    >
                      <IoCloseSharp size={24} />
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                  <h3 className="font-medium text-gray-700 mb-3">Items</h3>
                  <div className="space-y-4">
                    {displayingOrder.billItems.map((item, index) => (
                      <div key={index} className="flex border-b border-gray-100 pb-4 last:border-0">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="ml-4 flex-1">
                          <h4 className="font-medium text-gray-800">{item.productName}</h4>
                          <div className="flex justify-between mt-1 text-sm text-gray-600">
                            <span>LKR {item.price.toFixed(2)}</span>
                            <span>Qty: {item.quantity}</span>
                          </div>
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Subtotal:</span> LKR {(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      )}
    </div>
  );
}