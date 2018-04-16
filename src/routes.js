const setupRouter = app => {
  app.get('/api', function(req, res) {
    res.send('api description');
  });
};

export default setupRouter;
