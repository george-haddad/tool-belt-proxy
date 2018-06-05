const { partial } = require('lodash');
const validate = require('express-validation');

const versionValidation = require('../validation/version');
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

const validator = validate(versionValidation.axfrVerCheck);

function axfrRoutes(router) {
  router.get('/check/:domain', validator, partial(getOnlineCheckCrl.onlineAxfrCheck));
  router.get('/check/ssl/:domain', validator, partial(getSslCheckCrl.onlineSslCheck));
  router.get('/domain/:domain', validator, partial(getDomainCheckCrl.onlineDomainCheck));
  router.get('/dns/:dnsname', validator, partial(getDnsCheckCrl.onlineDnsCheck));
  return router;
}

module.exports = axfrRoutes;
