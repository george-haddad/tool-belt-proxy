const { partial } = require('lodash');
const validate = require('express-validation');

const versionValidation = require('../validation/version');

validate.options({
  status: 400,
  statusText: '',
  allowUnknownBody: false,
  allowUnknownQuery: false,
});

const validator = validate(versionValidation.spacexVerCheck);

function spacexRoutes(router) {
  router.get('/', validator, (req, res) => {
    res.statusCode = 200;
    res.send({ response: 'OK' });
    res.end();
  });

  router.get('/capsules', validator);
  router.get('/info', validator);
  router.get('/launches', validator);
  router.get('/launchpad', validator);
  router.get('/misc', validator);
  router.get('/parts', validator);
  router.get('/rockets', validator);
  router.get('/upcoming', validator);
  return router;
}

module.exports = spacexRoutes;
