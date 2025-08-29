import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 text-gray-100 rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            className="text-gray-400 hover:text-red-400 text-2xl font-bold transition"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="text-gray-300">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
