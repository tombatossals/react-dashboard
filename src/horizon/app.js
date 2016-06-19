import path from 'path'
import express from 'express'
import horizon from '@horizon/server'
import config from 'config'

const webpackConfig = config.get('webpack')
const pageConfig = config.get('page')
const authConfig = config.get('auth')
const app = express()

app.use('/static', express.static(path.join(process.cwd(), 'src/static')))
const host = process.env.NODE_ENV === 'production' ? '' : webpackConfig.baseUrl
const bundle = `${host}/static/client.bundle.js`
const styles = '/static/css/style.css'

app.use('/', (req, res) => {
  res.status(200).send(`<!doctype html>
    <html>
      <head>
        <title>${pageConfig.title}</title>
        <link rel="stylesheet" type="text/css" href="${styles}" />
      </head>
      <body>
        <div id='root'></div>
        <script src="${bundle}"></script>
      </body>
    </html>`)
})

const run = () => {
  const port = process.env.PORT || pageConfig.port
  const httpServer = app.listen(port, (err) => {
    if (err) {
      console.log(err)
      return
    }
  })

  // @TODO make this configurable
  const hserver = horizon(httpServer, {
    auto_create_collection: true,
    auto_create_index: true,
    project_name: 'rdash',
    permissions: false,
    auth: {
      allow_anonymous: true,
      allow_unauthenticated: true,
      token_secret: pageConfig.token_secret
    }
  })

/*
  hserver.add_auth_provider(horizon.auth.github, {
    path: 'github',
    id: authConfig.providers.github.id,
    secret: authConfig.providers.github.secret
  })
*/
}

export default {
  run
}
