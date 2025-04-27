"use client";

import React, { useState, useEffect } from "react";
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
const { Title } = Typography;
const { Panel } = Collapse;

const prescriptionData = [
  {
    key: "1",
    userId: "U123",
    branch: "Galle",
    status: "Pending",
    phoneNumber: "0771234567",
    prescriptionNote: "Take with food",
  },
  {
    key: "2",
    userId: "U124",
    branch: "Kandy",
    status: "Completed",
    phoneNumber: "0779876543",
    prescriptionNote: "Before bedtime",
  },
  {
    key: "3",
    userId: "U125",
    branch: "Colombo",
    status: "Cancelled",
    phoneNumber: "0712345678",
    prescriptionNote: "Twice daily",
  },
];

const SplitPagefinal = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);
  const [adminSearchQuery, setAdminSearchQuery] = useState("");
  const [pendingSearchQuery, setPendingSearchQuery] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [filteredData, setFilteredData] = useState(prescriptionData);

  const branchId = "67d690256c54c8fbf5a1eff3";

  useEffect(() => {
    // For the right side component - fetch data from API in a real implementation
    fetch(`http://localhost:5080/adminprescription/prescription/${branchId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.prescriptions)) {
          setPrescriptions(data.prescriptions);
        } else {
          // Use mock data for demo
          setPrescriptions([]);
        }
      })
      .catch(() => setPrescriptions([]));

    fetch("http://localhost:5080/adminpresciption/prescriptions/:id/medicines")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.data)) {
          setMedicines(data.data);
        } else {
          setMedicines([]);
        }
      })
      .catch(() => setMedicines([]));

    // For the left side component - use the mock data
    if (adminSearchQuery) {
      const filtered = prescriptionData.filter(item => 
        item.userId.toLowerCase().includes(adminSearchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(prescriptionData);
    }
  }, [branchId, adminSearchQuery]);

  // Left side columns
  const adminColumns = [
    {
      title: <span className="text-purple-700 font-semibold">User ID</span>,
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: <span className="text-purple-700 font-semibold">Branch</span>,
      dataIndex: "branch",
      key: "branch",
      render: (text) => {
        const colorMap = {
          Galle: "green",
          Kandy: "blue",
          Colombo: "volcano",
        };
        return <Tag color={colorMap[text]} className="font-medium">{text}</Tag>;
      },
    },
    {
      title: <span className="text-purple-700 font-semibold">Status</span>,
      dataIndex: "status",
      key: "status",
      render: (text) => {
        const color =
          text === "Completed"
            ? "green"
            : text === "Pending"
            ? "orange"
            : "red";
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: <span className="text-purple-700 font-semibold">Actions</span>,
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Tooltip title="View this prescription">
            <Button
              icon={<EditOutlined />}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-none hover:from-indigo-600 hover:to-purple-600"
            >
              View
            </Button>
          </Tooltip>
          <Tooltip title="Delete this prescription">
            <Button danger icon={<DeleteOutlined />} />
          </Tooltip>
        </div>
      ),
    },
  ];

  // Right side columns
  const pendingColumns = [
    {
      title: "Prescription ID",
      dataIndex: "_id",
      key: "_id",
      render: (text) => <span className="text-sm font-medium">{text || "PRES-123"}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span className="px-2 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800">
          {status || "Pending"}
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
            onClick={() => handleStatusUpdate(record._id || "1", "Verified")}
          >
            Approve
          </Button>
          <Button
            danger
            className="bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600 text-white"
            icon={<CloseOutlined />}
            onClick={() => handleStatusUpdate(record._id || "1", "Rejected")}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  const handleStatusUpdate = async (prescriptionId, status) => {
    try {
      // In a real implementation, this would make an API call
      console.log(`Updating prescription ${prescriptionId} to ${status}`);
      
      // Mock update for demo
      alert(`Prescription ${status} successfully!`);
      
      // Update state to reflect the change
      setPrescriptions((prev) =>
        prev.map((prescription) =>
          prescription._id === prescriptionId
            ? { ...prescription, status }
            : prescription
        )
      );
    } catch (error) {
      alert("Error updating prescription status.");
      console.error("Error:", error);
    }
  };

  const filteredPrescriptions = prescriptions.length > 0 
    ? prescriptions.filter(
        (prescription) =>
          prescription.status?.toLowerCase().includes(pendingSearchQuery.toLowerCase()) &&
          prescription.status === "Pending"
      )
    : [];

  // If no prescriptions from API, use mock data for demo
  const pendingPrescriptionsData = filteredPrescriptions.length > 0 
    ? filteredPrescriptions 
    : prescriptionData.filter(item => item.status === "Pending");

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="text-white text-center py-4 font-bold text-lg tracking-wide">
          MediTrack
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<ShoppingCartOutlined />}>
            Prescriptions
          </Menu.Item>
          <Menu.Item key="2" icon={<FileSearchOutlined />}>
            Verify Stock
          </Menu.Item>
          <Menu.Item key="3" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Content */}
      <Layout>
        <Header style={{ background: "#fff", paddingLeft: 24 }}>
          <h2 className="text-xl font-semibold text-indigo-700">
            Pharmacy Management System
          </h2>
        </Header>
        
        <Content className="m-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Left Side - Admin Prescription Management */}
            <div className="w-full md:w-1/2 p-4 bg-gradient-to-br from-white via-purple-50 to-indigo-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-indigo-800">
                Admin Prescription Management
              </h3>

              {/* Search */}
              <Search
                placeholder="Search by User ID..."
                value={adminSearchQuery}
                onChange={(e) => setAdminSearchQuery(e.target.value)}
                className="mb-4 w-full"
                allowClear
              />

              {/* Table */}
              <Table
                dataSource={filteredData}
                columns={adminColumns}
                pagination={{ pageSize: 3 }}
                className="rounded-lg overflow-hidden bg-white shadow-sm"
                size="small"
              />
            </div>

            {/* Right Side - Pending Prescriptions */}
            <div className="w-full md:w-1/2 p-4 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Pending Prescriptions
              </h3>

              {/* Search */}
              <Input
                placeholder="Search for prescription status..."
                value={pendingSearchQuery}
                onChange={(e) => setPendingSearchQuery(e.target.value)}
                className="mb-4 shadow-sm"
                prefix={<span className="text-gray-400">🔍</span>}
              />

              {pendingPrescriptionsData.length > 0 ? (
                <div className="bg-white rounded-lg shadow-sm">
                  <Table
                    dataSource={pendingPrescriptionsData}
                    columns={pendingColumns}
                    rowKey={(record) => record._id || record.key}
                    className="overflow-x-auto"
                    pagination={{ pageSize: 3 }}
                    size="small"
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
                              {/* Mock medicine data for demo */}
                              <Table
                                dataSource={[
                                  { key: '1', name: 'Paracetamol', quantity: 10 },
                                  { key: '2', name: 'Amoxicillin', quantity: 5 }
                                ]}
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
                      rowExpandable: () => true,
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
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SplitPagefinal;