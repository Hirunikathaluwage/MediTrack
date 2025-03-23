import React, { useState } from "react";
import Orderprocess from "../assets/Orderprocess.jpg";
import axios from "axios";
import { Button, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


const URL = "http://localhost:5080/prescription"; 

const Prescription = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  const beforeUpload = (file) => {
    const isValidType = file.type === "image/jpeg" || file.type === "image/png" || file.type === "application/pdf";
    if (!isValidType) {
      message.error("You can only upload JPG, PNG, or PDF files!");
      return Upload.LIST_IGNORE;
    }
    return false; 
  };

  /
  const handleImageChange = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1); 
    setFileList(fileList);

    if (fileList.length > 0 && fileList[0].originFileObj) {
      const reader = new FileReader();
      reader.onload = () => setImageUrl(reader.result);
      reader.readAsDataURL(fileList[0].originFileObj);
    } else {
      setImageUrl(null);
    }
  };

  const onFinish = async (values) => {
    if (fileList.length === 0) {
      message.error("Please upload a prescription file.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", "67ddfc9755c1bec1fb5cf57f");
    formData.append("name", values.name);
    formData.append("age", values.age);
    formData.append("mobile", values.mobile);
    formData.append("image", fileList[0]?.originFileObj);

    try {
      const response = await axios.post(URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success("Prescription submitted successfully!");
      navigate("/MedicineList");
    } catch (error) {
      message.error("Failed to submit prescription.");
    }
  };

  return (
    <div>
      <div>
        <img src={Orderprocess} alt="order" />
       
      </div>
      <div className="form-container">
        <Form name="prescription_form" layout="vertical" onFinish={onFinish} className="custom-form"
         initialValues={{ userId: "67ddfc9755c1bec1fb5cf57f" }}
        >
          <Form.Item
            name="userId"   label="User ID"
            rules={[{ required: true, message: "Please enter your User ID!" }]}
          >
            <Input className="input-box" disabled />
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input placeholder="Enter name" className="input-box" />
          </Form.Item>

          <Form.Item
            name="age" label="Age" rules={[{ required: true, message: "Please enter your age!" }]}
          >
            <Input placeholder="Enter age" type="number" className="input-box" />
          </Form.Item>

          <Form.Item
            name="mobile" label="Contact Number" rules={[{ required: true, message: "Please enter your contact number!" }]}
          >
            <Input placeholder="Enter contact" type="phone" className="input-box" />
          </Form.Item>

          <Form.Item
            name="image"  label="Upload Prescription"  rules={[{ required: true, message: "Please upload a file!" }]}
          >
            <Upload name="image" listType="picture" beforeUpload={beforeUpload}  fileList={fileList}   onChange={handleImageChange}  maxCount={1}  > 
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
