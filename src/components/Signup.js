import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    user_firstname: '',
    user_email: '',
    user_phone: '',
    user_password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.user_firstname.trim()) errors.user_firstname = 'First name is required';
    if (!formData.user_email.trim()) errors.user_email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.user_email)) errors.user_email = 'Email is invalid';
    if (!formData.user_phone.trim()) errors.user_phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.user_phone)) errors.user_phone = 'Phone number is invalid';
    if (!formData.user_password.trim()) errors.user_password = 'Password is required';
    else if (formData.user_password.length < 6) errors.user_password = 'Password must be at least 6 characters';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('https://syoft.dev/Api/user_registeration/api/user_registeration', {
          ...formData,
          user_lastname: 'Doe',
          user_city: 'Hyderabad',
          user_zipcode: '500072'
        });
        localStorage.setItem('userInfo', JSON.stringify({...formData,
          user_lastname: 'Doe',
          user_city: 'Hyderabad',
          user_zipcode: '500072'}));
        console.log(response.data);
        navigate('/login');
      } catch (error) {
        console.error('Error signing up:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="signup-container">
      <div className="welcome-section">
        <h1>Welcome to our community</h1>
        <p>Fuse helps developers to build organized and well coded dashboards full of beautiful and rich modules. Join us and start building your application today.</p>
        <div className="user-avatars">
          {/* Add user avatars here */}
        </div>
        <p>More than 17k people joined us, it's your turn</p>
      </div>
      <div className="form-section">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="user_firstname"
            placeholder="Full name"
            value={formData.user_firstname}
            onChange={handleChange}
          />
          {errors.user_firstname && <p className="error">{errors.user_firstname}</p>}
          
          <input
            type="email"
            name="user_email"
            placeholder="Email address"
            value={formData.user_email}
            onChange={handleChange}
          />
          {errors.user_email && <p className="error">{errors.user_email}</p>}
          
          <input
            type="password"
            name="user_password"
            placeholder="Password"
            value={formData.user_password}
            onChange={handleChange}
          />
          {errors.user_password && <p className="error">{errors.user_password}</p>}
          
          <input
            type="tel"
            name="user_phone"
            placeholder="Phone number"
            value={formData.user_phone}
            onChange={handleChange}
          />
          {errors.user_phone && <p className="error">{errors.user_phone}</p>}
          
          <input
            type="text"
            name="company"
            placeholder="Company"
          />
          
          <label>
            <input type="checkbox" required />
            I agree to the Terms of Service and Privacy Policy
          </label>
          
          <button type="submit">Create your free account</button>
        </form>
        <p>Already have an account? <a href="/login">Sign in</a></p>
      </div>
    </div>
  );
};

export default SignUp;