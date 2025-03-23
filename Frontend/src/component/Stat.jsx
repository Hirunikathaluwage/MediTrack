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
  // Example data for the mini graph (small chart)
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], 
    datasets: [
      {
        label: 'Registrations',
        data: [10, 20, 30, 40, 50], // Simulated count of registrations over time
        borderColor: 'rgba(0, 0, 0, 1)',
        backgroundColor: 'rgba(0, 0, 0, 0.1)', 
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const totalUsers = 150;

  const downloadReport = () => {
    const data = [
      ['Month', 'Registrations'],
      ['Jan', 10],
      ['Feb', 20],
      ['Mar', 30],
      ['Apr', 40],
      ['May', 50],
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' 
      + data.map(row => row.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'registration_report.csv');
    link.click();
  };

  return (
    
      <Card
        title="Site Registration Statistics"
        bordered={false}
        className="w-full max-w-lg p-6 shadow-lg rounded-6xl" 
      >
        <div className="flex justify-between items-center mb-5">
          <div className="text-lg font-semibold text-black">Total Registered Users</div>
          <div className="text-xl font-bold text-black">{totalUsers}</div>
        </div>

        <div className="h-80 mb-2">
          <Line 
            data={data} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Month',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Users', 
                  },
                },
              },
            }} 
          />
        </div>

        <div className="flex justify-center">
          <Button 
            type="primary"
            onClick={downloadReport}
            className="w-auto bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg font-semibold"
          >
            Download Report
          </Button>
        </div>
    
      </Card>
    
  );
};

export default Stat;
//<div className="p-4 bg-gray-100 min-h-screen flex justify-center items-center rounded-4xl  shadow-2xl">