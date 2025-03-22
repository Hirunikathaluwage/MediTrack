import { useEffect, useState } from "react";
import { Input, Button, Typography, Table, Space } from "antd";
import "./SearchMedicineWithBranch.css";

const { Title } = Typography;

function SearchMedicineWithBranch() {
  const [medicines, setMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [branchesWithMedicine, setBranchesWithMedicine] = useState([]);

  // Fetch all medicines when the component loads
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
  }, []);

  // Find medicine by name and get its ID
  const handleSearch = () => {
    const medicine = medicines.find(
      (med) => med.name.toLowerCase() === searchQuery.toLowerCase()
    );

    if (medicine) {
      setSelectedMedicine(medicine);
      fetchBranchesForMedicine(medicine._id);
    } else {
      setSelectedMedicine(null);
      setBranchesWithMedicine([]);
    }
  };

  // Fetch branches that have the selected medicine
  const fetchBranchesForMedicine = (medicineId) => {
    fetch(`http://localhost:5080/api/branchstock/m/${medicineId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setBranchesWithMedicine(data.data);
        } else {
          setBranchesWithMedicine([]);
        }
      })
      .catch(() => setBranchesWithMedicine([]));
  };

  // Define columns for the Ant Design table
  const columns = [
    {
      title: "Branch Location",
      dataIndex: "location",
      key: "location",
      render: (text) => text || "Unknown",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (text) => text || "N/A",
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (text) => (text ? text.slice(0, 10) : "N/A"),
    },
  ];

  return (
    <div className="container">
      <Title level={2}>Find Branches with Medicine</Title>

      {/* Search Bar */}
      <Space style={{ marginBottom: "16px", width: "100%" }}>
        <Input
          placeholder="Enter medicine name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "70%" }}
        />
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
      </Space>

      {/* Show branches if a medicine is found */}
      {selectedMedicine && (
        <>
          <Title level={4}>Branches with {selectedMedicine.name}</Title>
          {branchesWithMedicine.length > 0 ? (
            <Table
              dataSource={branchesWithMedicine}
              columns={columns}
              rowKey={(record) => record._id || record.location}
              pagination={{ pageSize: 5 }}
            />
          ) : (
            <Typography.Text>No branches found with this medicine.</Typography.Text>
          )}
        </>
      )}
    </div>
  );
}

export default SearchMedicineWithBranch;
