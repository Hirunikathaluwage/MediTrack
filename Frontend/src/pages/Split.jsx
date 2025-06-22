"use client";

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Layout,
  Menu,
  Table,
  Input,
  Tag,
  Button,
  Tooltip,
  Typography,
  Collapse,
  Space,
  Modal,
  Spin,
  notification,
} from "antd";
import {
  ShoppingCartOutlined,
  FileSearchOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Search } = Input;
const { Panel } = Collapse;

const SplitPagefinal = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);
  const [adminSearchQuery, setAdminSearchQuery] = useState("");
  const [pendingSearchQuery, setPendingSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [prescriptionToDelete, setPrescriptionToDelete] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const branchId = searchParams.get("branchId");

  useEffect(() => {
    if (!branchId) {
      navigate("/pharmacy?branchId=67da723648033b625d6b0f8c", { replace: true });
    } else {
      fetchPrescriptions();
    }
  }, [branchId]);

  const fetchPrescriptions = async () => {
    try {
      const res = await fetch(`http://localhost:5080/adminprescription/prescription/${branchId}`);
      const data = await res.json();
      if (data?.success && Array.isArray(data.prescriptions)) {
        setPrescriptions(data.prescriptions);
        setFilteredData(data.prescriptions);
      } else {
        setPrescriptions([]);
        setFilteredData([]);
      }
    } catch (err) {
      console.error("Error loading prescriptions:", err);
      setPrescriptions([]);
      setFilteredData([]);
    }
  };

  const handleStatusUpdate = async (prescriptionId, status) => {
    try {
      const response = await fetch(`http://localhost:5080/adminprescription/prescription/${prescriptionId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Network error!");

      const data = await response.json();
      if (data.success) {
        notification.success({
          message: "Success",
          description: `Prescription ${status.toLowerCase()} successfully.`,
          placement: "topRight",
          duration: 2,
        });
        setTimeout(fetchPrescriptions, 1200);
      } else {
        notification.error({
          message: "Failed",
          description: data.message || "Something went wrong.",
          placement: "topRight",
          duration: 2,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      notification.error({
        message: "Error",
        description: "Server communication failed.",
        placement: "topRight",
        duration: 2,
      });
    }
  };

  const handleApproveClick = (prescriptionId, e) => {
    e.stopPropagation();
    handleStatusUpdate(prescriptionId, "Verified");
  };

  const handleRejectClick = (prescriptionId, e) => {
    e.stopPropagation();
    handleStatusUpdate(prescriptionId, "Rejected");
  };

  const handleViewPrescription = async (record) => {
    setSelectedPrescription(record);
    setViewModalVisible(true);
    setImageBase64(null);

    if (record.imageUrl) {
      try {
        setLoadingImage(true);
        const res = await fetch(
          `http://localhost:5080/prescription/image/base64?imagePath=${encodeURIComponent(record.imageUrl)}`
        );
        const data = await res.json();
        if (data.success) {
          setImageBase64(data.base64);
        }
      } catch (err) {
        console.error("Error fetching base64 image:", err);
      } finally {
        setLoadingImage(false);
      }
    }
  };

  const openDeleteModal = (prescription, e) => {
    e.stopPropagation();
    setPrescriptionToDelete(prescription);
    setDeleteModalVisible(true);
  };

  const confirmDeletePrescription = async () => {
    if (!prescriptionToDelete) return;
    try {
      const response = await fetch(`http://localhost:5080/prescription/${prescriptionToDelete._id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Network error!");

      const data = await response.json();
      if (data.success) {
        notification.success({
          message: "Deleted",
          description: "Prescription deleted successfully.",
          placement: "topRight",
          duration: 2,
        });
        setDeleteModalVisible(false);
        setPrescriptionToDelete(null);
        fetchPrescriptions();
      } else {
        notification.error({
          message: "Failed",
          description: data.message || "Something went wrong.",
          placement: "topRight",
          duration: 2,
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      notification.error({
        message: "Error",
        description: "Server communication failed.",
        placement: "topRight",
        duration: 2,
      });
    }
  };

  const filteredAdminData = adminSearchQuery
    ? filteredData.filter((item) => item.userId?.toLowerCase().includes(adminSearchQuery.toLowerCase()))
    : filteredData;

  const filteredPendingPrescriptions = prescriptions.filter(
    (prescription) =>
      prescription.status?.toLowerCase().includes(pendingSearchQuery.toLowerCase()) &&
      prescription.status === "Pending"
  );

  const adminColumns = [
    { title: "User ID", dataIndex: "userId", key: "userId" },
    {
      title: "Branch",
      key: "branchId",
      render: (_, record) => (
        <Tag color="processing">{record.branchId?.branchName || "Unknown Branch"}</Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Completed" ? "green" : status === "Pending" ? "orange" : "red"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={(e) => {
                e.stopPropagation();
                handleViewPrescription(record);
              }}
            >
              View
            </Button>
          </Tooltip>
          <Tooltip title="Delete Prescription">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => openDeleteModal(record, e)}
            >
              Delete
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const pendingColumns = [
    { title: "Prescription ID", dataIndex: "_id", key: "_id" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" icon={<CheckOutlined />} onClick={(e) => handleApproveClick(record._id, e)}>
            Approve
          </Button>
          <Button danger icon={<CloseOutlined />} onClick={(e) => handleRejectClick(record._id, e)}>
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: "#001529" }}>
        <div className="text-center text-white font-bold text-lg py-6 tracking-wide">MediTrack</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<ShoppingCartOutlined />} onClick={() => navigate("/pharmacy")}>
            Prescriptions
          </Menu.Item>
          <Menu.Item key="3" icon={<FileSearchOutlined />} onClick={() => navigate("/reports")}>
            Reports
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: "#f0f2f5", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <div className="flex items-center gap-4">
            <ShoppingCartOutlined style={{ fontSize: 28, color: "#722ED1" }} />
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#333" }}>
              MediTrack Admin Dashboard
            </h1>
          </div>
        </Header>

        <Content className="m-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-indigo-500">All Prescriptions</h3>
              <Search
                placeholder="Search by User ID"
                value={adminSearchQuery}
                onChange={(e) => setAdminSearchQuery(e.target.value)}
                className="mb-4"
                allowClear
                enterButton
              />
              <Table
                dataSource={filteredAdminData}
                columns={adminColumns}
                pagination={{ pageSize: 5 }}
                rowKey="_id"
                size="middle"
              />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-indigo-500">Pending Approvals</h3>
              <Search
                placeholder="Search by Status"
                value={pendingSearchQuery}
                onChange={(e) => setPendingSearchQuery(e.target.value)}
                className="mb-4"
                allowClear
                enterButton
              />
              <Table
                dataSource={filteredPendingPrescriptions}
                columns={pendingColumns}
                pagination={{ pageSize: 5 }}
                rowKey="_id"
                expandable={{
                  expandedRowRender: (record) => <MedicineCollapse medicines={record.medicines || []} />,
                  rowExpandable: (record) => record.medicines?.length > 0,
                }}
                size="middle"
              />
            </div>
          </div>
        </Content>
      </Layout>

      {/* View Modal */}
      <Modal
        title="Prescription Details"
        open={viewModalVisible}
        onCancel={() => {
          setViewModalVisible(false);
          setSelectedPrescription(null);
          setImageBase64(null);
        }}
        footer={null}
        width={750}
      >
        {selectedPrescription && (
          <div className="space-y-4">
            {loadingImage ? (
              <div className="flex justify-center py-6">
                <Spin size="large" />
              </div>
            ) : imageBase64 ? (
              <div className="flex justify-center">
                <img
                  src={`data:image/jpeg;base64,${imageBase64}`}
                  alt="Prescription"
                  style={{
                    maxHeight: "400px",
                    width: "auto",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                  }}
                />
              </div>
            ) : null}
            <p><strong>Prescription ID:</strong> {selectedPrescription._id}</p>
            <p><strong>Status:</strong> {selectedPrescription.status}</p>
            <p><strong>Note:</strong> {selectedPrescription.note || "No notes provided."}</p>

            <Collapse defaultActiveKey={["1"]}>
              <Panel header="Medicines in Prescription" key="1">
                <Table
                  dataSource={selectedPrescription.medicines?.map((med, index) => ({
                    key: index,
                    name: med.medicineId?.name || "Unknown",
                    quantity: med.quantity,
                  })) || []}
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
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal
        title="Delete Prescription"
        open={deleteModalVisible}
        onCancel={() => {
          setDeleteModalVisible(false);
          setPrescriptionToDelete(null);
        }}
        onOk={confirmDeletePrescription}
        okText="Delete"
        okType="danger"
        cancelText="Cancel"
        width={600}
      >
        {prescriptionToDelete && (
          <div className="space-y-4">
            <p><strong>Prescription ID:</strong> {prescriptionToDelete._id}</p>
            <p><strong>Status:</strong> {prescriptionToDelete.status}</p>
            <p><strong>Note:</strong> {prescriptionToDelete.note || "No notes provided."}</p>
            <p className="text-red-500 font-semibold mt-4">
              Are you sure you want to delete this prescription? This action cannot be undone.
            </p>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default SplitPagefinal;

const MedicineCollapse = ({ medicines }) => (
  <Collapse className="bg-white rounded-md">
    <Panel header="Medicines" key="1">
      <Table
        dataSource={medicines.map((med, index) => ({
          key: index,
          name: med.medicineId?.name || "Unknown",
          quantity: med.quantity,
        }))}
        columns={[
          { title: "Medicine Name", dataIndex: "name", key: "name" },
          { title: "Quantity", dataIndex: "quantity", key: "quantity" },
        ]}
        pagination={false}
        size="small"
      />
    </Panel>
  </Collapse>
);
