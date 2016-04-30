import express from 'express';
import config from 'config';
import webpack from 'webpack';
import proxy from 'proxy-middleware';
import url from 'url';
import bodyParser from 'body-parser';
import WebpackDevServer from 'webpack-dev-server';
import configWebpackDevServer from '../webpack/dev.config';
// import apiRoutes from './backend/routes/api';
import { ParseServer } from 'parse-server';

const PORT = config.get('express.port');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

const api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
  cloud: `${__dirname}/cloud/main.js`, // Absolute path to your Cloud Code
  appId: 'react-dashboard',
  masterKey: 'myb1gs3cret',
  serverURL: `http://localhost:${PORT}/parse`, // Don't forget to change to https if needed
});

const server = new WebpackDevServer(webpack(configWebpackDevServer), {
  contentBase: 'src/static',
  headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: true,
  devtool: 'eval',
  hot: true,
  inline: true,
  stats: { colors: true },
});

app.get('/favicon.ico', proxy(url.parse('http://localhost:8081/')));
app.use('/dist', proxy(url.parse('http://localhost:8081/')));

app.use('/parse', api);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/static/index.html`));
server.listen(8081, 'localhost');
app.listen(PORT);
