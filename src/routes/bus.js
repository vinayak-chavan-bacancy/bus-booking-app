const express = require("express");

const {
  viewBus,
  addBus,
  updateBus,
  deleteBus,
} = require("../controllers/userController");

const route = express.Router();

route.get('/bus', viewBus);
route.post('/bus', addBus);
route.put('/bus', updateBus);
route.delete('/bus', deleteBus);

module.exports = route;