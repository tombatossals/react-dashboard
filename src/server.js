import express from 'express'
import config from 'config'
import webpack from 'webpack'
import proxy from 'proxy-middleware'
import url from 'url'
import WebpackDevServer from 'webpack-dev-server'
import configWebpackDevServer from '../webpack/dev.config'
import api from './parse/api'

// import apiRoutes from './backend/routes/api'

const PORT = config.get('express.port')
const app = express()

const server = new WebpackDevServer(webpack(configWebpackDevServer), {
  contentBase: 'src/static',
  headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: true,
  devtool: 'eval',
  hot: true,
  inline: true,
  stats: { colors: true }
})

app.get('/favicon.ico', proxy(url.parse('http://localhost:8081/')))
app.use('/dist', proxy(url.parse('http://localhost:8081/')))
app.use('/static', express.static(`${__dirname}/static`))
app.use('/parse', api)
app.get('/*', (req, res) => res.sendFile(`${__dirname}/static/index.html`))
server.listen(8081, 'localhost')
app.listen(PORT)
