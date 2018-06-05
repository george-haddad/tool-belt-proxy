const validate = require('express-validation');

const versionValidation = require('../validation/version');

function index(router) {
  router.get('/', validate(versionValidation.rootVerCheck), (req, res) => {
    res.statusCode = 200;
    res.send('index');
    res.end();
  });

  return router;
}

module.exports = index;
