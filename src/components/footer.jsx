

export default function Footer() {
  return (
    <footer className="bg-pink-700 text-white py-8 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        
        {/* Logo / Brand */}
        <div className="text-2xl font-extrabold tracking-wide">
          Crystal Beauty Clear
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6 text-sm font-medium">
          <a href="/" className="hover:text-pink-300 transition">Home</a>
          <a href="/products" className="hover:text-pink-300 transition">Products</a>
          <a href="/contact" className="hover:text-pink-300 transition">Contact Us</a>
          <a href="/reviews" className="hover:text-pink-300 transition">Reviews</a>
        </nav>

        {/* Social Icons */}
        <div className="flex space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-pink-300 transition">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M22 12a10 10 0 10-11.5 9.87v-7h-2v-3h2v-2c0-2 1-3 3-3h2v3h-2c-.5 0-1 .5-1 1v1h3l-.5 3h-2.5v7A10 10 0 0022 12z" />
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-pink-300 transition">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.98-2.48 9.14 9.14 0 01-2.89 1.1 4.52 4.52 0 00-7.7 4.12A12.84 12.84 0 013 4.15a4.48 4.48 0 001.4 6.05 4.5 4.5 0 01-2-.55v.05a4.52 4.52 0 003.63 4.43 4.52 4.52 0 01-2 .08 4.52 4.52 0 004.22 3.14A9 9 0 012 19.54 12.74 12.74 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.18 8.18 0 0023 3z" />
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-300 transition">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 3a1 1 0 110 2 1 1 0 010-2zm-5 2a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-xs text-pink-300">
        &copy; {new Date().getFullYear()} Crystal Beauty Clear. All rights reserved.
      </div>
    </footer>
  );
}
