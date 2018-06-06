const superagent = require('superagent');
const errorUtil = require('../../errors/utils');

const getLaunchpads = (req, res) => {
  const { id } = req.params;

  let url = `https://api.spacexdata.com/v2/launchpads`;

  if (id) {
    url = `https://api.spacexdata.com/v2/launchpads/${id}`;
  }

  superagent
    .get(url)
    .set('Accept', 'application/json')
    .then(apiResponse => {
      res
        .status(apiResponse.status)
        .send(apiResponse.body)
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
  getLaunchpads,
};
