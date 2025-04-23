import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Result, Table, Typography, Button, Tag, message, Spin } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ShoppingCartOutlined,
  BookOutlined,
  MedicineBoxOutlined,
} from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

const Approval = () => {
  const [searchParams] = useSearchParams();
  const prescriptionId = searchParams.get("id");
  const [approved, setApproved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [medicines, setMedicines] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [reservedItems, setReservedItems] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  const pollingRef = useRef(null);

  useEffect(() => {
    if (prescriptionId) {
      startPollingStatus();
    } else {
      setLoading(false);
      setStatusMessage("No prescription ID provided.");
    }

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [prescriptionId]);

  const startPollingStatus = () => {
    fetchMedicines(); // Initial fetch
    pollingRef.current = setInterval(fetchMedicines, 5000); // Poll every 5s
  };

  const fetchMedicines = async () => {
    try {
      const res = await axios.get(`http://localhost:5080/prescription/approval/${prescriptionId}`);
      const data = res.data;
  
      console.log("Polling result:", data); 
  
      if (data.success && Array.isArray(data.medicines)) {
        const updatedMedicines = data.medicines.map(m => ({
          ...m,
          id: m.id || m._id,
        }));
        setMedicines(updatedMedicines);
        setApproved(true);
        clearInterval(pollingRef.current);
      } else {
        setStatusMessage("Prescription is not verified yet. Please wait.");
      }
    } catch (error) {
      if (error.response?.status === 403) {
        setStatusMessage("Prescription is not verified yet. Please wait.");
      } else if (error.response?.status === 404) {
        setStatusMessage("Prescription not found.");
      } else {
        setStatusMessage("An unexpected error occurred.");
      }
      setMedicines([]);
    } finally {
      setLoading(false);
    }
  };
  
  const addToCart = (medicine) => {
    if (!cartItems.some(item => item.id === medicine.id)) {
      setCartItems([...cartItems, { ...medicine, quantity: 1 }]);
      message.success();
    }
  };

  const reserve = (medicine) => {
    if (!reservedItems.some(item => item.id === medicine.id)) {
      setReservedItems([...reservedItems, medicine]);
      message.success();
    }
  };

  const columns = [
    {
      title: "Medicine",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <div className="flex items-center">
          <MedicineBoxOutlined style={{ color: "#0c8599", marginRight: 10 }} />
          <Text strong>{text}</Text>
        </div>
      )
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <Text style={{ color: "#0e9f6e", fontWeight: 'bold' }}>${price.toFixed(2)}</Text>
      )
    },
    {
      title: "Availability",
      dataIndex: "availability",
      key: "availability",
      render: (available) => (
        <Tag
          icon={available ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
          style={{
            padding: '4px 12px',
            borderRadius: '12px',
            background: available ? 'rgba(14, 159, 110, 0.1)' : 'rgba(220, 38, 38, 0.1)',
            color: available ? '#0e9f6e' : '#dc2626'
          }}
        >
          {available ? 'In Stock' : 'Out of Stock'}
        </Tag>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (_, medicine) => {
        const alreadyInCart = cartItems.some(item => item.id === medicine.id);
        return (
          <div className="flex gap-2">
            <Button
              icon={<ShoppingCartOutlined />}
              disabled={!medicine.availability || alreadyInCart}
              onClick={() => addToCart(medicine)}
              style={{
                borderRadius: '6px',
                color: alreadyInCart ? 'white' : '#0e9f6e',
                background: alreadyInCart ? 'linear-gradient(90deg, #0e9f6e, #0c8599)' : 'white',
                border: alreadyInCart ? 'none' : '1px solid #0e9f6e',
              }}
            >
              {alreadyInCart ? 'Added' : 'Add to Cart'}
            </Button>

            <Button
              icon={<BookOutlined />}
              disabled={medicine.availability}
              onClick={() => reserve(medicine)}
              style={{
                borderRadius: '6px',
                border: '1px solid #0c8599',
                color: '#0c8599',
              }}
            >
              Reserve
            </Button>
          </div>
        );
      }
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!approved) {
    return (
      <div className="max-w-xl mt-10 mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-10">
          <Result
            status="info"
            title="Awaiting Verification"
            subTitle={statusMessage || "Please wait while your prescription is being verified."}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 flex justify-center items-start bg-gradient-to-br from-cyan-100 to-teal-100">
      <div className="max-w-6xl w-full bg-white p-6 rounded-lg shadow-xl">
        <Title level={2} style={{ color: "#0c8599" }}>
          Your Prescribed Medicines
        </Title>
        <Table
          dataSource={medicines}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </div>
    </div>
  );
};

export default Approval;