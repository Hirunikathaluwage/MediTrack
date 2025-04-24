import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from 'lucide-react';

const DeliveriesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const deliveries = [
    {
      id: 1,
      orderId: 'ORD-5678',
      destination: 'Central Hospital',
      status: 'In Transit',
      driver: 'John Doe',
      estimatedDelivery: '2025-04-23',
      priority: 'High',
    },
    {
      id: 2,
      orderId: 'ORD-5679',
      destination: 'Westside Clinic',
      status: 'Delivered',
      driver: 'Sarah Smith',
      estimatedDelivery: '2025-04-22',
      priority: 'Medium',
    },
    {
      id: 3,
      orderId: 'ORD-5680',
      destination: 'North Medical Center',
      status: 'Pending',
      driver: 'Mike Johnson',
      estimatedDelivery: '2025-04-24',
      priority: 'Low',
    },
    {
      id: 4,
      orderId: 'ORD-5681',
      destination: 'Eastside Pharmacy',
      status: 'In Transit',
      driver: 'Lisa Brown',
      estimatedDelivery: '2025-04-23',
      priority: 'High',
    },
  ];

  return (
    <div className="bg-white rounded-md shadow-sm p-6">
      <h2 className="text-2xl font-medium mb-6">Manage Deliveries</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for deliveries..."
          className="w-full p-3 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex gap-2 mb-4">
        <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm">
          In Transit
        </button>
        <button className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm">
          Delivered
        </button>
        <button className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md text-sm">
          Pending
        </button>
        <button className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm ml-auto">
          Clear Filter
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-3 text-left">Order ID</th>
              <th className="py-3 text-left">Destination</th>
              <th className="py-3 text-left">Status</th>
              <th className="py-3 text-left">Driver</th>
              <th className="py-3 text-left">Est. Delivery</th>
              <th className="py-3 text-left">Priority</th>
              <th className="py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery.id} className="border-b hover:bg-gray-50">
                <td className="py-4">{delivery.orderId}</td>
                <td className="py-4">{delivery.destination}</td>
                <td className="py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      delivery.status === 'In Transit'
                        ? 'bg-blue-100 text-blue-800'
                        : delivery.status === 'Delivered'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {delivery.status}
                  </span>
                </td>
                <td className="py-4">{delivery.driver}</td>
                <td className="py-4">{delivery.estimatedDelivery}</td>
                <td className="py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      delivery.priority === 'High'
                        ? 'bg-red-100 text-red-800'
                        : delivery.priority === 'Medium'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {delivery.priority}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex space-x-2">
                    <button className="p-1 rounded-md hover:bg-gray-100">
                      <PencilIcon size={16} className="text-gray-600" />
                    </button>
                    <button className="p-1 rounded-md hover:bg-gray-100">
                      <TrashIcon size={16} className="text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <nav className="flex items-center">
          <button className="p-2 border rounded-md mr-2">&lt;</button>
          <button className="p-2 border rounded-md bg-blue-600 text-white">1</button>
          <button className="p-2 border rounded-md ml-2">&gt;</button>
        </nav>
      </div>
    </div>
  );
};

export default DeliveriesManagement;
