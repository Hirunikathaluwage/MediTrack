import React from 'react';
import { SearchIcon, FilterIcon } from 'lucide-react';

export function SearchFilters() {
  const recentOrders = [
    {
      id: '#ORD-5142',
      customer: 'Robert Wilson',
      date: '23 May 2023',
      status: 'Delivered',
      amount: '$120.00',
    },
    {
      id: '#ORD-5141',
      customer: 'Sarah Johnson',
      date: '23 May 2023',
      status: 'Processing',
      amount: '$75.50',
    },
    {
      id: '#ORD-5140',
      customer: 'Michael Brown',
      date: '22 May 2023',
      status: 'Delivered',
      amount: '$246.00',
    },
    {
      id: '#ORD-5139',
      customer: 'Emily Davis',
      date: '22 May 2023',
      status: 'Cancelled',
      amount: '$89.25',
    },
    {
      id: '#ORD-5138',
      customer: 'James Miller',
      date: '21 May 2023',
      status: 'Delivered',
      amount: '$132.75',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recent Orders</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            <SearchIcon size={20} />
            All Status
          </button>
          <button className="flex items-center gap-2 bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300">
            <FilterIcon size={20} />
            Filters
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600 bg-gray-100">
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, i) => (
              <tr key={i} className="border-b">
                <td className="p-3 font-medium">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.date}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'Processing'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3">{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
        <div>Showing 5 of 25 entries</div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded hover:bg-gray-100">Previous</button>
          <button className="px-3 py-1 border rounded bg-blue-600 text-white hover:bg-blue-700">1</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">2</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">3</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">Next</button>
        </div>
      </div>
    </div>
  );
}
