const express = require('express');
const { body } = require('express-validator');
const { register, login, getProfile,assignRole, getAllUsers } = require('../controllers/authController');
const auth = require('../middleware/auth');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// REGISTER
router.post('/register', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').notEmpty().withMessage('Name is required'),
  body('role').notEmpty().withMessage('Role is required') // allow role input
], register);

// LOGIN
router.post('/login', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
], login);

// PROFILE
router.get('/profile', auth, getProfile);

// Only admin can update roles
router.put('/assign-role/:id', auth, adminMiddleware, assignRole);
router.get('/users', auth, adminMiddleware, getAllUsers);

module.exports = router;
