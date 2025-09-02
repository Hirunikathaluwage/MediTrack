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
      {/* Main Navbar */}
      <nav className="bg-blue-600 text-white shadow-md user-navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="font-bold text-4xl">
                MediTrack
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/"
                className="hover:bg-blue-700 px-3 py-2 rounded-md text-2xl font-medium"
              >
                Home
              </Link>
              <Link
                to="/prescription"
                className="px-3 py-2 rounded-md text-2xl font-medium hover:bg-blue-700 transition"
              >
                Prescription
              </Link>

              <Link
                to="/submit-inquiry"
                className="hover:bg-blue-700 px-3 py-2 rounded-md text-2xl font-medium"
              >
                Inquiry
              </Link>
              <Link
                to="/profile"
                className="hover:bg-blue-700 px-3 py-2 rounded-md text-2xl font-medium"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="p-2 rounded-md hover:bg-blue-700 transition"
              >
                <User size={20} />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
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
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
              >
                Home
              </Link>

              <button
                onClick={() => navigate("/prescription")}
                className="w-full text-left px-3 py-2 rounded-md text-2xl font-medium hover:bg-blue-700 transition"
              >
                Prescription
              </button>

              <Link
                to="/order"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
              >
                Order
              </Link>
              <Link
                to="/delivery"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
              >
                Delivery
              </Link>
              <Link
                to="/submit-inquiry"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
              >
                Inquiry
              </Link>
              <Link
                to="/cart"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
              >
                Cart
              </Link>
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
