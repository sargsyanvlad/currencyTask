// eslint-disable-next-line max-classes-per-file
const errorLogger = require('../../logger')();
const { BASE_ERRORS } = require('./constants');

class BaseError extends Error {}

class InternalServerError extends BaseError {
  constructor(details) {
    super();
    this.details = details;
  }

  getError() {
    let error = BASE_ERRORS.INTERNAL_SERVER_ERROR;
    if (this.details) {
      error = { ...error, details: this.details };
    } else error = { ...error, details: BASE_ERRORS.INTERNAL_SERVER_ERROR.debug };

    return error;
  }
}

class NotFoundError extends BaseError {
  constructor(details) {
    super();
    this.details = details;
  }

  getError() {
    let error = BASE_ERRORS.NOT_FOUND_ERROR;
    if (this.details) {
      error = { ...error, details: this.details };
    }

    errorLogger.error('NotFoundError', { NotFoundError: { error } });

    return error;
  }
}
class SequelizeError extends BaseError {
  constructor(exception) {
    super();
    this.exception = exception;
    this.details = exception.errors ? exception.errors[0].message : exception.message;
  }

  getError() {
    let error = BASE_ERRORS.INVALID_USER_INPUT;
    if (this.details) {
      error = { ...error, details: this.details };
      if (!this.exception.errors) { [error.details, error.debug] = [error.debug, error.details]; }
      error.details = {
        message: error.details,
      };
    }
    errorLogger.error('SequelizeError', { SequelizeError: { error } });
    return error;
  }
}

module.exports = {
  BaseError,
  SequelizeError,
  NotFoundError,
  InternalServerError,
};
