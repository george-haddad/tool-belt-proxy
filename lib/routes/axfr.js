const { partial } = require('lodash');
const validate = require('express-validation');
const getOnlineCheckCrl = require('../controllers/axfr/axfr-check-get-ctrl');
const getSslCheckCrl = require('../controllers/axfr/ssl-check-get-ctrl');

validate.options({
  status: 400,
  statusText: '',
  allowUnknownBody: false,
  allowUnknownQuery: false,
});

function axfrRoutes(router) {
  router.get('/check/:domain', partial(getOnlineCheckCrl.onlineAxfrCheck));
  router.get('/check/ssl/:domain', partial(getSslCheckCrl.onlineSslCheck));
  return router;
}

module.exports = axfrRoutes;
