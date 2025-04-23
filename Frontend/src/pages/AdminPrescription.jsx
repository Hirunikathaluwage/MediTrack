"use client";

import React, { useState } from "react";
import {
  Layout,
  Menu,
  Table,
  Input,
  Tag,
  Button,
  Tooltip,
} from "antd";
import {
  ShoppingCartOutlined,
  FileSearchOutlined,
  LogoutOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Search } = Input;

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

const columns = [
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
    title: <span className="text-purple-700 font-semibold">Phone Number</span>,
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: (
      <span className="text-purple-700 font-semibold">Prescription Note</span>
    ),
    dataIndex: "prescriptionNote",
    key: "prescriptionNote",
  },
  {
    title: <span className="text-purple-700 font-semibold">Actions</span>,
    key: "actions",
    render: (_, record) => (
      <div className="flex gap-2">
        <Tooltip title="Edit this prescription">
          <Button
            icon={<EditOutlined />}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-none hover:from-indigo-600 hover:to-purple-600"
          >
            Edit
          </Button>
        </Tooltip>
        <Tooltip title="Delete this prescription">
          <Button danger icon={<DeleteOutlined />} />
        </Tooltip>
      </div>
    ),
  },
];

const PharmacistDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* 🌐 Sidebar */}
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

      {/* 📋 Main Area */}
      <Layout>
        <Header style={{ background: "#fff", paddingLeft: 24 }}>
          <h2 className="text-xl font-semibold text-indigo-700">
            Pharmacist Dashboard
          </h2>
        </Header>
        <Content className="m-6">
          <div className="p-6 bg-gradient-to-br from-white via-purple-50 to-indigo-100 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-indigo-800 tracking-tight">
              Manage Prescriptions
            </h3>

            {/* 🔍 Search */}
            <Search
              placeholder="Search by User ID..."
              className="mb-6 w-full max-w-md"
              allowClear
              onSearch={(value) => console.log(value)}
              style={{ borderRadius: "8px", padding: "8px 16px" }}
            />

            {/* 🧾 Table */}
            <Table
              dataSource={prescriptionData}
              columns={columns}
              pagination={{ pageSize: 5 }}
              className="rounded-lg overflow-hidden bg-white shadow-md"
              bordered
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PharmacistDashboard;
