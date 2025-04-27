import React, { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import { Line } from 'react-chartjs-2';
import { fetchRegistrations } from '../services/reportService';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Stat = () => {
  const [data, setData] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchRegistrations();
        const { months, registrations, totalUsers } = res.data;

        setData({
          labels: months,
          datasets: [
            {
              label: 'Registrations',
              data: registrations,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
              tension: 0.4,
            },
          ],
        });
        setTotalUsers(totalUsers);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      }
    };

    loadData();
  }, []);

  const downloadReport = () => {
    if (!data) return;
    const csvContent = 'data:text/csv;charset=utf-8,' +
      ['Month,Registrations', ...data.labels.map((label, idx) => `${label},${data.datasets[0].data[idx]}`)].join('\n');

    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = 'registration_report.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card
      title="Total Registered Users"
      extra={<Button onClick={downloadReport}>Download Report</Button>}
      style={{ marginBottom: 24 }}
    >
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: 24 }}>
        {totalUsers}
      </h1>
      {data ? <Line data={data} height={150} /> : 'Loading...'}
    </Card>
  );
};

export default Stat;
