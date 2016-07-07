import webpack from 'webpack'
import path from 'path'
import chalk from 'chalk'
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const basePath = path.join(__dirname, '../src')
const buildPath = path.join(__dirname, '../.build')
const staticPath = path.join(basePath, 'static')

export const baseUrl = ''
export const host = '127.0.0.1'
export const port = 9005

export default {
  target: 'web',
  devtool: 'source-map',
  context: __dirname,
  cache: true,
  entry: {
    app: [
      `webpack-dev-server/client?${baseUrl}`,
      'webpack/hot/only-dev-server',
      path.join(basePath, '/frontend/app')
    ]
  },
  output: {
    path: buildPath,
    filename: 'client.bundle.js',
    publicPath: `${baseUrl}/static/`,
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  devServer: {
    publicPath: `${baseUrl}/static`,
    host,
    port,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
      chunkModules: false,
      modules: false
    }
  }
}
