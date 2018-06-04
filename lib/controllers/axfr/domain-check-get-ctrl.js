const superagent = require('superagent');
const errorUtil = require('../../errors/utils');

function tranformData(body) {
  if ({}.hasOwnProperty.call(body, 'response')) {
    return undefined;
  }
  return body.data;
}

const onlineDomainCheck = (req, res) => {
  const { domain } = req.params;

  // Do something with this later
  // const acceptHeader = req.get('Accept');

  superagent
    .get(`http://api.axfrcheck.com/api/domain/${domain}`)
    .set('Accept', 'application/json')
    .then(apiResponse => {
      const payload = tranformData(apiResponse.body);
      if (payload) {
        res
          .status(apiResponse.status)
          .send(payload)
          .end();
      } else {
        res.status(204).end();
      }
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
  onlineDomainCheck,
  tranformData,
};
