const getAllDoctors = async (req, res) => {
  const { specialization, location } = req.query;
  let query = 'SELECT * FROM doctors WHERE is_active = true';
  const params = [];

  if (specialization) {
    params.push(`%${specialization}%`);
    query += ` AND specialization LIKE $${params.length}`;
  }

  if (location) {
    params.push(`%${location}%`);
    query += ` AND location LIKE $${params.length}`;
  }

  query += ' ORDER BY name';

  try {
    const { rows } = await req.db.query(query, params);

    const doctors = rows.map((row) => ({
      ...row,
      available_days: row.availability ? row.availability : []
    }));

    res.json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
};

const createDoctor = async (req, res) => {
  const { name, specialization, gender, location, availability } = req.body;

  const query = `
    INSERT INTO doctors (name, specialization, gender, location, availability) 
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `;

  try {
    const { rows } = await req.db.query(query, [
      name,
      specialization,
      gender,
      location,
      JSON.stringify(availability)
    ]);

    res.status(201).json({
      message: 'Doctor created successfully',
      id: rows[0].id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
};

const updateDoctor = async (req, res) => {
  const { id } = req.params;
  const { name, specialization, gender, location, availability } = req.body;

  const query = `
    UPDATE doctors 
    SET name = $1, specialization = $2, gender = $3, location = $4, availability = $5
    WHERE id = $6
    RETURNING *
  `;

  try {
    const { rows } = await req.db.query(query, [
      name,
      specialization,
      gender,
      location,
      JSON.stringify(availability),
      id
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({ message: 'Doctor updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
};

const deleteDoctor = async (req, res) => {
  const { id } = req.params;

  const query = 'UPDATE doctors SET is_active = false WHERE id = $1 RETURNING *';

  try {
    const { rows } = await req.db.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
};

module.exports = {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor
};
