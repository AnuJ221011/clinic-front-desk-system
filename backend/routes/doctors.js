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

router.get('/', auth, getAllDoctors);
router.post('/', [
  auth,
  body('name').notEmpty().withMessage('Name is required'),
  body('specialization').notEmpty().withMessage('Specialization is required'),
  body('gender').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
  body('location').notEmpty().withMessage('Location is required'),
  body('availability').isArray().withMessage('Availability must be an array')
], createDoctor);

router.put('/:id', auth, updateDoctor);
router.delete('/:id', auth, deleteDoctor);

module.exports = router;