const express = require('express');
const { body } = require('express-validator');
const { register, login, getProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();
const { createTables } = require('../config/database');

router.use((req, res, next) => {
  createTables(req.db);
  next();
});

// REGISTER
router.post('/register', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').notEmpty().withMessage('Name is required')
], register);

// LOGIN
router.post('/login', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
], login);

// PROFILE
router.get('/profile', auth, getProfile);

module.exports = router;
