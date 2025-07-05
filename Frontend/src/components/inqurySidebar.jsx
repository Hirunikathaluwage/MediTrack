// import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { LayoutDashboardIcon, InboxIcon, ClipboardListIcon, BellIcon } from 'lucide-react';
// import { io } from 'socket.io-client';

// const InqurySidebar = () => {
//   const [newInquiry, setNewInquiry] = useState(false);

//   function getNavLinkClass(isActive) {
//     return `flex items-center py-3 px-4 ${isActive ? 'bg-blue-600' : 'hover:bg-[#1e293b]'}`;
//   }

//   useEffect(() => {
//     const socket = io('http://localhost:5080');

//     socket.on('newInquiry', (inquiry) => {
//       console.log('🔔 Sidebar received new inquiry:', inquiry);
//       setNewInquiry(true);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div className="w-56 bg-[#0f172a] text-white min-h-screen">
//       <div className="p-6">
//         <h1 className="text-sm text-white font-bold mb-6">WELCOME</h1>
//       </div>

//       <div className="mt-2">
//         {/* Inquiry Section */}
//         <div className="bg-[#1e293b] py-2 px-4 text-sm text-gray-400">
//           Inquiry Section
//         </div>

//         <NavLink
//           to="/dashboard"
//           className={(navData) => getNavLinkClass(navData.isActive)}
//         >
//           <LayoutDashboardIcon size={18} className="mr-3" />
//           Dashboard
//         </NavLink>

//         <NavLink
//           to="/view-inquiries"
//           className={(navData) => getNavLinkClass(navData.isActive)}
//         >
//           <InboxIcon size={18} className="mr-3" />
//           View Inquiries
//         </NavLink>

//         <NavLink
//           to="/admin/manage-inquiries"
//           className={(navData) => getNavLinkClass(navData.isActive)}
//         >
//           <ClipboardListIcon size={18} className="mr-3" />
//           Manage Inquiries
//         </NavLink>
//       </div>

//       {/* Notification Section */}
//       <div className="mt-6">
//         <div className="bg-[#1e293b] py-2 px-4 text-sm text-gray-400">
//           Notifications
//         </div>

//         <NavLink
//           to="/admin/notifications"
//           className={(navData) => getNavLinkClass(navData.isActive)}
//           onClick={() => setNewInquiry(false)} // Clear notification when user clicks
//         >
//           <div className="flex items-center">
//             <BellIcon size={18} className="mr-3" />
//             Alerts
//             {newInquiry && (
//               <span className="ml-2 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
//             )}
//           </div>
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default InqurySidebar;


// -------------------updated version
// InqurySidebar.jsx
import React from 'react';
import {
  LayoutDashboardIcon, InboxIcon, ClipboardListIcon, BellIcon,
} from 'lucide-react';

const InqurySidebar = ({ activeSection, onChangeSection, newInquiry }) => {
  const getClass = (section) =>
    `flex items-center py-3 px-4 cursor-pointer ${activeSection === section ? 'bg-blue-600' : 'hover:bg-[#1e293b]'
    }`;

  return (
    <div className="w-56 bg-[#0f172a] text-white min-h-screen">
      <div className="p-6">
        <h1 className="text-sm text-white font-bold mb-6">WELCOME</h1>
      </div>

      <div className="mt-2">
        <div className="bg-[#1e293b] py-2 px-4 text-sm text-gray-400">
          Inquiry Section
        </div>

        <div className={getClass('dashboard')} onClick={() => onChangeSection('dashboard')}>
          <LayoutDashboardIcon size={18} className="mr-3" />
          Dashboard
        </div>

        <div className={getClass('view-inquiries')} onClick={() => onChangeSection('view-inquiries')}>
          <InboxIcon size={18} className="mr-3" />
          View Inquiries
        </div>

        <div className={getClass('manage-inquiries')} onClick={() => onChangeSection('manage-inquiries')}>
          <ClipboardListIcon size={18} className="mr-3" />
          Manage Inquiries
        </div>
      </div>

      <div className="mt-6">
        <div className="bg-[#1e293b] py-2 px-4 text-sm text-gray-400">
          Notifications
        </div>

        <div className={getClass('notifications')} onClick={() => onChangeSection('notifications')}>
          <div className="flex items-center">
            <BellIcon size={18} className="mr-3" />
            Alerts
            {newInquiry && (
              <span className="ml-2 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InqurySidebar;

