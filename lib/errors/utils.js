const logger = require('../../lib/utils/logger').Logger;

function makeError(message, status) {
  const error = new Error();
  error.status = status;
  error.message = message;
  return error;
}

function propagateError(next) {
  return error => {
    let err = error;
    let message;
    let status = error.status || 500;
    err.status = status;
    if (error.response) {
      if (error.response.body.message) {
        status = error.response.body.status || 500;
        [message] = error.response.body;
      } else {
        [status] = error.response;
        message = error.response.body;
      }

      err = makeError(message, status);
    }

    switch (status) {
      case 500: {
        logger.error(`${err}`);
        logger.error(`Error (stacktrace) >${err.stack}`);
        break;
      }

      default: {
        break;
      }
    }

    next(err);
  };
}

module.exports = {
  makeError,
  propagateError,
};
