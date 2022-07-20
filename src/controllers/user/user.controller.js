const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const user = require('../../models/user');
const { successResponse, errorResponse } = require('../../utils');

const login = async (req, res) => {
  try {

    const emailID = req.body.emailID;
    const password = req.body.password;

    // check for email exist or not
    const userData = await user.findOne({ emailID: emailID });
    if (!userData) {
      return errorResponse(req, res, 'Invalid credentials!', 404);
    }

    // check for the password
    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      return errorResponse(req, res, 'Invalid credentials!', 404);
    } else {

      // jwt token created
      let accessToken = userData.getToken({
        exp: 60 * 60,
        secret: process.env.ACCESS_TOKEN_SECRET,
      });

      await userData.save();
      return successResponse(req, res, accessToken, 200);
    }
  } catch (error) {
    console.log(error.message)
    return errorResponse(req, res, 'something went wrong!', 400, { err: error });
  }
};

const register = async (req, res) => {
  try {
    const { username, phoneno, emailID, password } = new user(req.body);

    // check if email id allready exist
    const userData = await user.findOne({ emailID: emailID });

    if (userData) {
      return errorResponse(req, res, 'email id allready exist', 400);
    } else {

      // creating payload
      const payload = {
        username,
        phoneno,
        emailID,
        password,
        wallet: 1000,
        role: 'user',
      };

      // register new user
      const newUser = new user(payload);
      const insertUser = await newUser.save();

      console.log('Registration Successful');

      return successResponse(req, res, insertUser, 200);
    }
  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 400 );
  }
};

const loginView = async (req, res) => {
  res.render('login');
};

const viewProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await user.findOne({ _id: id });

    // check if data is exist or not
    if (!userData) {
      return errorResponse(req, res, "User Not Found", 404);
    } else {
      return successResponse(req, res, userData, 200);
    }
  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, "something went wrong", 400);
  }
};

const logout = async (req, res) => {
  
};

module.exports = { login, register, logout, loginView, viewProfile };
