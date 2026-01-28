import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="w-full">

      <nav className="bg-blue-600 text-white shadow-md user-navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">

            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="font-bold text-2xl text-white">
                MediTrack
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/"
                className="hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium text-white"
              >
                Home
              </Link>
              <Link
                to="/prescription"
                className="px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition text-white"
              >
                Prescription
              </Link>

              <Link
                to="/submit-inquiry"
                className="hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium text-white"
              >
                Inquiry
              </Link>
              <Link
                to="/profile"
                className="hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium text-white"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="p-2 rounded-md bg-white text-blue-600 hover:bg-gray-100 transition"
              >
                <User size={20} />
              </button>

            </div>

            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md
             bg-white text-blue-600 hover:bg-gray-100 transition"
              >

                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-blue-600 pb-3 px-2">
            <div className="space-y-1">

              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 text-white"
              >
                Home
              </Link>

              <button
                onClick={() => navigate("/prescription")}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium
             text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-700
             bg-transparent border-0 appearance-none focus:outline-none transition"
              >
                Prescription
              </button>

              <Link
                to="/order"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 text-white"
              >
                Order
              </Link>
              <Link
                to="/delivery"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 text-white"
              >
                Delivery
              </Link>
              <Link
                to="/submit-inquiry"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 text-white"
              >
                Inquiry
              </Link>
              <Link
                to="/cart"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 text-white"
              >
                Cart
              </Link>
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 text-white"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium
             text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-700
             bg-transparent border-0 appearance-none focus:outline-none transition"
              >
                Logout
              </button>

            </div>
          </div>
        )}

      </nav>
    </div>
  );
};

export default Navbar;