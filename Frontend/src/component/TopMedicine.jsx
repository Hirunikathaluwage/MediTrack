import React from 'react';
import { Card, Button } from 'antd';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
} from 'chart.js';

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const TopMedicine = ({ chartData }) => {
  const downloadReport = () => {
    const csvData = [
      ['Medicine', 'Sales'],
      ...chartData.labels.map((label, index) => [label, chartData.datasets[0].data[index]])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvData.map(row => row.join(',')).join('\n');

    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = 'top_medicines_report.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card title="Top Selling Medicines" extra={<Button onClick={downloadReport}>Download Report</Button>} style={{ marginBottom: 24 }}>
      <Bar data={chartData} height={150} />
    </Card>
  );
};

export default TopMedicine;
