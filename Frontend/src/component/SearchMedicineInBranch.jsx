import React, { useEffect, useState } from "react";
import { Table, Input, Button, Typography, Space, Collapse } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Panel } = Collapse;

function SearchMedicineInBranch() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [medicines, setMedicines] = useState([]);

  const branchId = "67d690256c54c8fbf5a1eff3";

  useEffect(() => {
    fetch(`http://localhost:5080/api/prescription/${branchId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.prescriptions)) {
          setPrescriptions(data.prescriptions);
        } else {
          setPrescriptions([]);
        }
      })
      .catch(() => setPrescriptions([]));

    fetch("http://localhost:5080/api/medicines")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setMedicines(data.data);
        }
      })
      .catch(() => setMedicines([]));
  }, [branchId]);

  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      prescription.status?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      prescription.status === "Pending"
  );

  const handleStatusUpdate = async (prescriptionId, status) => {
    try {
      const response = await fetch(
        `http://localhost:5080/api/prescription/${prescriptionId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(`Prescription ${status} successfully!`);
        setPrescriptions((prev) =>
          prev.map((prescription) =>
            prescription._id === prescriptionId
              ? { ...prescription, status }
              : prescription
          )
        );
      } else {
        alert(`Failed to update prescription status: ${data.message}`);
      }
    } catch (error) {
      alert("Error updating prescription status.");
      console.error("Error:", error);
    }
  };

  const columns = [
    {
      title: "Prescription ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span className="px-2 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800">
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            className="bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
            icon={<CheckOutlined />}
            onClick={() => handleStatusUpdate(record._id, "Verified")}
          >
            Approve
          </Button>
          <Button
            danger
            className="bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600 text-white"
            icon={<CloseOutlined />}
            onClick={() => handleStatusUpdate(record._id, "Rejected")}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-4/5 mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <Title level={2} className="text-center text-gray-800 mb-6">
        Search Pending Prescriptions in Branch
      </Title>

      <Input
        placeholder="Search for prescription status..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-6 shadow-sm"
        prefix={<span className="text-gray-400">🔍</span>}
      />

      {filteredPrescriptions.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm">
          <Table
            dataSource={filteredPrescriptions}
            columns={columns}
            rowKey="_id"
            className="overflow-x-auto"
            pagination={{
              pageSize: 5,
              className: "px-4"
            }}
            expandable={{
              expandedRowRender: (record) => (
                <div className="px-4 py-2 bg-gray-50">
                  <Collapse defaultActiveKey={["1"]} className="bg-white">
                    <Panel 
                      header={
                        <span className="font-medium text-blue-600">
                          Prescription Medicines
                        </span>
                      } 
                      key="1"
                    >
                      <Table
                        dataSource={record.medicines.map((med) => {
                          const medicine = medicines.find(
                            (medItem) => medItem._id === med.medicineId
                          );
                          return {
                            key: med._id || med.medicineId,
                            name: medicine ? medicine.name : "Medicine not found",
                            quantity: med.quantity,
                          };
                        })}
                        columns={[
                          {
                            title: "Medicine Name",
                            dataIndex: "name",
                            key: "name",
                          },
                          {
                            title: "Quantity",
                            dataIndex: "quantity",
                            key: "quantity",
                            render: (quantity) => (
                              <span className="font-medium">{quantity}</span>
                            ),
                          },
                        ]}
                        pagination={false}
                        className="mt-2"
                        size="small"
                      />
                    </Panel>
                  </Collapse>
                </div>
              ),
              rowExpandable: (record) => record.medicines && record.medicines.length > 0,
              expandRowByClick: true,
            }}
          />
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500 text-lg">No pending prescriptions found</p>
        </div>
      )}
    </div>
  );
}

export default SearchMedicineInBranch;