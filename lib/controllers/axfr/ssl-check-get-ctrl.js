const superagent = require('superagent');
const errorUtil = require('../../errors/utils');

const onlineSslCheck = (req, res) => {
  const { domain } = req.params;

  // Do something with this later
  // const acceptHeader = req.get('Accept');

  superagent
    .get(`http://api.axfrcheck.com/api/check/ssl/${domain}`)
    .set('Accept', 'application/json')
    .then(apiResponse => {
      const { ssl_vulnerabilities } = apiResponse.body.data[0];

      const payload = {
        heartbleed: JSON.parse(ssl_vulnerabilities[0].heartbleed.toLowerCase()),
        ccs: JSON.parse(ssl_vulnerabilities[1].ccs.toLowerCase()),
      };

      res
        .status(apiResponse.status)
        .send(payload)
        .end();
    })
    .catch(apiError => {
      const err = errorUtil.makeError(apiError, 500);
      res
        .status(400)
        .send(err)
        .end();
    });
};

module.exports = {
  onlineSslCheck,
};
