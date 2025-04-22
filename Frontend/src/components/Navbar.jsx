import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav
      style={{
        backgroundColor: '#1976d2',
        color: '#fff',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
          MediTrack
        </Link>
      </div>
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link to="/login" style={navLinkStyle}>Login</Link>
        <Link to="/register" style={navLinkStyle}>Register</Link>
        <Link to="/dashboard" style={navLinkStyle}>Dashboard</Link>
        <Link to="/profile" style={navLinkStyle}>Profile</Link>
        <Link to="/submit-inquiry" style={navLinkStyle}>Submit Inquiry</Link>
        <Link to="/view-inquiries" style={navLinkStyle}>My Inquiries</Link>

        <Link to="/admin/login" style={navLinkStyle}>Admin Login</Link>
        <Link to="/admin/panel" style={navLinkStyle}>Admin Panel</Link>
        <Link to="/admin/manage-inquiries" style={navLinkStyle}>Manage Inquiries</Link>
      </div>
    </nav>
  );
};

const navLinkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '14px'
};

export default Navbar;
