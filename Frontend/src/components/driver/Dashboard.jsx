import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircleIcon,
  AlertCircleIcon,
  TruckIcon,
  ClockIcon,
} from 'lucide-react';
import { mockDeliveries } from '../driver/utils/mockData';

const Dashboard = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // 'pending' | 'in_progress' | 'all'

  useEffect(() => {
    setDeliveries(mockDeliveries);
  }, []);

  const filteredDeliveries =
    activeTab === 'all'
      ? deliveries.filter(
          (d) => d.status === 'pending' || d.status === 'in_progress'
        )
      : deliveries.filter((d) => d.status === activeTab);

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Today's Deliveries</h2>
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          <SummaryCard
            color="blue"
            icon={<ClockIcon className="h-6 w-6 text-blue-600" />}
            label="Pending"
            count={deliveries.filter((d) => d.status === 'pending').length}
          />
          <SummaryCard
            color="yellow"
            icon={<TruckIcon className="h-6 w-6 text-yellow-600" />}
            label="In Progress"
            count={deliveries.filter((d) => d.status === 'in_progress').length}
          />
          <SummaryCard
            color="green"
            icon={<CheckCircleIcon className="h-6 w-6 text-green-600" />}
            label="Completed Today"
            count={deliveries.filter((d) => d.status === 'delivered').length}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex">
            {['all', 'pending', 'in_progress'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'all' ? 'All Active' : tab.replace('_', ' ').replace(/^\w/, c => c.toUpperCase())}
              </button>
            ))}
          </nav>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredDeliveries.length > 0 ? (
            filteredDeliveries.map((delivery) => (
              <Link
                key={delivery.id}
                to={`/delivery/${delivery.id}`}
                className="block hover:bg-gray-50"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium">
                        {delivery.customerName}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {delivery.address}
                      </p>
                    </div>
                    <StatusBadge status={delivery.status} />
                  </div>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {new Date(delivery.scheduledTime).toLocaleTimeString(
                      'en-US',
                      {
                        hour: 'numeric',
                        minute: '2-digit',
                      }
                    )}
                    <span className="mx-1">•</span>
                    {delivery.items.reduce((acc, item) => acc + item.quantity, 0)}{' '}
                    items
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100">
                <AlertCircleIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No deliveries found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                There are no {activeTab === 'all' ? 'active' : activeTab} deliveries at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ color, icon, label, count }) => (
  <div className={`bg-${color}-50 p-4 rounded-lg flex items-center`}>
    <div className={`bg-${color}-100 p-3 rounded-full mr-4`}>{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{count}</h3>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  switch (status) {
    case 'pending':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Pending
        </span>
      );
    case 'in_progress':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          In Progress
        </span>
      );
    case 'delivered':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Delivered
        </span>
      );
    case 'failed':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Failed
        </span>
      );
    default:
      return null;
  }
};

export default Dashboard;
