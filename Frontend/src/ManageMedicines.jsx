import { useEffect, useState } from "react";
import { Table, Input, Button, Typography, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./ManageMedicines.css";

const { Title } = Typography;

function ManageMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    genericName: "",
    price: "",
    unit: "",
    description: "",
    expireDate: "",
    manufactureDate: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5080/api/medicines")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMedicines(data.data);
      })
      .catch((err) => console.error("Error fetching medicines:", err));
  }, []);

  const handleEdit = (medicine) => {
    setEditingMedicine(medicine._id);
    setFormData({
      ...medicine,
      expireDate: medicine.expireDate.slice(0, 10),
      manufactureDate: medicine.manufactureDate.slice(0, 10),
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5080/api/medicines/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (data.success) {
        setMedicines(medicines.filter((med) => med._id !== id));
      } else {
        alert("Failed to delete medicine: " + data.message);
      }
    } catch (error) {
      alert("Error deleting medicine." + error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5080/api/medicines/${editingMedicine}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setMedicines(medicines.map((med) => (med._id === editingMedicine ? data.data : med)));
        setEditingMedicine(null);
      } else {
        alert("Failed to update medicine: " + data.message);
      }
    } catch (error) {
      alert("Error updating medicine." + error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) =>
        editingMedicine === record._id ? (
          <Input name="name" value={formData.name} onChange={handleInputChange} />
        ) : (
          text
        ),
    },
    {
      title: "Generic Name",
      dataIndex: "genericName",
      key: "genericName",
      render: (text, record) =>
        editingMedicine === record._id ? (
          <Input name="genericName" value={formData.genericName} onChange={handleInputChange} />
        ) : (
          text
        ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) =>
        editingMedicine === record._id ? (
          <Input name="price" type="number" value={formData.price} onChange={handleInputChange} />
        ) : (
          text
        ),
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      render: (text, record) =>
        editingMedicine === record._id ? (
          <Input name="unit" value={formData.unit} onChange={handleInputChange} />
        ) : (
          text
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) =>
        editingMedicine === record._id ? (
          <Input name="description" value={formData.description} onChange={handleInputChange} />
        ) : (
          text
        ),
    },
    {
      title: "Expiry Date",
      dataIndex: "expireDate",
      key: "expireDate",
      render: (text, record) =>
        editingMedicine === record._id ? (
          <Input name="expireDate" type="date" value={formData.expireDate} onChange={handleInputChange} />
        ) : (
          text.slice(0, 10)
        ),
    },
    {
      title: "Manufacture Date",
      dataIndex: "manufactureDate",
      key: "manufactureDate",
      render: (text, record) =>
        editingMedicine === record._id ? (
          <Input name="manufactureDate" type="date" value={formData.manufactureDate} onChange={handleInputChange} />
        ) : (
          text.slice(0, 10)
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) =>
        editingMedicine === record._id ? (
          <Space>
            <Button type="primary" icon={<SaveOutlined />} onClick={handleUpdate}>
              Save
            </Button>
            <Button type="default" icon={<CloseOutlined />} onClick={() => setEditingMedicine(null)}>
              Cancel
            </Button>
          </Space>
        ) : (
          <Space>
            <Button type="default" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this medicine?"
              onConfirm={() => handleDelete(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        ),
    },
  ];

  return (
    <div className="manage-medicines-container">
      <Title level={2}>Manage Medicines</Title>
      <Input
        placeholder="Search for medicine..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "16px", width: "100%" }}
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: "16px" }}
        onClick={() => navigate("/add-medicine")}
      >
        Create Medicine
      </Button>
      <Table
        dataSource={filteredMedicines}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default ManageMedicines;
