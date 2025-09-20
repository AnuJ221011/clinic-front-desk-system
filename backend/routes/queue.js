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
const frontDeskMiddleware = require('../middleware/frontDeskMiddleware');

const router = express.Router();

router.get('/', auth, getAllQueue);
router.post('/', [
  auth,
  frontDeskMiddleware,
  body('patientName').notEmpty().withMessage('Patient name is required')
], addToQueue);

router.put('/:id', auth, frontDeskMiddleware, updateQueueStatus);
router.delete('/:id', auth, frontDeskMiddleware, removeFromQueue);
router.delete('/', auth, frontDeskMiddleware, clearQueue);

module.exports = router;