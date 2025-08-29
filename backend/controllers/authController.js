const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user
    const query = 'SELECT * FROM users WHERE username = ?';
    req.db.query(query, [username], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = results[0];

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate token
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
      );

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role
        }
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const register = async (req, res) => {
  const { username, password, name, role } = req.body;

  try {
    // Check if user exists
    const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
    req.db.query(checkUserQuery, [username], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user
      const insertQuery = `INSERT INTO users (username, password, name, role) VALUES (?, ?, ?, ?)`;
      req.db.query(insertQuery, [username, hashedPassword, name, role || 'front_desk'], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error creating user' });
        }

        // Generate token
        const token = jwt.sign(
          { id: result.insertId, username, role: role || 'front_desk' },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRE }
        );

        res.status(201).json({
          message: 'User registered successfully',
          token,
          user: {
            id: result.insertId,
            username,
            name,
            role: role || 'front_desk'
          }
        });
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getProfile = (req, res) => {
  const query = 'SELECT id, username, name, role FROM users WHERE id = ?';
  req.db.query(query, [req.user.id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(results[0]);
  });
};

module.exports = { login, getProfile, register };