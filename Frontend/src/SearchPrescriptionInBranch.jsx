import React, { useEffect, useState } from "react";
import { Table, Input, Button, Typography, Space, Collapse } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "./SearchPrescriptionInBranch.css";

const { Title } = Typography;
const { Panel } = Collapse;

function SearchMedicineInBranch() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [medicines, setMedicines] = useState([]);
 

  const branchId = "67da723648033b625d6b0f8c";

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
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={() => handleStatusUpdate(record._id, "Verified")}
          >
            Approve
          </Button>
          <Button
            type="danger"
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
    <div className="search-container">
      <Title level={2}>Search Pending Prescriptions in Branch</Title>

      <Input
        placeholder="Search for prescription status..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "16px", width: "100%" }}
      />

      <Table
        dataSource={filteredPrescriptions}
        columns={columns}
        rowKey="_id"
        expandable={{
          expandedRowRender: (record) => (
            <Collapse activeKey="1">
              <Panel header="Medicines" key="1">
                <Table
                  dataSource={record.medicines.map((med) => {
                    const medicine = medicines.find(
                      (medItem) => medItem._id === med.medicineId
                    );
                    return {
                      key: med._id,
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
                    },
                  ]}
                  pagination={false}
                />
              </Panel>
            </Collapse>
          ),
          rowExpandable: (record) => record.medicines.length > 0,
        }}
      />
    </div>
  );
}

export default SearchMedicineInBranch;
