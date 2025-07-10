import { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="h-[70px] w-full flex items-center bg-gradient-to-r from-pink-200 via-pink-300 to-pink-200 relative px-6 md:px-12 shadow-lg">
      {/* Hamburger menu for mobile */}
      <RxHamburgerMenu
        className="lg:hidden text-4xl text-pink-700 cursor-pointer hover:text-pink-900 transition focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        tabIndex={0}
      />

      {/* Desktop navigation */}
      <nav className="hidden lg:flex w-[550px] h-full items-center justify-around text-pink-700 text-lg font-semibold tracking-wide select-none">
        <Link
          to="/"
          className="hover:text-pink-900 transition focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="hover:text-pink-900 transition focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
        >
          Products
        </Link>
        <Link
          to="/contact"
          className="hover:text-pink-900 transition focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
        >
          Contact Us
        </Link>
        <Link
          to="/reviews"
          className="hover:text-pink-900 transition focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
        >
          Reviews
        </Link>

        <div className="absolute right-[70px] h-full">
          <UserData />
          </div>
      </nav>

     

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex">
          <div className="w-72 bg-white h-full p-8 flex flex-col shadow-xl rounded-r-3xl">
            {/* Close icon */}
            <RxHamburgerMenu
              className="text-4xl text-pink-700 mb-10 cursor-pointer self-end hover:text-pink-900 transition focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              tabIndex={0}
            />

            {/* Mobile nav links */}
            {[
              { to: "/", label: "Home" },
              { to: "/products", label: "Products" },
              { to: "/contact", label: "Contact Us" },
              { to: "/reviews", label: "Reviews" },
              { to: "/cart", label: "Cart" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-pink-700 text-xl mb-6 hover:text-pink-900 transition focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
                onClick={() => setIsOpen(false)}
                tabIndex={0}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Click outside menu to close */}
          <div
            className="flex-1"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        </div>
      )}
    </header>
  );
}
