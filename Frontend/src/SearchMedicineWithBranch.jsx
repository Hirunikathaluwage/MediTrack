import { useEffect, useState } from "react";
import { Input, Button, Typography, Table, Space, Tag, AutoComplete } from "antd"; // Import AutoComplete
import "./SearchMedicineInBranch.css"; // Reusing the CSS from SearchMedicineInBranch

const { Title } = Typography;

function SearchMedicineWithBranch() {
  const [medicines, setMedicines] = useState([]);
  const [branches, setBranches] = useState([]); // State to store branch data
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [branchesWithMedicine, setBranchesWithMedicine] = useState([]);
  const [quantities, setQuantities] = useState({}); // State to track quantities for each row
  const [suggestions, setSuggestions] = useState([]); // State for suggestions

  // Fetch all medicines and branches when the component loads
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
  }, []);

  // Handle search input change and provide suggestions
  const handleSearchChange = (value) => {
    setSearchQuery(value);

    if (value.length >= 2) {
      const filteredSuggestions = medicines
        .filter((med) => med.name.toLowerCase().includes(value.toLowerCase()))
        .map((med) => ({ value: med.name })); // Map to AutoComplete format
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Handle selection from suggestions
  const handleSelect = (value) => {
    setSearchQuery(value);
    const medicine = medicines.find((med) => med.name.toLowerCase() === value.toLowerCase());
    if (medicine) {
      setSelectedMedicine(medicine);
      fetchBranchesForMedicine(medicine._id);
    }
  };

  // Fetch branches that have the selected medicine
  const fetchBranchesForMedicine = (medicineId) => {
    fetch(`http://localhost:5080/api/branchstock/m/${medicineId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          // Map branch IDs to their locations and phone numbers
          const updatedBranches = data.data.map((branchStock) => {
            const branch = branches.find(
              (branch) => branch._id === branchStock.branchId
            );
            return {
              ...branchStock,
              location: branch ? branch.location : "Unknown",
              phoneNumber: branch ? branch.phoneNumber : "N/A", // Include phone number
            };
          });
          setBranchesWithMedicine(updatedBranches);
        } else {
          setBranchesWithMedicine([]);
        }
      })
      .catch(() => setBranchesWithMedicine([]));
  };

  const handleQuantityChange = (recordId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [recordId]: value, 
    }));

    //cart add logic here
  };

  const handleAddToCart = async (record) => {
    const quantity = quantities[record._id] || 1; // Default to 1 if no quantity is selected

    if (quantity > record.stock) {
      alert("Not enough stock available!");
      return;
    }

    try {
      // Send a PUT request to update the stock in the backend
      const response = await fetch(`http://localhost:5080/api/branchstock/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          branchId: record.branchId,
          medicineId: record.medicineId,
          stock: record.stock - quantity, // Reduce the stock by the selected quantity
        }),
      });

      const data = await response.json();
      if (data.success) {
        // Update the stock in the frontend state
        const updatedBranches = branchesWithMedicine.map((branch) =>
          branch._id === record._id
            ? { ...branch, stock: branch.stock - quantity }
            : branch
        );
        setBranchesWithMedicine(updatedBranches);

        alert(`${quantity} unit(s) of ${selectedMedicine.name} added to cart.`);
      } else {
        alert("Failed to update stock: " + data.message);
      }
    } catch (error) {
      alert("Error updating stock: " + error.message);
    }
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
      title: "Stock Status",
      dataIndex: "stock",
      key: "stock",
      render: (stock) => {
        if (stock > 25) {
          return <Tag color="green">Available</Tag>;
        } else if (stock > 0) {
          return <Tag color="orange">Limited Stock</Tag>;
        } else {
          return <Tag color="red">Out of Stock</Tag>;
        }
      },
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (text) => (text ? text.slice(0, 10) : "N/A"),
    },
  ];

  return (
    <div className="search-container"> {/* Reused class name */}
      <Title level={2}>Find Branches with Medicine</Title>

      {/* Search Bar with AutoComplete */}
      <Space style={{ marginBottom: "16px", width: "100%", justifyContent: "center" }}>
        <AutoComplete
          options={suggestions} // Pass suggestions to AutoComplete
          style={{ width: "100%",minWidth: "300px" }} // Set fixed width
          value={searchQuery}
          onChange={handleSearchChange} // Handle input change
          onSelect={handleSelect} // Handle selection
          placeholder="Enter medicine name..."
        />
        <Button type="primary" onClick={() => handleSelect(searchQuery)}>
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
              expandable={{
                expandedRowRender: (record) => (
                  <div style={{ textAlign: "left" }}> {/* Align content to the left */}
                    <p>
                      <strong>Name:</strong>{" "}
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(selectedMedicine.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {selectedMedicine.name}
                      </a>
                    </p>
                    <p><strong>Generic Name:</strong> {selectedMedicine.genericName}</p>
                    <p><strong>Price:</strong> LKR {record.price}.00</p>
                    <p><strong>Unit:</strong> {selectedMedicine.unit}</p>
                    <p><strong>Description:</strong> {selectedMedicine.description}</p>
                    <p><strong>Expiry Date:</strong> {record.expiryDate ? record.expiryDate.slice(0, 10) : "N/A"}</p>
                    {selectedMedicine.otc ? (
                      <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                        <Input
                          type="number"
                          min={1}
                          max={record.stock}
                          value={quantities[record._id] || 1} // Default to 1
                          onChange={(e) => handleQuantityChange(record._id, Number(e.target.value))}
                          style={{ width: "80px" }}
                        />
                        <Button type="primary" onClick={() => handleAddToCart(record)}>
                          Add to Cart
                        </Button>
                      </div>
                    ) : (
                      <p style={{ color: "red", marginTop: "10px" }}>
                        Please follow our Prescription Uploading process or Contact the branch for purchasing at{" "} 
                        <strong>
                          <a href={`tel:${record.phoneNumber || ""}`} style={{ color: "inherit" }}>
                            {record.phoneNumber || "N/A"}
                          </a>
                        </strong>.
                      </p>
                    )}
                  </div>
                ),
              }}
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
