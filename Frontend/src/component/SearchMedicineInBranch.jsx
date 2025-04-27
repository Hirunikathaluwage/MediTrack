import React, { useEffect, useState } from "react";
import { Table, Input, Button, Typography, Space, Collapse, Modal, notification } from "antd";
import { CheckOutlined, CloseOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const { Title } = Typography;
const { Panel } = Collapse;
const { confirm } = Modal;

function SearchMedicineInBranch() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const branchId = searchParams.get("branchId");

  useEffect(() => {
    fetch(`http://localhost:5080/adminprescription/prescription/${branchId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.prescriptions)) {
          setPrescriptions(data.prescriptions);
        } else {
          setPrescriptions([]);
        }
      })
      .catch(() => setPrescriptions([]));
  }, [branchId]);

  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      prescription.status?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      prescription.status === "Pending"
  );

  const handleStatusUpdate = async (prescriptionId, status) => {
    try {
      const response = await fetch(
        `http://localhost:5080/adminprescription/prescription/${prescriptionId}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (data.success) {
        notification.success({
          message: `Success`,
          description: `Prescription has been ${status.toLowerCase()} successfully.`,
          placement: "topRight",
          duration: 2, // show for 2 seconds
        });
        setPrescriptions((prev) =>
          prev.map((prescription) =>
            prescription._id === prescriptionId
              ? { ...prescription, status }
              : prescription
          )
        );
      } else {
        notification.error({
          message: `Failed`,
          description: data.message || "Something went wrong!",
          placement: "topRight",
          duration: 2,
        });
      }
    } catch (error) {
      console.error("Error updating prescription status.", error);
      notification.error({
        message: `Error`,
        description: "Error updating prescription status.",
        placement: "topRight",
        duration: 2,
      });
    }
  };

  const showConfirm = (prescriptionId, status) => {
    confirm({
      title: `Are you sure you want to ${status.toLowerCase()} this prescription?`,
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      cancelText: "No",
      centered: true,
      maskClosable: true,
      onOk: () => {
        return handleStatusUpdate(prescriptionId, status); // returning Promise shows loading spinner!
      },
    });
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
            onClick={() => showConfirm(record._id, "Verified")}
          >
            Approve
          </Button>
          <Button
            danger
            className="bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600 text-white"
            icon={<CloseOutlined />}
            onClick={() => showConfirm(record._id, "Rejected")}
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
        placeholder="Search by status (e.g., Pending)"
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
            pagination={{ pageSize: 5 }}
            expandable={{
              expandedRowRender: (record) => (
                <div className="px-4 py-2 bg-gray-50">
                  <Collapse defaultActiveKey={["1"]} className="bg-white">
                    <Panel
                      header={
                        <span className="font-medium text-blue-600">
                          Medicines in this Prescription
                        </span>
                      }
                      key="1"
                    >
                      <Table
                        dataSource={
                          record.medicines?.map((med, index) => ({
                            key: med._id || index,
                            name: med.medicineId?.name || "Unknown",
                            quantity: med.quantity,
                          })) || []
                        }
                        columns={[
                          { title: "Medicine Name", dataIndex: "name", key: "name" },
                          { title: "Quantity", dataIndex: "quantity", key: "quantity" },
                        ]}
                        pagination={false}
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
