import React from 'react';
import { Card, Button } from 'antd';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const BranchOrder = ({ chartData }) => {
  const downloadReport = () => {
    const csvData = [
      ['Branch', 'Orders'],
      ...chartData.labels.map((label, index) => [label, chartData.datasets[0].data[index]])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvData.map(row => row.join(',')).join('\n');

    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = 'branch_orders_report.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card title="Branch-wise Orders" extra={<Button onClick={downloadReport}>Download Report</Button>} style={{ marginBottom: 24 }}>
      <Pie data={chartData} height={150} />
    </Card>
  );
};

export default BranchOrder;
