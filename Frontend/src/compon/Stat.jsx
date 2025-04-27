import React from 'react';
import { Card, Button } from 'antd';
import { Line } from 'react-chartjs-2';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Stat = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Registrations',
        data: [10, 20, 30, 40, 50],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const totalUsers = 150;

  const downloadReport = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' + 
      ['Month,Registrations', 'Jan,10', 'Feb,20', 'Mar,30', 'Apr,40', 'May,50'].join('\n');

    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = 'registration_report.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card title="Total Registered Users" extra={<Button onClick={downloadReport}>Download Report</Button>} style={{ marginBottom: 24 }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: 24 }}>{totalUsers}</h1>
      <Line data={data} height={150} />
    </Card>
  );
};

export default Stat;
