const express = require("express");
const { auth } = require('../middlewares/auth');
const { userValidation } = require("../controllers/user/user.validation");

const {
  login,
  register,
  logout,
  loginView,
  viewProfile,
  updateProfile,
  searchView,
  viewUserByAdmin,
} = require("../controllers/user/user.controller");

const route = express.Router();

route.get('/', loginView);
route.post('/login', login);
route.post('/register', userValidation, register);
route.get('/logout', logout);
route.get('/profile', auth, viewProfile);
route.post('/profile/:id', updateProfile);
route.get('/users', viewUserByAdmin);
route.get('/search', searchView);

module.exports = route;
