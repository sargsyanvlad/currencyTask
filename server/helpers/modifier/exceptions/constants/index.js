const SEQUELIZE_ERRORS = {
  SequelizeValidationError: true,
  SequelizeUniqueConstraintError: true,
  SequelizeForeignKeyConstraintError: true,
  SequelizeDatabaseError: true,
};

const BASE_ERRORS = {
  INTERNAL_SERVER_ERROR: { status: 500, statusName: 'internalServerError', debug: 'INTERNAL_SERVER_ERROR' },
  INVALID_USER_INPUT: { status: 400, statusName: 'badRequest', debug: 'INVALID_USER_INPUT' },
  NOT_FOUND_ERROR: { status: 404, statusName: 'notFound', debug: 'NOT_FOUND_ERROR' },
};
const ERROR_MESSAGES = {

  EXCHANGE: {
    1: {
      status: 404,
      message: 'Not found!',
      detailed_message: 'Timeout exceeded for axios, and no matching data in db',
    },
  },

};

module.exports = {
  SEQUELIZE_ERRORS,
  BASE_ERRORS,
  ERROR_MESSAGES,
};
