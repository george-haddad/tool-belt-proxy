const { partial } = require('lodash');
const validate = require('express-validation');

const CapsulesCtrl = require('../controllers/spacex/capsules-ctrl');
const InfoCtrl = require('../controllers/spacex/info-ctrl');
const LaunchesCtrl = require('../controllers/spacex/launches-ctrl');
const LaunchpadsCtrl = require('../controllers/spacex/launchpads-ctrl');
const PartsCtrl = require('../controllers/spacex/parts-ctrl');
const RocketsCtrl = require('../controllers/spacex/rockets-ctrl');
const UpcomingCtrl = require('../controllers/spacex/upcoming-ctrl');
const VersionValidation = require('../validation/version');

validate.options({
  status: 400,
  statusText: '',
  allowUnknownBody: false,
  allowUnknownQuery: false,
});

const validator = validate(VersionValidation.verifySpacexVer);

function spacexRoutes(router) {
  router.get('/capsules/:id*?', validator, partial(CapsulesCtrl.getCapsules));
  router.get('/info', validator, partial(InfoCtrl.getInfo));
  router.get('/launches/:id*?', validator, partial(LaunchesCtrl.getLaunches));
  router.get('/launchpads/:id*?', validator, partial(LaunchpadsCtrl.getLaunchpads));
  router.get('/parts/caps/:serial*?', validator, partial(PartsCtrl.getCaps));
  router.get('/parts/cores/:serial*?', validator, partial(PartsCtrl.getCores));
  router.get('/rockets/:id*?', validator, partial(RocketsCtrl.getRockets));
  router.get('/upcoming', validator, partial(UpcomingCtrl.getUpcomingLaunches));
  return router;
}

module.exports = spacexRoutes;
