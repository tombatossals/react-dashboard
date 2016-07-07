import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import { default as app } from './horizon/app'
import wpConfig from '../config/webpack.front.dev.config.babel'

const onReady = () => {
  console.log(`\nWebpack Dev Server listening on port ${wpConfig.devServer.port}`)
  app.run()
}

const clientCompiler = webpack(wpConfig)
const clientDevServer = new WebpackDevServer(
  clientCompiler,
  wpConfig.devServer
)

clientDevServer.listen(
  wpConfig.devServer.port,
  wpConfig.devServer.host,
  onReady
)
