const mongoose = require("mongoose");

const user = require("../../models/user");
const bus = require("../../models/bus");
const travelSchedule = require("../../models/travelSchedule");
const booking = require("../../models/booking");

const { successResponse, errorResponse } = require("../../utils");

const addBooking = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { userId, seats, totalAmount, requestedSeats } = req.body;
    let status = 'Confirmed';

    // check if trip exist or not
    const tripData = await travelSchedule.findOne({ _id: tripId });
    if (!tripData) 
      return errorResponse(req, res, "trip not found", 404);

    let requestSeatsArray = requestedSeats;
    let availableSeatsArray = tripData.availableSeats;
    
    const containsAll = availableSeatsArray.every((element) => {
      return requestSeatsArray.includes(element);
    });

    if(!containsAll) {
      return errorResponse(req, res, "seats already occupied", 500);
    }

    // creating payload
    const payload = {
      userId,
      travelScheduleId: tripId,
      seats,
      totalAmount,
      bookingDate: new Date().toISOString().slice(0, 10),
      status: status,
      bookedSeats: requestSeatsArray,
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

    availableSeatsArray = availableSeatsArray.filter((val) => !requestSeatsArray.includes(val));

    const updatedTripData = await travelSchedule.findByIdAndUpdate(
      { _id: tripId },
      { availableSeats: availableSeatsArray }
    );

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

    let value = bookingData.totalAmount;
    let userId = bookingData.userId;

    // updating booking status to cancel
    const cancelBookingData = await booking.findByIdAndUpdate({_id: id}, {
      status: status
    });

    if(!cancelBookingData){
      return errorResponse(req, res, "something went wrong", 400);
    } else {

      // updating user wallet amount for refund
      const userData = await user.findByIdAndUpdate(
        { _id: userId },
        { $inc: { wallet: value } }
      );
    }
    
    return successResponse(req, res, cancelBookingData, 200);
  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, "something went wrong", 400, { err: error });
  }
};

module.exports = {
  addBooking,
  cancelBooking,
  viewBookingByUser,
  viewBookingByTrip,
};
