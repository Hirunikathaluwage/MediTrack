import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Approval from "../component/Approval";

function MedicineList() {
  const [medicines, setMedicines] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get("http://localhost:5080/prescription/67e0108793b399cafcc8f41e");
        if (response.data.success) {
          const formattedMedicines = response.data.prescription.medicines.map(med => ({
            key: med._id, 
            name: med.medicineId?.name || "Unknown", 
            quantity: med.quantity
          }));
          setMedicines(formattedMedicines);
        }
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

    fetchMedicines();
  }, []);

  const columns = [
    { title: "Medicine Name", dataIndex: "name", key: "name" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
  ];

  return (
    <>
      <Approval />
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-60 bg-gray-800 text-white p-4 min-h-screen">
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <Button 
            type="primary" 
            className="w-full mb-4" 
            onClick={() => navigate("/reportgen")}
          >
            Go to Reports
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 bg-gray-100 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Available Medicines</h2>
            <Table dataSource={medicines} columns={columns} pagination={false} />
            <div className="flex justify-end mt-4">
              <Button type="primary" size="large">Request Order</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MedicineList;
