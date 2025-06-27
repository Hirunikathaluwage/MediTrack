// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import {
//   HomeIcon,
//   FileTextIcon,
//   PackageIcon,
//   ShoppingCartIcon,
//   TruckIcon,
//   HelpCircleIcon,
// } from 'lucide-react';

// export function Navigation() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [activeTab, setActiveTab] = useState('home');

//   const navItems = [
//     { id: 'home', name: 'Home', icon: <HomeIcon size={18} />, path: '/admin/dashboard-home' },
//     { id: 'prescription', name: 'Prescription', icon: <FileTextIcon size={18} />, path: '/admin-prescription' },
//     { id: 'inventory', name: 'Inventory', icon: <PackageIcon size={18} />, path: '/admin/inventory' },
//     { id: 'order', name: 'Order', icon: <ShoppingCartIcon size={18} />, path: '/order-dashboard' },
//     { id: 'delivery', name: 'Delivery', icon: <TruckIcon size={18} />, path: '/admin' },
//     { id: 'inquiry', name: 'Inquiry', icon: <HelpCircleIcon size={18} />, path: '/admin/panel' },
//   ];

//   useEffect(() => {
//     const currentItem = navItems.find(item => location.pathname.startsWith(item.path));
//     if (currentItem) {
//       setActiveTab(currentItem.id);
//     }
//   }, [location.pathname]);

//   const handleTabClick = (item) => {
//     setActiveTab(item.id);
//     navigate(item.path);
//   };

//   return (
//     <nav className="bg-white border-b border-gray-200 px-4">
//       <div className="flex overflow-x-auto">
//         {navItems.map((item) => (
//           <button
//             key={item.id}
//             className={`flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${activeTab === item.id
//               ? 'border-blue-500 text-blue-600'
//               : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//               }`}
//             onClick={() => handleTabClick(item)}

//           >
//             <span className="mr-2">{item.icon}</span>
//             {item.name}
//           </button>
//         ))}
//       </div>
//     </nav>
//   );
// }
// export default Navigation;




//second version
{/*
import React from 'react';
import {
  HomeIcon,
  FileTextIcon,
  PackageIcon,
  ShoppingCartIcon,
  TruckIcon,
  HelpCircleIcon,
} from 'lucide-react';

export function Navigation({ activeTab, setActiveTab }) {
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
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${activeTab === item.id
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <span className="mr-2">{item.icon}</span>
            {item.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
*/}



//===========================

//third version
import React from 'react';
import {
  HomeIcon,
  FileTextIcon,
  PackageIcon,
  ShoppingCartIcon,
  TruckIcon,
  HelpCircleIcon,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function Navigation() {
  const navItems = [
    { id: '', name: 'Home', icon: <HomeIcon size={18} />, path: '/admin/dashboard-home' },
    { id: 'prescription', name: 'Prescription', icon: <FileTextIcon size={18} />, path: '/admin/dashboard-home/prescription' },
    { id: 'inventory', name: 'Inventory', icon: <PackageIcon size={18} />, path: '/admin/dashboard-home/inventory' },
    { id: 'order', name: 'Order', icon: <ShoppingCartIcon size={18} />, path: '/admin/dashboard-home/order' },
    { id: 'delivery', name: 'Delivery', icon: <TruckIcon size={18} />, path: '/admin/dashboard-home/delivery' },
    { id: 'inquiry', name: 'Inquiry', icon: <HelpCircleIcon size={18} />, path: '/admin/dashboard-home/inquiry' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-4">
      <div className="flex overflow-x-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${isActive
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`
            }
          >
            <span className="mr-2">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
