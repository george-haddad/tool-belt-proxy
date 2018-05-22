const winston = require('winston');

function getWinstonLogger() {
  return new winston.Logger({
    level: process.env.LOGGING_LEVEL || 'info',
    transports: [
      new winston.transports.Console(),
    ],
  });
}

module.exports = {
  Logger: getWinstonLogger(),
};
