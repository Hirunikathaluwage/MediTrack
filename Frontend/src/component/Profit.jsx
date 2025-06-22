import React, { useEffect, useState } from 'react';
import { Card, Table, Spin, message } from 'antd';
import axios from 'axios';

const Profit = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { title: 'Branch', dataIndex: 'branch', key: 'branch' },
    { title: 'Revenue', dataIndex: 'revenue', key: 'revenue' },
    { title: 'Cost', dataIndex: 'cost', key: 'cost' },
    { title: 'Profit', dataIndex: 'profit', key: 'profit' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5080/api/reports/profit');
        setDataSource(res.data.map((item, idx) => ({ ...item, key: idx })));
      } catch (err) {
        console.error(err);
        message.error('Failed to load profit report');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Card title="Branch Profit" style={{ height: '100%', padding: '8px' }}>
      {loading ? (
        <Spin size="small" />
      ) : (
        <Table dataSource={dataSource} columns={columns} size="small" pagination={false} />
      )}
    </Card>
  );
};

export default Profit;
