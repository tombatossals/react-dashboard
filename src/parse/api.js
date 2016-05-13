import { ParseServer } from 'parse-server'
import config from 'config'

const api = new ParseServer({
  databaseURI: config.get('parse.databaseURI'),
  appId: config.get('parse.appId'),
  masterKey: config.get('parse.masterKey'),
  serverURL: config.get('parse.serverURL'),
  cloud: `${__dirname}/cloud/main.js`,
  emailAdapter: {
    module: 'parse-server-simple-mailgun-adapter',
    options: {
      fromAddress: 'scooby@batmin.com',
      domain: 'batmin.com',
      apiKey: config.get('parse.email.key')
    }
  }
})

export default api
