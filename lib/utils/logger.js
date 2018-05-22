const winston = require('winston');

function getWinstonLogger() {
  return new winston.Logger({
    level: process.env.LOGGING_LEVEL || 'info',
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'logs/service.log' }),
    ],
  });
}

module.exports = {
  Logger: getWinstonLogger(),
};
