const express = require('express');
const { body } = require('express-validator');
const {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor
} = require('../controllers/doctorController');
const auth = require('../middleware/auth');
const frontDeskMiddleware = require('../middleware/frontDeskMiddleware');

const router = express.Router();

router.get('/', auth, getAllDoctors);
router.post('/', [
  auth,
  frontDeskMiddleware,
  body('name').notEmpty().withMessage('Name is required'),
  body('specialization').notEmpty().withMessage('Specialization is required'),
  body('gender').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
  body('location').notEmpty().withMessage('Location is required'),
  body('availability').isObject().withMessage('Availability must be an object')
], createDoctor);

router.put('/:id', auth, frontDeskMiddleware, updateDoctor);
router.delete('/:id', auth, frontDeskMiddleware, deleteDoctor);

module.exports = router;