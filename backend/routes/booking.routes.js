const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getBookingById,
} = require('../controllers/booking.controller');
const { optionalAuth } = require('../middleware/auth.middleware');

router.post('/', optionalAuth, createBooking);
router.get('/', optionalAuth, getUserBookings);
router.get('/:id', getBookingById);

module.exports = router;
