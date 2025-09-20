import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { queueService } from "../../services/queue";
import QueueList from "./QueueList";
import AddPatientModal from "./AddPatientModal";
import LoadingSpinner from "../common/LoadingSpinner";

const QueueManagement = () => {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadQueue();
  }, []);

  const loadQueue = async () => {
    try {
      const data = await queueService.getAllQueue();
      setQueue(data);
    } catch (error) {
      console.error("Failed to load queue:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPatient = async (patientData) => {
    try {
      await queueService.addToQueue(patientData);
      toast.success("Patient added to queue successfully!");
      loadQueue();
      setShowAddModal(false);
    } catch (error) {
      console.error("Failed to add patient:", error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await queueService.updateQueueStatus(id, status);
      toast.success("Queue status updated!");
      loadQueue();
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to update status";
      toast.error(errorMsg);
    }
  };

  const handleRemovePatient = async (id) => {
    if (window.confirm("Are you sure you want to remove this patient from the queue?")) {
      try {
        await queueService.removeFromQueue(id);
        toast.success("Patient removed from queue!");
        loadQueue();
      } catch (error) {
        console.error("Failed to remove patient:", error);
      }
    }
  };

  const handleClearQueue = async () => {
    if (window.confirm("Are you sure you want to clear the entire queue?")) {
      try {
        await queueService.clearQueue();
        toast.success("Queue cleared successfully!");
        loadQueue();
      } catch (error) {
        console.error("Failed to clear queue:", error);
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  const queueStats = {
    total: queue.length,
    waiting: queue.filter(p => p.status === 'waiting').length,
    withDoctor: queue.filter(p => p.status === 'with_doctor').length,
    priority: queue.filter(p => p.is_priority).length
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300"></div>
          <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 sm:p-6 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white">{queueStats.total}</p>
                <p className="text-gray-400 text-sm">Total Patients</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300"></div>
          <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 sm:p-6 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white">{queueStats.waiting}</p>
                <p className="text-gray-400 text-sm">Waiting</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300"></div>
          <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 sm:p-6 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white">{queueStats.withDoctor}</p>
                <p className="text-gray-400 text-sm">With Doctor</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300"></div>
          <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 sm:p-6 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white">{queueStats.priority}</p>
                <p className="text-gray-400 text-sm">Priority</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Queue Management Panel */}
      <div className="relative">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl"></div>
        <div className="relative p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 sm:gap-0">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Queue Management
                </h2>
                <p className="text-gray-400 mt-1">Manage patient queue and appointments</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                className="group relative px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={() => setShowAddModal(true)}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="hidden sm:inline">Add Patient</span>
                  <span className="sm:hidden">Add</span>
                </span>
              </button>
              
              {queue.length > 0 && (
                <button
                  className="group relative px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
                  onClick={handleClearQueue}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="hidden sm:inline">Clear Queue</span>
                    <span className="sm:hidden">Clear</span>
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Queue List */}
          <QueueList
            queue={queue}
            onUpdateStatus={handleUpdateStatus}
            onRemovePatient={handleRemovePatient}
          />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 opacity-60 rounded-t-3xl"></div>
      </div>

      {/* Add Patient Modal */}
      <AddPatientModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddPatient}
      />

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default QueueManagement;