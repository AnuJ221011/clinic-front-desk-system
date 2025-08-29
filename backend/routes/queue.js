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

// @route   GET /api/queue
// @desc    Get all queue items
// @access  Private
router.get('/', auth, getAllQueue);

// @route   POST /api/queue
// @desc    Add patient to queue
// @access  Private
router.post('/', [
  auth,
  body('patientName').notEmpty().withMessage('Patient name is required')
], addToQueue);

// @route   PUT /api/queue/:id
// @desc    Update queue status
// @access  Private
router.put('/:id', auth, updateQueueStatus);

// @route   DELETE /api/queue/:id
// @desc    Remove patient from queue
// @access  Private
router.delete('/:id', auth, removeFromQueue);

// @route   DELETE /api/queue
// @desc    Clear entire queue
// @access  Private
router.delete('/', auth, clearQueue);

module.exports = router;