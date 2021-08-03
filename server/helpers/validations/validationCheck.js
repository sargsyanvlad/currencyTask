const { validate } = require('express-validation');
const validationSchema = require('./validationSchema');

module.exports = (name) => validate(validationSchema[name], validationSchema.config, {});
