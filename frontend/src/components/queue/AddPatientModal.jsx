import React, { useState } from "react";
import Modal from "../common/Modal";

const AddPatientModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    isPriority: false,
  });

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      patientName: "",
      patientPhone: "",
      isPriority: false,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Patient to Queue">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 text-gray-200 max-h-[80vh] overflow-y-auto"
      >
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
            placeholder="Enter patient name"
            className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="patientPhone"
            value={formData.patientPhone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Priority Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isPriority"
            checked={formData.isPriority}
            onChange={handleChange}
            className="h-4 w-4 text-blue-500 border-gray-600 rounded bg-gray-700 focus:ring-blue-500"
          />
          <label className="ml-2 block text-sm text-gray-300">
            Priority Patient
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Add to Queue
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg shadow hover:bg-gray-600 transition w-full sm:w-auto"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPatientModal;