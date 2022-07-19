const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const user = require("../models/user");
const { successResponse, errorResponse } = require("../utils");

const login = async (req, res) => {
  try {

    const emailID = req.body.emailID;
    const password = req.body.password;

    // check for email exist or not
    const userData = await user.findOne({ emailID: emailID });
    if (!userData) {
      return errorResponse('Invalid credentials!', 404);
    }

    // check for the password
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return errorResponse('Invalid credentials!', 404);
    } else {

      // jwt token created
      let accessToken = userData.getToken({
        exp: 60 * 60,
        secret: process.env.ACCESS_TOKEN_SECRET,
      });

      await userData.save();
      return res.status(200).send({ accessToken });

    }
  } catch (error) {
    return errorResponse('something went wrong!', 400, { err: error });
  }
};

const register = async (req, res) => {
  try {
    const addinguserRecords = new user(req.body);
    const emailID = req.body.emailID;

    // check if email id allready exist
    const userData = await user.findOne({ emailID: emailID });

    if (userData) {
      return errorResponse('email id allready exist', 400);
    } else {

      // register new user
      const insert = await addinguserRecords.save();
      console.log("Registration Successful");

      return successResponse(req, res, insert, 200);
    }
  } catch (e) {
    return errorResponse(req, res, "something went wrong", 400, { err: e });
  }
};

const loginView = async (req, res) => {
  res.render('login');
};

const logout = async (req, res) => {
  
};

module.exports = { login, register, logout, loginView };
