import { useState, useEffect } from "react";
import { Form, Input, Button, Select, Typography, message, Row, Col } from "antd";
import { addMedicine } from "./services/apiService";
import "./AddMedicine.css";

const { Title } = Typography;
const { Option } = Select;

function AddMedicineToInventory() {
  const [medicines, setMedicines] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedMedicineId, setSelectedMedicineId] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  useEffect(() => {
    // Fetch existing medicines
    fetch("http://localhost:5080/api/medicines")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setMedicines(data.data);
        }
      })
      .catch(() => setMedicines([]));

    // Fetch branches
    fetch("http://localhost:5080/api/branch")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setBranches(data.data);
        }
      })
      .catch(() => setBranches([]));
  }, []);

  const handleSubmit = async () => {
    if (!selectedMedicineId || !selectedBranchId) {
      message.error("Please select both a medicine and a branch.");
      return;
    }

    const newStockEntry = {
      branchId: selectedBranchId,
      medicineId: selectedMedicineId,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      location,
      expiryDate,
    };

    try {
      const result = await addMedicine(newStockEntry);
      console.log("API Response:", result); // Debugging log

      if (result && result.success) {
        message.success("Stock added successfully!");
        alert("Stock has been successfully added!");
        setSelectedMedicineId("");
        setSelectedBranchId("");
        setStock("");
        setPrice("");
        setLocation("");
        setExpiryDate("");
      } else {
        message.error(result?.message || "Failed to add stock. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error); // Debugging log
      message.error("Error adding stock. Please check your network or server.");
    }
  };

  return (
    <div className="add-medicine-container">
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        Add Medicine Stock
      </Title>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            className="medicine-form"
            style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
          >
            <Form.Item
              label="Select Medicine"
              name="medicine"
              rules={[{ required: true, message: "Please select a medicine!" }]}
            >
              <Select
                placeholder="Select Medicine"
                value={selectedMedicineId}
                onChange={(value) => setSelectedMedicineId(value)}
              >
                {medicines.map((medicine) => (
                  <Option key={medicine._id} value={medicine._id}>
                    {medicine.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Select Branch"
              name="branch"
              rules={[{ required: true, message: "Please select a branch!" }]}
            >
              <Select
                placeholder="Select Branch"
                value={location}
                onChange={(value) => setSelectedBranchId(value)}
              >
                {branches.map((branch) => (
                  <Option key={branch._id} value={branch._id}>
                    {branch.location}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Stock"
              name="stock"
              rules={[{ required: true, message: "Please enter the stock!" }]}
            >
              <Input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please enter the price!" }]}
            >
              <Input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                step="0.01"
              />
            </Form.Item>

            {/* <Form.Item
              label="Location"
              name="location"
              rules={[{ required: true, message: "Please enter the location!" }]}
            >
              <Input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Item> */}

            <Form.Item label="Expiry Date" name="expiryDate">
              <Input
                type="date"
                placeholder="Expiry Date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Add Stock
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default AddMedicineToInventory;
