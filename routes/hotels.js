const express = require('express');
const router = express.Router();
const {
  createHotel,
  getHotels,
  getHotel,
  updateHotel,
  deleteHotel,
  incrementBookings
} = require('../controllers/hotelController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getHotels)
  .post(protect, authorize('admin'), createHotel);

router.route('/:id')
  .get(getHotel)
  .put(protect, authorize('admin'), updateHotel)
  .delete(protect, authorize('admin'), deleteHotel);

router.route('/:id/book')
  .put(protect, incrementBookings);

module.exports = router;