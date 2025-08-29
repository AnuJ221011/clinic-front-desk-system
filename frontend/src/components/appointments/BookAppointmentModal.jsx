import React, { useState } from 'react';
import Modal from '../common/Modal';

const BookAppointmentModal = ({ isOpen, onClose, onSubmit, doctors }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    appointmentDate: new Date().toISOString().split('T')[0],
    appointmentTime: '',
    doctorId: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      patientName: '',
      patientPhone: '',
      patientEmail: '',
      appointmentDate: new Date().toISOString().split('T')[0],
      appointmentTime: '',
      doctorId: ''
    });
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book Appointment">
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
          <label>Phone Number *</label>
          <input
            type="tel"
            name="patientPhone"
            value={formData.patientPhone}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="patientEmail"
            value={formData.patientEmail}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Doctor *</label>
          <select
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-2">
          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              className="form-control"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="form-group">
            <label>Time *</label>
            <select
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-1 mt-1">
          <button type="submit" className="btn btn-primary">
            Book Appointment
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BookAppointmentModal;