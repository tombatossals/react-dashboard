const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    main: 'app.js',
    vendor: [
      'react',
      'react-dom',
      'react-router'
    ]
  },
  output: {
    path: `${__dirname}/../dist/js`,
    filename: 'bundle.js'
  },
  resolve: {
    root: path.join(`${__dirname}/../src/frontend`)
  },
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
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules',
        include: /flexboxgrid/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', './vendor.js')
  ]
}
