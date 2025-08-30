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
      onSubmit(rescheduleData.id, {
        ...formData,
        status: "booked", // reset to booked when rescheduled
      });
    } else {
      onSubmit(formData);
    }
    onClose();
  };

  const timeSlots = [
    "09:00","09:30","10:00","10:30","11:00","11:30",
    "12:00","12:30","14:00","14:30","15:00","15:30",
    "16:00","16:30","17:00","17:30",
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={rescheduleData ? "Reschedule Appointment" : "Book Appointment"}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Patient Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Patient Name *
          </label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
            disabled={!!rescheduleData}
            className="w-full rounded-lg bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-60"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            name="patientPhone"
            value={formData.patientPhone}
            onChange={handleChange}
            required
            disabled={!!rescheduleData}
            className="w-full rounded-lg bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-60"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            name="patientEmail"
            value={formData.patientEmail}
            onChange={handleChange}
            disabled={!!rescheduleData}
            className="w-full rounded-lg bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-60"
          />
        </div>

        {/* Doctor */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Doctor *
          </label>
          <select
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            required
            className="w-full rounded-lg bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>

        {/* Date + Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Date *
            </label>
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              required
              className="w-full rounded-lg bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Time *
            </label>
            <select
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-gray-800 border border-gray-700 text-gray-200 px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
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

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
          <button
            type="submit"
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition shadow-md"
          >
            {rescheduleData ? "Reschedule" : "Book Appointment"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-medium px-5 py-2 rounded-lg transition shadow-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BookAppointmentModal;
