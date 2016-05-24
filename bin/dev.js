require('shelljs/global')

import path from 'path'
import dirs from '../config/dirs'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

const clientConfig = require(path.join(dirs.webpack, 'webpack.config.client.dev.js'))

const webpackServerReady = () => {
  console.log(`\nWebpack Dev Server listening on port ${clientConfig.devServer.port}`)
  const app = require('../src/horizon/app.js').default
  app.run()
}

const compileClient = () => {
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
}

compileClient()
