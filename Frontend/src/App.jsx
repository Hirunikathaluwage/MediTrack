import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './index.css';
import DeliveryForm from './DeliveryForm';
import Success from './Success';
import DeliveryMain from './DeliveryMain';
import DeliveryRate from './DeliveryRate';
import Thankyou from './Thankyou';
import DeliveryAdmin from './DeliveryAdmin';
import ManageDeliveries from './ManageDeliveries';
import ManageDrivers from './ManageDrivers';
import Feedbacks from './Feedbacks';
import Profile from './Profile';
import DriverHome from './DriverHome';
import DriverNext from './DriverNext';
import AssignDriver from './AssignDriver';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; // Import Router components

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to MediTrack</h1>
      <button onClick={() => navigate('/delivery')}>Go to Delivery Form</button><br></br>
      <button onClick={() => navigate('/delivery-admin')}>Go to Delivery Admin Page</button><br></br>
      <button onClick={() => navigate('/driver-home')}>Go to Driver Page</button>
    </div>
  );
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Default route */}
        <Route path="/delivery" element={<DeliveryForm />} />
        <Route path="/success" element={<Success />} /> {/* Success page route */}
        <Route path="/delivery-main" element={<DeliveryMain />} />
        <Route path="/delivery-rate" element={<DeliveryRate />} />
        <Route path="/thankyou" element={<Thankyou />} />
        <Route path="/delivery-admin" element={<DeliveryAdmin />} />
        <Route path="/manage-deliveries" element={<ManageDeliveries />} />
        <Route path="/manage-drivers" element={<ManageDrivers />} />
        <Route path="/feedbacks" element={<Feedbacks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/driver-home" element={<DriverHome />} />
        <Route path="/driver-next" element={<DriverNext />} />
        <Route path="/assign-driver" element={<AssignDriver />} />
      </Routes>
    </Router>
  );
}

export default App;