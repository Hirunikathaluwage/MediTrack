import React from 'react';

export function SalesChart() {
  // In a real application, you would use a charting library like Recharts
  // This is a simplified visual representation
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const salesData = [65, 59, 80, 81, 56, 70];
  const revenueData = [28, 48, 40, 19, 86, 27];
  const maxValue = Math.max(...salesData, ...revenueData);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Sales & Revenue Analysis</h2>

      <div className="flex justify-between text-sm font-semibold text-gray-500 mb-2">
        <span>Sales</span>
        <span>Revenue</span>
      </div>

      {/* Y-axis Labels */}
      <div className="flex flex-col justify-between h-40 text-gray-400 text-sm">
        <div>${maxValue}k</div>
        <div>${Math.floor(maxValue * 0.75)}k</div>
        <div>${Math.floor(maxValue * 0.5)}k</div>
        <div>${Math.floor(maxValue * 0.25)}k</div>
        <div>$0</div>
      </div>

      {/* Chart Bars */}
      <div className="grid grid-cols-6 gap-4 items-end h-40 mt-6">
        {months.map((month, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="flex flex-col-reverse h-32 w-8 relative">
              {/* Sales bar */}
              <div
                className="bg-blue-500 rounded-t"
                style={{ height: `${(salesData[i] / maxValue) * 100}%` }}
              ></div>
              {/* Revenue bar */}
              <div
                className="bg-green-400 rounded-t mt-1"
                style={{ height: `${(revenueData[i] / maxValue) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs mt-2">{month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
