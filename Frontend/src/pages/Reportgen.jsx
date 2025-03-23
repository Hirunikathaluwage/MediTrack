import React from 'react'; 
import TopMedicine from '../component/TopMedicine';  
import BranchOrder from '../component/BranchOrder';  
import Stat from '../component/Stat';
import Profit from '../component/Profit';

const Reportgen = () => {
    const topMedicinesChartData = {
        labels: ['Paracetamol', 'Amoxicillin', 'Ibuprofen', 'Cetrizine', 'Metformin'],
        datasets: [{
            label: 'Most Sold Medicines',
            data: [120, 95, 80, 70, 65],
            backgroundColor: 'rgba(75,192,192,0.6)',
        }]
    };

    const branchOrdersChartData = {
        labels: ['Branch A', 'Branch B', 'Branch C', 'Branch D'],
        datasets: [{
            label: 'Orders per Branch',
            data: [350, 280, 150, 100],
            backgroundColor: [
                'rgba(153,102,255,0.6)',
                'rgba(255,159,64,0.6)',
                'rgba(54,162,235,0.6)',
                'rgba(255,99,132,0.6)'
            ],
        }]
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
           
            <div className="w-60 bg-white shadow-md min-h-screen hidden md:block"></div>
            
            <div className="flex-1 p-6">
                <h1 className="text-4xl font-bold text-center mb-10">Dashboard Reports</h1>
                
                <div className="bg-white shadow-lg rounded-lg p-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                       
                        <div className="col-span-2 lg:col-span-1">
                            <Stat />
                        </div>

                       
                        <div className="col-span-2 md:col-span-1">
                            <TopMedicine chartData={topMedicinesChartData} />
                        </div>

                    
                        <div className="col-span-2 md:col-span-1">
                            <BranchOrder chartData={branchOrdersChartData} />
                        </div>

                     
                        <div className="col-span-2 md:col-span-1">
                            <Profit />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reportgen;
