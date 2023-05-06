const config = require('../config');
const { logger } = require('../tools/logger');
const ApiError = require('../utils/apiError');

/**
 * @param {Error} err
 * @returns {ApiError}
 * */
const convertError = (err) => {
  if (err instanceof ApiError) {
    return err;
  }

  return new ApiError(500, err.message, {}, false);
};

// eslint-disable-next-line no-unused-vars
const errorMw = (err, req, res, next) => {
  const error = convertError(err);

  let { message } = error;
  if (config.app.env === 'production' && !error.isOperational) {
    message = 'Internal Server Error';
  }

  res.locals.errorMessage = message;

  if (!error.isOperational) {
    logger.error(err);
  }

  res.status(error.statusCode).json({
    status: 'Error',
    message,
    errors: error.errorPayloads,
    ...(config.app.env !== 'production' && { stack: err.stack }),
  });
};

module.exports = errorMw;
