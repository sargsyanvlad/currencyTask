const app = require('express')();
const exchange = require('./exchange');

app.use('/api/exchange', exchange);

module.exports = app;
