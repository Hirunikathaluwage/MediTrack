import React, { useState } from 'react';
import { Table} from 'antd';

const Profit = () => {
  // Initial sample data for the table
  const [dataSource, setDataSource] = useState([
    { key: '1', branch: 'Branch 1', revenue: 12000, cost: 7000, profit: 5000 },
    { key: '2', branch: 'Branch 2', revenue: 9000, cost: 6000, profit: 3000 },
    { key: '3', branch: 'Branch 3', revenue: 15000, cost: 8000, profit: 7000 },
  ]);

  // Columns configuration for the table
  const columns = [
    { title: 'Branch', dataIndex: 'branch', key: 'branch', className: 'font-semibold text-gray-700' },
    { title: 'Total Revenue ($)', dataIndex: 'revenue', key: 'revenue', className: 'text-green-600' },
    { title: 'Total Cost ($)', dataIndex: 'cost', key: 'cost', className: 'text-red-500' },
    { title: 'Profit ($)', dataIndex: 'profit', key: 'profit', className: 'font-bold text-blue-600' },
  ];

  // Function to simulate completing an order and adding it to the dataSource
  const completeOrder = () => {
    const newOrder = {
      key: String(dataSource.length + 1),
      branch: `Branch ${dataSource.length + 1}`,
      revenue: Math.floor(Math.random() * 20000) + 5000,
      cost: Math.floor(Math.random() * 10000) + 2000,
      profit: Math.floor(Math.random() * 10000) + 1000,
    };

    setDataSource([...dataSource, newOrder]); // Adding new order data to the table
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-screen-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Branch-wise Profit Report</h2>
      <Table 
        dataSource={dataSource} 
        columns={columns} 
        pagination={false} 
        className="rounded-lg w-full"
      />
    
    </div>
  );
};

export default Profit;
