import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import { default as app } from './horizon/app'
import config from '../config'

const clientConfig = config.default.webpack

const onReady = () => {
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
  onReady
)
