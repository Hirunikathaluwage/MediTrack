import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  // const [showUpload, setShowUpload] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="w-full">
      {/* Main Navbar */}
      <nav className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="font-bold text-xl">
                MediTrack
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <button
                onClick={() => navigate('/prescription')}
                className="bg-white text-blue-600 font-semibold px-4 py-1 rounded-md hover:bg-gray-100 transition"
              >
                Prescription
              </button>

              <Link to="/order-confirmation" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                Order
              </Link>
              <Link to="/delivery" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                Delivery
              </Link>
              <Link to="/submit-inquiry" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                Inquiry
              </Link>
              <Link to="/cart" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                Cart
              </Link>
              <Link to="/profile" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 font-semibold px-4 py-1 rounded-md hover:bg-gray-100 transition"
              >
                Login
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {
          mobileMenuOpen && (
            <div className="md:hidden bg-blue-600 pb-3 px-2">
              <div className="space-y-1">
                <Link to="/customer/home" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">
                  Home
                </Link>

                <button
                  onClick={() => navigate('/prescription')}
                  className="w-full text-left bg-white text-blue-600 font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition"
                >
                  Prescription
                </button>

                <Link to="/order" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">
                  Order
                </Link>
                <Link to="/delivery" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">
                  Delivery
                </Link>
                <Link to="/submit-inquiry" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">
                  Inquiry
                </Link>
                <Link to="/cart" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">
                  Cart
                </Link>
                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left bg-white text-blue-600 font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition"
                >
                  Login
                </button>
              </div>
            </div>
          )
        }
      </nav >

      {/* {
        showUpload && (
          <div className="bg-white shadow-md py-3 px-4 border-t border-gray-200">
            <div className="max-w-7xl mx-auto flex justify-center">
              <button
                onClick={() => alert('Upload popup or logic here')}
                className="bg-yellow-200 hover:bg-yellow-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload your Prescription
              </button>
            </div>
          </div>
        )
      } */}
    </div >
  );
};

export default Navbar;