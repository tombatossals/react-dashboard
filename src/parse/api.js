import { ParseServer } from 'parse-server'
import config from 'config'

const api = new ParseServer({
  databaseURI: config.get('parse.databaseURI'),
  appId: config.get('parse.appId'),
  masterKey: config.get('parse.masterKey'),
  serverURL: config.get('parse.serverURL')
})

export default api
