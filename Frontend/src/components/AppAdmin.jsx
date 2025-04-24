import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DeliveriesManagement from './DeliveriesManagement';
import DriversTracking from './DriversTracking';
import AddDriver from './AddDriver';
import Ratings from './Ratings';
export function AppAdmin() {
  const [activeSection, setActiveSection] = useState('deliveries');
  return <div className="flex h-screen w-full bg-gray-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 overflow-auto">
        <header className="bg-white p-6 shadow-sm">
          <h1 className="text-xl font-medium">Delivery Management System</h1>
        </header>
        <main className="p-6">
          {activeSection === 'deliveries' && <DeliveriesManagement />}
          {activeSection === 'drivers' && <DriversTracking />}
          {activeSection === 'addDriver' && <AddDriver />}
          {activeSection === 'ratings' && <Ratings />}
        </main>
      </div>
    </div>;
}

export default AppAdmin;