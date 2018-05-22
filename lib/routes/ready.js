function getStatus() {
  const status = {};
  status.response = 'OK';
  return status;
}

function ready(router) {
  router.get('/', (req, res) => {
    res.statusCode = 200;
    res.send(getStatus());
    res.end();
  });

  return router;
}

module.exports = {
  ready,
  getStatus,
};
