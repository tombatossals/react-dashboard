const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const config = require('config');

const json = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const version = json.version;

const endpoints = config.get('api');

module.exports = {
  entry: [
    'app.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8081',
  ],
  output: {
    path: path.resolve(__dirname, '../src/frontend'),
    publicPath: '/dist',
    filename: 'bundle.js',
  },
  resolve: {
    root: [
      path.resolve(__dirname, '../src/frontend'),
    ],
  },
  devServer: {
    contentBase: 'src/static',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        version: JSON.stringify(version),
      },
      endpoints: JSON.stringify(endpoints),
    }),
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, '../src/frontend')],
        exclude: [path.resolve(__dirname, '../node_modules')],
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      },
    ],
  },
};
