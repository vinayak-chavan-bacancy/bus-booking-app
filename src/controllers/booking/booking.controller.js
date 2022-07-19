const mongoose = require("mongoose");

const user = require("../../models/user");
const bus = require("../../models/bus");
const travelSchedule = require("../../models/travelSchedule");
const booking = require("../../models/booking");

const { successResponse, errorResponse } = require("../../utils");

const viewBookingByUser = async (req, res) => {
  try {
    const userId = req.params;

    const bookingData = await booking.find({userId: userId});

    // check if booking is exist or not
    if (!bookingData) {
      return errorResponse(req, res, "you dont have any booking yet", 404);
    } else {
      return successResponse(req, res, bookingData, 200);
    }
  } catch (error) {
    return errorResponse(req, res, "something went wrong", 400, { err: error });
  }
};

const viewBookingByTrip = async (req, res) => {
  try {
    const tripId = req.params;
    let status = 'Confirmed';

    const bookingData = await booking.find({travelScheduleId: tripId, status: status });

    // check if booking is exist or not
    if (!bookingData) {
      return errorResponse(req, res, "no any data to show", 404);
    } else {
      return successResponse(req, res, bookingData, 200);
    }
  } catch (error) {
    return errorResponse(req, res, "something went wrong", 400, { err: error });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    let status = 'Canceled';

    // check if booking exist or not
    const bookingData = await booking.findOne({ _id: id });
    if (!bookingData) {
      return errorResponse(req, res, "data not found", 404);
    }

    // updating booking status to cancel
    const cancelBookingData = await booking.findByIdAndUpdate({_id: id}, {
      status: status
    });

    return successResponse(req, res, cancelBookingData, 200);
  } catch (error) {
    return errorResponse(req, res, "something went wrong", 400, { err: error });
  }
};

module.exports = {
  addBooking,
  cancelBooking,
  viewBookingByUser,
  viewBookingByTrip,
};
