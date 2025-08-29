import React from "react";

const AppointmentList = ({
  appointments,
  onUpdateStatus,
  onCancelAppointment,
  onDeleteAppointment,
  onRescheduleAppointment,
}) => {
  if (appointments.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400 bg-gray-900 rounded-lg shadow-inner">
        <p>No appointments found for the selected date</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl shadow-lg bg-gray-900">
      <table className="min-w-full text-gray-200">
        <thead className="bg-gray-800 text-gray-300 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-4 py-3 text-left">Patient Name</th>
            <th className="px-4 py-3 text-left">Phone</th>
            <th className="px-4 py-3 text-left">Doctor</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Time</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {appointments.map((appointment) => (
            <tr
              key={appointment.id}
              className="hover:bg-gray-800 transition-colors"
            >
              <td className="px-4 py-3">{appointment.patient_name}</td>
              <td className="px-4 py-3">{appointment.patient_phone}</td>
              <td className="px-4 py-3">
                <div>
                  <span className="font-semibold text-indigo-400">
                    {appointment.doctor_name}
                  </span>
                  <br />
                  <span className="text-sm text-gray-400">
                    {appointment.specialization}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3">
                {new Date(appointment.appointment_date).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">{appointment.appointment_time}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium 
                    ${
                      appointment.status === "booked"
                        ? "bg-blue-500/20 text-blue-400"
                        : appointment.status === "completed"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                >
                  {appointment.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  <select
                    value={appointment.status}
                    onChange={(e) =>
                      onUpdateStatus(appointment.id, e.target.value)
                    }
                    className="bg-gray-900 border border-gray-700 text-gray-200 text-sm rounded-md px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500"
                    disabled={appointment.status === "cancelled"}
                  >
                    <option value="booked">Booked</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  {appointment.status !== "cancelled" ? (
                    <>
                      <button
                        className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-md text-sm hover:bg-yellow-500/30 transition"
                        onClick={() => onCancelAppointment(appointment.id)}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-md text-sm hover:bg-indigo-500/30 transition"
                        onClick={() => onRescheduleAppointment(appointment)}
                      >
                        Reschedule
                      </button>
                    </>
                  ) : (
                    <button
                      className="bg-red-500/20 text-red-400 px-3 py-1 rounded-md text-sm hover:bg-red-500/30 transition"
                      onClick={() => onDeleteAppointment(appointment.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
