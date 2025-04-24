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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/admin" element={<AppAdmin />} />
        <Route path="/user/delivery" element={<DeliveryForm />} />
        <Route path="/tracking/:deliveryId" element={<DeliveryTracking />} />
        <Route path="/rating/:deliveryId" element={<RatingPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/driver" element={<Login />} />
        <Route path="/driver/signup" element={<Signup />} />
        <Route path="/driver/dashboard/:id" element={<Dashboard />} />
        <Route path="/driver/profile" element={<Profile />} />
        <Route path="/driver/history" element={<DeliveryHistory />} />
        <Route path="/driver/details" element={<DeliveryDetails />} />

        {/* Add other routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;