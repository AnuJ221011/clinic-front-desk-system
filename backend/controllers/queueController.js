const getAllQueue = async (req, res) => {
  const query = 'SELECT * FROM queue ORDER BY is_priority DESC, queue_number ASC';

  try {
    const { rows } = await req.db.query(query);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
};

const addToQueue = async (req, res) => {
  const { patientName, patientPhone, isPriority } = req.body;

  const getNextNumberQuery = 'SELECT COALESCE(MAX(queue_number), 0) + 1 as next_number FROM queue';

  try {
    const { rows } = await req.db.query(getNextNumberQuery);
    const queueNumber = rows[0].next_number;

    const insertQuery = `
      INSERT INTO queue (queue_number, patient_name, patient_phone, is_priority)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;

    const insertResult = await req.db.query(insertQuery, [
      queueNumber,
      patientName,
      patientPhone || null,
      isPriority || false
    ]);

    res.status(201).json({
      message: 'Patient added to queue successfully',
      id: insertResult.rows[0].id,
      queueNumber
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
};

const updateQueueStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const query = 'UPDATE queue SET status = $1 WHERE id = $2 RETURNING *';

  try {
    const { rows } = await req.db.query(query, [status, id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Queue item not found' });
    }

    res.json({ message: 'Queue status updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
};

const removeFromQueue = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM queue WHERE id = $1 RETURNING *';

  try {
    const { rows } = await req.db.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Queue item not found' });
    }

    res.json({ message: 'Patient removed from queue successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
};

const clearQueue = async (req, res) => {
  const query = 'DELETE FROM queue';

  try {
    await req.db.query(query);
    res.json({ message: 'Queue cleared successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error' });
  }
};

module.exports = {
  getAllQueue,
  addToQueue,
  updateQueueStatus,
  removeFromQueue,
  clearQueue
};
