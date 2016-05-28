require('shelljs/global')

import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import clientConfig from '../config/webpack/webpack.config.client.dev'
import { default as app } from '../src/horizon/app'

const webpackServerReady = () => {
  console.log(`\nWebpack Dev Server listening on port ${clientConfig.devServer.port}`)
  app.run()
}

const clientCompiler = webpack(clientConfig)
const clientDevServer = new WebpackDevServer(
  clientCompiler,
  clientConfig.devServer
)

clientDevServer.listen(
  clientConfig.devServer.port,
  clientConfig.devServer.host,
  webpackServerReady
)
