import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    user_email: '',
    user_password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.user_email.trim()) errors.user_email = 'Email is required';
    if (!formData.user_password.trim()) errors.user_password = 'Password is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log(formData)
        const response = await axios.post('https://syoft.dev/Api/userlogin/api/userlogin', formData);
        console.log(response.data)
        
        navigate('/dashboard');
      } catch (error) {
        console.error('Error logging in:', error);
        setErrors({ general: 'Invalid email or password' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Enter your credentials to access your account</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="user_email">Email</label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.user_email && <span className="error">{errors.user_email}</span>}
          </div>
          <div className="input-group">
            <label htmlFor="user_password">Password</label>
            <input
              type="password"
              id="user_password"
              name="user_password"
              value={formData.user_password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.user_password && <span className="error">{errors.user_password}</span>}
          </div>
          {errors.general && <div className="error general-error">{errors.general}</div>}
          <button type="submit" className="login-button">Log In</button>
        </form>
        <div className="login-footer">
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;