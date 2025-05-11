const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a hotel name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Budget',
      'Boutique',
      'Luxury',
      'Resort',
      'Business'
    ],
    default: 'Boutique'
  },
  bookingsCount: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
    default: 3
  },
  status: {
    type: String,
    enum: ['Available', 'Full', 'Maintenance'],
    default: 'Available'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Hotel', HotelSchema);