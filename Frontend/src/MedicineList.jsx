import React from "react";
import { Table, Button } from "antd";
import Approval from './Approval';

function MedicineList() {
  const medicines = [
    { _id: "1", name: "Paracetamol", quantity: 20 },
    { _id: "2", name: "Ibuprofen", quantity: 15 },
    { _id: "3", name: "Amoxicillin", quantity: 10 },
  ];

  const columns = [
    { title: "Medicine Name", dataIndex: "name", key: "name" },
    { title: "Quantity Available", dataIndex: "quantity", key: "quantity" },
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
