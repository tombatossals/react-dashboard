import webpack from 'webpack'
import path from 'path'
import chalk from 'chalk'
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const basePath = path.join(__dirname, '..', 'src')
const buildPath = path.join(__dirname, '..', '..', '.build')
const staticPath = path.join(__dirname, '..', 'src', 'static')


export default {
  target: 'web',
  devtool: 'eval',
  context: __dirname,
  cache: true,
  entry: {
    app: [
      path.join(basePath, '/frontend/app')
    ],
    vendor: [
      '@horizon/client',
      'material-ui',
      'react',
      'react-dom',
      'react-flexbox-grid',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-logger',
      'redux-thunk'
    ]
  },
  output: {
    path: buildPath,
    filename: 'client.bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
    root: path.join(basePath, 'frontend'),
    alias: {
      styles: path.join(staticPath, 'css'),
      images: path.join(staticPath, 'images'),
      static: path.join(staticPath)
    }
  },
  module: {
    loaders: [
      {
        test: /\.(jpe?g|png|gif|mp3|ogg|wav|ogv|mov|mp4|svg|ttf|eot|woff)/,
        loader: 'file?limit=2000',
        include: staticPath
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: basePath
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(css)$/,
        loader: 'style!css',
        include: [ /flexboxgrid/ ]
      }
    ]
  },
  browser: {
    child_process: 'empty',
    net: 'empty',
    tls: 'empty',
    fs: 'empty'
  },
  plugins: [
    new ProgressBarPlugin({
      format: `${chalk.blue.bold('Building client bundle')} [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
      renderThrottle: 100,
      summary: false,
      customSummary: (t) => {
        return console.log(chalk.blue.bold(`Built client in ${t}.`))
      }
    }),
    new webpack.DefinePlugin({
      BUILD_TIME: JSON.stringify((new Date()).getTime())
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true)
  ]
}
