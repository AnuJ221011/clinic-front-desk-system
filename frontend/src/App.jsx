import React, { useState, useEffect } from 'react';
import Login from './components/auth/Login';
import Header from './components/common/Header';
import QueueManagement from './components/queue/QueueManagement';
import AppointmentManagement from './components/appointments/AppointmentManagement';
import DoctorManagement from './components/doctors/DoctorManagement';
import { authService } from './services/auth';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('queue');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="container">
      <Header user={user} onLogout={handleLogout} />
      
      <div className="nav-tabs">
        <button 
          className={`nav-tab ${activeTab === 'queue' ? 'active' : ''}`}
          onClick={() => setActiveTab('queue')}
        >
          Queue Management
        </button>
        <button 
          className={`nav-tab ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
        <button 
          className={`nav-tab ${activeTab === 'doctors' ? 'active' : ''}`}
          onClick={() => setActiveTab('doctors')}
        >
          Doctors
        </button>
      </div>

      {activeTab === 'queue' && <QueueManagement />}
      {activeTab === 'appointments' && <AppointmentManagement />}
      {activeTab === 'doctors' && <DoctorManagement />}
    </div>
  );
}

export default App;