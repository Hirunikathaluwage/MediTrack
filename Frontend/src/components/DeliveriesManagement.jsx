import React, { useState, useEffect } from 'react';
import { TrashIcon } from 'lucide-react';

const DeliveriesManagement = ({ onViewDelivery = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deliveries, setDeliveries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await fetch("http://localhost:5080/api/deliveries");
        if (!response.ok) {
          throw new Error("Failed to fetch deliveries");
        }
        const deliveriesData = await response.json();

        const deliveriesWithBranch = await Promise.all(
          deliveriesData.map(async (delivery) => {
            try {
              if (!delivery.orderId) {
                console.error('No orderId for delivery', delivery._id);
                return { ...delivery, branch: 'N/A' };
              }

              // Step 1: Fetch Order Details
              const orderResponse = await fetch(`http://localhost:5080/api/orders/by-order/${delivery.orderId}`);
              if (!orderResponse.ok) {
                console.error('Order not found for orderId:', delivery.orderId);
                return { ...delivery, branch: 'N/A' };
              }
              const orderData = await orderResponse.json();

              if (!orderData.branchId) {
                console.error('No branchId found in order:', delivery.orderId);
                return { ...delivery, branch: 'N/A' };
              }

              // Step 2: Fetch Branch Details
              const branchResponse = await fetch(`http://localhost:5080/api/branches/${orderData.branchId}`);
              if (!branchResponse.ok) {
                console.error('Branch not found for branchId:', orderData.branchId);
                return { ...delivery, branch: 'N/A' };
              }
              const branchData = await branchResponse.json();

              return {
                ...delivery,
                branch: branchData.branchName || 'N/A',
              };
            } catch (error) {
              console.error('Error fetching branch info for delivery:', error);
              return { ...delivery, branch: 'N/A' };
            }
          })
        );

        setDeliveries(deliveriesWithBranch);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
        setError(error.message);
      }
    };

    fetchDeliveries();
  }, []);

  const handleDeleteDelivery = async (deliveryId) => {
    if (!window.confirm('Are you sure you want to delete this delivery?')) return;
    try {
      const response = await fetch(`http://localhost:5080/api/deliveries/${deliveryId}`, { method: 'DELETE' });
      if (response.ok) {
        setDeliveries(prev => prev.filter(d => d._id !== deliveryId));
        console.log('Delivery deleted successfully');
      } else {
        console.error('Failed to delete delivery');
      }
    } catch (error) {
      console.error('Error deleting delivery:', error);
    }
  };

  const filteredDeliveries = deliveries.filter(
    (d) =>
      (d.orderId?.toString().toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (d.receiverName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (d.location?.address?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (d.branch?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Manage Deliveries</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search deliveries..."
          className="w-full p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Receiver Name</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Destination</th>
              <th className="px-4 py-2">Branch</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Driver</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredDeliveries.map((delivery) => (
              <tr
                key={delivery._id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onViewDelivery(delivery)}
              >
                <td className="px-4 py-2">{delivery.orderId || 'N/A'}</td>
                <td className="px-4 py-2">{delivery.receiverName || 'N/A'}</td>
                <td className="px-4 py-2">{delivery.contact || 'N/A'}</td>
                <td className="px-4 py-2">{delivery.location?.address || 'N/A'}</td>
                <td className="px-4 py-2">{delivery.branch || 'N/A'}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      delivery.status === 'delivered'
                        ? 'bg-green-100 text-green-700'
                        : delivery.status === 'in transit'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {delivery.status || 'N/A'}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {delivery.driver ? delivery.driver : <span className="text-gray-500 italic">Not Assigned</span>}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteDelivery(delivery._id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveriesManagement;
