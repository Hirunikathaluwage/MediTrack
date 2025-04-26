import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DeliveriesManagement from './DeliveriesManagement';
import DriversTracking from './DriversTracking';
import AddDriver from './AddDriver';
import Ratings from './Ratings';
import AssignDriver from './AssignDriver';
import DeliveryDetails from './DeliveryDetails';
import UpdateDriver from './UpdateDriver';

export function AppAdmin() {
  const [activeSection, setActiveSection] = useState('deliveries');
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [assignMode, setAssignMode] = useState(false);

  const [selectedDriver, setSelectedDriver] = useState(null); // For editing drivers

  const handleViewDelivery = (delivery) => {
    setSelectedDelivery(delivery);
    setAssignMode(false);
  };

  const handleAssignDriver = () => {
    setAssignMode(true);
  };

  const handleAssignComplete = (updatedDelivery) => {
    setSelectedDelivery(updatedDelivery);
    setAssignMode(false);
  };

  const handleBack = () => {
    setAssignMode(false);
    setSelectedDelivery(null);
    setSelectedDriver(null);
    setActiveSection('drivers'); // Return to drivers list
  };

  const handleEditDriver = (driver) => {
    setSelectedDriver(driver);
    setActiveSection('updateDriver'); // Switch to UpdateDriver section
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 overflow-auto">
        <header className="bg-white p-6 shadow-sm">
          <h1 className="text-xl font-medium">Delivery Management System</h1>
        </header>

        <main className="p-6">
          {/* Deliveries flow */}
          {activeSection === 'deliveries' && !selectedDelivery && (
            <DeliveriesManagement onViewDelivery={handleViewDelivery} />
          )}

          {activeSection === 'deliveries' && selectedDelivery && !assignMode && (
            <DeliveryDetails
              delivery={selectedDelivery}
              onBack={handleBack}
              onAssignDriver={handleAssignDriver}
            />
          )}

          {activeSection === 'deliveries' && selectedDelivery && assignMode && (
            <AssignDriver
              delivery={selectedDelivery}
              onBack={handleBack}
              onAssignComplete={handleAssignComplete}
            />
          )}

          {/* Drivers flow */}
          {activeSection === 'drivers' && (
            <DriversTracking onEditDriver={handleEditDriver} />
          )}

          {activeSection === 'addDriver' && <AddDriver />}
          {activeSection === 'ratings' && <Ratings />}

          {/* Update Driver page */}
          {activeSection === 'updateDriver' && selectedDriver && (
            <UpdateDriver driver={selectedDriver} onBack={handleBack} />
          )}
        </main>
      </div>
    </div>
  );
}

export default AppAdmin;