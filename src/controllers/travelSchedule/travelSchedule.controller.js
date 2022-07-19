const mongoose = require("mongoose");

const travelSchedule = require("../../models/travelSchedule");
const bus = require("../../models/bus");

const { successResponse, errorResponse } = require("../../utils");

const addSchedule = async (req, res) => {
  try {

    const { busId } = req.params;

    // check if bus exist or not
    const busData = await bus.findOne({ _id: busId });
    if (!busData) {
      return errorResponse(req, res, "bus not found", 404);
    }

    // creating payload
    const payload = {
      busId: busId,
      startingPoint: req.body.startingPoint,
      destinationPoint: req.body.destinationPoint,
      travelDate: req.body.travelDate,
      departureTime: req.body.departureTime,
      reachTime: req.body.reachTime,
      fareAmount: req.body.fareAmount,
      totalBooking: 0,
    };

    // adding new travel schedule
    const newTrip = new travelSchedule(payload);
    const insertTrip = await newTrip.save();

    console.log("trip added successfully");

    return successResponse(req, res, insertTrip, 200);
  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, "something went wrong", 500, { err: error });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    // check if bus exist or not
    const tripData = await travelSchedule.findOne({ _id: id });
    if (!tripData) {
      return errorResponse(req, res, "trip not found", 404);
    }

    // deleteing bus from database
    const deleteTripData = await travelSchedule.findByIdAndDelete(id);

    return successResponse(req, res, deleteTripData, 200);
  } catch (error) {
    return errorResponse(req, res, "something went wrong", 400, { err: error });
  }
};

const viewSchedule = async (req, res) => {
  try {

    const { busId } = req.params;

    // check if bus exist or not
    const busData = await bus.findOne({ _id: busId });
    if (!busData) {
      return errorResponse(req, res, "bus not found", 404);
    }

    const tripData = await travelSchedule.find({busId: busId});

    // check if bus is exist or not
    if (!tripData) {
      return errorResponse(req, res, "no trip schedule", 404);
    } else {
      return successResponse(req, res, tripData, 200);
    }

  } catch (error) {
    return errorResponse(req, res, "something went wrong", 400, { err: error });
  }
};

const SearchSchedule = async (req, res) => {
  try {
    const { startingPoint, destinationPoint, travelDate } = req.body;

    // finding trip according to parameters
    const tripData = await travelSchedule.find({
      startingPoint: startingPoint,
      destinationPoint: destinationPoint,
      travelDate: travelDate,
    });

    // check if travel schedule is exist or not
    if (!tripData) {
      return errorResponse(req, res, "no trip schedule", 404);
    } else {
      return successResponse(req, res, tripData, 200);
    }
  }
  catch (error) {
    return errorResponse(req, res, "something went wrong", 400, { err: error });
  }
};

module.exports = { addSchedule, viewSchedule, deleteSchedule, SearchSchedule };
