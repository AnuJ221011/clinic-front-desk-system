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
    location: "",
  });

  useEffect(() => {
    loadDoctors();
  }, [filters]);

  const loadDoctors = async () => {
    try {
      const data = await doctorService.getAllDoctors(filters);
      setDoctors(data);
    } catch (error) {
      console.error("Failed to load doctors:", error);
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

  return (
    <div className="p-6">
      <div className="bg-gray-900 text-gray-200 rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Doctor Management</h2>
          <button
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition shadow-md"
            onClick={() => setShowModal(true)}
          >
            Add Doctor
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Filter by Specialization
            </label>
            <input
              type="text"
              name="specialization"
              value={filters.specialization}
              onChange={handleFilterChange}
              className="w-full border border-gray-700 rounded-md p-2 bg-gray-800 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Search specialization..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Filter by Location
            </label>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="w-full border border-gray-700 rounded-md p-2 bg-gray-800 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Search location..."
            />
          </div>
        </div>

        {/* Doctor List */}
        <DoctorList
          doctors={doctors}
          onEdit={handleEdit}
          onDelete={handleDeleteDoctor}
        />
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
  );
};

export default DoctorManagement;
