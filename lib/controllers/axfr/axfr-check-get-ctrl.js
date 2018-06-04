const superagent = require('superagent');
const errorUtil = require('../../errors/utils');

function tranformData(body) {
  const payload = {
    affected_dns: body.data[0].affected_dns,
  };

  return payload;
}

const onlineAxfrCheck = (req, res) => {
  const { domain } = req.params;

  // Do something with this later
  // const acceptHeader = req.get('Accept');

  superagent
    .get(`http://api.axfrcheck.com/api/check/axfr/${domain}`)
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
  onlineAxfrCheck,
  tranformData,
};
