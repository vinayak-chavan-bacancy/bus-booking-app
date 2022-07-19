const express = require('express');

const {
  addBooking, cancelBooking, viewBookingByUser, viewBookingByTrip
} = require('../controllers/booking/booking.controller');

const route = express.Router();

// user routes
route.post('/booking/:tripId', addBooking);
route.put('/booking/:id', cancelBooking);
route.get('/mybooking/:userId', viewBookingByUser);

// admin routes
route.get('/booking/:tripId', viewBookingByTrip);

module.exports = route;
