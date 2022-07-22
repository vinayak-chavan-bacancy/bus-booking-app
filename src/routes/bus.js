const express = require('express');
const { busValidation } = require("../controllers/bus/bus.validation");
const { auth } = require("../middlewares/auth");

const {
  viewBus,
  addBusView,
  addBus,
  deleteBus,
} = require('../controllers/bus/bus.controller');

const route = express.Router();

route.get('/bus', auth, viewBus);
route.get('/addbus', auth, addBusView);
route.post('/bus', busValidation, auth, addBus);
route.delete('/bus/:id', auth, deleteBus);

module.exports = route;