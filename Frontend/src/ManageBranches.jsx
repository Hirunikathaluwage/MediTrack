import { useEffect, useState } from "react";
import { Table, Input, Button, Typography, Space } from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import "./ManageBranches.css";

const { Title } = Typography;

function ManageBranches() {
  const [branches, setBranches] = useState([]);
  const [editingBranch, setEditingBranch] = useState(null);
  const [formData, setFormData] = useState({ name: "", phoneNumber: "" });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:5080/api/branch")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBranches(data.data);
      })
      .catch((err) => console.error("Error fetching branches:", err));
  }, []);

  const handleEdit = (branch) => {
    setEditingBranch(branch._id);
    setFormData({ ...branch });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5080/api/branch/${editingBranch}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setBranches(branches.map((branch) => (branch._id === editingBranch ? data.data : branch)));
        setEditingBranch(null);
      } else {
        alert("Failed to update branch: " + data.message);
      }
    } catch (error) {
      alert("Error updating branch." + error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredBranches = branches.filter((branch) =>
    branch.branchName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      title: <div style={{ textAlign: "center" }}>Branch Name</div>,
      dataIndex: "location",
      key: "location",
      render: (text) => <span>{text}</span>,
    },
    {
      title: <div style={{ textAlign: "center" }}>Contact Number</div>,
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (text, record) =>
        editingBranch === record._id ? (
          <Input name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
        ) : (
          text
        ),
    },
    {
      title: <div style={{ textAlign: "center" }}>Actions</div>,
      key: "actions",
      render: (_, record) =>
        editingBranch === record._id ? (
          <Space>
            <Button type="primary" icon={<SaveOutlined />} onClick={handleUpdate}>
              Save
            </Button>
            <Button type="default" icon={<CloseOutlined />} onClick={() => setEditingBranch(null)}>
              Cancel
            </Button>
          </Space>
        ) : (
          <Space>
            <Button type="default" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
              Edit
            </Button>
          </Space>
        ),
    },
  ];

  return (
    <div className="manage-branches-container">
      <Title level={2}>Manage Branches</Title>
      <Input
        placeholder="Search for branch..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "16px", width: "100%" }}
      />
      <Table
        dataSource={filteredBranches}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default ManageBranches;