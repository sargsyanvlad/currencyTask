/* eslint-disable no-param-reassign */
const { ValidationError } = require('express-validation');
const {
  NotFoundError, SequelizeError, InternalServerError,
} = require('./exceptions');

function normalizeError(statusName, statusCode, message) {
  const object = {
    error: statusName,
    statusCode,
  };
  object.message = message || '';
  return object;
}

const handleError = (err, res, info) => {
  if (err instanceof TypeError) {
    const error = normalizeError('TYPE_ERROR', err.statusCode || err.status || 409, 'Invalid types');
    return res.status(error.statusCode).json(error);
  }
  if (err.constructor.name === 'DatabaseError') {
    const Err = new SequelizeError({ message: err.message }).getError();
    const intErr = normalizeError(Err.statusName, Err.status || Err.statusCode || 409, Err.debug);
    return res.status(intErr.statusCode).json(intErr);
  }

  if (err instanceof ValidationError) {
    const error = normalizeError('VALIDATION_ERROR', err.statusCode || err.status || 409, err.details[0] || 'Parameters Validation Failed');
    return res.status(error.statusCode).json(error);
  }

  if (err instanceof NotFoundError || err instanceof InternalServerError) {
    const errorDetails = err.getError(info);
    console.log(errorDetails);
    const {
      statusName, details: { status: dStatus, message: msg }, status, statusCode,
    } = err;
    const error = normalizeError(statusName, dStatus || status || statusCode || 409, msg);
    return res.status(error.statusCode || error.code || 400).json(error);
  }

  const Err = new InternalServerError().getError();
  const intErr = normalizeError(Err.statusName, Err.status || Err.statusCode || 409, Err.debug);
  return res.status(intErr.statusCode).json(intErr);
};

module.exports = handleError;
