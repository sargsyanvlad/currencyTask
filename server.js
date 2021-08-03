/* eslint-disable no-console,max-len */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./server/routes');
const db = require('./db');

const app = express();
const { PORT } = require('./config/index');

const { errorModifier } = require('./server/helpers/modifier/index');

// const output = fs.createWriteStream('./stdout.log');
// const errorOutput = fs.createWriteStream('./stderr.log');
// Custom simple logger
// const logger = new Console({ stdout: output, stderr: errorOutput });
require('dotenv').config();

// Maximum 20 requests per second

app.use(cors());
app.use(bodyParser.json(
  {
    parameterLimit: 1000000,
    limit: 1024 * 1024 * 1024,
    extended: true,
  },
));
app.use(bodyParser.urlencoded(
  {
    extended: true,
    parameterLimit: 1000000,
    limit: 1024 * 1024 * 1024,
  },
));

app.use(express.static(path.join(__dirname, 'uploads')));
app.set('views', path.join(__dirname, 'uploads'));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, '/dist')));
app.use(routes);
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
})
  .on('uncaughtException', (err) => {
    console.error(`Caught exception: \n ${err}`);
  })
  .on('ECONNREFUSED', (err) => {
    console.error('ECONNREFUSED: \n', err);
  })
  .on('ELIFECYCLE', (err) => {
    console.error('ELIFECYCLE: \n', err);
  });

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.use((err, req, res, next) => {
  console.log('ERRRRRROOOOR', err);
  if (err) {
    console.log(err);
    return errorModifier(err, res, {
      url: req.originalUrl, query: req.query, body: req.body, params: req.params,
    });
  }
  return next();
});

app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  console.log(err);
  return res.status(404).send({ message: err.message, status: err.status });
});
app.listen(PORT, '0.0.0.0', () => {
  console.log('\x1b[32m%s\x1b[0m', `Server listening on port ${PORT}`);
});
