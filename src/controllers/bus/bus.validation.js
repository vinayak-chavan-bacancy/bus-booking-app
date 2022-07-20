const joi = require("joi");
const { errorResponse } = require("../../utils/index");

const validation = joi.object({
  busnumber: joi.string().min(6).max(20).trim(true).required(),
  capacity: joi.string().min(1).max(10).required(),
});

const busValidation = async (req, res, next) => {
  const payload = {
    busnumber: req.body.busnumber,
    capacity: req.body.capacity,
  };

  const { error } = validation.validate(payload);
  if (error) {
    console.log(error.message);
    return errorResponse(req, res, "please enter valid data", 400);
  } else {
    next();
  }
};

module.exports = { busValidation };
