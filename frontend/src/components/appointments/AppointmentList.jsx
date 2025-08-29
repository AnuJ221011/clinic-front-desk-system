import React from 'react';

const AppointmentList = ({ appointments, onUpdateStatus, onCancelAppointment }) => {
  if (appointments.length === 0) {
    return (
      <div className="text-center" style={{ padding: '2rem', color: '#6b7280' }}>
        <p>No appointments found for selected date</p>
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Phone</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.patient_name}</td>
              <td>{appointment.patient_phone}</td>
              <td>
                <div>
                  <strong>{appointment.doctor_name}</strong>
                  <br />
                  <small>{appointment.specialization}</small>
                </div>
              </td>
              <td>{new Date(appointment.appointment_date).toLocaleDateString()}</td>
              <td>{appointment.appointment_time}</td>
              <td>
                <span className={`status-badge status-${appointment.status}`}>
                  {appointment.status}
                </span>
              </td>
              <td>
                <div className="flex gap-1">
                  <select
                    value={appointment.status}
                    onChange={(e) => onUpdateStatus(appointment.id, e.target.value)}
                    className="form-control"
                    style={{ width: 'auto' }}
                    disabled={appointment.status === 'cancelled'}
                  >
                    <option value="booked">Booked</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  {appointment.status !== 'cancelled' && (
                    <button
                      className="btn btn-warning"
                      onClick={() => onCancelAppointment(appointment.id)}
                    >
                      Cancel
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