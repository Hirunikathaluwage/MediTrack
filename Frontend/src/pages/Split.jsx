"use client";

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  LogoutOutlined,
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

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const branchId = searchParams.get("branchId");

  useEffect(() => {
    if (!branchId) return;
    fetchPrescriptions();
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

        setTimeout(() => {
          fetchPrescriptions();
        }, 1500);
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
        const res = await fetch(`http://localhost:5080/prescription/image/base64?imagePath=${encodeURIComponent(record.imageUrl)}`);
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

  const filteredAdminData = adminSearchQuery
    ? filteredData.filter((item) =>
        item.userId?.toLowerCase().includes(adminSearchQuery.toLowerCase())
      )
    : filteredData;

  const filteredPendingPrescriptions = prescriptions.filter(
    (prescription) =>
      prescription.status?.toLowerCase().includes(pendingSearchQuery.toLowerCase()) &&
      prescription.status === "Pending"
  );

  const adminColumns = [
    { title: "User ID", dataIndex: "userId", key: "userId" },
    { title: "Branch", key: "branchId", render: (_, record) => (
        <Tag color="blue">{record.branchId?.branchName || "Unknown Branch"}</Tag>
      ),
    },
    { title: "Status", dataIndex: "status", key: "status", render: (status) => (
        <Tag color={status === "Completed" ? "green" : status === "Pending" ? "orange" : "red"}>{status}</Tag>
      ),
    },
    { title: "Actions", key: "actions", render: (_, record) => (
        <Space size="small">
          <Tooltip title="View this prescription">
            <Button icon={<EditOutlined />} onClick={(e) => {e.stopPropagation(); handleViewPrescription(record);}}>View</Button>
          </Tooltip>
          <Tooltip title="Delete this prescription">
            <Button danger icon={<DeleteOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const pendingColumns = [
    { title: "Prescription ID", dataIndex: "_id", key: "_id" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Actions", key: "actions", render: (_, record) => (
        <Space size="small">
          <Button type="primary" icon={<CheckOutlined />} onClick={(e) => handleApproveClick(record._id, e)}>Approve</Button>
          <Button danger icon={<CloseOutlined />} onClick={(e) => handleRejectClick(record._id, e)}>Reject</Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="text-white text-center py-4 font-bold text-lg">MediTrack</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<ShoppingCartOutlined />}>Prescriptions</Menu.Item>
          <Menu.Item key="2" icon={<FileSearchOutlined />}>Verify Stock</Menu.Item>
          <Menu.Item key="3" icon={<LogoutOutlined />}>Logout</Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", paddingLeft: 24 }}>
          <h2 className="text-xl font-semibold text-indigo-700">Pharmacy Management System</h2>
        </Header>

        <Content className="m-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2 p-4 bg-gradient-to-br from-white via-purple-50 to-indigo-100 rounded-lg">
              <Search placeholder="Search by User ID..." value={adminSearchQuery} onChange={(e) => setAdminSearchQuery(e.target.value)} className="mb-4" allowClear />
              <Table dataSource={filteredAdminData} columns={adminColumns} pagination={{ pageSize: 5 }} rowKey="_id" size="small" />
            </div>

            <div className="w-full md:w-1/2 p-4 bg-gray-50 rounded-lg">
              <Search placeholder="Search by Status" value={pendingSearchQuery} onChange={(e) => setPendingSearchQuery(e.target.value)} className="mb-4" allowClear />
              <Table
                dataSource={filteredPendingPrescriptions}
                columns={pendingColumns}
                pagination={{ pageSize: 5 }}
                rowKey="_id"
                expandable={{ expandedRowRender: (record) => <MedicineCollapse medicines={record.medicines || []} />, rowExpandable: (record) => record.medicines?.length > 0, expandRowByClick: false }}
                onRow={() => ({ onClick: (event) => { if (event.target.closest("button") || event.target.closest(".ant-btn")) event.stopPropagation(); }})}
                size="small"
              />
            </div>
          </div>
        </Content>
      </Layout>

      <Modal
        title="Prescription Details"
        open={viewModalVisible}
        onCancel={() => {setViewModalVisible(false);setSelectedPrescription(null);setImageBase64(null);}}
        footer={null}
        width={700}
      >
        {selectedPrescription && (
          <div className="space-y-4">
            {loadingImage ? (
              <div className="flex justify-center py-6"><Spin size="large" /></div>
            ) : imageBase64 ? (
              <div className="flex justify-center">
                <img src={`data:image/jpeg;base64,${imageBase64}`} alt="Prescription" style={{ maxHeight: "400px", width: "auto", borderRadius: "8px", marginBottom: "1rem" }} />
              </div>
            ) : null}
            <p><strong>Prescription ID:</strong> {selectedPrescription._id}</p>
            <p><strong>Status:</strong> {selectedPrescription.status}</p>
            <p><strong>Note:</strong> {selectedPrescription.note || "No note provided."}</p>
            <Collapse defaultActiveKey={["1"]}>
              <Panel header="Medicines" key="1">
                <Table dataSource={selectedPrescription.medicines?.map((med, index) => ({key: index,name: med.medicineId?.name || "Unknown",quantity: med.quantity,})) || []} columns={[{ title: "Medicine Name", dataIndex: "name", key: "name" },{ title: "Quantity", dataIndex: "quantity", key: "quantity" }]} pagination={false} size="small" />
              </Panel>
            </Collapse>
          </div>
        )}
      </Modal>

    </Layout>
  );
};

export default SplitPagefinal;

const MedicineCollapse = ({ medicines }) => (
  <Collapse defaultActiveKey={["1"]} className="bg-white">
    <Panel header="Medicines in Prescription" key="1">
      <Table
        dataSource={medicines.map((med, index) => ({ key: index, name: med.medicineId?.name || "Unknown", quantity: med.quantity }))}
        columns={[{ title: "Medicine Name", dataIndex: "name", key: "name" },{ title: "Quantity", dataIndex: "quantity", key: "quantity" }]}
        pagination={false}
        size="small"
      />
    </Panel>
  </Collapse>
);
