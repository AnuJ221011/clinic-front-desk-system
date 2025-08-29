import React from 'react';

const DoctorList = ({ doctors, onEdit, onDelete }) => {
  if (doctors.length === 0) {
    return (
      <div className="text-center" style={{ padding: '2rem', color: '#6b7280' }}>
        <p>No doctors found</p>
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Gender</th>
            <th>Location</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td><strong>{doctor.name}</strong></td>
              <td>{doctor.specialization}</td>
              <td style={{ textTransform: 'capitalize' }}>{doctor.gender}</td>
              <td>{doctor.location}</td>
              <td>
                <div>
                  {doctor.availability.map((day, index) => (
                    <span key={index} className="status-badge status-booked" style={{ margin: '0.1rem' }}>
                      {day}
                    </span>
                  ))}
                </div>
              </td>
              <td>
                <div className="flex gap-1">
                  <button
                    className="btn btn-primary"
                    onClick={() => onEdit(doctor)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(doctor.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorList;