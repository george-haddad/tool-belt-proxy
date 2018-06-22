const winston = require('winston');

function getWinstonLogger() {
  return winston.createLogger({
    level: process.env.LOGGING_LEVEL || 'info',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()]
  });
}

module.exports = {
  Logger: getWinstonLogger(),
};
