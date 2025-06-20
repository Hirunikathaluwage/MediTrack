import React, { useState } from 'react';
import {
  HomeIcon,
  FileTextIcon,
  PackageIcon,
  ShoppingCartIcon,
  TruckIcon,
  HelpCircleIcon,
} from 'lucide-react';

export function Navigation() {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', name: 'Home', icon: <HomeIcon size={18} /> },
    { id: 'prescription', name: 'Prescription', icon: <FileTextIcon size={18} /> },
    { id: 'inventory', name: 'Inventory', icon: <PackageIcon size={18} /> },
    { id: 'order', name: 'Order', icon: <ShoppingCartIcon size={18} /> },
    { id: 'delivery', name: 'Delivery', icon: <TruckIcon size={18} /> },
    { id: 'inquiry', name: 'Inquiry', icon: <HelpCircleIcon size={18} /> },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-4">
      <div className="flex overflow-x-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
              activeTab === item.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="mr-2">{item.icon}</span>
            {item.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
export default Navigation;