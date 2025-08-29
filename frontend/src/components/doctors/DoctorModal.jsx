import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';

const DoctorModal = ({ isOpen, onClose, onSubmit, doctor, isEditing }) => {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    gender: 'male',
    location: '',
    availability: []
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    if (isEditing && doctor) {
      setFormData({
        name: doctor.name,
        specialization: doctor.specialization,
        gender: doctor.gender,
        location: doctor.location,
        availability: doctor.availability
      });
    } else {
      setFormData({
        name: '',
        specialization: '',
        gender: 'male',
        location: '',
        availability: []
      });
    }
  }, [doctor, isEditing, isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvailabilityChange = (day) => {
    const updatedAvailability = formData.availability.includes(day)
      ? formData.availability.filter(d => d !== day)
      : [...formData.availability, day];
    
    setFormData({
      ...formData,
      availability: updatedAvailability
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      onSubmit(doctor.id, formData);
    } else {
      onSubmit(formData);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Doctor' : 'Add Doctor'}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Doctor Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Specialization *</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="form-control"
            required
            placeholder="e.g. Cardiologist, Pediatrician"
          />
        </div>

        <div className="grid grid-2">
          <div className="form-group">
            <label>Gender *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="e.g. Room 101, Building A"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Availability *</label>
          <div className="grid grid-3" style={{ gap: '0.5rem', marginTop: '0.5rem' }}>
            {daysOfWeek.map((day) => (
              <label key={day} style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={formData.availability.includes(day)}
                  onChange={() => handleAvailabilityChange(day)}
                  style={{ marginRight: '0.5rem' }}
                />
                {day}
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-1 mt-1">
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update Doctor' : 'Add Doctor'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default DoctorModal;