import React, { useState } from "react";
import axios from "axios";
import "./InquiryForm.css";
import { useNavigate } from "react-router-dom";

const InquiryForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
    category: "General",
    priority: "Medium",
    attachment: null,
  });

  // Validation rules
  const rules = {
    name: (val) => val.trim().length >= 2 || "Name must be at least 2 characters",
    email: (val) => /\S+@\S+\.\S+/.test(val) || "Valid email required",
    subject: (val) => val.trim().length >= 5 || "Subject too short",
    description: (val) => val.trim().length >= 20 || "Please provide more details",
    attachment: (file) => {
      if (!file) return true;
      const valid = ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type);
      const size = file.size / 1024 / 1024 <= 5;
      return (valid && size) || "Invalid file (JPG/PNG/PDF, max 5MB)";
    }
  };

  // Validate single field
  const validate = (name, value) => {
    if (!rules[name]) return true;
    const result = rules[name](value);
    return result === true ? true : result;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const inputValue = files ? files[0] : value;
    setFormData({ ...formData, [name]: inputValue });
    
    // Live validation
    const result = validate(name, inputValue);
    if (result !== true) {
      setErrors({ ...errors, [name]: result });
    } else {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (rules[key]) {
        const result = validate(key, value);
        if (result !== true) newErrors[key] = result;
      }
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form
    setIsSubmitting(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const response = await axios.post("http://localhost:5000/api/inquiries", data);
      navigate("/success", { 
        state: { referenceId: response.data.referenceId } 
      });
    } catch (error) {
      setErrors({ form: error.response?.data?.message || "Submission failed" });
      setIsSubmitting(false);
    }
  };

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <h1>Submit Inquiry</h1>
      
      {errors.form && <div className="form-error">{errors.form}</div>}
      
      {/* Input fields with inline error handling */}
      {[
        { name: "name", label: "Your Name *", type: "text", placeholder: "John Doe" },
        { name: "email", label: "Email Address *", type: "email", placeholder: "example@example.com" },
        { name: "subject", label: "Subject *", type: "text", placeholder: "Brief subject" }
      ].map(field => (
        <div key={field.name} className="form-group">
          <label>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className={errors[field.name] ? "error" : ""}
            disabled={isSubmitting}
          />
          {errors[field.name] && <small className="error-text">{errors[field.name]}</small>}
        </div>
      ))}
      
      {/* Description field */}
      <div className="form-group">
        <label>Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your issue..."
          className={errors.description ? "error" : ""}
          disabled={isSubmitting}
          maxLength="1000"
        />
        <div className="char-count">
          <small>{formData.description.length}/1000</small>
          {errors.description && <small className="error-text">{errors.description}</small>}
        </div>
      </div>
      
      {/* Dropdowns */}
      <div className="form-row">
        <div className="form-group half">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange} disabled={isSubmitting}>
            {["General", "Technical Support", "Payment Issue", "Delivery Issue", "Product Issue", "Other"]
              .map(option => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>
        <div className="form-group half">
          <label>Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange} disabled={isSubmitting}>
            {["Low", "Medium", "High"].map(option => 
              <option key={option} value={option}>{option}</option>)}
          </select>
        </div>
      </div>
      
      {/* File upload */}
      <div className="form-group">
        <label>Attachment (Optional)</label>
        <input type="file" name="attachment" onChange={handleChange} disabled={isSubmitting} />
        <small>JPG, PNG, PDF (max 5MB)</small>
        {errors.attachment && <small className="error-text">{errors.attachment}</small>}
      </div>
      
      {/* Buttons */}
      <div className="form-buttons">
        <button type="button" onClick={() => navigate("/")} disabled={isSubmitting}>
          Cancel
        </button>
        <button type="submit" className="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Inquiry"}
        </button>
      </div>
    </form>
  );
};

export default InquiryForm;