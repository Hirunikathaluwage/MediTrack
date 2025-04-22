import React, { useEffect, useState } from 'react';
import { getCustomerProfile, updateCustomerProfile } from '../../api/customerAPI';

const Profile = () => {
  const [profile, setProfile] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Attempt to get from backend
        const data = await getCustomerProfile();
        setProfile({ name: data.name, email: data.email, password: '' });
      } catch (err) {
        // Fallback: try from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          setProfile({ name: user.name, email: user.email, password: '' });
        } else {
          setMessage('⚠️ Failed to load profile');
        }
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password } = profile;
      const res = await updateCustomerProfile({ name, email, password });
      setMessage(res.message || '✅ Profile updated');
      localStorage.setItem('user', JSON.stringify({ name, email })); // keep local user in sync
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Update failed');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: '2rem' }}>
      <h2>My Profile</h2>
      <form onSubmit={handleUpdate}>
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Name"
          required
          style={inputStyle}
        />
        <input
          name="email"
          type="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={inputStyle}
        />
        <input
          name="password"
          type="password"
          value={profile.password}
          onChange={handleChange}
          placeholder="New Password (optional)"
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Update Profile</button>
      </form>
      {message && (
        <p style={{ marginTop: '1rem', color: message.includes('✅') ? 'green' : 'red' }}>
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
  backgroundColor: '#1976d2',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default Profile;
