import webpack from 'webpack'
import defaultConfig from './client.config.default'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import config from 'config'

const webpackConfig = config.get('webpack')

const devConfig = Object.assign({}, defaultConfig, {
  devtool: 'source-map',
  entry: Object.assign({}, defaultConfig.entry, {
    app: defaultConfig.entry.app.concat([
      'react-hot-loader/patch',
      `webpack-dev-server/client?${webpackConfig.baseUrl}`,
      'webpack/hot/only-dev-server'
    ])
  }),
  output: Object.assign(defaultConfig.output, {
    publicPath: `${webpackConfig.baseUrl}}/static/`,
    pathinfo: true,
    crossOriginLoading: 'anonymous'
  }),
  plugins: (defaultConfig.plugins || []).concat([
    new ExtractTextPlugin('styles.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]),
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
})

export default devConfig
