import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPinIcon,
  PhoneIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  TruckIcon,
  XCircleIcon,
} from 'lucide-react';
import DeliveryMap from '../driver/map/DeliveryMap';

const DeliveryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        const response = await fetch(`http://localhost:5080/api/deliveries/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch delivery');
        }
        const data = await response.json();
        setDelivery(data);
      } catch (error) {
        console.error('Error fetching delivery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDelivery();
  }, [id]);

  const handleStatusUpdate = async (newStatus) => {
    if (!delivery) return;
    try {
      const response = await fetch(`http://localhost:5080/api/deliveries/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      const updatedDelivery = await response.json();
      setDelivery(updatedDelivery);
    } catch (error) {
      console.error('Error updating delivery status:', error);
    }
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
        <h3 className="text-lg font-medium text-gray-900">Delivery not found</h3>
        <p className="mt-2 text-gray-500">The delivery you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go Back
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
                Delivery #{delivery.orderId || delivery._id}
              </h2>
              <p className="text-sm text-gray-500">
                Scheduled for {delivery.createdAt
                  ? new Date(delivery.createdAt).toLocaleString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })
                  : 'N/A'}
              </p>
            </div>
            <StatusBadge status={delivery.status} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase mb-3">
              Customer Information
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium text-gray-900">{delivery.receiverName || 'N/A'}</p>
              <div className="mt-2 flex items-start">
                <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                <p className="text-gray-600">{delivery.location?.address || 'N/A'}</p>
              </div>
              <div className="mt-2 flex items-center">
                <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                <p className="text-gray-600">{delivery.contact || 'N/A'}</p>
              </div>
            </div>

            <h3 className="text-sm font-medium text-gray-500 uppercase mt-6 mb-3">
              Delivery Status
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <StatusButton
                status="in transit"
                current={delivery.status}
                onClick={() => handleStatusUpdate('in transit')}
                label="In Transit"
                icon={TruckIcon}
              />
              <StatusButton
                status="delivered"
                current={delivery.status}
                onClick={() => handleStatusUpdate('delivered')}
                label="Delivered"
                icon={CheckCircleIcon}
              />
              <StatusButton
                status="failed"
                current={delivery.status}
                onClick={() => handleStatusUpdate('failed')}
                label="Failed"
                icon={XCircleIcon}
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase mb-3">Delivery Route</h3>
            <div className="bg-gray-50 rounded-lg overflow-hidden h-64 md:h-80">
              <DeliveryMap delivery={delivery} />
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
      return <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">Pending</span>;
    case 'in transit':
      return <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">In Transit</span>;
    case 'delivered':
      return <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">Delivered</span>;
    case 'failed':
      return <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">Failed</span>;
    default:
      return null;
  }
};

const StatusButton = ({ status, current, onClick, label, icon: Icon }) => (
  <button
    onClick={onClick}
    disabled={current === status}
    className={`flex items-center justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium ${
      current === status
        ? 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed'
        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
    }`}
  >
    <Icon className="h-5 w-5 mr-2" />
    {label}
  </button>
);

export default DeliveryDetails;
