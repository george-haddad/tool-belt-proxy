const { partial } = require('lodash');
const validate = require('express-validation');
const getCrl = require('../controllers/axfr/axfr-check-get-ctrl');

validate.options({
  status: 400,
  statusText: '',
  allowUnknownBody: false,
  allowUnknownQuery: false,
});

function axfrRoutes(router) {
  router.get('/check/:domain', partial(getCrl.onlineAxfrCheck));
  return router;
}

module.exports = axfrRoutes;
