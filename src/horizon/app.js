import path from 'path'
import express from 'express'
import horizon from '@horizon/server'
import config from '../../config'
import fs from 'fs'
import https from 'https'

const app = express()
let host = `//${config.express.host}:${config.express.port}`

if (process.env.NODE_ENV === 'production') {
  app.use('/static', express.static(path.join(process.cwd(), '.build')))
  console.log(path.join(process.cwd(), '.build'))
} else {
  app.use('/static', express.static(path.join(process.cwd(), 'src', 'static')))
  host = `https://${config.devServer.host}:${config.devServer.port}`
}

const vendor = `${host}/static/vendor.bundle.js`
const bundle = `${host}/static/client.bundle.js`
const styles = `${host}/static/css/style.css`

app.use('/', (req, res) => {
  res.status(200).send(`<!doctype html>
    <html>
      <head>
        <title>React-Dashboard</title>
        <link rel="stylesheet" type="text/css" href="${styles}" />
      </head>
      <body>
        <div id='root'></div>
        <script src="${vendor}"></script>
        <script src="${bundle}"></script>
      </body>
    </html>`)
})

const run = () => {
  const port = config.express.port

  const options = {
    key: fs.readFileSync(config.express.ssl.key),
    cert: fs.readFileSync(config.express.ssl.cert)
  }

  const server = https.createServer(options, app)
  server.listen(port, err => {
    if (err) {
      console.log(err)
    }
  })

  const hserver = horizon(server, {
    project_name: 'rdash',
    permissions: false,
    auto_create_collection: true,
    auth: {
      allow_anonymous: true,
      allow_unauthenticated: true,
      token_secret: config.token_secret
    }
  })

  hserver.add_auth_provider(horizon.auth.github, config.auth.providers.github)
  hserver.add_auth_provider(horizon.auth.google, config.auth.providers.google)
}

export default {
  run
}
