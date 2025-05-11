const express = require('express');
const router = express.Router();
const {
  createHotel,
  getHotels,
  getHotel,
  updateHotel,
  deleteHotel,
  incrementBookings
} = require('../controllers/hotels');
const { protect, authorize } = require('../middleware/auth');

// Public routes - anyone can access
router.get('/', getHotels);
router.get('/:id', getHotel);

// Protected routes with role-based authorization
router.post('/', protect, authorize('admin', 'hotel_owner'), createHotel);

// Hotel owners can only update their own hotels (will need controller modification)
router.put('/:id', protect, authorize('admin', 'hotel_owner'), updateHotel);

// Only admin can delete hotels
router.delete('/:id', protect, authorize('admin'), deleteHotel);

// Tourists and admins can book hotels
router.put('/:id/book', protect, authorize('tourist', 'admin'), incrementBookings);

module.exports = router;