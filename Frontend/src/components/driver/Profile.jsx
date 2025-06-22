import React, { useState } from 'react';
import {
  CameraIcon,
  StarIcon,
  TruckIcon,
  CalendarIcon,
  CheckCircleIcon,
} from 'lucide-react';
import { mockDriver } from '../driver/utils/mockData';

const Profile = () => {
  const [driver, setDriver] = useState(mockDriver);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: mockDriver.firstName,
    lastName: mockDriver.lastName,
    email: mockDriver.email,
    phone: mockDriver.phone,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDriver({
      ...driver,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
    });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg shadow overflow-hidden md:flex">
        <div className="md:w-1/3 p-6 bg-gray-50 border-r">
          <div className="text-center">
            <div className="relative inline-block">
              <img
                className="h-32 w-32 rounded-full object-cover border-4 border-white shadow"
                src={driver.profileImage}
                alt={`${driver.firstName} ${driver.lastName}`}
              />
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full shadow">
                <CameraIcon className="h-4 w-4" />
              </button>
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-900">
              {driver.firstName} {driver.lastName}
            </h2>
            <div className="mt-1 flex items-center justify-center">
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <span className="ml-1 text-gray-600">{driver.rating} Rating</span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="font-bold text-xl text-gray-800">
                  {driver.deliveriesCompleted}
                </div>
                <div className="text-xs text-gray-500">Deliveries</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="font-bold text-xl text-gray-800">
                  {new Date(driver.joinedDate).getFullYear()}
                </div>
                <div className="text-xs text-gray-500">Joined</div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
              Driver Information
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center text-sm">
                <TruckIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">Active Driver</span>
              </li>
              <li className="flex items-center text-sm">
                <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">
                  Joined{' '}
                  {new Date(driver.joinedDate).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </li>
              <li className="flex items-center text-sm">
                <CheckCircleIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">Background Check Verified</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="md:w-2/3 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Profile Details</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Edit Profile
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {['firstName', 'lastName', 'email', 'phone'].map((field) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                      name={field}
                      id={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Info label="First Name" value={driver.firstName} />
                <Info label="Last Name" value={driver.lastName} />
                <Info label="Email Address" value={driver.email} />
                <Info label="Phone Number" value={driver.phone} />
              </div>
              <div className="pt-6 border-t">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Vehicle Information
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Info label="Vehicle Number" value={driver.vehicleNumber} />
                  <Info label="Assigned Branch" value={driver.assignedBranch} />
                  <Info label="Driver ID" value={driver.driverId} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <h3 className="text-sm font-medium text-gray-500">{label}</h3>
    <p className="mt-1 text-sm text-gray-900">{value}</p>
  </div>
);

export default Profile;
