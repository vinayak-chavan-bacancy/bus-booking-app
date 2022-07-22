const express = require('express');
const { bookingValidation } = require("../controllers/booking/booking.validation");

const {
  addBooking,
  cancelBooking,
  viewBookingByUser,
  viewBookingByTrip,
  addBookingView,
} = require("../controllers/booking/booking.controller");

const route = express.Router();

// user routes
route.post('/booking/:tripId', addBooking);
route.get('/cancel/:id', cancelBooking);
route.get('/mybooking', viewBookingByUser);
route.get('/booking/:tripId', addBookingView);

// admin routes
route.get('/booking/:tripId', viewBookingByTrip);

module.exports = route;
