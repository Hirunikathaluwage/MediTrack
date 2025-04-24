import React from 'react';
import { TruckIcon, UsersIcon, UserPlusIcon, StarIcon } from 'lucide-react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const navItems = [
    {
      id: 'deliveries',
      name: 'Manage Deliveries',
      icon: <TruckIcon size={18} />,
    },
    {
      id: 'drivers',
      name: 'MediTrack Drivers',
      icon: <UsersIcon size={18} />,
    },
    {
      id: 'addDriver',
      name: 'Add Driver',
      icon: <UserPlusIcon size={18} />,
    },
    {
      id: 'ratings',
      name: 'Ratings',
      icon: <StarIcon size={18} />,
    },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6">
        <h1 className="text-xl font-bold">WELCOME</h1>
      </div>
      <nav className="mt-6">
        <div className="px-4 py-2 text-gray-400 text-sm">Delivery Section</div>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`flex items-center w-full px-6 py-3 text-left ${
              activeSection === item.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
            onClick={() => setActiveSection(item.id)}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
