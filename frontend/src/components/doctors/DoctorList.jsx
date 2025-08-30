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
    <div className="w-full">
      {/* Mobile View: Cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-200">{doctor.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(doctor)}
                  className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(doctor.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="text-gray-300 text-sm">
              <span className="font-medium">Specialization:</span> {doctor.specialization}
            </div>
            <div className="text-gray-300 text-sm">
              <span className="font-medium">Gender:</span> {doctor.gender}
            </div>
            <div className="text-gray-300 text-sm">
              <span className="font-medium">Location:</span> {doctor.location}
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {doctor.availability.map((day, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 rounded-md bg-indigo-600 text-white text-xs font-medium shadow-sm"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View: Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full min-w-[700px] border border-gray-700 bg-gray-900 text-gray-200">
          <thead className="bg-gray-800 text-gray-300 text-xs sm:text-sm">
            <tr>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Specialization</th>
              <th className="px-3 py-2 text-left">Gender</th>
              <th className="px-3 py-2 text-left">Location</th>
              <th className="px-3 py-2 text-left">Availability</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {doctors.map((doctor) => (
              <tr
                key={doctor.id}
                className="hover:bg-gray-800 transition-colors text-sm sm:text-base"
              >
                <td className="px-3 py-2 font-semibold text-gray-100">{doctor.name}</td>
                <td className="px-3 py-2 text-gray-300">{doctor.specialization}</td>
                <td className="px-3 py-2 capitalize text-gray-300">{doctor.gender}</td>
                <td className="px-3 py-2 text-gray-300">{doctor.location}</td>
                <td className="px-3 py-2">
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
                <td className="px-3 py-2 flex flex-wrap gap-2">
                  <button
                    className="px-2 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm shadow-md transition"
                    onClick={() => onEdit(doctor)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm shadow-md transition"
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
    </div>
  );
};

export default DoctorList;
