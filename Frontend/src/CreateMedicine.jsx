import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateMedicine.css";

function CreateMedicine() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    genericName: "",
    price: "",
    unit: "",
    description: "",
    manufactureDate: "",
    expireDate: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate required fields
    if (!formData.name || !formData.genericName || !formData.price || !formData.unit || !formData.expireDate || !formData.manufactureDate) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5080/api/medicines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert("Medicine added successfully!");
        navigate("/manage-medicine"); // Redirect to Manage Medicines page
      } else {
        setError(data.message || "Failed to add medicine.");
      }
    } catch (err) {
      setError("Server error! Please try again.");
    }
  };

  return (
    <div className="create-medicine-container">
      <h2>Create New Medicine</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Medicine Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="genericName" placeholder="Generic Name" value={formData.genericName} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="text" name="unit" placeholder="Unit (e.g., mg, ml)" value={formData.unit} onChange={handleChange} required />
        <input type="date" name="manufactureDate" value={formData.manufactureDate} onChange={handleChange} required />
        <input type="date" name="expireDate" value={formData.expireDate} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <button type="submit">Add Medicine</button>
      </form>
    </div>
  );
}

export default CreateMedicine;
