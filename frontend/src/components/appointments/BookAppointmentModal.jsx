import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";

const BookAppointmentModal = ({ isOpen, onClose, onSubmit, doctors, rescheduleData }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    appointmentDate: new Date().toISOString().split("T")[0],
    appointmentTime: "",
    doctorId: "",
  });

  useEffect(() => {
    if (rescheduleData) {
      setFormData({
        patientName: rescheduleData.patient_name,
        patientPhone: rescheduleData.patient_phone,
        patientEmail: rescheduleData.patient_email || "",
        appointmentDate: rescheduleData.appointment_date.split("T")[0],
        appointmentTime: rescheduleData.appointment_time,
        doctorId: rescheduleData.doctor_id,
      });
    }
  }, [rescheduleData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rescheduleData) {
      // update existing appointment
      onSubmit(rescheduleData.id, {
        ...formData,
        status: "booked", // reset to booked when rescheduled
      });
    } else {
      // new appointment
      onSubmit(formData);
    }
    onClose();
  };

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={rescheduleData ? "Reschedule Appointment" : "Book Appointment"}
    >
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
            disabled={!!rescheduleData} // patient info fixed in reschedule
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
            disabled={!!rescheduleData}
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
            disabled={!!rescheduleData}
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
              min={new Date().toISOString().split("T")[0]}
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
            {rescheduleData ? "Reschedule" : "Book Appointment"}
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
