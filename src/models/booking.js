const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  travelScheduleId: {
    type: Schema.Types.ObjectId,
  },
  seats: {
    type: Number,
    required: true,
    trim: true,
  },
  totalAmount: {
    type: Number,
    required: true,
    trim: true,
  },
  bookingDate: {
    type: Date,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Confirmed', 'Canceled'],
    trim: true,
  },
});

const booking = new mongoose.model('booking', bookingSchema);

module.exports = booking;
