const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  busId: {
    type: Schema.Types.ObjectId,
  },
  travelScheduleId: {
    type: Schema.Types.ObjectId,
  },
  seats: {
    type: String,
    required: true,
    trim: true,
  },
  totalAmount: {
    type: String,
    required: true,
    trim: true,
  },
  booking_date: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Confirmend", "Canceled"],
    trim: true,
  },
});

const booking = new mongoose.model("booking", bookingSchema);

module.exports = booking;
