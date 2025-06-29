import { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="h-[70px] w-full flex items-center bg-pink-100 relative px-4 md:px-8 shadow-md">
      {/* Hamburger menu for mobile */}
      <RxHamburgerMenu
        className="lg:hidden text-3xl text-pink-600 cursor-pointer"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      />

      {/* Desktop navigation */}
      <nav className="hidden lg:flex w-[500px] h-full items-center justify-evenly text-pink-600 text-xl font-semibold">
        <Link to="/" className="hover:text-pink-800 transition">
          Home
        </Link>
        <Link to="/products" className="hover:text-pink-800 transition">
          Products
        </Link>
        <Link to="/contact" className="hover:text-pink-800 transition">
          Contact us
        </Link>
        <Link to="/reviews" className="hover:text-pink-800 transition">
          Reviews
        </Link>
      </nav>

      {/* Cart icon always visible on right */}
      <Link
        to="/cart"
        className="absolute right-6 text-pink-600 text-3xl hover:text-pink-800 transition"
        aria-label="Cart"
      >
        <BsCart4 />
      </Link>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex">
          <div className="w-72 bg-white h-full p-6 flex flex-col">
            {/* Close icon */}
            <RxHamburgerMenu
              className="text-3xl text-pink-600 mb-8 cursor-pointer self-end"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            />

            {/* Mobile nav links */}
            <Link
              to="/"
              className="text-pink-600 text-xl mb-6 hover:text-pink-800 transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-pink-600 text-xl mb-6 hover:text-pink-800 transition"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/contact"
              className="text-pink-600 text-xl mb-6 hover:text-pink-800 transition"
              onClick={() => setIsOpen(false)}
            >
              Contact us
            </Link>
            <Link
              to="/reviews"
              className="text-pink-600 text-xl mb-6 hover:text-pink-800 transition"
              onClick={() => setIsOpen(false)}
            >
              Reviews
            </Link>
            <Link
              to="/cart"
              className="text-pink-600 text-xl mb-6 hover:text-pink-800 transition"
              onClick={() => setIsOpen(false)}
            >
              Cart
            </Link>
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
