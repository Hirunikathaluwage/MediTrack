import React from 'react';
import { Navigate } from 'react-router-dom';

// ✅ Checks if a user is stored in localStorage
const isAuthenticated = () => {
  return !!localStorage.getItem('user');
};

// ✅ Role-based access check
const hasRequiredRole = (user, requiredRole) => {
  if (!requiredRole) return true;
  return user?.role === requiredRole;
};

const ProtectedRoute = ({ children, requiredRole }) => {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (err) {
    console.warn('Failed to parse user from localStorage:', err);
    return <Navigate to="/login" replace />;
  }

  if (!isAuthenticated() || !user) {
    console.log('🔒 Not authenticated');
    return <Navigate to="/login" replace />;
  }

  if (!hasRequiredRole(user, requiredRole)) {
    console.log('🚫 Access denied. Required role:', requiredRole);
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
