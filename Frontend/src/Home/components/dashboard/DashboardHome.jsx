import React from 'react';

// 🆕 Import Header and Navigation
import Header from '../../components/Header';
import { Navigation } from '../../components/Navigation';

import { SalesChart } from './SalesChart';
import { RevenueMetrics } from './RevenueMetrics';
import { SearchFilters } from './SearchFilters';

export function DashboardHome() {
  const topProducts = [
    { name: 'Paracetamol 500mg', sales: 1200, percent: 15 },
    { name: 'Amoxicillin 250mg', sales: 950, percent: 12 },
    { name: 'Vitamin C 1000mg', sales: 870, percent: 10 },
    { name: 'Omeprazole 20mg', sales: 750, percent: 8 },
    { name: 'Metformin 500mg', sales: 620, percent: 7 },
  ];

  return (
    <section className="py-10 px-6">
      {/* 🆕 Added Header and Navigation at the top */}
      <Header />
      <Navigation />

      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-4">Dashboard Overview</h1>
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Last 7 days</button>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Last 30 days</button>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">This month</button>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">This year</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <SalesChart />
          <RevenueMetrics />
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Top Selling Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topProducts.map((product, i) => (
              <div key={i} className="bg-white shadow-md rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 mt-2">{product.sales} units sold</p>
                <p className="text-green-500 font-medium">{product.percent}% growth</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <SearchFilters />
        </div>
      </div>
    </section>
  );
}
