const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const json = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const version = json.version;

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
