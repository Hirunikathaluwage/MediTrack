import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import Approval from "../component/Approval";
import axios from "axios"; // Make sure axios is installed

function MedicineList() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    // Replace with your API endpoint to fetch the medicines
    const fetchMedicines = async () => {
      try {
        const response = await axios.get("/api/prescription/123"); // Fetch prescription with ID 123 (for example)
        if (response.data.success) {
          setMedicines(response.data.prescription.medicines); // Assume medicines are part of the response
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
      <div className="p-4 bg-white-100 min-h-screen flex justify-center items-center ">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Available Medicines</h2>
          <Table dataSource={medicines} columns={columns} rowKey="_id" pagination={false} />
          <div className="flex justify-end mt-4">
            <Button type="primary" size="large">Request Order</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MedicineList;
