const express = require("express");

const {
  login,
  register,
  logout,
  loginView,
} = require("../controllers/userController");

const route = express.Router();

route.get('/', loginView);
route.post('/login', login);
route.post('/register', register);
route.get('/logout', logout);

module.exports = route;
