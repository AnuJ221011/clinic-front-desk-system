const express = require('express');
const { body } = require('express-validator');
const {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointmentController');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/appointments
// @desc    Get all appointments
// @access  Private
router.get('/', auth, getAllAppointments);

// @route   POST /api/appointments
// @desc    Create appointment
// @access  Private
router.post('/', [
  auth,
  body('patientName').notEmpty().withMessage('Patient name is required'),
  body('patientPhone').notEmpty().withMessage('Patient phone is required'),
  body('appointmentDate').isDate().withMessage('Valid appointment date is required'),
  body('appointmentTime').notEmpty().withMessage('Appointment time is required'),
  body('doctorId').isInt().withMessage('Valid doctor ID is required')
], createAppointment);

router.put('/:id', auth, updateAppointment);
router.delete('/:id', auth, deleteAppointment);

module.exports = router;