const express = require('express');
const { tripValidation } = require('../controllers/travelSchedule/travelSchedule.validation');

const {
  addSchedule,
  viewSchedule,
  deleteSchedule,
  SearchSchedule,
} = require("../controllers/travelSchedule/travelSchedule.controller");

const route = express.Router();

// routes for admin
route.post("/trip/:busId", tripValidation, addSchedule);
route.get("/trip/:busId", viewSchedule);
route.delete('/trip/:id', deleteSchedule);

//routes for user
route.get("/schedule", SearchSchedule);

module.exports = route;
