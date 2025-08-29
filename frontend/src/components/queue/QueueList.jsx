import React from 'react';

const QueueList = ({ queue, onUpdateStatus, onRemovePatient }) => {
  if (queue.length === 0) {
    return (
      <div className="text-center" style={{ padding: '2rem', color: '#6b7280' }}>
        <p>No patients in queue</p>
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="table">
        <thead>
          <tr>
            <th>Queue #</th>
            <th>Patient Name</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Time Added</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {queue.map((patient) => (
            <tr key={patient.id}>
              <td>
                <strong>{patient.queue_number}</strong>
              </td>
              <td>{patient.patient_name}</td>
              <td>{patient.patient_phone || 'N/A'}</td>
              <td>
                <span className={`status-badge status-${patient.status}`}>
                  {patient.status.replace('_', ' ')}
                </span>
              </td>
              <td>
                {patient.is_priority && (
                  <span className="priority-badge">Priority</span>
                )}
              </td>
              <td>{new Date(patient.created_at).toLocaleString()}</td>
              <td>
                <div className="flex gap-1">
                  <select
                    value={patient.status}
                    onChange={(e) => onUpdateStatus(patient.id, e.target.value)}
                    className="form-control"
                    style={{ width: 'auto' }}
                  >
                    <option value="waiting">Waiting</option>
                    <option value="with_doctor">With Doctor</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button
                    className="btn btn-danger"
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
  );
};

export default QueueList;