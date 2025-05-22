import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import AppAdmin from './components/AppAdmin';
import RoleSelection from './RoleSelection';
import DeliveryForm from './components/customer/DeliveryForm';
import DeliveryTracking from './components/customer/DeliveryTracking';
import RatingPage from './components/customer/RatingPage';
import ThankYouPage from './components/customer/ThankYouPage';
import Login from './components/driver/Login';
import Signup from './components/driver/Signup';
import Dashboard from './components/driver/Dashboard';
import Profile from './components/driver/Profile';
import DeliveryHistory from './components/driver/DeliveryHistory';
import DeliveryDetails from './components/driver/DeliveryDetails';
import Layout from './components/driver/layout/Layout'; // import your Layout

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<RoleSelection />} />
        <Route path="/admin" element={<AppAdmin />} />
        <Route path="/user/delivery" element={<DeliveryForm />} />
        <Route path="/tracking/:deliveryId" element={<DeliveryTracking />} />
        <Route path="/rating/:deliveryId" element={<RatingPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/driver" element={<Login />} />
        <Route path="/driver/signup" element={<Signup />} />

        {/* Driver Protected Routes */}
        <Route path="/driver/dashboard/:id" element={<Layout><Dashboard /></Layout>} /> {/* ✅ Fixed here */}
        <Route path="/driver/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/driver/history" element={<Layout><DeliveryHistory /></Layout>} />
        <Route path="/driver/delivery/:id" element={<Layout><DeliveryDetails /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
