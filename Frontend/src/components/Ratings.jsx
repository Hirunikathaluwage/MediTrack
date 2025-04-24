import React from 'react';
import { StarIcon, TrendingUpIcon, TrendingDownIcon } from 'lucide-react';

const Ratings = () => {
  const drivers = [
    {
      id: 1,
      name: 'John Doe',
      rating: 8,
      totalDeliveries: 123,
      onTimePercentage: 97,
      trend: 'up',
      reviews: 45,
    },
    {
      id: 2,
      name: 'Sarah Smith',
      rating: 5,
      totalDeliveries: 110,
      onTimePercentage: 88,
      trend: 'stable',
      reviews: 30,
    },
    {
      id: 3,
      name: 'Mike Johnson',
      rating: 9,
      totalDeliveries: 200,
      onTimePercentage: 99,
      trend: 'up',
      reviews: 67,
    },
    {
      id: 4,
      name: 'Lisa Brown',
      rating: 2,
      totalDeliveries: 76,
      onTimePercentage: 70,
      trend: 'down',
      reviews: 12,
    },
  ];

  return (
    <div className="bg-white rounded-md shadow-sm p-6">
      <h2 className="text-2xl font-medium mb-6">Driver Ratings</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-700 mb-2">Average Rating</h3>
          <div className="flex items-center">
            <span className="text-3xl font-bold">4.6</span>
            <div className="flex ml-2">
              {[1, 2, 3, 4].map((i) => (
                <StarIcon key={i} size={18} className="text-yellow-500 fill-yellow-500" />
              ))}
              <StarIcon size={18} className="text-yellow-500 fill-yellow-500 opacity-50" />
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-700 mb-2">On-Time Deliveries</h3>
          <div className="text-3xl font-bold">95%</div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-purple-700 mb-2">Total Reviews</h3>
          <div className="text-3xl font-bold">576</div>
        </div>
      </div>

      <h3 className="text-lg font-medium mb-4">Driver Performance</h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-3 text-left">Driver</th>
              <th className="py-3 text-left">Rating</th>
              <th className="py-3 text-left">Total Deliveries</th>
              <th className="py-3 text-left">On-Time</th>
              <th className="py-3 text-left">Trend</th>
              <th className="py-3 text-left">Reviews</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id} className="border-b hover:bg-gray-50">
                <td className="py-4 font-medium">{driver.name}</td>
                <td className="py-4">
                  <div className="flex items-center">
                    <span className="mr-1">{driver.rating}</span>
                    <div className="flex">
                      {Array.from({ length: Math.floor(driver.rating) }).map((_, i) => (
                        <StarIcon key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                      ))}
                      {driver.rating % 1 > 0 && (
                        <StarIcon size={16} className="text-yellow-500 fill-yellow-500 opacity-50" />
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4">{driver.totalDeliveries}</td>
                <td className="py-4">{driver.onTimePercentage}%</td>
                <td className="py-4">
                  {driver.trend === 'up' && <TrendingUpIcon size={18} className="text-green-600" />}
                  {driver.trend === 'down' && <TrendingDownIcon size={18} className="text-red-600" />}
                  {driver.trend === 'stable' && <span className="text-gray-500">—</span>}
                </td>
                <td className="py-4">
                  <button className="text-blue-600 hover:underline">
                    View {driver.reviews}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ratings;
