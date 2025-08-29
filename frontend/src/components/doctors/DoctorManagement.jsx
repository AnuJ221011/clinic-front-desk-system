import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { doctorService } from '../../services/doctors';
import DoctorList from './DoctorList';
import DoctorModal from './DoctorModal';
import LoadingSpinner from '../common/LoadingSpinner';

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [filters, setFilters] = useState({
    specialization: '',
    location: ''
  });

  useEffect(() => {
    loadDoctors();
  }, [filters]);

  const loadDoctors = async () => {
    try {
      const data = await doctorService.getAllDoctors(filters);
      setDoctors(data);
    } catch (error) {
      console.error('Failed to load doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDoctor = async (doctorData) => {
    try {
      await doctorService.createDoctor(doctorData);
      toast.success('Doctor added successfully!');
      loadDoctors();
      setShowModal(false);
    } catch (error) {
      console.error('Failed to add doctor:', error);
    }
  };

  const handleUpdateDoctor = async (id, doctorData) => {
    try {
      await doctorService.updateDoctor(id, doctorData);
      toast.success('Doctor updated successfully!');
      loadDoctors();
      setShowModal(false);
      setEditingDoctor(null);
    } catch (error) {
      console.error('Failed to update doctor:', error);
    }
  };

  const handleDeleteDoctor = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await doctorService.deleteDoctor(id);
        toast.success('Doctor deleted successfully!');
        loadDoctors();
      } catch (error) {
        console.error('Failed to delete doctor:', error);
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
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="card">
        <div className="flex flex-between flex-align-center mb-1">
          <h2>Doctor Management</h2>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Add Doctor
          </button>
        </div>

        <div className="grid grid-2 mb-1">
          <div className="form-group">
            <label>Filter by Specialization</label>
            <input
              type="text"
              name="specialization"
              value={filters.specialization}
              onChange={handleFilterChange}
              className="form-control"
              placeholder="Search specialization..."
            />
          </div>
          <div className="form-group">
            <label>Filter by Location</label>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="form-control"
              placeholder="Search location..."
            />
          </div>
        </div>

        <DoctorList
          doctors={doctors}
          onEdit={handleEdit}
          onDelete={handleDeleteDoctor}
        />
      </div>

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