import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import setupRouter from '../src/routes';
import connectMongoose from '../src/data/setupDBConn';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);
// Setup as dev application
process.env.NODE_ENV = 'DEV';

app.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  })
);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

// setup routes
setupRouter(app);

// connect to database
connectMongoose();

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
