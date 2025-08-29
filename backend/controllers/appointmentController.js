const getAllAppointments = (req, res) => {
  const { date } = req.query;
  
  let query = `
    SELECT a.*, d.name as doctor_name, d.specialization 
    FROM appointments a 
    JOIN doctors d ON a.doctor_id = d.id
  `;
  
  const params = [];
  
  if (date) {
    query += ' WHERE a.appointment_date = ?';
    params.push(date);
  }
  
  query += ' ORDER BY a.appointment_date, a.appointment_time';

  req.db.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    res.json(results);
  });
};

const createAppointment = (req, res) => {
  const { patientName, patientPhone, patientEmail, appointmentDate, appointmentTime, doctorId } = req.body;

  const query = `
    INSERT INTO appointments (patient_name, patient_phone, patient_email, appointment_date, appointment_time, doctor_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  req.db.query(query, [
    patientName,
    patientPhone,
    patientEmail,
    appointmentDate,
    appointmentTime,
    doctorId
  ], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    res.status(201).json({
      message: 'Appointment created successfully',
      id: results.insertId
    });
  });
};

const updateAppointment = (req, res) => {
  const { id } = req.params;
  const { status, appointmentDate, appointmentTime } = req.body;

  let query = 'UPDATE appointments SET ';
  const params = [];
  const updates = [];

  if (status) {
    updates.push('status = ?');
    params.push(status);
  }

  if (appointmentDate) {
    updates.push('appointment_date = ?');
    params.push(appointmentDate);
  }

  if (appointmentTime) {
    updates.push('appointment_time = ?');
    params.push(appointmentTime);
  }

  if (updates.length === 0) {
    return res.status(400).json({ message: 'No fields to update' });
  }

  query += updates.join(', ') + ' WHERE id = ?';
  params.push(id);

  req.db.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: 'Appointment updated successfully' });
  });
};

const deleteAppointment = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM appointments WHERE id = ?';

  req.db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: 'Appointment deleted successfully' });
  });
};

module.exports = {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment
};