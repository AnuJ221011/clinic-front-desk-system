import React from "react";

const QueueList = ({ queue, onUpdateStatus, onRemovePatient }) => {
  if (queue.length === 0) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"></div>
        <div className="relative text-center py-16 px-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No patients in queue</h3>
          <p className="text-gray-500">Add patients to get started with queue management</p>
        </div>
      </div>
    );
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case 'waiting':
        return {
          bg: 'from-yellow-500/20 to-orange-500/20',
          text: 'text-yellow-300',
          border: 'border-yellow-500/30',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      case 'with_doctor':
        return {
          bg: 'from-blue-500/20 to-indigo-500/20',
          text: 'text-blue-300',
          border: 'border-blue-500/30',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )
        };
      case 'completed':
        return {
          bg: 'from-emerald-500/20 to-green-500/20',
          text: 'text-emerald-300',
          border: 'border-emerald-500/30',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      default:
        return {
          bg: 'from-gray-500/20 to-gray-600/20',
          text: 'text-gray-300',
          border: 'border-gray-500/30',
          icon: null
        };
    }
  };

  return (
    <div className="w-full">
      {/* Mobile View: Enhanced Cards */}
      <div className="flex flex-col gap-6 md:hidden">
        {queue.map((patient, index) => {
          const statusConfig = getStatusConfig(patient.status);
          return (
            <div
              key={patient.id}
              className="relative group animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Background */}
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">#{patient.queue_number}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{patient.patient_name}</h3>
                      <p className="text-gray-400 text-sm">{patient.patient_phone || "No phone"}</p>
                    </div>
                  </div>
                  
                  {patient.is_priority && (
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-500/20 rounded-lg blur-sm"></div>
                      <div className="relative px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg text-sm font-semibold shadow-lg">
                        Priority
                      </div>
                    </div>
                  )}
                </div>

                {/* Status and Time */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r ${statusConfig.bg} ${statusConfig.text} rounded-xl border ${statusConfig.border}`}>
                    {statusConfig.icon}
                    <span className="font-medium capitalize">{patient.status.replace("_", " ")}</span>
                  </div>
                  
                  <div className="text-gray-400 text-sm flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{new Date(patient.created_at).toLocaleString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <select
                    value={patient.status}
                    onChange={(e) => onUpdateStatus(patient.id, e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all duration-200"
                  >
                    <option value="waiting" className="bg-gray-800">Waiting</option>
                    <option value="with_doctor" className="bg-gray-800">With Doctor</option>
                    <option value="completed" className="bg-gray-800">Completed</option>
                  </select>
                  
                  <button
                    onClick={() => onRemovePatient(patient.id)}
                    className="group relative px-2.5 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <span className="relative">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop View: Enhanced Table */}
      <div className="hidden md:block relative">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"></div>
        <div className="relative overflow-x-auto rounded-2xl">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Queue #</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Time Added</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {queue.map((patient, index) => {
                const statusConfig = getStatusConfig(patient.status);
                return (
                  <tr
                    key={patient.id}
                    className="hover:bg-white/5 transition-all duration-200 animate-fadeInUp"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center shadow-md">
                          <span className="text-white font-bold text-sm">{patient.queue_number}</span>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{patient.patient_name}</div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-gray-300">{patient.patient_phone || "N/A"}</div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r ${statusConfig.bg} ${statusConfig.text} rounded-xl border ${statusConfig.border}`}>
                        {statusConfig.icon}
                        <span className="font-medium capitalize">{patient.status.replace("_", " ")}</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      {patient.is_priority && (
                        <div className="inline-flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300 rounded-lg text-sm font-semibold border border-red-500/30">
                          <span>⚡</span>
                          <span>Priority</span>
                        </div>
                      )}
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-gray-400 text-sm flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{new Date(patient.created_at).toLocaleString()}</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <select
                          value={patient.status}
                          onChange={(e) => onUpdateStatus(patient.id, e.target.value)}
                          className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-gray-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all duration-200"
                        >
                          <option value="waiting" className="bg-gray-800">Waiting</option>
                          <option value="with_doctor" className="bg-gray-800">With Doctor</option>
                          <option value="completed" className="bg-gray-800">Completed</option>
                        </select>
                        
                        <button
                          onClick={() => onRemovePatient(patient.id)}
                          className="group relative p-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                          <span className="relative">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default QueueList;