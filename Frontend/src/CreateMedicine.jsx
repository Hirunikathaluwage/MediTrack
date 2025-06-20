import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateMedicine.css";

function CreateMedicine() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    genericName: "",
    unit: "",
    description: "",
    qty: "",
    otc: false, // Added OTC field
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate required fields
    if (!formData.name || !formData.genericName || !formData.unit || !formData.qty) {
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
        navigate("/manage-medicines"); // Redirect to Manage Medicines page
      } else {
        setError(data.message || "Failed to add medicine.");
      }
    } catch (err) {
      setError("Server error! Please try again." + err);
    }
  };

  return (
    <div className="create-medicine-container">
      <h2>Create New Medicine</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Medicine Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="genericName"
          placeholder="Generic Name"
          value={formData.genericName}
          onChange={handleChange}
          required
        />

        <label htmlFor="unit">Unit:</label>
        <select
          name="unit"
          id="unit"
          value={formData.unit} // Bind to formData.unit
          onChange={handleChange} // Update formData when the value changes
          required
        >
          <option value="">Select Unit</option> {/* Default placeholder option */}
          <option value="tablets">Tablets</option>
          <option value="syrups">Syrups</option>
          <option value="inhalers">Inhalers</option>
          <option value="injections">Injections</option>
          <option value="drops">Drops</option>
          <option value="creams">Creams</option>
        </select>

        <label>
          Quantity:
          <input
            type="text"
            name="qty"
            placeholder="Unit (e.g., 1 Tablet, 100ml)"
            value={formData.qty}
            onChange={handleChange}
            required
          />
        </label>

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <div className="otc-toggle" style={{ marginTop: "1rem" }}>
          <label style={{ marginRight: "1rem" }}>
            <input
              type="radio"
              name="otc"
              value={true}
              checked={formData.otc === true}
              onChange={() => setFormData({ ...formData, otc: true })}
            />
            Over the Counter (OTC)
          </label>
          <label>
            <input
              type="radio"
              name="otc"
              value={false}
              checked={formData.otc === false}
              onChange={() => setFormData({ ...formData, otc: false })}
            />
            Prescription Required
          </label>
        </div>

        <button type="submit">Add Medicine</button>
      </form>
    </div>
  );
}

export default CreateMedicine;
