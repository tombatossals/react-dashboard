const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    main: 'root.js',
    vendor: [
      'react',
      'react-dom',
      'react-router',
    ],
  },
  output: {
    path: `${__dirname}/../../dist`,
    filename: 'bundle.js',
  },
  resolve: {
    root: path.join(`${__dirname}/../src/frontend`),
  },
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
      }, {
        test: /\.scss$/,
        loader: `style-loader!css-loader?modules&localIdentName=[local]__[hash:base64:5]
                !sass-loader`,
      }, {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
    ],
  },
  sassLoader: {
    modules: true,
    includePaths: [
      path.resolve(__dirname, '../src/frontend'),
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', './js/vendor.js'),
  ],
};
