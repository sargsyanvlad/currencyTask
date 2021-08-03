const { Joi } = require('express-validation');
// const { re_weburl, re_numbers } = require('./regexp');

module.exports = {
  config: {
    context: true,
    statusCode: 422,
    keyByField: true,
  },

  getExchangeSchema: {
    query: Joi.object({
      fsyms: Joi.string().valid('BTC', 'XRP', 'ETH', 'BCH', 'EOS', 'LTC', 'XMR', 'DASH').required(),
      tsyms: Joi.string().valid('USD', 'EUR', 'GBP', 'JPY', 'RUR').required(),
    }),
  },

};
