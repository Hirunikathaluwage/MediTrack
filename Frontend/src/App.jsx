import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Customer Pages
import Login from './pages/Customer/Login';
import Register from './pages/Customer/Register';
import Dashboard from './pages/Customer/Dashboard';
import Profile from './pages/Customer/Profile';

// Inquiry Pages
import SubmitInquiry from './pages/Inquiry/AddInquiry';
import ViewInquiries from './pages/Inquiry/ViewInquiries';

// Admin Pages
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageInquiries from './pages/Admin/ManageInquiries';
import NotificationPage from './pages/Admin/NotificationPage'; // ✅ Added

// Customer Home
import { CustomerHome } from './Home/components/PagesHome/CustomerHome';

// Admin Dashboard Home
import { DashboardHome } from './Home/components/dashboard/DashboardHome';

// Fallback Pages
import Unauthorized from './pages/Unauthorized';
// import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <Navbar />

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div style={{ padding: '20px' }}>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Customer-Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/submit-inquiry" element={<ProtectedRoute><SubmitInquiry /></ProtectedRoute>} />
          <Route path="/view-inquiries" element={<ProtectedRoute><ViewInquiries /></ProtectedRoute>} />
          <Route path="/customer/home" element={<ProtectedRoute requiredRole="customer"><CustomerHome /></ProtectedRoute>} />

          {/* Admin-Protected Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/panel" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/manage-inquiries" element={<ProtectedRoute requiredRole="admin"><ManageInquiries /></ProtectedRoute>} />
          <Route path="/admin/dashboard-home" element={<ProtectedRoute requiredRole="admin"><DashboardHome /></ProtectedRoute>} />
          <Route path="/admin/notifications" element={<ProtectedRoute requiredRole="admin"><NotificationPage /></ProtectedRoute>} />

          {/* Unauthorized Access */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Default: Redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;