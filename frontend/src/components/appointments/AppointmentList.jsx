import React from "react";

const AppointmentList = ({
  appointments,
  onUpdateStatus,
  onCancelAppointment,
  onDeleteAppointment,
  onRescheduleAppointment,
}) => {
  if (!appointments || appointments.length === 0) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"></div>
        <div className="relative text-center py-16 px-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            No appointments found
          </h3>
          <p className="text-gray-500">
            Book appointments to get started with appointment management
          </p>
        </div>
      </div>
    );
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case "booked":
        return {
          bg: "from-indigo-500/20 to-purple-500/20",
          text: "text-indigo-300",
          border: "border-indigo-500/30",
          icon: (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ),
        };
      case "completed":
        return {
          bg: "from-green-500/20 to-emerald-500/20",
          text: "text-green-300",
          border: "border-green-500/30",
          icon: (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4"
              />
            </svg>
          ),
        };
      case "cancelled":
        return {
          bg: "from-red-500/20 to-pink-500/20",
          text: "text-red-300",
          border: "border-red-500/30",
          icon: (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ),
        };
      default:
        return {
          bg: "from-gray-500/20 to-gray-600/20",
          text: "text-gray-300",
          border: "border-gray-500/30",
          icon: null,
        };
    }
  };

  return (
    <div className="w-full">
      {/* Mobile View: Cards */}
      <div className="flex flex-col gap-6 md:hidden">
        {appointments.map((appointment, index) => {
          const statusConfig = getStatusConfig(appointment.status);
          return (
            <div
              key={appointment.id}
              className="relative group animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Background */}
              <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {appointment.patient_name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-1">
                      {appointment.patient_phone || "N/A"}
                    </p>
                    <p className="text-gray-400 text-sm mb-1">
                      <span className="font-semibold">Doctor: </span>
                      {appointment.doctor_name} ({appointment.specialization})
                    </p>
                    <p className="text-gray-400 text-sm">
                      <span className="font-semibold">Date: </span>
                      {new Date(
                        appointment.appointment_date
                      ).toLocaleDateString()}
                    </p>
                    <p className="text-gray-400 text-sm">
                      <span className="font-semibold">Time: </span>
                      {appointment.appointment_time}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-3">
                    <div
                      className={`flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r ${statusConfig.bg} ${statusConfig.text} rounded-xl border ${statusConfig.border}`}
                    >
                      {statusConfig.icon}
                      <span className="font-medium capitalize">
                        {appointment.status.replace("_", " ")}
                      </span>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <select
                        value={appointment.status}
                        onChange={(e) =>
                          onUpdateStatus(appointment.id, { status: e.target.value })
                        }
                        className="flex-1 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                        disabled={appointment.status === "cancelled"}
                      >
                        <option value="booked" className="bg-gray-800">
                          Booked
                        </option>
                        <option value="completed" className="bg-gray-800">
                          Completed
                        </option>
                        <option value="cancelled" className="bg-gray-800">
                          Cancelled
                        </option>
                      </select>

                      {appointment.status !== "cancelled" ? (
                        <>
                          <button
                            onClick={() =>
                              onCancelAppointment(appointment.id)
                            }
                            className="group relative px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
                          >
                            <span className="relative text-sm font-semibold">
                              Cancel
                            </span>
                          </button>
                          <button
                            onClick={() =>
                              onRescheduleAppointment(appointment)
                            }
                            className="group relative px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
                          >
                            <span className="relative text-sm font-semibold">
                              Reschedule
                            </span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() =>
                            onDeleteAppointment(appointment.id)
                          }
                          className="group relative px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                          <span className="relative text-sm font-semibold">
                            Delete
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop View: Table */}
      <div className="hidden md:block relative">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"></div>
        <div className="relative overflow-x-auto rounded-2xl shadow-lg bg-gray-900">
          <table className="min-w-full text-gray-200 table-auto">
            <thead className="bg-gray-800 text-gray-300 uppercase text-xs sm:text-sm tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Patient Name</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-left">Doctor</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Time</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {appointments.map((appointment, index) => {
                const statusConfig = getStatusConfig(appointment.status);
                return (
                  <tr
                    key={appointment.id}
                    className=" transition-all duration-200 animate-fadeInUp"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-6 py-4">{appointment.patient_name}</td>
                    <td className="px-6 py-4">
                      {appointment.patient_phone || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-indigo-400">
                        {appointment.doctor_name}
                      </span>
                      <br />
                      <span className="text-xs text-gray-400">
                        {appointment.specialization}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(
                        appointment.appointment_date
                      ).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {appointment.appointment_time}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-xl text-xs font-semibold bg-gradient-to-r ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}
                      >
                        {appointment.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        <select
                          value={appointment.status}
                          onChange={(e) =>
                            onUpdateStatus(appointment.id, { status: e.target.value })
                          }
                          className="bg-gray-900 border border-gray-700 text-gray-200 text-xs rounded-md px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500"
                          disabled={appointment.status === "cancelled"}
                        >
                          <option value="booked" className="bg-gray-800">
                            Booked
                          </option>
                          <option value="completed" className="bg-gray-800">
                            Completed
                          </option>
                          <option value="cancelled" className="bg-gray-800">
                            Cancelled
                          </option>
                        </select>

                        {appointment.status !== "cancelled" ? (
                          <>
                            <button
                              onClick={() =>
                                onCancelAppointment(appointment.id)
                              }
                              className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-md text-xs hover:bg-yellow-500/30 transition"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() =>
                                onRescheduleAppointment(appointment)
                              }
                              className="bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-md text-xs hover:bg-indigo-500/30 transition"
                            >
                              Reschedule
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() =>
                              onDeleteAppointment(appointment.id)
                            }
                            className="bg-red-500/20 text-red-400 px-3 py-1 rounded-md text-xs hover:bg-red-500/30 transition"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Custom Styles */}
        <style jsx>{`
          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 0;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default AppointmentList;
