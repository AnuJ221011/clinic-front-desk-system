const getAllAppointments = async (req, res) => {
  const { date } = req.query;

  try {
    let query = `
      SELECT a.*, d.name as doctor_name, d.specialization 
      FROM appointments a 
      JOIN doctors d ON a.doctor_id = d.id
    `;
    const params = [];

    if (date) {
      query += ' WHERE a.appointment_date = $1';
      params.push(date);
    }

    query += ' ORDER BY a.appointment_date, a.appointment_time';

    const { rows } = await req.db.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
};

const createAppointment = async (req, res) => {
  const { patientName, patientPhone, patientEmail, appointmentDate, appointmentTime, doctorId } = req.body;

  const query = `
    INSERT INTO appointments 
      (patient_name, patient_phone, patient_email, appointment_date, appointment_time, doctor_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id
  `;

  try {
    const { rows } = await req.db.query(query, [
      patientName,
      patientPhone,
      patientEmail,
      appointmentDate,
      appointmentTime,
      doctorId
    ]);

    res.status(201).json({
      message: 'Appointment created successfully',
      id: rows[0].id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
};

const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { status, appointmentDate, appointmentTime } = req.body;

  const updates = [];
  const params = [];
  let index = 1;

  if (status) {
    updates.push(`status = $${index++}`);
    params.push(status);
  }

  if (appointmentDate) {
    updates.push(`appointment_date = $${index++}`);
    params.push(appointmentDate);
  }

  if (appointmentTime) {
    updates.push(`appointment_time = $${index++}`);
    params.push(appointmentTime);
  }

  if (updates.length === 0) {
    return res.status(400).json({ message: 'No fields to update' });
  }

  const query = `UPDATE appointments SET ${updates.join(', ')} WHERE id = $${index} RETURNING *`;
  params.push(id);

  try {
    const { rows } = await req.db.query(query, params);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: 'Appointment updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
};

const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM appointments WHERE id = $1 RETURNING *';

  try {
    const { rows } = await req.db.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
};

module.exports = {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment
};
