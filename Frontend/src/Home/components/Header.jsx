import React from 'react';
import { BellIcon, SearchIcon, UserIcon, SettingsIcon } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center">
        <div className="text-blue-600 font-bold text-2xl">
          Medi<span className="text-teal-500">Track</span>
        </div>
      </div>

      <div className="text-xl font-semibold text-gray-700">
        MediTrack Dashboard
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700">
          <SearchIcon size={20} />
        </button>
        <button className="text-gray-500 hover:text-gray-700 relative">
          <BellIcon size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <SettingsIcon size={20} />
        </button>
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <UserIcon size={18} />
        </div>
      </div>
    </header>
  );
}

export default Header;