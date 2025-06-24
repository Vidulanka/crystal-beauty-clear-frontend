import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

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
        });
    }
  }, [loaded]);

  function changeOrderStatus(orderId, status) {
    const token = localStorage.getItem("token");
    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "/api/order/" + orderId,
        { status },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(() => {
        toast.success("Order status changed successfully");
        setLoaded(false);
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message ||
            `Error: ${error.response?.status} ${error.response?.statusText}` ||
            "Network or server error"
        );
        console.error(error);
      });
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-1">
      {loaded ? (
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-1">
         
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-separate border-spacing-y-1">
              <thead>
                <tr>
                  <th className="px-4 py-2 font-bold bg-gray-100 text-left">Order ID</th>
                  <th className="px-4 py-2 font-bold bg-gray-100 text-left">Customer Email</th>
                  <th className="px-4 py-2 font-bold bg-gray-100 text-left">Customer Name</th>
                  <th className="px-4 py-2 font-bold bg-gray-100 text-left">Address</th>
                  <th className="px-4 py-2 font-bold bg-gray-100 text-left">Phone Number</th>
                  <th className="px-4 py-2 font-bold bg-gray-100 text-left">Status</th>
                  <th className="px-4 py-2 font-bold bg-gray-100 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr
                    key={order.orderId}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-2">{order.orderId}</td>
                    <td className="px-4 py-2">{order.email}</td>
                    <td className="px-4 py-2">{order.name}</td>
                    <td className="px-4 py-2">{order.address}</td>
                    <td className="px-4 py-2">{order.phoneNumber}</td>
                    <td className="px-4 py-2">
                      <select
                        value={order.status}
                        className="rounded border-gray-300 focus:ring-blue-400 px-2 py-1"
                        onChange={(e) =>
                          changeOrderStatus(order.orderId, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Processing">Processing</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 text-right font-bold text-indigo-600">
                      {order.total ? order.total.toFixed(2) : "0.00"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

