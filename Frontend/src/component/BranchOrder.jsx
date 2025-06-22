import React, { useEffect, useState } from 'react';
import { Card, Button, Spin, message } from 'antd';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const BranchOrder = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5080/api/reports/branch-orders');
        const { labels, orders } = res.data;
        setChartData({
          labels,
          datasets: [{ label: 'Branch Orders', data: orders, backgroundColor: ['#8e44ad', '#3498db', '#e67e22', '#e74c3c'] }],
        });
      } catch (err) {
        console.error(err);
        message.error('Failed to load branch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const downloadReport = () => {
    if (!chartData) return;
    const csvContent = 'data:text/csv;charset=utf-8,' +
      ['Branch,Orders', ...chartData.labels.map((label, idx) => `${label},${chartData.datasets[0].data[idx]}`)].join('\n');
    const link = document.createElement('a');
    const today = new Date().toISOString().split('T')[0];
    link.href = encodeURI(csvContent);
    link.download = `branch_orders_${today}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card
      title="Branch Orders"
      extra={<Button size="small" onClick={downloadReport} disabled={!chartData}>Download</Button>}
      style={{ height: '100%', padding: '8px' }}
    >
      {loading ? (
        <Spin size="small" />
      ) : chartData ? (
        <Pie data={chartData} options={{ maintainAspectRatio: false }} height={200} />
      ) : 'No data'}
    </Card>
  );
};

export default BranchOrder;
