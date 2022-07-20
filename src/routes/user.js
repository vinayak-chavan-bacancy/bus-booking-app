const express = require("express");

const {
  login,
  register,
  logout,
  loginView,
  viewProfile,
} = require("../controllers/user/user.controller");

const route = express.Router();

route.get('/', loginView);
route.post('/login', login);
route.post('/register', register);
route.get('/logout', logout);
route.get("/profile/:id", viewProfile);
module.exports = route;
