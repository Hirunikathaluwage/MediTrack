import React from 'react';
import {
  ArrowLeftIcon,
  TruckIcon,
  PackageIcon,
  MapPinIcon,
  PhoneIcon,
  BuildingIcon
} from 'lucide-react';

const DeliveryDetails = ({ delivery, onBack, onAssignDriver }) => {
  if (!delivery) return null;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon size={20} className="mr-2" />
          Back
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Delivery Details</h2>

      {/* Delivery Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">Delivery Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="text-base font-medium text-gray-900">{delivery.orderId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="text-base font-medium text-gray-900">{delivery.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Driver</p>
              <p className="text-base font-medium text-gray-900">
                {delivery.driver ? delivery.driver : <span className="italic text-gray-500">Not Assigned</span>}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Branch</p>
              <p className="text-base font-medium text-gray-900">{delivery.branch}</p>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">Order Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Customer Name</p>
              <p className="text-base font-medium text-gray-900">{delivery.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Contact</p>
              <p className="text-base font-medium text-gray-900">{delivery.contact}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Destination</p>
              <p className="text-base font-medium text-gray-900">{delivery.destination}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={onAssignDriver}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {delivery.driver ? 'Reassign Driver' : 'Assign Driver'}
        </button>
      </div>
    </div>
  );
};

export default DeliveryDetails;
