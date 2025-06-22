import React from 'react';
import { BellIcon, LogOutIcon } from 'lucide-react';

const Header = ({ title, onLogout }) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        <div className="flex items-center space-x-4">
          <button className="relative text-gray-500 hover:text-gray-700">
            <BellIcon size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button
            onClick={onLogout}
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            <LogOutIcon size={18} />
            <span className="ml-1 text-sm hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
