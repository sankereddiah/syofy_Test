import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
      // console.log(JSON.parse(storedUserInfo))
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  if (!userInfo) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">YourLogo</div>
        <nav>
          <ul>
            <li className="active"><a href="#dashboard">Dashboard</a></li>
            <li><a href="#profile">Profile</a></li>
            <li><a href="#settings">Settings</a></li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Welcome back, {userInfo.user_firstname}!</h1>
          <div className="quick-stats">
            <div className="stat">
              <span className="stat-value">5</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat">
              <span className="stat-value">12</span>
              <span className="stat-label">Tasks</span>
            </div>
            <div className="stat">
              <span className="stat-value">3</span>
              <span className="stat-label">Notifications</span>
            </div>
          </div>
        </header>
        <section className="user-info-section">
          <h2>User Information</h2>
          <div className="user-info-grid">
            <div className="info-card">
              <i className="fas fa-user"></i>
              <h3>Name</h3>
              <p>{userInfo.user_firstname} {userInfo.user_lastname}</p>
            </div>
            <div className="info-card">
              <i className="fas fa-envelope"></i>
              <h3>Email</h3>
              <p>{userInfo.user_email}</p>
            </div>
            <div className="info-card">
              <i className="fas fa-phone"></i>
              <h3>Phone</h3>
              <p>{userInfo.user_phone}</p>
            </div>
            <div className="info-card">
              <i className="fas fa-map-marker-alt"></i>
              <h3>Location</h3>
              <p>{userInfo.user_city}, {userInfo.user_zipcode}</p>
            </div>
          </div>
        </section>
      </main>
      <button className="logout-button" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i> Logout
      </button>
    </div>
  );
};

export default Dashboard;