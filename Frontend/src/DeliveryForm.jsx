import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const App = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate(); // Initialize useNavigate
  const [selectedLocation, setSelectedLocation] = useState(null); // State to store selected location

  const handleSubmit = (values) => {
    console.log('Form Values:', values);
    navigate('/delivery-main', { state: { orderID: values.orderID, location: selectedLocation } }); // Navigate to the DeliveryMain page with Order ID and location
  };

  const handleMapClick = (event) => {
    setSelectedLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
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
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px', // Rounded corners
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
          width: '600px',
        }}
      >
        <Form
          {...formItemLayout}
          form={form}
          onFinish={handleSubmit} // Call handleSubmit on form submission
          style={{ maxWidth: 600 }}
        >
          {/* OrderID */}
          <Form.Item
            label="OrderID"
            name="orderID"
            rules={[{ required: true, message: 'Please enter OrderID!' }]}
          >
            <Input />
          </Form.Item>

          {/* UserID */}
          <Form.Item
            label="UserID"
            name="userID"
            rules={[{ required: true, message: 'Please enter UserID!' }]}
          >
            <Input />
          </Form.Item>

          {/* Name */}
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name!' }]}
          >
            <Input />
          </Form.Item>

          {/* Contact */}
          <Form.Item
            label="Contact"
            name="contact"
            rules={[
              { required: true, message: 'Please enter your contact number!' },
              { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit number!' },
            ]}
          >
            <Input maxLength={10} />
          </Form.Item>

          {/* Google Map */}
          <Form.Item
            label="Location"
            name="location"
          >
            <LoadScript googleMapsApiKey="REACT_APP_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={{ height: '200px', width: '100%' }}
                center={{ lat: -3.745, lng: -38.523 }}
                zoom={10}
                onClick={handleMapClick}
              >
                {selectedLocation && <Marker position={selectedLocation} />}
              </GoogleMap>
            </LoadScript>
          </Form.Item>

          {/* Landmarks */}
          <Form.Item
            label="Landmarks"
            name="landmarks"
          >
            <Input.TextArea rows={3} placeholder="Optional" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item
            style={{
              display: 'flex',
              justifyContent: 'center', // Center the button horizontally
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default App;