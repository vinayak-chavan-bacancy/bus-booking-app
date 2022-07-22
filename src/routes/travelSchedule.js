const express = require('express');
const { tripValidation } = require('../controllers/travelSchedule/travelSchedule.validation');

const {
  addSchedule,
  viewSchedule,
  deleteSchedule,
  SearchSchedule,
  addTripView,
} = require("../controllers/travelSchedule/travelSchedule.controller");

const route = express.Router();

// routes for admin
route.post("/trip", tripValidation, addSchedule);
route.get("/trip/:busId", viewSchedule);
route.get("/trips/:busId", addTripView)
route.delete('/trip/:id', deleteSchedule);

//routes for user
route.post("/schedule", SearchSchedule);

module.exports = route;
