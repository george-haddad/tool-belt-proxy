function index(router) {
  router.get('/', (req, res) => {
    res.statusCode = 200;
    res.send('index');
    res.end();
  });

  return router;
}

module.exports = index;
