import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Input, Upload, message, Select } from "antd";
import Container from "../assets/Container.png";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const URL = "http://localhost:5080/prescription";

const Prescription = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [fileList, setFileList] = useState([]);
    const navigate = useNavigate();

    const beforeUpload = (file) => {
        const isValidType =
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "application/pdf";
        if (!isValidType) {
            message.error("You can only upload JPG, PNG, or PDF files!");
            return Upload.LIST_IGNORE;
        }
        return false;
    };

    const handleImageChange = (info) => {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);
        setFileList(fileList);

        if (fileList[0]?.originFileObj) {
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
        formData.append("userId", "67da71ea411ce40824ebff88");
        formData.append("name", values.name);
        formData.append("age", values.age);
        formData.append("mobile", values.mobile);
        formData.append("note", values.note);
        formData.append("branch", values.branch);
        formData.append("image", fileList[0].originFileObj);

        try {
            const res = await axios.post(URL, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const prescriptionId = res.data.prescriptionId;
            message.success("Prescription submitted successfully!");

            // Navigate to the verified page with prescription ID
            navigate(`/approved-medicines?id=${prescriptionId}`);
        } catch (error) {
            message.error("Failed to submit prescription.");
        }
    };

    const customStyles = {
        formItem: {
            labelCol: { style: { fontWeight: 500, color: "#0a5b8a" } },
        },
        uploadButton: {
            style: {
                borderRadius: "0.5rem",
                height: "40px",
                backgroundColor: "#f0f8ff",
                borderColor: "#20b2aa",
                borderStyle: "dashed",
                color: "#0a5b8a",
                width: "100%",
            },
        },
        submitButton: {
            style: {
                background: "linear-gradient(135deg, #0a5b8a, #20b2aa)",
                borderColor: "transparent",
                height: "45px",
                borderRadius: "0.5rem",
                fontWeight: "500",
                width: "100%",
                fontSize: "16px",
            },
        },
    };

    return (
        <div className="min-h-screen flex flex-col items-center py-6 px-4">
            <div className="w-full max-w-3xl mb-6">
                <img
                    src={Container}
                    alt="Container"
                    className="w-full h-auto rounded-lg shadow-lg"
                />
            </div>

            <div className="w-full max-w-xl px-4">
                <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl border border-white border-opacity-30">
                    <h2 className="text-center text-cyan-800 text-2xl font-semibold mb-8 relative">
                        Upload Your Prescription
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-cyan-700 to-teal-500 mt-2"></div>
                    </h2>

                    <Form
                        name="prescription_form"
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{ userId: "67ddfc9755c1bec1fb5cf57f" }}
                        className="space-y-4"
                    >
                        <Form.Item
                            name="userId"
                            label="User ID"
                            rules={[{ required: true, message: "Please enter your User ID!" }]}
                            {...customStyles.formItem}
                        >
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: "Please enter your name!" }]}
                            {...customStyles.formItem}
                        >
                            <Input placeholder="Enter name" />
                        </Form.Item>

                        <Form.Item
                            name="age"
                            label="Age"
                            rules={[{ required: true, message: "Please enter your age!" }]}
                            {...customStyles.formItem}
                        >
                            <Input type="number" placeholder="Enter age" />
                        </Form.Item>

                        <Form.Item
                            name="mobile"
                            label="Contact Number"
                            rules={[{ required: true, message: "Please enter your contact number!" }]}
                            {...customStyles.formItem}
                        >
                            <Input type="tel" placeholder="Enter contact" />
                        </Form.Item>

                        <Form.Item
                            name="branch"
                            label="Select Branch"
                            rules={[{ required: true, message: "Please select your preferred branch!" }]}
                            {...customStyles.formItem}
                        >
                            <Select placeholder="Choose a branch">
                                <Option value="Colombo">Colombo</Option>
                                <Option value="Kandy">Kandy</Option>
                                <Option value="Galle">Galle</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="note"
                            label="Note"
                            {...customStyles.formItem}
                        >
                            <Input placeholder="If you have any allergies" />
                        </Form.Item>

                        <Form.Item
                            name="image"
                            label="Upload Prescription"
                            rules={[{ required: true, message: "Please upload a file!" }]}
                            {...customStyles.formItem}
                        >
                            <Upload
                                name="image"
                                listType="picture"
                                beforeUpload={beforeUpload}
                                fileList={fileList}
                                onChange={handleImageChange}
                                maxCount={1}
                            >
                                <Button icon={<UploadOutlined />} {...customStyles.uploadButton}>
                                    Upload Prescription
                                </Button>
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
                            <Button type="primary" htmlType="submit" {...customStyles.submitButton}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Prescription;