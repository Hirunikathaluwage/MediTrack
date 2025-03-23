import React from 'react';
import { Card, Button } from 'antd';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const TopMedicine = ({ chartData }) => {
  
    const downloadReport = () => {
        const csvData = [
            ['Medicine', 'Sales'],
            ...chartData.labels.map((label, index) => [label, chartData.datasets[0].data[index]])
        ];

        const csvContent = "data:text/csv;charset=utf-8," 
            + csvData.map(row => row.join(',')).join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'top_medicines_report.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Card
            title="Most Sold Medicines"
            bordered={false}
            className="w-full max-w-lg p-6 mb-8 shadow-lg rounded-3xl"
        >
            <div className="h-80 mb-4">
                <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>

           
            <div className="flex justify-center">
                <Button 
                    type="primary" 
                    className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg"
                    onClick={downloadReport}
                >
                    Download Report
                </Button>
            </div>
        </Card>
    );
};

export default TopMedicine;
