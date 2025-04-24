import React from 'react';
const AddDriver = () => {
  return <div className="bg-white rounded-md shadow-sm p-6">
      <h2 className="text-2xl font-medium mb-6">Add New Driver</h2>
      <form>
        <div className="grid grid-cols-1 md-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              First Name
            </label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded-md" placeholder="Enter first name" />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded-md" placeholder="Enter last name" />
          </div>
        </div>
        <div className="grid grid-cols-1 md-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input type="email" className="w-full p-3 border border-gray-300 rounded-md" placeholder="Enter email address" />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input type="tel" className="w-full p-3 border border-gray-300 rounded-md" placeholder="Enter phone number" />
          </div>
        </div>
        <div className="grid grid-cols-1 md-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Driver License Number
            </label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded-md" placeholder="Enter license number" />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Vehicle Registration
            </label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded-md" placeholder="Enter vehicle registration" />
          </div>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Assigned Zone
          </label>
          <select className="w-full p-3 border border-gray-300 rounded-md">
            <option value="">Select zone</option>
            <option value="central">Central District</option>
            <option value="north">Northern District</option>
            <option value="east">Eastern District</option>
            <option value="west">Western District</option>
            <option value="south">Southern District</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Upload Driver Photo
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG or JPEG (MAX. 2MB)
                </p>
              </div>
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button type="button" className="px-6 py-2 border border-gray-300 rounded-md hover-gray-50">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover-blue-700">
            Add Driver
          </button>
        </div>
      </form>
    </div>;
};
export default AddDriver;