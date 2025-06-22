import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircleIcon, AlertCircleIcon, TruckIcon, ClockIcon } from 'lucide-react';

const Dashboard = () => {
  const { id: driverId } = useParams(); // 📌 capture :id from URL
  const [deliveries, setDeliveries] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchDriverDeliveries = async () => {
      try {
        const response = await fetch(`http://localhost:5080/api/deliveries`);
        if (!response.ok) {
          throw new Error('Failed to fetch deliveries');
        }
        const allDeliveries = await response.json();

        const driverDeliveries = allDeliveries.filter((d) => {
          const assignedId = typeof d.driverId === 'string' ? d.driverId : d.driverId?._id;
          return assignedId === driverId;
        });

        setDeliveries(driverDeliveries);
      } catch (error) {
        console.error('Error fetching driver deliveries:', error);
      }
    };

    fetchDriverDeliveries();
  }, [driverId]);

  const filteredDeliveries =
    activeTab === 'all'
      ? deliveries.filter((d) => d.status === 'pending' || d.status === 'in transit')
      : deliveries.filter((d) => d.status === activeTab);

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Your Assigned Deliveries</h2>
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
            label="In Transit"
            count={deliveries.filter((d) => d.status === 'in transit').length}
          />
          <SummaryCard
            color="green"
            icon={<CheckCircleIcon className="h-6 w-6 text-green-600" />}
            label="Delivered"
            count={deliveries.filter((d) => d.status === 'delivered').length}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex">
            {['all', 'pending', 'in transit'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'all'
                  ? 'All Active'
                  : tab.replace('_', ' ').replace(/^\w/, (c) => c.toUpperCase())}
              </button>
            ))}
          </nav>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredDeliveries.length > 0 ? (
            filteredDeliveries.map((delivery) => (
              <Link
                key={delivery._id}
                to={`/driver/delivery/${delivery._id}`}
                className="block hover:bg-gray-50"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium">{delivery.receiverName}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {delivery.location?.address}
                      </p>
                    </div>
                    <StatusBadge status={delivery.status} />
                  </div>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {delivery.createdAt
                      ? new Date(delivery.createdAt).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                        })
                      : 'N/A'}
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
                There are no {activeTab === 'all' ? 'active' : activeTab} deliveries assigned.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ color, icon, label, count }) => {
  const bgColors = {
    blue: 'bg-blue-50',
    yellow: 'bg-yellow-50',
    green: 'bg-green-50',
  };

  const iconBgColors = {
    blue: 'bg-blue-100',
    yellow: 'bg-yellow-100',
    green: 'bg-green-100',
  };

  return (
    <div className={`${bgColors[color]} p-4 rounded-lg flex items-center`}>
      <div className={`${iconBgColors[color]} p-3 rounded-full mr-4`}>{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{count}</h3>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  switch (status) {
    case 'pending':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Pending
        </span>
      );
    case 'in transit':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          In Transit
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
