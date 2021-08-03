const { format } = require('winston');

const {
  combine, splat, timestamp: tmpStmp, printf,
} = format;

const myFormat = printf(({
  level, message, timestamp, ...metadata
}) => {
  let msg = `${timestamp} [${level}] : ${message} `;
  if (metadata) {
    msg += JSON.stringify(metadata);
  }
  return msg;
});
const winston = require('winston');

const winstonLogger = winston.createLogger({
  format: combine(
    format.colorize(),
    splat(),
    tmpStmp(),
    myFormat,
  ),
  transports: [
    new (winston.transports.File)({
      filename: 'MyLogs.txt',
      handleExceptions: true,
      humanReadableUnhandledException: true,
      level: 'info',
      timestamp: true,
      json: false,
    }),
    new (winston.transports.Console)({
      level: 'info',
      prettyPrint: true,
      colorize: true,
      timestamp: true,
    }),
  ],
});

module.exports = (fileName) => ({
  error(text) {
    winstonLogger.error(`${fileName}: ${text}`);
  },
  info(text) {
    winstonLogger.info(`${fileName}: ${text}`);
  },
});
