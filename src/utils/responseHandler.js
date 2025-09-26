// src/utils/responseHandler.js

const successResponse = (res, statusCode, message, data) => {
  if (typeof statusCode !== "number") {
    throw new TypeError("Status code must be a number");
  }

  return res.status(statusCode).json({
    payload: {
      status: "success",
      message,
      data,
    },
  });
};

const errorResponse = (res, statusCode, message, errors) => {
  if (typeof statusCode !== "number") {
    throw new TypeError("Status code must be a number");
  }

  return res.status(statusCode).json({
    payload: {
      status: "error",
      message,
      errors,
    },
  });
};

module.exports = { successResponse, errorResponse };
