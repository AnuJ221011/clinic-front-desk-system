const express = require('express');
const { body } = require('express-validator');
const {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor
} = require('../controllers/doctorController');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/doctors
// @desc    Get all doctors
// @access  Private
router.get('/', auth, getAllDoctors);

// @route   POST /api/doctors
// @desc    Create doctor
// @access  Private
router.post('/', [
  auth,
  body('name').notEmpty().withMessage('Name is required'),
  body('specialization').notEmpty().withMessage('Specialization is required'),
  body('gender').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
  body('location').notEmpty().withMessage('Location is required'),
  body('availability').isArray().withMessage('Availability must be an array')
], createDoctor);

// @route   PUT /api/doctors/:id
// @desc    Update doctor
// @access  Private
router.put('/:id', auth, updateDoctor);

// @route   DELETE /api/doctors/:id
// @desc    Delete doctor
// @access  Private
router.delete('/:id', auth, deleteDoctor);

module.exports = router;