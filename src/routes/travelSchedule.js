const express = require('express');

const {
  addSchedule,
  viewSchedule,
  deleteSchedule,
  SearchSchedule,
} = require("../controllers/bus/busController");

const route = express.Router();

// routes for admin
route.post("/schedule", addSchedule);
route.get("/schedule:/busid", viewSchedule);
route.delete('/schedule/:id', deleteSchedule);

//routes for user
route.get("/schedule", SearchSchedule);

module.exports = route;
