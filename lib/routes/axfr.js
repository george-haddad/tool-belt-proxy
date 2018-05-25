const { partial } = require('lodash');
const validate = require('express-validation');
const getOnlineCheckCrl = require('../controllers/axfr/axfr-check-get-ctrl');
const getSslCheckCrl = require('../controllers/axfr/ssl-check-get-ctrl');
const getDomainCheckCrl = require('../controllers/axfr/domain-check-get-ctrl');
const getDnsCheckCrl = require('../controllers/axfr/dns-check-get-ctrl');

validate.options({
  status: 400,
  statusText: '',
  allowUnknownBody: false,
  allowUnknownQuery: false,
});

function axfrRoutes(router) {
  router.get('/check/:domain', partial(getOnlineCheckCrl.onlineAxfrCheck));
  router.get('/check/ssl/:domain', partial(getSslCheckCrl.onlineSslCheck));
  router.get('/domain/:domain', partial(getDomainCheckCrl.onlineDomainCheck));
  router.get('/dns/:dnsname', partial(getDnsCheckCrl.onlineDnsCheck));
  return router;
}

module.exports = axfrRoutes;
