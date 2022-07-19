const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busnumber: {
    type: String,
    required: true,
    trim: true,
  },
  capacity: {
    type: String,
    required: true,
    trim: true,
  },
});

const bus = new mongoose.model("bus", busSchema);

module.exports = bus;
