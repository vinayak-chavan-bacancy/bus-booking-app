const mongoose = require('mongoose');

const bus = require('../../models/bus');

const { successResponse, errorResponse } = require('../../utils');

const viewBus = async (req, res) => {
  try {
    const busData = await bus.find();

    // check if bus is exist or not
    if (!busData) {
      return errorResponse(req, res, 'bus Not Found', 404);
    } else {
      return successResponse(req, res, busData, 200);
    }

  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

const addBus = async (req, res) => {
  try {
    const { busnumber } = req.body.busnumber;

    // check if bus allready registered or not
    const busData = await bus.findOne({ busnumber: busnumber });
    if (busData) {
      return errorResponse(req, res, 'bus allready registered', 400);
    };

    const payload = req.body;

    // insert bus payload in database
    const newbus = new bus(payload);
    const insertbus = await newbus.save();

    return successResponse(req, res, insertbus, 200);
  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 500, { err: error });
  }
};

const deleteBus = async (req, res) => {
  try {
    const { id } = req.params;

    // check if bus exist or not
    const busData = await bus.findOne({ _id: id });
    if (!busData) {
      return errorResponse(req, res, 'Bus not found', 404);
    }

    // deleteing bus from database
    const deletebusData = await bus.findByIdAndDelete(id);

    return successResponse(req, res, deletebusData, 200);
  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

module.exports = { viewBus, addBus, deleteBus };
