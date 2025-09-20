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

  try {
    // Step 0: Get doctor availability
    const doctorResult = await req.db.query(
      "SELECT availability, name FROM doctors WHERE id = $1 AND is_active = true",
      [doctorId]
    );
    if (doctorResult.rows.length === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const doctor = doctorResult.rows[0];
    const availableDays = doctor.availability || [];
    const appointmentDay = new Date(appointmentDate).toLocaleDateString("en-US", {
      weekday: "long",
    });

    if (!availableDays.includes(appointmentDay)) {
      return res.status(400).json({
        message: `Dr. ${doctor.name} is not available on ${appointmentDay}`,
      });
    }

    // Step 1: Check if doctor is already booked for the given date & time
    const checkQuery = `
      SELECT * FROM appointments 
      WHERE doctor_id = $1 
        AND appointment_date = $2 
        AND appointment_time = $3
    `;
    const checkResult = await req.db.query(checkQuery, [doctorId, appointmentDate, appointmentTime]);

    if (checkResult.rows.length > 0) {
      return res.status(400).json({
        message: "Doctor is not available at the selected date and time",
      });
    }

    // Step 2: Insert the appointment
    const insertQuery = `
      INSERT INTO appointments 
        (patient_name, patient_phone, patient_email, appointment_date, appointment_time, doctor_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;

    const { rows } = await req.db.query(insertQuery, [
      patientName,
      patientPhone,
      patientEmail,
      appointmentDate,
      appointmentTime,
      doctorId,
    ]);

    res.status(201).json({
      message: "Appointment created successfully",
      id: rows[0].id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
};


const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { status, appointmentDate, appointmentTime, doctorId } = req.body;

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

  if (doctorId) {
    updates.push(`doctor_id = $${index++}`);
    params.push(doctorId);
  }

  if (updates.length === 0) {
    return res.status(400).json({ message: 'No fields to update' });
  }

  // Check doctor availability if date/time/doctor is being changed
  if (appointmentDate && appointmentTime && doctorId) {
    const checkQuery = `
      SELECT * FROM appointments
      WHERE doctor_id = $1
        AND appointment_date = $2
        AND appointment_time = $3
        AND id <> $4
    `;
    const checkResult = await req.db.query(checkQuery, [doctorId, appointmentDate, appointmentTime, id]);
    if (checkResult.rows.length > 0) {
      return res.status(400).json({ message: 'Doctor is not available at the selected date and time' });
    }
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
