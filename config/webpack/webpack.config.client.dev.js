import webpack from 'webpack'
import defaultConfig from './webpack.config.client'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import config from 'config'

const webpackConfig = config.get('webpack')

const devConfig = Object.assign({}, defaultConfig, {
  devtool: 'source-map',
  entry: Object.assign({}, defaultConfig.entry, {
    app: _.union(
      [
        'react-hot-loader/patch',
        `webpack-dev-server/client?${webpackConfig.baseUrl}`,
        'webpack/hot/only-dev-server'
      ],
      defaultConfig.entry.app
    )
  }),
  output: _.assign(_.cloneDeep(defaultConfig.output), {
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
    contentBase: webpackConfig.contentBase,
    port: webpackConfig.port,
    stats: {
      colors: true,
      chunkModules: false,
      modules: false
    }
  }
})

const localCssConfig = devConfig.module.loaders.find(
  l => l.name && l.name === 'local-css-config'
)

delete localCssConfig.name
localCssConfig.loader = ExtractTextPlugin.extract(
  'style',
  'css?sourceMap&modules&importLoaders=1&localIdentName=lovli_[local]_[hash:base64:5]!postcss'
)

module.exports = devConfig
