import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'antd';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleNavigate = (role) => {
    if (role === 'customer') navigate('/user/delivery');
    else if (role === 'admin') navigate('/admin');
    else if (role === 'driver') navigate('/driver'); // optional
  };
  

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Welcome to MediTrack 🚑</h1>
        <p className="text-lg text-gray-100">Select your role to continue</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <Card className="rounded-2xl shadow-xl text-center" hoverable>
          <p className="text-xl font-semibold mb-4">Customer</p>
          <Button type="primary" onClick={() => handleNavigate('customer')}>
            Enter Delivery Portal
          </Button>
        </Card>

        <Card className="rounded-2xl shadow-xl text-center" hoverable>
          <p className="text-xl font-semibold mb-4">Admin</p>
          <Button onClick={() => handleNavigate('admin')}>Admin Panel</Button>
        </Card>

        <Card className="rounded-2xl shadow-xl text-center" hoverable>
          <p className="text-xl font-semibold mb-4">Driver</p>
          <Button onClick={() => handleNavigate('driver')}>Driver View</Button>
        </Card>
      </div>
    </div>
  );
};

export default RoleSelection;
