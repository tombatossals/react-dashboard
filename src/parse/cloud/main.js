import config from 'config'
import qs from 'querystring'

const clientId = config.get('auth.providers.github.client')
const clientSecret = config.get('auth.providers.github.secret')

const redirectUrl = config.get('auth.providers.github.endpoints.redirect')
const validateUrl = config.get('auth.providers.github.endpoints.redirect')

const TokenRequest = Parse.Object.extend('TokenRequest')
const TokenStorage = Parse.Object.extend('TokenStorage')

const restrictedAcl = new Parse.ACL()
restrictedAcl.setPublicReadAccess(false)
restrictedAcl.setPublicWriteAccess(false)

Parse.Cloud.define('authorize', (res, response) => {
  const tokenRequest = new TokenRequest()
  tokenRequest.setACL(restrictedAcl)

  tokenRequest.save(null, { useMasterKey: true }).then(obj => {
    res.redirect(
      redirectUrl + qs.stringify({
        client_id: clientId,
        state: obj.id
      })
    )
  }, () => res.status(500).json({errorMessage: 'Failed to save auth request.'}))
})

