import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, HomeIcon } from 'lucide-react';
const ThankYouPage = () => {
  return <div className="max-w-2xl mx-auto p-4 md-8 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="bg-white rounded-lg shadow-md p-8 text-center w-full">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircleIcon size={36} className="text-green-600" />
          </div>
        </div>
        <h1 className="text-2xl md-3xl font-bold text-gray-800 mb-4">
          Thank You for Your Feedback!
        </h1>
        <p className="text-gray-600 mb-8">
          Your rating and comments help us improve our delivery service. We
          appreciate you taking the time to share your experience.
        </p>
        <div className="flex justify-center">
          <Link to="/" className="bg-blue-600 hover-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300 flex items-center">
            <HomeIcon size={18} className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>;
};
export default ThankYouPage;