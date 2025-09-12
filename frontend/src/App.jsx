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

  const tabConfig = [
    { key: 'queue', label: 'Queue Management', icon: '⏱️' },
    { key: 'appointments', label: 'Appointments', icon: '📅' },
    { key: 'doctors', label: 'Doctors', icon: '👩‍⚕️' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-600 border-t-emerald-400 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-400 rounded-full animate-spin animate-reverse"></div>
          </div>
          <div className="text-gray-300 text-lg font-medium animate-pulse">Loading Healthcare System...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('user not logged in');
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Header user={user} onLogout={handleLogout} />

        {/* Main Content Container */}
        <div className="mt-8">
          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-700/50">
              <nav className="flex space-x-1 overflow-x-auto scrollbar-hide" aria-label="Tabs">
                {tabConfig.map((tab) => (
                  <button
                    key={tab.key}
                    className={`group relative min-w-0 flex-1 overflow-hidden py-4 px-6 text-center text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.key
                        ? 'text-white'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <span className="text-lg">{tab.icon}</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                    </span>
                    
                    {/* Active Tab Indicator */}
                    <span
                      className={`absolute inset-x-0 bottom-0 h-1 transition-all duration-300 ${
                        activeTab === tab.key
                          ? 'bg-gradient-to-r from-emerald-400 to-blue-500 scale-100'
                          : 'bg-gray-600 scale-0 group-hover:scale-100'
                      }`}
                    ></span>
                    
                    {/* Hover Background */}
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="relative">
            {/* Background Card */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl"></div>
            
            {/* Content */}
            <div className="relative p-6 sm:p-8">
              <div className="transition-all duration-300 ease-in-out">
                {activeTab === 'queue' && (
                  <div className="animate-fadeIn">
                    <QueueManagement />
                  </div>
                )}
                {activeTab === 'appointments' && (
                  <div className="animate-fadeIn">
                    <AppointmentManagement />
                  </div>
                )}
                {activeTab === 'doctors' && (
                  <div className="animate-fadeIn">
                    <DoctorManagement />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .bg-grid-white {
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-reverse {
          animation-direction: reverse;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default App;