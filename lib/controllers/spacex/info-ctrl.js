const superagent = require('superagent');
const errorUtil = require('../../errors/utils');

const getInfo = (req, res) => {
  superagent
    .get(`https://https://api.spacexdata.com/v2/info`)
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
  getInfo,
};
