import React from 'react';
import { TruckIcon, UsersIcon, UserPlusIcon, StarIcon } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const navItems = [
    {
      id: 'deliveries',
      name: 'Manage Deliveries',
      icon: <TruckIcon size={18} />
    },
    {
      id: 'drivers',
      name: 'MediTrack Drivers',
      icon: <UsersIcon size={18} />
    },
    {
      id: 'addDriver',
      name: 'Add Driver',
      icon: <UserPlusIcon size={18} />
    },
    {
      id: 'ratings',
      name: 'Ratings',
      icon: <StarIcon size={18} />
    }
  ];

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-sm text-white font-bold mb-6">Welcome</h1>

      <h2 className="text-sm font-semibold text-gray-400 mb-3">Delivery Section</h2>

      <ul className="space-y-2">
        {navItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex items-center gap-3 cursor-pointer px-3 py-2 rounded-md ${activeSection === item.id
              ? 'bg-blue-600 text-white'
              : 'hover:bg-gray-700 text-gray-300'
              }`}
          >
            {item.icon}
            <span className="text-sm">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
