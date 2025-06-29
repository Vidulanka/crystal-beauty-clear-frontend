import { TbTrash } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get cart from location.state or localStorage
  const getInitialCart = () => {
    if (location.state?.items) {
      return location.state.items;
    }
    const stored = localStorage.getItem("cart");
    if (stored) return JSON.parse(stored);
    return [];
  };

  const [cart, setCart] = useState(getInitialCart());
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  // Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Redirect if cart is empty
  useEffect(() => {
    if (!cart || cart.length === 0) {
      toast.error("No items found in cart.");
      navigate("/");
    }
    // eslint-disable-next-line
  }, [cart, navigate]);

  function placeOrder() {
    if (!name || !address || !phone) {
      toast.error("Please fill all details!");
      return;
    }
    const orderData = {
      name,
      address,
      phoneNumber: phone,
      billItems: cart.map((item) => ({
        productID: item.productID,
        quantity: item.quantity,
      })),
    };

    const token = localStorage.getItem("token");
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/order", orderData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        toast.success("Order placed successfully");
        localStorage.removeItem("cart");
        navigate("/");
      })
      .catch((err) => {
        toast.error("Failed to place order");
        console.error(err);
      });
  }

  function getTotal() {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  function getTotalForLabelledPrice() {
    return cart.reduce(
      (acc, item) => acc + (item.lebeledPrice || item.price) * item.quantity,
      0
    );
  }

  // Handle quantity change
  function changeQuantity(index, delta) {
    const newCart = [...cart];
    newCart[index].quantity += delta;
    if (newCart[index].quantity < 1) newCart[index].quantity = 1;
    setCart(newCart);
  }

  // Remove item
  function removeItem(productID) {
    const newCart = cart.filter((item) => item.productID !== productID);
    setCart(newCart);
  }

  return (
    <div className="min-h-screen bg-pink-50 flex justify-center p-6">
      <div className="w-full max-w-4xl space-y-6">
        {/* Cart Items */}
        {cart.map((item, index) => (
          <div
            key={item.productID}
            className="bg-white rounded-lg shadow-lg flex flex-col lg:flex-row items-center p-4 relative"
          >
            {/* Remove Button */}
            <button
              onClick={() => removeItem(item.productID)}
              title="Remove"
              className="absolute top-4 right-4 lg:right-[-50px] bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition"
              aria-label={`Remove ${item.name} from cart`}
            >
              <TbTrash size={20} />
            </button>

            {/* Product Image */}
            <img
              src={item.images}
              alt={item.name}
              className="h-28 w-28 object-cover rounded-md mb-4 lg:mb-0 lg:mr-6 flex-shrink-0"
            />

            {/* Product Info */}
            <div className="flex flex-col max-w-xs w-full overflow-hidden">
              <h1 className="text-2xl font-semibold text-pink-700 truncate">
                {item.name}
              </h1>
              <h2 className="text-gray-500 text-sm mt-1 truncate">
                {item.altNames?.join(" | ")}
              </h2>
              <h2 className="text-gray-700 font-medium mt-2">
                LKR: {item.price.toFixed(2)}
              </h2>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-center mt-4 lg:mt-0 lg:mx-8">
              <button
                onClick={() => changeQuantity(index, -1)}
                aria-label={`Decrease quantity of ${item.name}`}
                className="bg-pink-600 hover:bg-pink-700 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow-md transition"
              >
                -
              </button>
              <span className="mx-4 text-xl font-semibold min-w-[30px] text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => changeQuantity(index, 1)}
                aria-label={`Increase quantity of ${item.name}`}
                className="bg-pink-600 hover:bg-pink-700 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow-md transition"
              >
                +
              </button>
            </div>

            {/* Item Total */}
            <div className="ml-auto mt-4 lg:mt-0 w-24 text-right text-xl font-semibold text-pink-700">
              LKR {(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}

        {/* Totals Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md ml-auto space-y-4">
          <div className="flex justify-between text-lg font-semibold text-gray-700">
            <span>Total</span>
            <span>{getTotalForLabelledPrice().toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold text-pink-600 border-b border-gray-300 pb-2">
            <span>Discount</span>
            <span>{(getTotalForLabelledPrice() - getTotal()).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-pink-700 border-t-4 border-double border-pink-400 pt-3">
            <span>Net Total</span>
            <span>{getTotal().toFixed(2)}</span>
          </div>

          {/* User Details Form */}
          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <label className="w-[100px] text-lg font-semibold text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-[calc(100%-110px)] border-b-2 border-pink-400 text-lg p-1 focus:outline-none focus:border-pink-600 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="w-[100px] text-lg font-semibold text-gray-700">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Your address"
                className="w-[calc(100%-110px)] border-b-2 border-pink-400 text-lg p-1 focus:outline-none focus:border-pink-600 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="w-[100px] text-lg font-semibold text-gray-700">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your phone"
                className="w-[calc(100%-110px)] border-b-2 border-pink-400 text-lg p-1 focus:outline-none focus:border-pink-600 rounded"
              />
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={placeOrder}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white text-xl font-semibold rounded-lg py-3 shadow-md transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
