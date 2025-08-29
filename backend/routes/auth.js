const express = require('express');
const { body } = require('express-validator');
const { login, getProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

// Initialize database tables
const { createTables } = require('../config/database');

router.use((req, res, next) => {
  createTables(req.db);
  next();
});

router.post('/login', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
], login);

router.get('/profile', auth, getProfile);

module.exports = router;