import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children, onLogout }) => {
  const location = useLocation();
  const title = getPageTitle(location.pathname);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title={title} onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

function getPageTitle(pathname) {
  if (pathname.startsWith('/delivery/')) return 'Delivery Details';
  switch (pathname) {
    case '/dashboard':
      return 'Dashboard';
    case '/profile':
      return 'Driver Profile';
    case '/history':
      return 'Delivery History';
    default:
      return 'Driver Portal';
  }
}

export default Layout;
