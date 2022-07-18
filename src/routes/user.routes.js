const express = require("express");

const { login, register, viewProfile } = require('../controllers/userController');
const { auth } = require('../middleware/auth');
const uploadFunction = require('../middleware/imageUpload');

const route = express.Router();

route.post('/register', uploadFunction, register);
route.post('/login', login);
route.get('/profile', auth, viewProfile);

module.exports = route;