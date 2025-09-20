const express = require('express');
const { body } = require('express-validator');
const {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointmentController');
const auth = require('../middleware/auth');
const frontDeskMiddleware = require('../middleware/frontDeskMiddleware');

const router = express.Router();

router.get('/', auth, getAllAppointments);

router.post('/', [
  auth,
  frontDeskMiddleware,
  body('patientName').notEmpty().withMessage('Patient name is required'),
  body('patientPhone').notEmpty().withMessage('Patient phone is required'),
  body('appointmentDate').isDate().withMessage('Valid appointment date is required'),
  body('appointmentTime').notEmpty().withMessage('Appointment time is required'),
  body('doctorId').isInt().withMessage('Valid doctor ID is required')
], createAppointment);

router.put('/:id', auth, frontDeskMiddleware, updateAppointment);
router.delete('/:id', auth, frontDeskMiddleware, deleteAppointment);

module.exports = router;