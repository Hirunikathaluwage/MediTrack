import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderHistory from './pages/OrderHistory';
import ReserveConfirmation from './pages/ReserveConfirmation';
import DashboardLayout from './pages/AdminOrderDashboard';
import VerifyPayments from './pages/VerifyPaymentsPage'
import ApprovedMedicines from './pages/ApprovedMedicines'
import Prescription from './pages/Prescription'
import ManageReservationsPage from './pages/ManageReservationsPage';

function App() {


  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Prescription />} />
          <Route path="/approved-medicines" element={<ApprovedMedicines />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment/:orderId" element={<PaymentPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/reserve-confirmation" element={<ReserveConfirmation />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/verify-payments" element={<VerifyPayments />} />
          <Route path="/manage-reservations" element={<ManageReservationsPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
