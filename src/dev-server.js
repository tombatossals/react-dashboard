import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import { default as app } from './horizon/app'
import config from '../config/webpack.front.dev.config.babel'

const onReady = () => {
  console.log(`\nWebpack Dev Server listening on port ${config.devServer.port}`)
  app.run()
}

const clientCompiler = webpack(config)
const clientDevServer = new WebpackDevServer(
  clientCompiler,
  config.devServer
)

clientDevServer.listen(
  config.devServer.port,
  config.devServer.host,
  onReady
)
