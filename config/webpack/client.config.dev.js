import webpack from 'webpack'
import path from 'path'
import chalk from 'chalk'
import config from 'config'
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const WebpackAnybarPlugin = require('webpack-anybar-plugin').default

const basePath = path.join(__dirname, '../../src')
const buildPath = path.join(__dirname, '../../.build')
const staticPath = path.join(__dirname, '../../src/static')

const webpackConfig = config.get('webpack')

const devConfig = {
  target: 'web',
  devtool: 'source-map',
  context: __dirname,
  cache: true,
  entry: {
    app: [
      `webpack-dev-server/client?${webpackConfig.baseUrl}`,
      'webpack/hot/only-dev-server',
      path.join(basePath, '/frontend/app')
    ]
  },
  output: {
    path: buildPath,
    filename: 'client.bundle.js',
    publicPath: `${webpackConfig.baseUrl}/static/`,
    pathinfo: true,
    crossOriginLoading: 'anonymous'
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new WebpackAnybarPlugin({
      port: 1738
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  devServer: {
    publicPath: `${webpackConfig.baseUrl}/static`,
    host: webpackConfig.host,
    hot: true,
    historyApiFallback: true,
    port: webpackConfig.port,
    stats: {
      colors: true,
      chunkModules: false,
      modules: false
    }
  }
}

export default devConfig
