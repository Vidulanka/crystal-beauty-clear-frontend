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
    <div className="w-full h-full flex justify-center p-[40px]">
      <div className="w-[700px]">
        {cart.map((item, index) => (
          <div
            key={item.productID}
            className="w-full h-[100px] bg-white shadow-2xl my-[5px] flex justify-between items-center relative"
          >
            <button
              className="absolute right-[-50px] bg-red-500 w-[40px] h-[40px] rounded-full text-white flex justify-center items-center shadow cursor-pointer"
              onClick={() => removeItem(item.productID)}
              title="Remove"
            >
              <TbTrash />
            </button>

            <img
              src={item.images}
              className="h-full aspect-square object-cover"
              alt={item.name}
            />
            <div className="h-full max-w-[300px] w-[300px] overflow-hidden">
              <h1 className="text-xl font-bold">{item.name}</h1>
              <h2 className="text-lg text-gray-500">
                {item.altNames?.join(" | ")}
              </h2>
              <h2 className="text-lg text-gray-500">
                LKR: {item.price.toFixed(2)}
              </h2>
            </div>
            <div className="h-full w-[100px] flex justify-center items-center">
              <button
                className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]"
                onClick={() => changeQuantity(index, -1)}
              >
                -
              </button>
              <h1 className="text-xl font-bold">{item.quantity}</h1>
              <button
                className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]"
                onClick={() => changeQuantity(index, 1)}
              >
                +
              </button>
            </div>
            <div className="h-full w-[100px] flex justify-center items-center">
              <h1 className="text-xl w-full text-end pr-2">
                {(item.price * item.quantity).toFixed(2)}
              </h1>
            </div>
          </div>
        ))}

        <div className="w-full bg-white flex justify-end">
          <h1 className="w-[100px] text-xl text-end pr-2">Total</h1>
          <h1 className="w-[100px] text-xl text-end pr-2">
            {getTotalForLabelledPrice().toFixed(2)}
          </h1>
        </div>

        <div className="w-full bg-white flex justify-end">
          <h1 className="w-[100px] text-xl text-end pr-2">Discount</h1>
          <h1 className="w-[100px] text-xl border-b-[2px] text-end pr-2">
            {(getTotalForLabelledPrice() - getTotal()).toFixed(2)}
          </h1>
        </div>

        <div className="w-full bg-white flex justify-end">
          <h1 className="w-[100px] text-xl text-end pr-2">Net Total</h1>
          <h1 className="w-[100px] text-xl text-end pr-2 border-double border-b-[4px]">
            {getTotal().toFixed(2)}
          </h1>
        </div>

        <div className="w-full bg-white flex justify-end">
          <h1 className="w-[100px] text-xl text-end pr-2">Name</h1>
          <input
            className="w-[200px] text-xl border-b-[2px] text-end pr-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>

        <div className="w-full bg-white flex justify-end">
          <h1 className="w-[100px] text-xl text-end pr-2">Address</h1>
          <input
            className="w-[200px] text-xl border-b-[2px] text-end pr-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Your address"
          />
        </div>

        <div className="w-full bg-white flex justify-end">
          <h1 className="w-[100px] text-xl text-end pr-2">Phone</h1>
          <input
            className="w-[200px] text-xl border-b-[2px] text-end pr-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Your phone"
          />
        </div>

        <div className="w-full bg-white flex justify-end mt-4">
          <button
            className="w-[170px] text-xl text-center shadow pr-2 bg-pink-400 text-white h-[40px] rounded-lg cursor-pointer"
            onClick={placeOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
