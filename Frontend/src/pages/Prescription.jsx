
import React, { useState, useEffect } from "react";
import Orderprocess from "../assets/Orderprocess.jpg";
import axios from "axios";
import { Button, Form, Input, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


const MyFormItemContext = React.createContext([]);
const URL = "http://localhost:5080/prescription";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function toArr(str) {
  return Array.isArray(str) ? str : [str];
}

  const MyFormItemGroup = ({ prefix, children }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);
  return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
};

const MyFormItem = ({ name, ...props }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
  return <Form.Item name={concatName} {...props} />;
};

const Prescription = () => {
  const [imageUrl, setImageUrl] = useState(null);
  
  const navigate = useNavigate();

  const handleSubmit = () => {
  navigate("/MedicineList");
};

const onFinish = async (values) => {
  console.log(values);
  const userName = await fetchUserName(values.user?.userId);
  
  if (userName) {
    values.user.Name = userName; // Auto-fill the name field
  }

  console.log("Updated Form Values:", values);
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleImageChange = (info) => {
    if (info.file && info.file.originFileObj) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  
  return (
    <div>
      <div>
      <img src={Orderprocess} alt="order" />
      </div>
      <div className="form-container">
        <Form name="form_item_path" layout="vertical" onFinish={onFinish} className="custom-form">
          <MyFormItemGroup prefix={['user']}>
            <MyFormItem name="userId" label="User ID" >                       
              <Input placeholder="Enter User ID" className="input-box" onBlur={async(e) =>{
                const userId =e.target.value;
                const userName = await fetchUserName(userId);
                Form.setFieldsValue({user:{Name:userName}});
              }}
              />
            </MyFormItem>

            <MyFormItemGroup prefix={['name']}>
              <MyFormItem name="Name" label="Name">
                <Input placeholder="Enter name" className="input-box" required />
              </MyFormItem>

              <MyFormItem name="age" label="Age">
                <Input placeholder="Enter age" type="number" className="input-box" />
              </MyFormItem>
            </MyFormItemGroup>

            <MyFormItem name="mobile" label="Contact Number">
              <Input placeholder="Enter contact" type="phone" className="input-box" />
            </MyFormItem>

            <MyFormItem name="note" label="Note">
              <Input placeholder="Add your preferences & allergies." type="text" className="input-box" />
            </MyFormItem>
          </MyFormItemGroup>

          <MyFormItem name="image" label="Upload Prescription" valuePropName="fileList" getValueFromEvent={(e) => e.fileList}>
            <Upload name="image" listType="picture" beforeUpload={() => false} className="input-box" onChange={handleImageChange}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </MyFormItem>

          {imageUrl && (
            <div style={{ marginTop: "10px" }}>
              <p>Preview:</p>
              <img src={imageUrl} alt="Prescription Preview" style={{ width: "100%", maxHeight: "300px", objectFit: "contain" }} />
            </div>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Prescription; 