import React from 'react';
import { Button, Form, Input, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const MyFormItemContext = React.createContext([]);


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
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="form-container">
      <Form name="form_item_path" layout="vertical" onFinish={onFinish} className="custom-form">
        <MyFormItemGroup prefix={['user']}>

        <MyFormItem name="userId" label="User ID">
          <Input placeholder="Enter User ID" className="input-box" />
        </MyFormItem>

          <MyFormItemGroup prefix={['name']}>

            <MyFormItem name="Name" label="Name">
              <Input placeholder="Enter name" className="input-box" />
            </MyFormItem>

          </MyFormItemGroup>

          <MyFormItem name="age" label="Age">
            <Input placeholder="Enter age" type="number" className="input-box" />
          </MyFormItem>

        </MyFormItemGroup>
        
        <MyFormItem name="branch" label="Branch">
          <Select placeholder="Select branch" className="input-box">
            <Select.Option value="cardiology">Cardiology</Select.Option>
            <Select.Option value="neurology">Neurology</Select.Option>
            <Select.Option value="orthopedics">Orthopedics</Select.Option>
          </Select>
        </MyFormItem>

        <MyFormItem name="image" label="Upload Prescription" valuePropName="fileList" getValueFromEvent={(e) => e.fileList}>
          <Upload name="image" listType="picture" beforeUpload={() => false} className="input-box">
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </MyFormItem>

        <Form.Item>
          <Button type="primary" htmlType="submit" >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Prescription;
