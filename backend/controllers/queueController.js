const getAllQueue = (req, res) => {
  const query = 'SELECT * FROM queue ORDER BY is_priority DESC, queue_number ASC';

  req.db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    res.json(results);
  });
};

const addToQueue = (req, res) => {
  const { patientName, patientPhone, isPriority } = req.body;

  // Get next queue number
  const getNextNumberQuery = 'SELECT COALESCE(MAX(queue_number), 0) + 1 as next_number FROM queue';

  req.db.query(getNextNumberQuery, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    const queueNumber = results[0].next_number;

    const insertQuery = `
      INSERT INTO queue (queue_number, patient_name, patient_phone, is_priority)
      VALUES (?, ?, ?, ?)
    `;

    req.db.query(insertQuery, [
      queueNumber,
      patientName,
      patientPhone || null,
      isPriority || false
    ], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      res.status(201).json({
        message: 'Patient added to queue successfully',
        id: results.insertId,
        queueNumber
      });
    });
  });
};

const updateQueueStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const query = 'UPDATE queue SET status = ? WHERE id = ?';

  req.db.query(query, [status, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Queue item not found' });
    }

    res.json({ message: 'Queue status updated successfully' });
  });
};

const removeFromQueue = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM queue WHERE id = ?';

  req.db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Queue item not found' });
    }

    res.json({ message: 'Patient removed from queue successfully' });
  });
};

const clearQueue = (req, res) => {
  const query = 'DELETE FROM queue';

  req.db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    res.json({ message: 'Queue cleared successfully' });
  });
};

module.exports = {
  getAllQueue,
  addToQueue,
  updateQueueStatus,
  removeFromQueue,
  clearQueue
};

