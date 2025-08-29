const express = require('express');
const { body } = require('express-validator');
const {
  getAllQueue,
  addToQueue,
  updateQueueStatus,
  removeFromQueue,
  clearQueue
} = require('../controllers/queueController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getAllQueue);
router.post('/', [
  auth,
  body('patientName').notEmpty().withMessage('Patient name is required')
], addToQueue);

router.put('/:id', auth, updateQueueStatus);
router.delete('/:id', auth, removeFromQueue);
router.delete('/', auth, clearQueue);

module.exports = router;