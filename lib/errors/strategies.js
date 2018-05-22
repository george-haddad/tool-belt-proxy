const defaultStrategy = function(err, req, res, next) {
  if (res.headersSent) {
    next(err);
  }

  res.status(err.status || 500);
  res.set('Content-Type', 'application/json');
  res.send({ status: err.status, message: err.message });
  next(err);
};

module.exports = {
  defaultStrategy,
};
