import React, { useEffect, useState } from 'react';
import { Card, Button, Spin, message } from 'antd';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const TopMedicine = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5080/api/reports/top-medicines');
        const { labels, sales } = res.data;
        setChartData({
          labels,
          datasets: [{ label: 'Top Medicines', data: sales, backgroundColor: 'rgba(75,192,192,0.6)' }],
        });
      } catch (err) {
        console.error(err);
        message.error('Failed to load top medicines');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const downloadReport = () => {
    if (!chartData) return;
    const csvContent = 'data:text/csv;charset=utf-8,' +
      ['Medicine,Sales', ...chartData.labels.map((label, idx) => `${label},${chartData.datasets[0].data[idx]}`)].join('\n');
    const link = document.createElement('a');
    const today = new Date().toISOString().split('T')[0];
    link.href = encodeURI(csvContent);
    link.download = `top_medicines_${today}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card
      title="Top Medicines"
      extra={<Button size="small" onClick={downloadReport} disabled={!chartData}>Download</Button>}
      style={{ height: '100%', padding: '8px' }}
    >
      {loading ? (
        <Spin size="small" />
      ) : chartData ? (
        <Bar data={chartData} options={{ maintainAspectRatio: false }} height={200} />
      ) : 'No data'}
    </Card>
  );
};

export default TopMedicine;
