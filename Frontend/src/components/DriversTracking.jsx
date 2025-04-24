import React from 'react';
import { MapPinIcon, PhoneIcon, MailIcon } from 'lucide-react';

const DriversTracking = () => {
  const drivers = [
    {
      id: 1,
      name: 'John Doe',
      status: 'Active',
      location: 'Central District',
      lastUpdate: '5 mins ago',
      phone: '+1 234-567-8901',
      email: 'john.doe@example.com',
      currentDeliveries: 3,
    },
    {
      id: 2,
      name: 'Sarah Smith',
      status: 'Idle',
      location: 'Northern District',
      lastUpdate: '15 mins ago',
      phone: '+1 234-567-8902',
      email: 'sarah.smith@example.com',
      currentDeliveries: 0,
    },
    {
      id: 3,
      name: 'Mike Johnson',
      status: 'Active',
      location: 'Eastern District',
      lastUpdate: '2 mins ago',
      phone: '+1 234-567-8903',
      email: 'mike.johnson@example.com',
      currentDeliveries: 5,
    },
    {
      id: 4,
      name: 'Lisa Brown',
      status: 'Break',
      location: 'Western District',
      lastUpdate: '30 mins ago',
      phone: '+1 234-567-8904',
      email: 'lisa.brown@example.com',
      currentDeliveries: 1,
    },
  ];

  return (
    <div className="bg-white rounded-md shadow-sm p-6">
      <h2 className="text-2xl font-medium mb-6">MediTrack Drivers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.map((driver) => (
          <div key={driver.id} className="border rounded-lg overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg">{driver.name}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    driver.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : driver.status === 'Idle'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {driver.status}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center mb-3">
                <MapPinIcon size={16} className="text-gray-600 mr-2" />
                <span className="text-sm">{driver.location}</span>
                <span className="text-xs text-gray-500 ml-auto">
                  Updated {driver.lastUpdate}
                </span>
              </div>
              <div className="flex items-center mb-3">
                <PhoneIcon size={16} className="text-gray-600 mr-2" />
                <span className="text-sm">{driver.phone}</span>
              </div>
              <div className="flex items-center mb-3">
                <MailIcon size={16} className="text-gray-600 mr-2" />
                <span className="text-sm">{driver.email}</span>
              </div>
              <div className="mt-4 pt-3 border-t">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Current Deliveries</span>
                  <span
                    className={`font-medium ${
                      driver.currentDeliveries > 0
                        ? 'text-blue-600'
                        : 'text-gray-500'
                    }`}
                  >
                    {driver.currentDeliveries}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriversTracking;
