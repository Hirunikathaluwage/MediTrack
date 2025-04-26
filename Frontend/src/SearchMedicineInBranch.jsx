import { useEffect, useState } from "react";
import { Table, Input, Button, Typography, Space, Tag } from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import "./SearchMedicineInBranch.css";

const { Title } = Typography;

function SearchMedicineInBranch() {
  const [medicines, setMedicines] = useState([]);
  const [branchStocks, setBranchStocks] = useState([]);
  const [branches, setBranches] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    stock: "",
    expiryDate: "",
    price: "",
  });

  useEffect(() => {
    // Fetch branch data
    fetch("http://localhost:5080/api/branch")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setBranches(data.data);
        } else {
          setBranches([]);
        }
      })
      .catch(() => setBranches([]));

    // Fetch medicines
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

    // Fetch branch stocks
    fetch("http://localhost:5080/api/branchstock/")
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

  const handleEdit = (record) => {
    setEditingId(record._id);
    setFormData({
      stock: record.stock,
      expiryDate: record.expiryDate,
      price: record.price,
    });
  };

  const handleSave = async () => {
    try {
      // Find the current stock record to get branchId and medicineId
      const currentStock = branchStocks.find((stock) => stock._id === editingId);

      if (!currentStock) {
        alert("Error: Stock record not found.");
        return;
      }

      const response = await fetch(`http://localhost:5080/api/branchstock/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          branchId: currentStock.branchId,
          medicineId: currentStock.medicineId,
          stock: formData.stock,
          expiryDate: formData.expiryDate,
          price: formData.price,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setBranchStocks((prev) =>
          prev.map((stock) =>
            stock._id === editingId ? { ...stock, ...formData } : stock
          )
        );
        setEditingId(null);
      } else {
        alert("Failed to update branch stock: " + data.message);
      }
    } catch (error) {
      alert("Error updating branch stock: " + error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = async (record) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the stock for "${record.name}" at "${record.location}"?`
    );

    if (!confirmDelete) {
      return; // Exit if the user cancels
    }

    try {
      const response = await fetch(`http://localhost:5080/api/branchstock/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          branchId: record.branchId,
          medicineId: record.medicineId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete stock.");
      }

      const data = await response.json();
      setBranchStocks((prev) =>
        prev.filter((stock) => stock._id !== record._id)
      );
      alert("Stock deleted successfully!");
    } catch (error) {
      alert(`Error deleting stock: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const medicinesWithStock = branchStocks.map((stock) => {
    const medicine = medicines.find((med) => med._id === stock.medicineId);
    const branch = branches.find((br) => br._id === stock.branchId);

    return {
      _id: stock._id,
      branchId: stock.branchId, // Include branchId
      medicineId: stock.medicineId, // Include medicineId
      name: medicine ? medicine.name : "N/A",
      stock: stock.stock,
      location: branch ? branch.location : "N/A",
      expiryDate: stock.expiryDate ? stock.expiryDate.slice(0, 10) : "N/A",
      price: stock.price || "N/A",
    };
  });

  const filteredMedicines = medicinesWithStock.filter((medicine) => {
    const matchesName = medicine.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter
      ? medicine.location?.toLowerCase() === locationFilter.toLowerCase()
      : true;
    return matchesName && matchesLocation;
  });

  const columns = [
    {
      title: "Medicine Name",
      dataIndex: "name",
      key: "name",
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
            value={formData.stock}
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
            value={formData.expiryDate}
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
            value={formData.price}
            onChange={handleInputChange}
          />
        ) : (
          text
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) =>
        editingId === record._id ? (
          <Space>
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
              Save
            </Button>
            <Button
              type="default"
              icon={<CloseOutlined />}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Space>
        ) : (
          <Space>
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            >
              Edit
            </Button>
            <Button
              type="danger"
              onClick={() => handleDelete(record)}
            >
              Delete
            </Button>
          </Space>
        ),
    },
  ];

  return (
    <div className="search-container">
      <Title level={2}>Manage Stock</Title>

      <Input
        placeholder="Search for medicine..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "16px", width: "100%" }}
      />

      {/* Branch Location Chips */}
      <div style={{ marginBottom: "16px" }}>
        {branches.map((branch) => (
          <Tag
            key={branch._id}
            color={locationFilter === branch.location ? "green" : "blue"}
            style={{ marginBottom: "8px", cursor: "pointer" }}
            onClick={() => setLocationFilter(branch.location)}
          >
            {branch.location}
          </Tag>
        ))}
        {locationFilter && (
          <Tag
            color="red"
            style={{ marginBottom: "8px", cursor: "pointer" }}
            onClick={() => setLocationFilter("")}
          >
            Clear Filter
          </Tag>
        )}
      </div>

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
