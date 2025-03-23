import React from 'react'; 
import { Card, Button } from 'antd';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const BranchOrder = ({ chartData }) => {

   
    const downloadReport = () => {
        const csvData = [
            ['Branch', 'Orders'],
            ...chartData.labels.map((label, index) => [label, chartData.datasets[0].data[index]])
        ];

        const csvContent = "data:text/csv;charset=utf-8," 
            + csvData.map(row => row.join(',')).join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'branch_orders_report.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Card
            title="Orders Per Branch"
            bordered={false}
            className="w-full max-w-lg p-6 shadow-lg rounded-3xl"
        >
            <div className="h-80 mb-4">
                <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
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

export default BranchOrder;
