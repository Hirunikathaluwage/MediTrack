import React, { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

const DriverNext = () => {
  const [status, setStatus] = useState("Pending"); // Default status is "Pending"

  const handleDropdownChange = (value) => {
    setStatus(value); // Update the status
    console.log(`Selected: ${value}`); // Log the selected value
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5', // Light background color
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          backgroundColor: '#eaeaea', // Light gray background
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
          width: '800px',
          height: '400px',
        }}
      >
        {/* Item List */}
        <div
          style={{
            flex: 1,
            marginRight: '20px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for the item list
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Item List</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ marginBottom: '5px' }}>Item 1</li>
            <li style={{ marginBottom: '5px' }}>Item 2</li>
            <li style={{ marginBottom: '5px' }}>Item 3</li>
          </ul>
        </div>

        {/* Details and Dropdown */}
        <div style={{ flex: 1 }}>
          {/* Name */}
          <p style={{ fontSize: '16px', marginBottom: '10px' }}>
            <strong>Name:</strong> John Doe
          </p>

          {/* Contact */}
          <p style={{ fontSize: '16px', marginBottom: '10px' }}>
            <strong>Contact:</strong> +1234567890
          </p>

          {/* Location */}
          <p style={{ fontSize: '16px', marginBottom: '10px' }}>
            <strong>Location:</strong> Colombo, Sri Lanka
          </p>

          {/* Amount */}
          <p style={{ fontSize: '16px', marginBottom: '20px' }}>
            <strong>Amount:</strong> 1200 LKR
          </p>

          {/* Dropdown */}
          <div style={{ marginTop: '10px' }}>
            <Select
              placeholder="Select Status"
              style={{ width: '60%' }}
              value={status} // Set the current status as the selected value
              onChange={handleDropdownChange}
            >
              <Option value="Pending">Pending</Option>
              <Option value="In-Transit">In-Transit</Option>
              <Option value="Delivered">Delivered</Option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverNext;