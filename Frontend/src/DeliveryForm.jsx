import React, { useState, useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { createDelivery } from "./services/deliveryService"; // Import backend API function

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

const DeliveryForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Static Order ID for now
  const orderId = "67e03274a9441fc4cff224ff"; // Replace this with your static Order ID

  useEffect(() => {
    console.log("Setting Order ID:", orderId); // Debugging log
    form.setFieldsValue({ orderId }); // Set the static Order ID in the form
    console.log("Form values after setting Order ID:", form.getFieldsValue()); // Debugging log
  }, [orderId, form]);

  const handleSubmit = async (values) => {
    try {
      // Prepare the data to send to the backend
      const deliveryData = {
        orderId: values.orderId,
        name: values.name,
        contact: values.contact,
        location: selectedLocation,
        landmarks: values.landmarks,
      };

      // Call the backend API to create a delivery
      const response = await createDelivery(deliveryData);
      message.success("Delivery created successfully!");
      navigate("/delivery-main", {
        state: { orderId: values.orderId, deliveryId: response.data.delivery._id },
      }); // Navigate to the next page
    } catch (error) {
      console.error("Error creating delivery:", error);
      message.error("Failed to create delivery. Please try again.");
    }
  };

  const handleMapClick = (event) => {
    setSelectedLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "600px",
        }}
      >
        <Form
          {...formItemLayout}
          form={form}
          onFinish={handleSubmit}
          style={{ maxWidth: 600 }}
        >
          {/* OrderID */}
          <Form.Item
            label="OrderId"
            name="orderId"
            rules={[{ required: true, message: "OrderID is required!" }]}
          >
            <Input value={orderId} disabled /> {/* Disable the input field to prevent editing */}
          </Form.Item>

          {/* Name */}
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input />
          </Form.Item>

          {/* Contact */}
          <Form.Item
            label="Contact"
            name="contact"
            rules={[
              { required: true, message: "Please enter your contact number!" },
              { pattern: /^[0-9]{10}$/, message: "Please enter a valid 10-digit number!" },
            ]}
          >
            <Input maxLength={10} />
          </Form.Item>

          {/* Google Map */}
          <Form.Item label="Location" name="location">
            <LoadScript googleMapsApiKey="REACT_APP_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={{ height: "200px", width: "100%" }}
                center={{ lat: -3.745, lng: -38.523 }}
                zoom={10}
                onClick={handleMapClick}
              >
                {selectedLocation && <Marker position={selectedLocation} />}
              </GoogleMap>
            </LoadScript>
          </Form.Item>

          {/* Landmarks */}
          <Form.Item label="Landmarks" name="landmarks">
            <Input.TextArea rows={3} placeholder="Optional" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item
            style={{
              display: "flex",
              justifyContent: "center",
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

export default DeliveryForm;




