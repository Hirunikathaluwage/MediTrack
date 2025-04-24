import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPinIcon,
  PhoneIcon,
  PackageIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  TruckIcon,
  XCircleIcon
} from 'lucide-react';
import { mockDeliveries } from "../driver/utils/mockData";
import DeliveryMap from '../driver/map/DeliveryMap';

const DeliveryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundDelivery = mockDeliveries.find(d => d.id === id) || null;
    setDelivery(foundDelivery);
    setLoading(false);
  }, [id]);

  const handleStatusUpdate = (newStatus) => {
    if (!delivery) return;
    setDelivery({ ...delivery, status: newStatus });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!delivery) {
    return (
      <div className="text-center p-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <AlertCircleIcon className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">
          Delivery not found
        </h3>
        <p className="mt-2 text-gray-500">
          The delivery you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 sm:p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Delivery #{delivery.id}
              </h2>
              <p className="text-sm text-gray-500">
                Scheduled for{' '}
                {new Date(delivery.scheduledTime).toLocaleString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <StatusBadge status={delivery.status} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-6">
          <div>
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                Customer Information
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-900">{delivery.customerName}</p>
                <div className="mt-2 flex items-start">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                  <p className="text-gray-600">{delivery.address}</p>
                </div>
                <div className="mt-2 flex items-center">
                  <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                Package Details
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="divide-y divide-gray-200">
                  {delivery.items.map((item) => (
                    <li key={item.id} className="py-3 flex justify-between">
                      <div className="flex items-center">
                        <PackageIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-gray-900">{item.name}</span>
                      </div>
                      <span className="text-gray-500">x{item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 pt-3 border-t">
                  <div className="flex justify-between">
                    <span className="font-medium">Total Items</span>
                    <span className="font-medium">
                      {delivery.items.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
              Delivery Route
            </h3>
            <div className="bg-gray-50 rounded-lg overflow-hidden h-64 md:h-80">
              <DeliveryMap delivery={delivery} />
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                Update Status
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleStatusUpdate('in_progress')}
                    disabled={delivery.status === 'in_progress'}
                    className={`flex items-center justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium ${
                      delivery.status === 'in_progress'
                        ? 'bg-yellow-100 text-yellow-800 border-yellow-200 cursor-not-allowed'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <TruckIcon className="h-5 w-5 mr-2" />
                    In Progress
                  </button>

                  <button
                    onClick={() => handleStatusUpdate('delivered')}
                    disabled={delivery.status === 'delivered'}
                    className={`flex items-center justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium ${
                      delivery.status === 'delivered'
                        ? 'bg-green-100 text-green-800 border-green-200 cursor-not-allowed'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    Delivered
                  </button>

                  <button
                    onClick={() => handleStatusUpdate('failed')}
                    disabled={delivery.status === 'failed'}
                    className={`col-span-2 flex items-center justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium ${
                      delivery.status === 'failed'
                        ? 'bg-red-100 text-red-800 border-red-200 cursor-not-allowed'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <XCircleIcon className="h-5 w-5 mr-2" />
                    Failed Delivery
                  </button>
                </div>

                {delivery.status === 'delivered' && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-100 rounded-md">
                    <div className="flex">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      <p className="text-sm text-green-700">
                        Delivery completed successfully!
                      </p>
                    </div>
                  </div>
                )}

                {delivery.status === 'failed' && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-md">
                    <div className="flex">
                      <AlertCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                      <p className="text-sm text-red-700">
                        Delivery marked as failed. Please add a note explaining why.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
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

export default DeliveryDetails;
