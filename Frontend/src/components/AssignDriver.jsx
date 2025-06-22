import React, { useState } from 'react';
import { ArrowLeftIcon, CheckIcon, TruckIcon, MapPinIcon } from 'lucide-react';

const AssignDriver = ({ delivery, onBack, onAssignComplete }) => {
  const [selectedDriverId, setSelectedDriverId] = useState(null);

  const branchDrivers = [
    {
      _id: '680e7b54115bce58a4c6bd8f',
      firstName: 'Amal',
      lastName: 'Perera',
      ongoingDeliveries: [
        {
          orderId: 'ORD-001',
          destination: '51.50902, -0.06420',
        },
      ],
      vehicleNumber: 'BIN-2956',
    },
    {
      _id: '680c751938d41434cde14c1a',
      firstName: 'Awantha',
      lastName: 'Imesh',
      ongoingDeliveries: [],
      vehicleNumber: 'GF1928',
    },
    {
      _id: '680e7bb8115bce58a4c6bd9a',
      firstName: 'Susantha',
      lastName: 'Fernando',
      ongoingDeliveries: [
        {
          orderId: 'ORD-002',
          destination: '51.50632, -0.12714',
        },
      ],
      vehicleNumber: 'BIU-2645',
    },
  ];

  const handleAssign = async () => {
    if (!selectedDriverId) return;

    const selectedDriver = branchDrivers.find(d => d._id === selectedDriverId);
    if (!selectedDriver) return;

    try {
      const response = await fetch(`http://localhost:5080/api/deliveries/${delivery._id}/assign-driver`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          driverId: selectedDriver._id,
          driverName: `${selectedDriver.firstName} ${selectedDriver.lastName}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to assign driver');
      }

      const updatedDelivery = await response.json();
      onAssignComplete(updatedDelivery);
    } catch (error) {
      console.error('Error assigning driver:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md">
      <button onClick={onBack} className="text-gray-500 mb-4 flex items-center hover:text-gray-700">
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        Back
      </button>

      <h2 className="text-xl font-semibold mb-6">Assign Driver</h2>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Delivery Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-400">Order ID</p>
            <p className="font-medium">{delivery.orderId}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Destination</p>
            <p className="font-medium">{delivery.location?.address}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Branch</p>
            <p className="font-medium">{delivery.branch}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500 uppercase mb-4">
          Available Drivers ({delivery.branch})
        </h3>

        <div className="space-y-4">
          {branchDrivers.map((driver) => (
            <div
              key={driver._id}
              onClick={() => setSelectedDriverId(driver._id)}
              className={`p-4 border rounded-lg cursor-pointer hover:border-blue-500 ${
                selectedDriverId === driver._id ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <button
                    className="flex items-center text-blue-500 hover:text-blue-700 text-xs border border-blue-500 px-2 py-1 rounded-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open('https://plus.codes/map', '_blank');
                    }}
                  >
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    Locate
                  </button>

                  <p className="text-base font-medium text-gray-900 flex items-center">
                    <TruckIcon className="h-5 w-5 mr-2 text-blue-600" />
                    {driver.firstName} {driver.lastName}
                    {selectedDriverId === driver._id && (
                      <CheckIcon className="h-4 w-4 ml-2 text-green-500" />
                    )}
                  </p>
                </div>
                <div className="text-sm text-gray-600">
                  {(driver.ongoingDeliveries?.length || 0)} ongoing deliveries
                </div>
              </div>

              {/* Ongoing deliveries if exist */}
              {driver.ongoingDeliveries && driver.ongoingDeliveries.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  <p className="font-medium text-gray-500">Current Deliveries:</p>
                  <ul className="list-disc list-inside">
                    {driver.ongoingDeliveries.map((del, index) => (
                      <li key={index}>
                        <span className="font-medium">{del.orderId}</span> → {del.destination}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={onBack}
          className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleAssign}
          disabled={!selectedDriverId}
          className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
            !selectedDriverId ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Assign Driver
        </button>
      </div>
    </div>
  );
};

export default AssignDriver;
