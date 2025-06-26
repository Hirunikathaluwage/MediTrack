import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'admin@gmail.com' && password === 'Admin123@') {
      const adminUser = {
        name: 'Admin',
        email,
        role: 'admin',
      };

      localStorage.setItem('user', JSON.stringify(adminUser));
      setMessage(' Admin login successful');
      setTimeout(() => navigate('/admin/dashboard-home', { replace: true }), 500);
    } else {
      setMessage(' Invalid admin credentials');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Admin Email"
          required
          style={inputStyle}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
      {message && (
        <p style={{
          marginTop: '1rem',
          color: message.includes('✅') ? 'green' : 'red',
          fontWeight: 'bold'
        }}>
          {message}
        </p>
      )}
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#d32f2f',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default AdminLogin;
