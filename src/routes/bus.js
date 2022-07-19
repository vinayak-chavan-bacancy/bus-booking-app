const express = require("express");

const {
  viewBus,
  addBus,
  deleteBus,
} = require("../controllers/bus/busController");

const route = express.Router();

route.get('/bus', viewBus);
route.post('/bus', addBus);
route.delete('/bus/:id', deleteBus);

module.exports = route;