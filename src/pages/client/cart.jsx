import { useState, useEffect } from "react";
import { TbTrash } from "react-icons/tb";
import getCart, { addToCart, getTotal, getTotalForLabelledPrice, removeFromCart } from "../../utils/cart";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cartLoaded, setCartLoaded] = useState(false);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cartLoaded) {
      setCart(getCart());
      setCartLoaded(true);
    }
  }, [cartLoaded]);

  return (
    <div className="min-h-screen bg-pink-50 flex justify-center p-8">
      <div className="w-full max-w-4xl">
        {cart.length === 0 ? (
          <div className="text-center text-gray-600 text-xl py-20">
            Your cart is empty.
          </div>
        ) : (
          <>
            {/* Cart Items */}
            {cart.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg mb-6 flex flex-col lg:flex-row items-center p-4 relative"
              >
                {/* Remove Button */}
                <button
                  className="absolute top-3 right-3 lg:right-[-50px] bg-red-600 hover:bg-red-700 transition text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                  onClick={() => {
                    removeFromCart(item.productID);
                    setCartLoaded(false);
                  }}
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

                {/* Product Details */}
                <div className="flex flex-col max-w-xs w-full overflow-hidden">
                  <h1 className="text-2xl font-semibold text-pink-700 truncate">{item.name}</h1>
                  <h2 className="text-gray-500 text-sm mt-1 truncate">{item.altNames.join(" | ")}</h2>
                  <h2 className="text-gray-700 font-medium mt-2">LKR: {item.price.toFixed(2)}</h2>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-center mt-4 lg:mt-0 lg:mx-8">
                  <button
                    className="bg-pink-600 hover:bg-pink-700 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow-md transition"
                    onClick={() => {
                      addToCart(item, -1);
                      setCartLoaded(false);
                    }}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    -
                  </button>
                  <span className="mx-4 text-xl font-semibold min-w-[30px] text-center">{item.quantity}</span>
                  <button
                    className="bg-pink-600 hover:bg-pink-700 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow-md transition"
                    onClick={() => {
                      addToCart(item, 1);
                      setCartLoaded(false);
                    }}
                    aria-label={`Increase quantity of ${item.name}`}
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
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col max-w-md ml-auto">
              <div className="flex justify-between mb-3">
                <span className="font-semibold text-lg text-gray-700">Total</span>
                <span className="font-semibold text-lg text-gray-900">{getTotalForLabelledPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-3 border-b border-gray-300 pb-3">
                <span className="font-semibold text-lg text-gray-700">Discount</span>
                <span className="font-semibold text-lg text-pink-600">
                  {(getTotalForLabelledPrice() - getTotal()).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-xl font-bold text-pink-700 border-t-4 border-double border-pink-400 pt-3">
                <span>Net Total</span>
                <span>{getTotal().toFixed(2)}</span>
              </div>
              <button
                className="mt-6 bg-pink-600 hover:bg-pink-700 text-white text-lg font-semibold rounded-lg py-3 shadow-md transition"
                onClick={() => {
                  navigate("/checkout", { state: { items: cart } });
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
