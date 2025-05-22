import React, { useState, useEffect } from 'react';
import { StarIcon } from 'lucide-react';

const Ratings = () => {
  const [feedbackTags, setFeedbackTags] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState(null);

  // Fetch ratings and performance data
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch('http://localhost:5080/api/ratings/performance');
        if (!response.ok) {
          throw new Error('Failed to fetch ratings');
        }
        const data = await response.json();

        // Extract feedback tags and driver performance
        const tags = new Set();
        data.forEach((driver) => {
          driver.topTags.forEach((tag) => tags.add(tag));
        });

        setFeedbackTags(Array.from(tags));
        setDrivers(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchRatings();
  }, []);

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Driver Ratings</h2>

      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">Most Common Feedback</h3>
        <div className="flex flex-wrap gap-2">
          {feedbackTags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Driver Performance</h3>
        <div className="space-y-6">
          {drivers.map((driver) => (
            <div
              key={driver._id}
              className="p-4 border border-gray-200 rounded-md shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-md font-semibold">{driver._id}</h4>
                <span className="text-sm text-gray-500">
                  {driver.totalDeliveries} deliveries
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Overall:</p>
                  <p className="font-medium text-gray-800">{driver.overallRating.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Driver Rating:</p>
                  <p className="font-medium text-gray-800">{driver.driverRating.toFixed(1)}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Top Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {driver.topTags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ratings;