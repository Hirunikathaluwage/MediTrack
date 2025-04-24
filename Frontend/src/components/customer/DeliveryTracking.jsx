import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  PackageIcon,
  TruckIcon,
  CheckCircleIcon,
  UserIcon,
  PhoneIcon,
  StarIcon,
  MapPinIcon,
  ClockIcon,
  CalendarIcon,
  BuildingIcon,
  InfoIcon,
} from 'lucide-react';

const DeliveryTracking = () => {
  const { deliveryId } = useParams();
  const navigate = useNavigate();
  const [deliveryStatus, setDeliveryStatus] = useState('in transit');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeliveryStatus('delivered');
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const deliveryData = {
    deliveryId: deliveryId || 'DEL1234',
    userId: 'USR12345',
    date: new Date().toLocaleDateString(),
    status: deliveryStatus,
    orderSummary: [
      { name: 'Smartphone', price: 299.99 },
      { name: 'Protective Case', price: 19.99 },
      { name: 'Screen Protector', price: 9.99 },
    ],
    branch: {
      name: 'Downtown Branch',
      address: '123 Main St, Downtown',
    },
    driver: {
      name: 'John Smith',
      contact: '555-123-4567',
      vehicleNo: 'ABC 123',
      rating: 4.8,
    },
  };

  const handleRateDelivery = () => {
    navigate(`/rating/${deliveryId}`);
  };

  const totalAmount = deliveryData.orderSummary.reduce((sum, item) => sum + item.price, 0);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'in transit':
        return 'bg-blue-500';
      case 'delivered':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <ClockIcon size={24} className="text-yellow-500" />;
      case 'in transit':
        return <TruckIcon size={24} className="text-blue-500" />;
      case 'delivered':
        return <CheckCircleIcon size={24} className="text-green-500" />;
      default:
        return <InfoIcon size={24} className="text-gray-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-2">
          <PackageIcon size={36} className="text-blue-600" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Delivery Tracking
        </h1>
        <p className="text-gray-600">Track your delivery in real-time</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Delivery #{deliveryData.deliveryId}
              </h2>
              <div className="flex items-center text-sm text-gray-600">
                <CalendarIcon size={16} className="mr-1" />
                <span>{deliveryData.date}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center">
                <span className="mr-2 text-sm">Status</span>
                <div className="flex items-center">
                  {getStatusIcon(deliveryData.status)}
                  <span className={`ml-2 text-sm font-medium px-3 py-1 rounded-full text-white ${getStatusColor(deliveryData.status)}`}>
                    {deliveryData.status.charAt(0).toUpperCase() + deliveryData.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center z-10">
                  <MapPinIcon size={16} className="text-white" />
                </div>
                <div className="absolute left-4 right-4 top-4 h-0.5 bg-gray-200" />
                <div className={`w-8 h-8 rounded-full ${deliveryStatus !== 'pending' ? 'bg-blue-500' : 'bg-gray-300'} flex items-center justify-center z-10`}>
                  <TruckIcon size={16} className="text-white" />
                </div>
                <div className="absolute left-4 right-4 top-4 h-0.5 bg-gray-200" />
                <div className={`w-8 h-8 rounded-full ${deliveryStatus === 'delivered' ? 'bg-green-500' : 'bg-gray-300'} flex items-center justify-center z-10`}>
                  <CheckCircleIcon size={16} className="text-white" />
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Order Placed</span>
                <span>In Transit</span>
                <span>Delivered</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
              <div className="bg-gray-50 rounded-md p-4">
                <ul className="divide-y divide-gray-200">
                  {deliveryData.orderSummary.map((item, index) => (
                    <li key={index} className="py-2 flex justify-between">
                      <span>{item.name}</span>
                      <span className="font-medium">${item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Branch Information</h3>
              <div className="bg-gray-50 rounded-md p-4 mb-4">
                <div className="flex items-start mb-2">
                  <BuildingIcon size={18} className="mr-2 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium">{deliveryData.branch.name}</p>
                    <p className="text-sm text-gray-600">{deliveryData.branch.address}</p>
                  </div>
                </div>
              </div>

              <h3 className="font-semibold text-gray-800 mb-3">Driver Information</h3>
              <div className="bg-gray-50 rounded-md p-4">
                <div className="flex items-center mb-2">
                  <UserIcon size={18} className="mr-2 text-blue-600" />
                  <span>{deliveryData.driver.name}</span>
                </div>
                <div className="flex items-center mb-2">
                  <PhoneIcon size={18} className="mr-2 text-blue-600" />
                  <span>{deliveryData.driver.contact}</span>
                </div>
                <div className="flex items-center mb-2">
                  <TruckIcon size={18} className="mr-2 text-blue-600" />
                  <span>Vehicle: {deliveryData.driver.vehicleNo}</span>
                </div>
                <div className="flex items-center">
                  <StarIcon size={18} className="mr-2 text-yellow-500" />
                  <span className="font-medium">{deliveryData.driver.rating}</span>
                  <span className="text-gray-500 text-sm ml-1">/ 5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {deliveryStatus === 'delivered' && (
          <div className="p-6 bg-gray-50">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="mb-4 sm:mb-0">
                <h3 className="font-semibold text-gray-800">Delivery Completed</h3>
                <p className="text-sm text-gray-600">
                  Thank you for using our delivery service!
                </p>
              </div>
              <button
                onClick={handleRateDelivery}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300 flex items-center"
              >
                <StarIcon size={18} className="mr-2" />
                Rate Your Delivery
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryTracking;
