import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Component/Dashboard';
import InquiryForm from './Component/InquiryForm';
import Home from './Component/Home';
import Success from './Component/Success';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/inquiries" element={<Home />} />
      <Route path="/create-inquiry" element={<InquiryForm />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
}

export default App;
