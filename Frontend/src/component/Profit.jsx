import React, { useState } from 'react';
import { Card, Table } from 'antd';

const Profit = () => {
  const [dataSource, setDataSource] = useState([
    { key: '1', branch: 'Branch 1', revenue: 12000, cost: 7000, profit: 5000 },
    { key: '2', branch: 'Branch 2', revenue: 9000, cost: 6000, profit: 3000 },
    { key: '3', branch: 'Branch 3', revenue: 15000, cost: 8000, profit: 7000 },
  ]);

  const columns = [
    { title: 'Branch', dataIndex: 'branch', key: 'branch' },
    { title: 'Total Revenue ($)', dataIndex: 'revenue', key: 'revenue' },
    { title: 'Total Cost ($)', dataIndex: 'cost', key: 'cost' },
    { title: 'Profit ($)', dataIndex: 'profit', key: 'profit' },
  ];

  return (
    <Card title="Branch-wise Profit Report" style={{ marginBottom: 24 }}>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </Card>
  );
};

export default Profit;
