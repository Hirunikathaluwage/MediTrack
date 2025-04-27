import React from 'react';
import { TrendingUpIcon, TrendingDownIcon, DollarSignIcon, ShoppingBagIcon, UserPlusIcon, ClipboardCheckIcon } from 'lucide-react';

export function RevenueMetrics() {
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$24,567',
      change: '+12.5%',
      isPositive: true,
      icon: <DollarSignIcon size={28} />,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Total Orders',
      value: '1,243',
      change: '+8.2%',
      isPositive: true,
      icon: <ShoppingBagIcon size={28} />,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'New Patients',
      value: '458',
      change: '+5.7%',
      isPositive: true,
      icon: <UserPlusIcon size={28} />,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      title: 'Prescriptions',
      value: '872',
      change: '-3.2%',
      isPositive: false,
      icon: <ClipboardCheckIcon size={28} />,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {metrics.map((metric, i) => (
        <div key={i} className={`p-6 rounded-lg shadow-md ${metric.bgColor} flex items-center`}>
          <div className={`p-3 rounded-full ${metric.textColor} bg-white mr-4`}>
            {metric.icon}
          </div>
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold">{metric.title}</h4>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center text-sm mt-1">
              {metric.isPositive ? (
                <TrendingUpIcon size={16} className="text-green-500 mr-1" />
              ) : (
                <TrendingDownIcon size={16} className="text-red-500 mr-1" />
              )}
              <span className={metric.isPositive ? 'text-green-500' : 'text-red-500'}>
                {metric.change}
              </span>
              <span className="ml-2 text-gray-500">vs last month</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
