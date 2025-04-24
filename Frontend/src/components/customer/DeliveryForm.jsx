import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon, TruckIcon } from 'lucide-react';
import LocationMap from './LocationMap';

const DeliveryForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    receiverName: '',
    contact: '',
    location: {
      lat: null,
      lng: null,
      address: '',
    },
    landmarks: '',
  });

  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setFormData((prevData) => ({
      ...prevData,
      location,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mockDeliveryId = 'DEL' + Math.floor(Math.random() * 10000);
    navigate(`/tracking/${mockDeliveryId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-2">
          <TruckIcon size={36} className="text-blue-600" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          New Delivery Request
        </h1>
        <p className="text-gray-600">Please enter the delivery details below</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <label
                htmlFor="userId"
                className="block text-sm font-medium text-gray-700"
              >
                User ID
              </label>
              <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                Auto-assigned
              </span>
            </div>
            <input
              type="text"
              id="userId"
              className="bg-gray-100 cursor-not-allowed border border-gray-300 text-gray-500 p-2 w-full rounded-md"
              value="USR12345"
              disabled
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="receiverName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Receiver's Name
            </label>
            <input
              type="text"
              id="receiverName"
              name="receiverName"
              value={formData.receiverName}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center">
                <MapPinIcon size={16} className="mr-1 text-blue-600" />
                <span>Delivery Location</span>
              </div>
            </label>
            <div className="border border-gray-300 rounded-md overflow-hidden">
              <LocationMap onLocationSelect={handleLocationSelect} />
            </div>
            {selectedLocation && (
              <div className="mt-2 p-2 bg-blue-50 border border-blue-100 rounded-md text-sm">
                <p className="font-medium">Selected location</p>
                <p className="text-gray-700">{selectedLocation.address}</p>
              </div>
            )}
          </div>

          <div className="mb-8">
            <label
              htmlFor="landmarks"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Landmarks (Optional)
            </label>
            <textarea
              id="landmarks"
              name="landmarks"
              value={formData.landmarks}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full rounded-md focus:ring-blue-500"
              rows={3}
              placeholder="E.g., Blue gate, near the grocery store"
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300 flex items-center"
            >
              <TruckIcon size={18} className="mr-2" />
              Submit Delivery Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryForm;
