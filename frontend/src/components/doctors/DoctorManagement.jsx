import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { doctorService } from "../../services/doctors";
import DoctorList from "./DoctorList";
import DoctorModal from "./DoctorModal";
import LoadingSpinner from "../common/LoadingSpinner";

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [filters, setFilters] = useState({
    specialization: "",
    location: ""
  });

  // Debounce loading doctors when filters change
  useEffect(() => {
    const timer = setTimeout(() => loadDoctors(), 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const loadDoctors = async () => {
    setLoading(true);
    try {
      const data = await doctorService.getAllDoctors(filters);
      setDoctors(data);
    } catch (error) {
      console.error("Failed to load doctors:", error);
      toast.error("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  const handleAddDoctor = async (doctorData) => {
    try {
      await doctorService.createDoctor(doctorData);
      toast.success("Doctor added successfully!");
      loadDoctors();
      setShowModal(false);
    } catch (error) {
      console.error("Failed to add doctor:", error);
      toast.error("Failed to add doctor!");
    }
  };

  const handleUpdateDoctor = async (id, doctorData) => {
    try {
      await doctorService.updateDoctor(id, doctorData);
      toast.success("Doctor updated successfully!");
      loadDoctors();
      setShowModal(false);
      setEditingDoctor(null);
    } catch (error) {
      console.error("Failed to update doctor:", error);
      toast.error("Failed to update doctor!");
    }
  };

  const handleDeleteDoctor = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await doctorService.deleteDoctor(id);
        toast.success("Doctor deleted successfully!");
        loadDoctors();
      } catch (error) {
        console.error("Failed to delete doctor:", error);
        toast.error("Failed to delete doctor!");
      }
    }
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingDoctor(null);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) return <LoadingSpinner />;

  const doctorStats = {
    total: doctors.length,
    male: doctors.filter(d => d.gender === 'male').length,
    female: doctors.filter(d => d.gender === 'female').length,
    specializations: [...new Set(doctors.map(d => d.specialization))].length
  };

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* total */}
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
                  <p className="text-2xl sm:text-3xl font-bold text-white">{doctorStats.total}</p>
                  <p className="text-gray-400 text-sm">Total Doctors</p>
                </div>
              </div>
            </div>
          </div>
          {/* male */}
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
                  <p className="text-2xl sm:text-3xl font-bold text-white">{doctorStats.male}</p>
                  <p className="text-gray-400 text-sm">Male</p>
                </div>
              </div>
            </div>
          </div>
          {/* female */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300"></div>
            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 sm:p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{doctorStats.female}</p>
                  <p className="text-gray-400 text-sm">Female</p>
                </div>
              </div>
            </div>
          </div>
          {/* specializations */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300"></div>
            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 sm:p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-violet-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{doctorStats.specializations}</p>
                  <p className="text-gray-400 text-sm">Specializations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Doctor Management Panel */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl"></div>
          <div className="relative p-6 sm:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 sm:gap-0">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                    Doctor Management
                  </h2>
                  <p className="text-gray-400 mt-1">Manage healthcare professionals</p>
                </div>
              </div>
              <button
                className="group relative px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={() => {
                  setEditingDoctor(null);
                  setShowModal(true);
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="hidden sm:inline">Add Doctor</span>
                  <span className="sm:hidden">Add</span>
                </span>
              </button>
            </div>
            
            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-200">
                  <div className="w-5 h-5 bg-gradient-to-br from-blue-400 to-blue-500 rounded-md flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <span>Filter by Specialization</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="specialization"
                    value={filters.specialization}
                    onChange={handleFilterChange}
                    placeholder="Search specialization..."
                    className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300 hover:bg-white/15"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-200">
                  <div className="w-5 h-5 bg-gradient-to-br from-purple-400 to-purple-500 rounded-md flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <span>Filter by Location</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    placeholder="Search location..."
                    className="w-full px-4 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-300 hover:bg-white/15"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            </div>
            
            {/* Doctor List */}
            <DoctorList
              doctors={doctors}
              onEdit={handleEdit}
              onDelete={handleDeleteDoctor}
            />
          </div>
        </div>
        
        {/* Doctor Modal */}
        <DoctorModal
          isOpen={showModal}
          onClose={handleCloseModal}
          onSubmit={editingDoctor ? handleUpdateDoctor : handleAddDoctor}
          doctor={editingDoctor}
          isEditing={!!editingDoctor}
        />
      </div>
    </div>
  );
};

export default DoctorManagement;
