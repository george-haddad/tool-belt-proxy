const superagent = require('superagent');
const errorUtil = require('../../errors/utils');

function tranformData(body) {
  return body.data;
}

const onlineDnsCheck = (req, res) => {
  const { dnsname } = req.params;

  if (dnsname) {
    const url = `http://api.axfrcheck.com/api/dns/${dnsname}`;
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
    const err = errorUtil.makeError('Missing dns name parameter', 400);
    res
      .status(400)
      .send(err)
      .end();
  }
};

module.exports = {
  onlineDnsCheck,
  tranformData,
};
