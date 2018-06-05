const dotenv = require('dotenv');
const express = require('express');
const validate = require('express-validation');

const versionValidation = require('./lib/validation/version');
const defaultRouter = require('./lib/routers/default');
const errorHandler = require('./lib/errors/errorHandler');
const ErrStrategies = require('./lib/errors/strategies');
const indexRoute = require('./lib/routes/index');
const readyRoute = require('./lib/routes/ready').ready;
const axfrRoute = require('./lib/routes/axfr');
const logger = require('./lib/utils/logger').Logger;

dotenv.config({ silent: true });

const app = express();
const appErrorHandler = errorHandler([ErrStrategies.defaultStrategy]);
const PORT = process.env.PORT || 5000;

app.use(/^\/(?!ready).*/, validate(versionValidation.checkVersion));
app.use((req, res, next) => {
  req.getVersion = function validateVer() {
    return req.headers.accept.split('version=')[1];
  };
  next();
});

app.use('/', indexRoute(defaultRouter()));
app.use('/ready', readyRoute(defaultRouter()));
app.use('/axfr', axfrRoute(defaultRouter()));

appErrorHandler(app);

app.listen(PORT, () => {
  logger.info(`tool-belt proxy listening on port: ${PORT}`);
});
