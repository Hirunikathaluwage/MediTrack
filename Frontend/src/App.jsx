import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import MedicineList from './pages/MedicineList';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderHistory from './pages/OrderHistory';
import ReserveConfirmation from './pages/ReserveConfirmation';
import DashboardLayout from './pages/AdminOrderDashboard';
import VerifyPayments from './pages/VerifyPaymentsPage'
import ApprovedMedicines from './pages/ApprovedMedicines'
import Prescription from './pages/Prescription'

function App() {

  // useEffect(() => {
  //   // Temporarily setting a dummy userId in localStorage (only for testing purposes)
  //   if (!localStorage.getItem('userId')) {
  //     localStorage.setItem('userId', '67ddfc9755c1bec1fb5cf57f');
  //   }
  // }, []);

  return (
    <>

      <Router>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          {/* <Route path="/medicines-from-prescription" element={<MedicineList />} /> */}
          <Route path="/" element={<Prescription />} />
          <Route path="/approved-medicines" element={<ApprovedMedicines />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment/:orderId" element={<PaymentPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/reserve-confirmation" element={<ReserveConfirmation />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/admin/verify-payments" element={<VerifyPayments />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
