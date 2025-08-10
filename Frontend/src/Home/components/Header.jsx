// import React from 'react';
// import { BellIcon, SearchIcon, UserIcon, SettingsIcon } from 'lucide-react';

// export function Header() {
//   return (
//     <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between shadow-sm">
//       <div className="flex items-center">
//         <div className="text-blue-600 font-bold text-2xl">
//           Medi<span className="text-teal-500">Track</span>
//         </div>
//       </div>

//       <div className="text-xl font-semibold text-gray-700">
//         MediTrack Dashboard
//       </div>

//       <div className="flex items-center space-x-4">
//         <button className="text-gray-500 hover:text-gray-700">
//           <SearchIcon size={20} />
//         </button>
//         <button className="text-gray-500 hover:text-gray-700 relative">
//           <BellIcon size={20} />
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//             3
//           </span>
//         </button>
//         <button className="text-gray-500 hover:text-gray-700">
//           <SettingsIcon size={20} />
//         </button>
//         <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
//           <UserIcon size={18} />
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;


import React, { useState, useRef, useEffect } from 'react';
import { BellIcon, SearchIcon, UserIcon, SettingsIcon, LogOutIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200"
          >
            <UserIcon size={22} />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
              >
                <LogOutIcon size={20} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;