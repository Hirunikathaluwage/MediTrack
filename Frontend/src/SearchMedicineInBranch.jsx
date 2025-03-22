import { useEffect, useState } from "react";
import { Table, Input, Button, Typography, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import "./SearchMedicineInBranch.css";

const { Title } = Typography;

function SearchMedicineInBranch() {
  const [medicines, setMedicines] = useState([]);
  const [branchStocks, setBranchStocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedMedicine, setEditedMedicine] = useState({
    name: "",
    stock: "",
    location: "",
    expiryDate: "",
    price: "",
  });

  useEffect(() => {
    fetch("http://localhost:5080/api/medicines")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setMedicines(data.data);
        } else {
          setMedicines([]);
        }
      })
      .catch(() => setMedicines([]));

    fetch("http://localhost:5080/api/branchstock/b/67d7232e677885938b5f5fbf")
      .then((res) => res.json())
      .then((stockData) => {
        if (stockData.success && Array.isArray(stockData.data)) {
          setBranchStocks(stockData.data);
        } else {
          setBranchStocks([]);
        }
      })
      .catch(() => setBranchStocks([]));
  }, []);

  const medicinesWithStock = medicines
    .map((medicine) => {
      const matchingStock = branchStocks.find(
        (stock) => stock.medicineId === medicine._id
      );

      if (matchingStock) {
        return {
          ...medicine,
          stock: matchingStock.stock,
          location: matchingStock.location,
          expiryDate: matchingStock.expiryDate
            ? matchingStock.expiryDate.slice(0, 10)
            : "N/A",
          price: matchingStock.price || "N/A",
        };
      }
      return null;
    })
    .filter(Boolean);

  const filteredMedicines = medicinesWithStock.filter((medicine) =>
    medicine.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (medicineId) => {
    const branchId = "67d7232e677885938b5f5fbf";

    try {
      const response = await fetch("http://localhost:5080/api/branchstock/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ branchId, medicineId }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Branch stock deleted successfully!");
        setBranchStocks((prevStocks) =>
          prevStocks.filter((stock) => stock.medicineId !== medicineId)
        );
      } else {
        alert("Failed to delete branch stock: " + data.message);
      }
    } catch (error) {
      alert("Error deleting branch stock.");
    }
  };

  const handleUpdateClick = (medicine) => {
    setEditingId(medicine._id);
    setEditedMedicine({
      name: medicine.name,
      stock: medicine.stock,
      location: medicine.location,
      expiryDate: medicine.expiryDate,
      price: medicine.price,
    });
  };

  const handleUpdateSubmit = async () => {
    const { name, stock, location, expiryDate, price } = editedMedicine;
    const branchId = "67d7232e677885938b5f5fbf";

    if (!name || !stock || !location || !expiryDate || !price) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5080/api/branchstock/update`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            branchId,
            medicineId: editingId,
            name,
            stock,
            location,
            expiryDate,
            price,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Medicine stock updated successfully!");
        setBranchStocks((prevStocks) =>
          prevStocks.map((stock) =>
            stock.medicineId === editingId ? { ...stock, ...editedMedicine } : stock
          )
        );
        setEditingId(null);
      } else {
        alert("Failed to update medicine stock: " + data.message);
      }
    } catch (error) {
      alert("Error updating medicine stock.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedMedicine((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const columns = [
    {
      title: "Medicine Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) =>
        editingId === record._id ? (
          <Input
            name="name"
            value={editedMedicine.name}
            onChange={handleInputChange}
            disabled
          />
        ) : (
          text
        ),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (text, record) =>
        editingId === record._id ? (
          <Input
            name="stock"
            type="number"
            value={editedMedicine.stock}
            onChange={handleInputChange}
          />
        ) : (
          text
        ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (text, record) =>
        editingId === record._id ? (
          <Input
            name="location"
            value={editedMedicine.location}
            onChange={handleInputChange}
          />
        ) : (
          text
        ),
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (text, record) =>
        editingId === record._id ? (
          <Input
            name="expiryDate"
            type="date"
            value={editedMedicine.expiryDate}
            onChange={handleInputChange}
          />
        ) : (
          text
        ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) =>
        editingId === record._id ? (
          <Input
            name="price"
            type="number"
            value={editedMedicine.price}
            onChange={handleInputChange}
          />
        ) : (
          text
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        editingId === record._id ? (
          <Space>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleUpdateSubmit}
            >
              Save
            </Button>
            <Button
              type="default"
              icon={<CloseOutlined />}
              onClick={() => setEditingId(null)}
            >
              Cancel
            </Button>
          </Space>
        ) : (
          <Space>
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={() => handleUpdateClick(record)}
            >
              Update
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this stock?"
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
    <div className="search-container">
      <Title level={2}>Search Medicine in Branch</Title>

      <Input
        placeholder="Search for medicine..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "16px", width: "100%" }}
      />

      <Table
        dataSource={filteredMedicines}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default SearchMedicineInBranch;
