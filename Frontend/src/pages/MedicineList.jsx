import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import axios from "axios";
import Approval from "../component/Approval";

function MedicineList() {
  const [medicines, setMedicines] = useState([]);

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
      <div className="p-4 bg-white-100 min-h-screen flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Available Medicines</h2>
          <Table dataSource={medicines} columns={columns} pagination={false} />
          <div className="flex justify-end mt-4">
            <Button type="primary" size="large">Request Order</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MedicineList;