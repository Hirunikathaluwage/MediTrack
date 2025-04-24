import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircleIcon,
  XCircleIcon,
  SearchIcon,
  FilterIcon,
  ClockIcon,
} from 'lucide-react';
import { mockDeliveryHistory } from '../driver/utils/mockData';

const DeliveryHistory = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'delivered' | 'failed'

  useEffect(() => {
    setDeliveries(mockDeliveryHistory);
  }, []);

  const filteredDeliveries = deliveries
    .filter(
      (delivery) =>
        delivery.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((delivery) =>
      filterStatus === 'all' ? true : delivery.status === filterStatus
    );

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Delivery History</h2>
          <p className="text-sm text-gray-500">
            View and search your past deliveries
          </p>
        </div>

        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by customer, address, or ID"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center">
              <FilterIcon className="h-5 w-5 text-gray-400 mr-2" />
              <select
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="delivered">Delivered</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDeliveries.length > 0 ? (
                filteredDeliveries.map((delivery) => (
                  <tr key={delivery.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      <Link to={`/delivery/${delivery.id}`}>{delivery.id}</Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {delivery.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {delivery.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(delivery.scheduledTime).toLocaleDateString(
                        'en-US',
                        {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        }
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={delivery.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {delivery.items.reduce(
                        (acc, item) => acc + item.quantity,
                        0
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                      <ClockIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900">
                      No deliveries found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {searchTerm
                        ? 'No deliveries match your search criteria'
                        : "You haven't completed any deliveries yet"}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredDeliveries.length}</span> of{' '}
            <span className="font-medium">{deliveries.length}</span> deliveries
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  switch (status) {
    case 'delivered':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircleIcon className="h-4 w-4 mr-1" />
          Delivered
        </span>
      );
    case 'failed':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircleIcon className="h-4 w-4 mr-1" />
          Failed
        </span>
      );
    default:
      return null;
  }
};

export default DeliveryHistory;
