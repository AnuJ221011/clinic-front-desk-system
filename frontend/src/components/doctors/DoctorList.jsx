import React from "react";

const DoctorList = ({ doctors, onEdit, onDelete }) => {
  if (doctors.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p>No doctors found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-700 bg-gray-900 text-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Specialization</th>
            <th className="px-4 py-3 text-left">Gender</th>
            <th className="px-4 py-3 text-left">Location</th>
            <th className="px-4 py-3 text-left">Availability</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr
              key={doctor.id}
              className="border-t border-gray-700 hover:bg-gray-800 transition"
            >
              <td className="px-4 py-3 font-semibold text-gray-100">
                {doctor.name}
              </td>
              <td className="px-4 py-3 text-gray-300">
                {doctor.specialization}
              </td>
              <td className="px-4 py-3 capitalize text-gray-300">
                {doctor.gender}
              </td>
              <td className="px-4 py-3 text-gray-300">{doctor.location}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {doctor.availability.map((day, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-md bg-indigo-600 text-white text-xs font-medium shadow-sm"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3 flex gap-2">
                <button
                  className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm shadow-md transition"
                  onClick={() => onEdit(doctor)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm shadow-md transition"
                  onClick={() => onDelete(doctor.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorList;
