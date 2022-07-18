const successResponse = (data, code = 200) => res.send({
  code,
  data,
  success: true,
});

const errorResponse = (
  errorMessage = 'Something went wrong',
  code = 500,
  error = {},
) => res.status(code).json({
  code,
  errorMessage,
  error,
  data: null,
  success: false,
});

module.exports = { successResponse, errorResponse };