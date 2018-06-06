const { partial } = require('lodash');
const validate = require('express-validation');

const OnlineCheckCrl = require('../controllers/axfr/axfr-check-ctrl');
const SslCheckCrl = require('../controllers/axfr/ssl-check-ctrl');
const DomainCheckCrl = require('../controllers/axfr/domain-check-ctrl');
const DnsCheckCrl = require('../controllers/axfr/dns-check-ctrl');
const VersionValidation = require('../validation/version');

validate.options({
  status: 400,
  statusText: '',
  allowUnknownBody: false,
  allowUnknownQuery: false,
});

const validator = validate(VersionValidation.verifyAxfrVer);

function axfrRoutes(router) {
  router.get('/check/ssl/:domain*?', validator, partial(SslCheckCrl.onlineSslCheck));
  router.get('/check/:domain*?', validator, partial(OnlineCheckCrl.onlineAxfrCheck));
  router.get('/domain/:domain*?', validator, partial(DomainCheckCrl.onlineDomainCheck));
  router.get('/dns/:dnsname*?', validator, partial(DnsCheckCrl.onlineDnsCheck));
  return router;
}

module.exports = axfrRoutes;
