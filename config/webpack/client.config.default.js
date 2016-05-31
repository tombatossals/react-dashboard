const path = require('path')
const webpack = require('webpack')
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const WebpackAnybarPlugin = require('webpack-anybar-plugin').default

const basePath = path.join(__dirname, '../../src')
const buildPath = path.join(__dirname, '../../.build')
const staticPath = path.join(__dirname, '../../static')

module.exports = {
  target: 'web',
  context: __dirname,
  cache: true,
  entry: {
    app: [
      path.join(basePath, '/frontend/app')
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
        test: /\.jsx?$/,
        loader: 'babel',
        include: basePath
      },
      {
        test: /\.jsx?$/,
        loader: 'script',
        include: path.join(staticPath, 'vendor')
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(css)$/,
        loader: 'style!css',
        include: [ path.join(staticPath, 'vendor'), /flexboxgrid/ ]
      },
      {
        name: 'local-css-config',
        test: /\.(css)$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[local]_[hash:base64:5]!postcss',
        include: basePath
      }
    ]
  },
  postcss: function postcssPlugins () {
    return [
      require('autoprefixer'),
      require('css-mqpacker'),
      require('postcss-nested'),
      require('postcss-discard-comments')({
        removeAll: true
      })
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new WebpackAnybarPlugin({
      port: 1738
    })
  ]
}
