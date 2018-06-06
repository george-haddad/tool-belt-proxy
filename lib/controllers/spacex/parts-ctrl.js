const superagent = require('superagent');
const errorUtil = require('../../errors/utils');

const getCaps = (req, res) => {
  const { serial } = req.params;

  let url = `https://api.spacexdata.com/v2/parts/caps`;

  if (serial) {
    url = `https://api.spacexdata.com/v2/parts/caps/${serial}`;
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

const getCores = (req, res) => {
  const { serial } = req.params;

  let url = `https://api.spacexdata.com/v2/parts/cores`;

  if (serial) {
    url = `https://api.spacexdata.com/v2/parts/cores/${serial}`;
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
  getCaps,
  getCores,
};
