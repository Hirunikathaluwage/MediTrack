import React, { useState } from "react";
import Orderprocess from "../assets/Orderprocess.jpg";
import axios from "axios";
import { Button, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:5080/prescription"; // API endpoint

const Prescription = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  // Handle image file selection
  const handleImageChange = (info) => {
    setFileList(info.fileList);
    if (info.file && info.file.originFileObj) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  // Handle form submission
  const onFinish = async (values) => {
    console.log("Form Data Before Sending:", values);

    // Prepare form data with the image
    const formData = new FormData();
    formData.append("userId", values.userId);
    formData.append("name", values.name);
    formData.append("age", values.age);
    formData.append("mobile", values.mobile);
    formData.append("image", fileList[0]?.originFileObj);

    try {
      const response = await axios.post(URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Data saved successfully:", response.data);
      message.success("Prescription submitted successfully!");
      navigate("/MedicineList");
    } catch (error) {
      console.error("Error submitting data:", error);
      message.error("Failed to submit prescription.");
    }
  };

  return (
    <div>
      <div>
        <img src={Orderprocess} alt="order" />
      </div>
      <div className="form-container">
        <Form
          name="prescription_form"
          layout="vertical"
          onFinish={onFinish}
          className="custom-form"
        >
          <Form.Item
            name="userId"
            label="User ID"
            rules={[{ required: true, message: "Please enter your User ID!" }]}
          >
            <Input placeholder="Enter User ID" className="input-box" />
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input placeholder="Enter name" className="input-box" />
          </Form.Item>

          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: "Please enter your age!" }]}
          >
            <Input placeholder="Enter age" type="number" className="input-box" />
          </Form.Item>

          <Form.Item
            name="mobile"
            label="Contact Number"
            rules={[{ required: true, message: "Please enter your contact number!" }]}
          >
            <Input placeholder="Enter contact" type="phone" className="input-box" />
          </Form.Item>

          <Form.Item
            name="image"
            label="Upload Prescription"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
          >
            <Upload
              name="image"
              listType="picture"
              beforeUpload={() => false} // Disable auto upload
              fileList={fileList}
              onChange={handleImageChange}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          {imageUrl && (
            <div style={{ marginTop: "10px" }}>
              <p>Preview:</p>
              <img
                src={imageUrl}
                alt="Prescription Preview"
                style={{ width: "100%", maxHeight: "300px", objectFit: "contain" }}
              />
            </div>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Prescription;
