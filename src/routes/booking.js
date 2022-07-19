const express = require('express');

const {
  addBooking, cancelBooking, viewBookingByUser, viewBookingByUser
} = require('../controllers/booking/booking.controller');

const route = express.Router();

// user routes
route.post('/booking', addBooking);
route.put('/booking/:id', cancelBooking);
route.get('/myBooking/:userId', viewBookingByUser);

// admin routes
route.get('/booking/:tripId', viewBookingByTrip);

module.exports = route;
