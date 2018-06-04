const superagent = require('superagent');
const errorUtil = require('../../errors/utils');

function tranformData(body) {
  return body.data;
}

const onlineDnsCheck = (req, res) => {
  const { dnsname } = req.params;

  // Do something with this later
  // const acceptHeader = req.get('Accept');

  superagent
    .get(`http://api.axfrcheck.com/api/dns/${dnsname}`)
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
};

module.exports = {
  onlineDnsCheck,
  tranformData,
};
