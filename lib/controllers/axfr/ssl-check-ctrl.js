const superagent = require('superagent');
const errorUtil = require('../../errors/utils');

function tranformData(body) {
  const { ssl_vulnerabilities } = body.data[0];
  const payload = {
    heartbleed: JSON.parse(ssl_vulnerabilities[0].heartbleed.toLowerCase()),
    ccs: JSON.parse(ssl_vulnerabilities[1].ccs.toLowerCase()),
  };
  return payload;
}

const onlineSslCheck = (req, res) => {
  const { domain } = req.params;

  if (domain) {
    const url = `http://api.axfrcheck.com/api/check/ssl/${domain}`;
    superagent
      .get(url)
      .set('Accept', 'application/json')
      .then(apiResponse => {
        const payload = tranformData(apiResponse.body);

        res
          .status(apiResponse.status)
          .send(payload)
          .end();
      })
      .catch(apiError => {
        const err = errorUtil.makeError(apiError, 500);
        res
          .status(500)
          .send(err)
          .end();
      });
  } else {
    const err = errorUtil.makeError('Missing domain parameter', 400);
    res
      .status(400)
      .send(err)
      .end();
  }
};

module.exports = {
  onlineSslCheck,
  tranformData,
};
