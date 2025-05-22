import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  PackageIcon,
  UserIcon,
  ClockIcon,
  LayoutDashboardIcon,
  MenuIcon,
  XIcon,
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    {
      path: '/driver/dashboard/1', // Use driver id dynamically later
      icon: <LayoutDashboardIcon size={20} />,
      label: 'Dashboard',
    },
    {
      path: '/driver/history',
      icon: <ClockIcon size={20} />,
      label: 'Delivery History',
    },
    {
      path: '/driver/profile',
      icon: <UserIcon size={20} />,
      label: 'Profile',
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed z-50 top-4 left-4 md:hidden bg-blue-600 text-white p-2 rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
      </button>

      {/* Background overlay for mobile */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } md:hidden`}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:shadow-none
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2">
              <PackageIcon className="text-blue-600" size={24} />
              <span className="text-xl font-bold">DeliverEase</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">Driver Portal</div>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                  location.pathname.startsWith(item.path)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} DeliverEase
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
