const dotenv = require('dotenv');
const express = require('express');
const versionValidation = require('./lib/validation/version');
const validate = require('express-validation');
const defaultRouter = require('./lib/routers/default');
const errorHandler = require('./lib/errors/errorHandler');
const ErrStrategies = require('./lib/errors/strategies');
const logger = require('./lib/utils/logger').Logger;

dotenv.config({ silent: true });

const app = express();
const appErrorHandler = errorHandler([ErrStrategies.defaultStrategy]);
const PORT = process.env.PORT || 3000;

app.use(/^\/(?!ready).*/, validate(versionValidation.checkVersion));
app.use((req, res, next) => {
  req.getVersion = function validateVer() {
    return req.headers.accept.split('version=')[1];
  };
  next();
});

app.use('/', require('./lib/routes/index')(defaultRouter()));
app.use('/ready', require('./lib/routes/ready').ready(defaultRouter()));
app.use('/axfr', require('./lib/routes/axfr')(defaultRouter()));

appErrorHandler(app);

app.listen(PORT, () => {
  logger.info(`tool-belt proxy listening on port: ${PORT}`);
});
