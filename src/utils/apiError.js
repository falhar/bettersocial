class ApiError extends Error {
  constructor(statusCode, message = 'Internal Server Error', errorPayloads = {}, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.errorPayloads = errorPayloads;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
