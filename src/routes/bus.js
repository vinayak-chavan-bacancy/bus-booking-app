const express = require('express');
const { busValidation } = require("../controllers/bus/bus.validation");

const {
  viewBus,
  addBus,
  deleteBus,
} = require('../controllers/bus/bus.controller');

const route = express.Router();

route.get('/bus', viewBus);
route.post('/bus', busValidation, addBus);
route.delete('/bus/:id', deleteBus);

module.exports = route;