import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

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

// Optional fallback pages
import Unauthorized from './pages/Unauthorized';
// import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <Navbar />

      <div style={{ padding: '20px' }}>
        <Routes>

          {/* 🔓 Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔒 Customer-Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/submit-inquiry"
            element={
              <ProtectedRoute>
                <SubmitInquiry />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-inquiries"
            element={
              <ProtectedRoute>
                <ViewInquiries />
              </ProtectedRoute>
            }
          />

          {/* 🔐 Admin-Protected Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/panel"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-inquiries"
            element={
              <ProtectedRoute requiredRole="admin">
                <ManageInquiries />
              </ProtectedRoute>
            }
          />

          {/* 🚫 Unauthorized Access Fallback */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* 🔁 Default: Redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
