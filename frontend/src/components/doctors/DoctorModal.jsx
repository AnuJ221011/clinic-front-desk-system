import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";

const DoctorModal = ({ isOpen, onClose, onSubmit, doctor, isEditing }) => {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    gender: "male",
    location: "",
    availability: [],
  });

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    if (isEditing && doctor) {
      setFormData({
        name: doctor.name,
        specialization: doctor.specialization,
        gender: doctor.gender,
        location: doctor.location,
        availability: doctor.availability,
      });
    } else {
      setFormData({
        name: "",
        specialization: "",
        gender: "male",
        location: "",
        availability: [],
      });
    }
  }, [doctor, isEditing, isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvailabilityChange = (day) => {
    const updatedAvailability = formData.availability.includes(day)
      ? formData.availability.filter((d) => d !== day)
      : [...formData.availability, day];

    setFormData({
      ...formData,
      availability: updatedAvailability,
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Doctor" : "Add Doctor"}
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-gray-200">
        {/* Doctor Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Doctor Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-700 rounded-md p-2 bg-gray-800 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Specialization */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Specialization *
          </label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full border border-gray-700 rounded-md p-2 bg-gray-800 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
            placeholder="e.g. Cardiologist, Pediatrician"
          />
        </div>

        {/* Gender + Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Gender *
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-700 rounded-md p-2 bg-gray-800 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-700 rounded-md p-2 bg-gray-800 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              placeholder="e.g. Room 101, Building A"
            />
          </div>
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Availability *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {daysOfWeek.map((day) => (
              <label
                key={day}
                className="flex items-center space-x-2 text-sm text-gray-300"
              >
                <input
                  type="checkbox"
                  checked={formData.availability.includes(day)}
                  onChange={() => handleAvailabilityChange(day)}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-600 rounded bg-gray-700"
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
          >
            {isEditing ? "Update Doctor" : "Add Doctor"}
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-700 text-gray-200 text-sm rounded-md hover:bg-gray-600 transition"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default DoctorModal;
