import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapPinIcon, TruckIcon } from 'lucide-react';
import LocationMap from './LocationMap';

const DeliveryForm = () => {
  const navigate = useNavigate();

  const { orderId: urlOrderId } = useParams(); // <-- fetch orderId from URL params

  // Assume userId is stored in localStorage (or replace with your logic to fetch userId)
  const userId = localStorage.getItem('userId') || '680b51cc9304025f19b2d7d1'; // Example userId
  const hardcodedOrderId = '680cd676039274757403e31c'; // <-- for now

  const [formData, setFormData] = useState({
    userId: userId, // Include userId in the form data
    orderId: urlOrderId || hardcodedOrderId, // <-- if URL param exists, use it; else fallback to hardcoded
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5080/api/deliveries', {
        method: 'POST', // Specifies that this is a POST request
        headers: {
          'Content-Type': 'application/json', // Indicates the request body is JSON
        },
        body: JSON.stringify(formData), // Converts the form data to a JSON string
      });

      if (response.ok) {
        const data = await response.json();
        navigate(`/tracking/${data._id}`); // Redirect to the tracking page with the delivery ID
      } else {
        console.error('Failed to create delivery request');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
              value={formData.userId}
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