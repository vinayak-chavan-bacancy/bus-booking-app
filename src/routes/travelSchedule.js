const express = require('express');
const { auth } = require("../middlewares/auth");
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
route.get("/trip/:busId", auth, viewSchedule);
route.get("/trips/:busId", auth, addTripView)
route.delete('/trip/:id', auth, deleteSchedule);

//routes for user
route.post("/schedule", SearchSchedule);

module.exports = route;
