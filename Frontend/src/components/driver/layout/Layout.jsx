import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const title = getPageTitle(location.pathname);

  const handleLogout = () => {
    // Clear local storage/session if needed
    // localStorage.removeItem('driverToken');  // if you had any token
    navigate('/driver'); // redirect back to login
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title={title} onLogout={handleLogout} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

function getPageTitle(pathname) {
  if (pathname.startsWith('/driver/dashboard')) return 'Dashboard';
  if (pathname.startsWith('/driver/profile')) return 'Driver Profile';
  if (pathname.startsWith('/driver/history')) return 'Delivery History';
  if (pathname.startsWith('/driver/details')) return 'Delivery Details';
  return 'Driver Portal';
}

export default Layout;
