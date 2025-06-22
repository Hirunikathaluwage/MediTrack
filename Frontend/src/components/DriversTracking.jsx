import React, { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon } from 'lucide-react';

const DriversTracking = ({ onEditDriver }) => {
  const [drivers, setDrivers] = useState([]); // State to store drivers
  const [error, setError] = useState(null); // State to handle errors

  // Fetch drivers from the backend
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch('http://localhost:5080/api/drivers');
        if (!response.ok) {
          throw new Error('Failed to fetch drivers');
        }
        const data = await response.json();
        setDrivers(data); // Set the fetched drivers
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDrivers();
  }, []);

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (drivers.length === 0) {
    return <div className="text-center text-gray-500">No drivers found.</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">MediTrack Drivers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.map((driver) => (
          <div
            key={driver._id}
            className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col items-center text-center"
          >
            <h3 className="text-lg font-medium text-gray-800">{driver.firstName} {driver.lastName}</h3>

            <div className="mt-4 text-sm text-gray-600 w-full text-left space-y-1">
              <p><span className="font-semibold">Driver ID:</span> {driver._id}</p>
              <p><span className="font-semibold">Contact Number:</span> {driver.phone}</p>
              <p><span className="font-semibold">Email:</span> {driver.email}</p>
              <p><span className="font-semibold">Vehicle Number:</span> {driver.vehicleNumber}</p>
              <p><span className="font-semibold">Assigned Branch:</span> {driver.branch}</p>
            </div>

            <div className="mt-4 flex space-x-3">
              <button
                onClick={() => onEditDriver(driver)}
                className="flex items-center px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-100"
              >
                <PencilIcon size={16} className="mr-1" />
                Edit
              </button>
              <button className="flex items-center px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-100">
                <TrashIcon size={16} className="mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriversTracking;