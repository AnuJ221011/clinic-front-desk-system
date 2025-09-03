import React, { useState, useEffect } from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/common/Header';
import QueueManagement from './components/queue/QueueManagement';
import AppointmentManagement from './components/appointments/AppointmentManagement';
import DoctorManagement from './components/doctors/DoctorManagement';
import { authService } from './services/auth';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('queue');
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) setUser(JSON.parse(userData));
    setLoading(false);
  }, []);

  const handleLogin = (userData) => setUser(userData);
  const handleRegister = (userData) => setUser(userData);
  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-10 h-10 border-4 border-gray-700 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-gray-900 min-h-screen">
        {!showRegister ? (
          <Login 
            onLogin={handleLogin} 
            onSwitchToRegister={() => setShowRegister(true)}
          />
        ) : (
          <Register 
            onRegister={handleRegister} 
            onSwitchToLogin={() => setShowRegister(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-5 text-gray-200">
      <Header user={user} onLogout={handleLogout} />

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-4 border-b-2 border-gray-800 mb-6">
        {['queue', 'appointments', 'doctors'].map((tab) => (
          <button
            key={tab}
            className={`px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base rounded transition border-b-2 ${
              activeTab === tab
                ? 'text-indigo-400 border-indigo-400'
                : 'text-gray-400 border-transparent hover:text-indigo-300'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'queue'
              ? 'Queue Management'
              : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className="w-full">
        {activeTab === 'queue' && <QueueManagement />}
        {activeTab === 'appointments' && <AppointmentManagement />}
        {activeTab === 'doctors' && <DoctorManagement />}
      </div>
    </div>
  );
}

export default App;