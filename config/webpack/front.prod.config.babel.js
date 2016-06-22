import webpack from 'webpack'
import path from 'path'
import config from 'config'

const basePath = path.join(__dirname, '../../src')
const buildPath = path.join(__dirname, '../../.build')
const staticPath = path.join(basePath, 'static')

export default {
  target: 'web',
  devtool: 'eval',
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
  plugins: (config.plugins || []).concat([
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
  ])
}
