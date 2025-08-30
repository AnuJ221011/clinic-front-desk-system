import React from "react";

const QueueList = ({ queue, onUpdateStatus, onRemovePatient }) => {
  if (queue.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p>No patients in queue</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Mobile View: Cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {queue.map((patient) => (
          <div
            key={patient.id}
            className="bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-200">
                Queue #{patient.queue_number}
              </span>
              {patient.is_priority && (
                <span className="px-2 py-1 bg-red-900 text-red-300 rounded text-sm font-semibold">
                  Priority
                </span>
              )}
            </div>
            <div className="text-gray-200">{patient.patient_name}</div>
            <div className="text-gray-400">{patient.patient_phone || "N/A"}</div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-2 py-1 rounded text-sm font-medium ${
                  patient.status === "waiting"
                    ? "bg-yellow-900 text-yellow-300"
                    : patient.status === "with_doctor"
                    ? "bg-blue-900 text-blue-300"
                    : "bg-green-900 text-green-300"
                }`}
              >
                {patient.status.replace("_", " ")}
              </span>
              <span className="text-gray-400 text-sm">
                {new Date(patient.created_at).toLocaleString()}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <select
                value={patient.status}
                onChange={(e) => onUpdateStatus(patient.id, e.target.value)}
                className="border border-gray-700 bg-gray-700 text-gray-200 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="waiting">Waiting</option>
                <option value="with_doctor">With Doctor</option>
                <option value="completed">Completed</option>
              </select>
              <button
                onClick={() => onRemovePatient(patient.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View: Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-700 rounded-lg shadow bg-gray-900 text-gray-200">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="px-4 py-2 text-left">Queue #</th>
              <th className="px-4 py-2 text-left">Patient Name</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Priority</th>
              <th className="px-4 py-2 text-left">Time Added</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {queue.map((patient) => (
              <tr
                key={patient.id}
                className="border-t border-gray-700 hover:bg-gray-800 transition"
              >
                <td className="px-4 py-2 font-semibold text-gray-100">
                  {patient.queue_number}
                </td>
                <td className="px-4 py-2">{patient.patient_name}</td>
                <td className="px-4 py-2">{patient.patient_phone || "N/A"}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      patient.status === "waiting"
                        ? "bg-yellow-900 text-yellow-300"
                        : patient.status === "with_doctor"
                        ? "bg-blue-900 text-blue-300"
                        : "bg-green-900 text-green-300"
                    }`}
                  >
                    {patient.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {patient.is_priority && (
                    <span className="px-2 py-1 bg-red-900 text-red-300 rounded text-sm font-semibold">
                      Priority
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 text-gray-400">
                  {new Date(patient.created_at).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <select
                      value={patient.status}
                      onChange={(e) =>
                        onUpdateStatus(patient.id, e.target.value)
                      }
                      className="border border-gray-700 bg-gray-800 text-gray-200 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="waiting">Waiting</option>
                      <option value="with_doctor">With Doctor</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      onClick={() => onRemovePatient(patient.id)}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QueueList;
