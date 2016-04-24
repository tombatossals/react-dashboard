const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'root.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
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
  ],
  module: {
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
};
