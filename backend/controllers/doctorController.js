const getAllDoctors = (req, res) => {
  const { specialization, location } = req.query;
  let query = 'SELECT * FROM doctors WHERE is_active = true';
  const params = [];

  if (specialization) {
    query += ' AND specialization LIKE ?';
    params.push(`%${specialization}%`);
  }

  if (location) {
    query += ' AND location LIKE ?';
    params.push(`%${location}%`);
  }

  query += ' ORDER BY name';

  req.db.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    
    // Parse availability JSON
    const doctors = results.map((row) => {
      return {
        ...row,
        available_days: row.available_days
          ? row.available_days.split(",")
          : []
      };
    });


    res.json(doctors);
  });
};

const createDoctor = (req, res) => {
  const { name, specialization, gender, location, availability } = req.body;

  const query = `
    INSERT INTO doctors (name, specialization, gender, location, availability) 
    VALUES (?, ?, ?, ?, ?)
  `;

  req.db.query(query, [
    name, 
    specialization, 
    gender, 
    location, 
    JSON.stringify(availability)
  ], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    res.status(201).json({ 
      message: 'Doctor created successfully',
      id: results.insertId 
    });
  });
};

const updateDoctor = (req, res) => {
  const { id } = req.params;
  const { name, specialization, gender, location, availability } = req.body;

  const query = `
    UPDATE doctors 
    SET name = ?, specialization = ?, gender = ?, location = ?, availability = ?
    WHERE id = ?
  `;

  req.db.query(query, [
    name,
    specialization,
    gender,
    location,
    JSON.stringify(availability),
    id
  ], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({ message: 'Doctor updated successfully' });
  });
};

const deleteDoctor = (req, res) => {
  const { id } = req.params;

  const query = 'UPDATE doctors SET is_active = false WHERE id = ?';

  req.db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({ message: 'Doctor deleted successfully' });
  });
};

module.exports = {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor
};