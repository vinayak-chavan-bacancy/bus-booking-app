const mongoose = require("mongoose");

const travelScheduleSchema = new mongoose.Schema({
  busId: {
    type: Schema.Types.ObjectId,
  },
  startingPoint: {
    type: String,
    required: true,
    trim: true,
  },
  destinationPoint: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
    trim: true,
  },
  departureTime: {
    type: String,
    required: true,
    trim: true,
  },
  arrivalTime: {
    type: String,
    required: true,
    trim: true,
  },
  fareAmount: {
    type: String,
    required: true,
    trim: true,
  },
  totalBooking: {
    type: String,
    required: true,
    trim: true,
  },
});

const travelSchedule = new mongoose.model("travelSchedule", travelScheduleSchema);

module.exports = travelSchedule;
