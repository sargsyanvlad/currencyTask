const Router = require('express').Router();
const { ExchangeManager } = require('../managers');
const validationCheck = require('../helpers/validations/validationCheck');

Router.get('/', validationCheck('getExchangeSchema'), ExchangeManager.getCurrencyExchangeData);

module.exports = Router;
