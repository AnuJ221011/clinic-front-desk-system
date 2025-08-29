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
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleRegister = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-8 h-8 border-4 border-gray-700 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // If no user logged in → show login/register
  if (!user) {
    return (
      <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-gray-200">
        {!showRegister ? (
          <>
            <Login onLogin={handleLogin} />
            <div className="text-center mt-4">
              <p className="text-sm text-gray-400">
                New user?{' '}
                <button
                  className="text-indigo-400 hover:text-indigo-300 font-medium transition"
                  onClick={() => setShowRegister(true)}
                >
                  Register here
                </button>
              </p>
            </div>
          </>
        ) : (
          <>
            <Register onRegister={handleRegister} />
            <div className="text-center mt-4">
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <button
                  className="text-indigo-400 hover:text-indigo-300 font-medium transition"
                  onClick={() => setShowRegister(false)}
                >
                  Login here
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    );
  }

  // If logged in → show dashboard
  return (
    <div className="max-w-6xl mx-auto p-5 text-gray-200">
      <Header user={user} onLogout={handleLogout} />

      {/* Navigation Tabs */}
      <div className="flex gap-4 border-b-2 border-gray-800 mb-6">
        <button
          className={`px-4 py-2 text-gray-400 border-b-2 transition ${
            activeTab === 'queue'
              ? 'text-indigo-400 border-indigo-400'
              : 'border-transparent hover:text-indigo-300'
          }`}
          onClick={() => setActiveTab('queue')}
        >
          Queue Management
        </button>
        <button
          className={`px-4 py-2 text-gray-400 border-b-2 transition ${
            activeTab === 'appointments'
              ? 'text-indigo-400 border-indigo-400'
              : 'border-transparent hover:text-indigo-300'
          }`}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
        <button
          className={`px-4 py-2 text-gray-400 border-b-2 transition ${
            activeTab === 'doctors'
              ? 'text-indigo-400 border-indigo-400'
              : 'border-transparent hover:text-indigo-300'
          }`}
          onClick={() => setActiveTab('doctors')}
        >
          Doctors
        </button>
      </div>

      {/* Active Tab Content */}
      {activeTab === 'queue' && <QueueManagement />}
      {activeTab === 'appointments' && <AppointmentManagement />}
      {activeTab === 'doctors' && <DoctorManagement />}
    </div>
  );
}

export default App;
