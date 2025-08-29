import React, { useState } from 'react';
import Modal from '../common/Modal';

const AddPatientModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    isPriority: false
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      patientName: '',
      patientPhone: '',
      isPriority: false
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Patient to Queue">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Patient Name *</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="patientPhone"
            value={formData.patientPhone}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="isPriority"
              checked={formData.isPriority}
              onChange={handleChange}
              style={{ marginRight: '0.5rem' }}
            />
            Priority Patient
          </label>
        </div>

        <div className="flex gap-1 mt-1">
          <button type="submit" className="btn btn-primary">
            Add to Queue
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPatientModal;