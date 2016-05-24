const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const json = JSON.parse(fs.readFileSync('package.json', 'utf8'))
const version = json.version

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8081',
    'webpack/hot/dev-server',
    'app.js'
  ],
  output: {
    publicPath: ' http://localhost:8081/dist/',
    path: path.resolve(__dirname, '../src/static/dist'),
    filename: 'bundle.js'
  },
  resolve: {
    root: [
      path.resolve(__dirname, '../src/frontend')
    ]
  },
  devServer: {
    contentBase: 'src/static'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        version: JSON.stringify(version)
      }
    })
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, '../src/frontend')],
        exclude: [path.resolve(__dirname, '../node_modules')]
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader']
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules',
        include: /flexboxgrid/
      }
    ]
  }
}
