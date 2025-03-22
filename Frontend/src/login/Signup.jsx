import { useState, useEffect } from 'react';
import axios from 'axios';
import './signup.css';



function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
    age: ''
  });
  const [message, setMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('Very Weak');
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    // Check requirements
    const newRequirements = {
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    };
    
    setRequirements(newRequirements);
    
    // Determine strength
    const metCount = Object.values(newRequirements).filter(Boolean).length;
    
    if (metCount === 0) setPasswordStrength('Very Weak');
    else if (metCount === 1) setPasswordStrength('Weak');
    else if (metCount === 2) setPasswordStrength('Medium');
    else if (metCount === 3) setPasswordStrength('Strong');
    else if (metCount >= 4) setPasswordStrength('Very Strong');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/register', formData);
      setMessage(response.data.message || 'Registration successful!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred during registration.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Create Account</h1>
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <div className="input-icon">
              <i className="user-icon"></i>
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>
          
          <div className="form-group">
            <div className="input-icon">
              <i className="email-icon"></i>
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
          </div>
          
          <div className="form-group">
            <div className="input-icon">
              <i className="password-icon"></i>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          <div className="form-group">
            <div className="input-icon">
              <i className="address-icon"></i>
            </div>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              required
            />
          </div>

          <div className="form-group">
            <div className="input-icon">
              <i className="phone-icon"></i>
            </div>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />
          </div>

          <div className="form-group">
            <div className="input-icon">
              <i className="age-icon"></i>
            </div>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              required
            />
          </div>
          
          <div className="password-strength">
            <span>Password strength</span>
            <div className="strength-meter">
              <div className={`strength-bar ${passwordStrength.toLowerCase().replace(' ', '-')}`}></div>
            </div>
            <span className="strength-text">{passwordStrength}</span>
          </div>
          
          <div className="password-requirements">
            <div className={`requirement ${requirements.length ? 'met' : 'unmet'}`}>
              <span className="check-icon"></span>
              <span>At least 6 characters</span>
            </div>
            <div className={`requirement ${requirements.uppercase ? 'met' : 'unmet'}`}>
              <span className="check-icon"></span>
              <span>Contains uppercase letter</span>
            </div>
            <div className={`requirement ${requirements.lowercase ? 'met' : 'unmet'}`}>
              <span className="check-icon"></span>
              <span>Contains lowercase letter</span>
            </div>
            <div className={`requirement ${requirements.number ? 'met' : 'unmet'}`}>
              <span className="check-icon"></span>
              <span>Contains a number</span>
            </div>
            <div className={`requirement ${requirements.special ? 'met' : 'unmet'}`}>
              <span className="check-icon"></span>
              <span>Contains special character</span>
            </div>
          </div>
          
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        
        {message && (
          <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
        
        <div className="login-link">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Signup;