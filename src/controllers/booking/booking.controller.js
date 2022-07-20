const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const user = require("../../models/user");
const bus = require("../../models/bus");
const travelSchedule = require("../../models/travelSchedule");
const booking = require("../../models/booking");

const { successResponse, errorResponse } = require("../../utils");

const addBooking = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { userId, seats, totalAmount} = req.body;
    let status = 'Confirmed';

    // check if trip exist or not
    const tripData = await travelSchedule.find({ _id: tripId });
    if (!tripData) 
      return errorResponse(req, res, "trip not found", 404);
    
    // creating payload
    const payload = {
      userId,
      travelScheduleId: tripId,
      seats,
      totalAmount,
      bookingDate: new Date().toISOString().slice(0, 10),
      status: status
    };

    // debiting booking amount from user wallet
    const userInfo = await user.findOne({ _id: userId });
    let value = userInfo.wallet

    // check if you have sufficient wallet balance to pay
    if (value < totalAmount){
      return errorResponse(req, res, "dont have sufficeint wallet balance", 500 );

    } else {

      // deducting amount from user wallet
      const userData = await user.findOneAndUpdate({ _id: userId }, {
        wallet: value - totalAmount
      });
    }
    // adding booking data
    const newBooking = new booking(payload);
    const insertBooking = await newBooking.save();

    console.log("booking successfully");

    return successResponse(req, res, insertBooking, 200);
  } catch (error) {
      console.log(error.message);
      return errorResponse(req, res, "something went wrong", 500, { err: error });
  }
};

const viewBookingByUser = async (req, res) => {
  try {
    const { userId } = req.params;

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
    const { tripId } = req.params;
    let status = 'Confirmed';

    const bookingData = await booking.find({travelScheduleId: tripId, status: status });

    // check if booking is exist or not
    if (!bookingData) {
      return errorResponse(req, res, "no any data to show", 404);
    } else {
      return successResponse(req, res, bookingData, 200);
    }
  } catch (error) {
    console.log(error.message);
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
