import Horizon from '@horizon/client'

const horizon = Horizon({
  authType: 'anonymous',
  secure: true
})

horizon.connect()

const getCurrentUser = () => {
  if (horizon.hasAuthToken()) {
    return horizon.currentUser()
  }
}

const logout = () => {
  Horizon.clearAuthTokens()
}

const getStatus = () => {
  return horizon.status()
}

const githubLogin = () => {
  return horizon.authEndpoint('github')
}

const googleLogin = () => {
  return horizon.authEndpoint('google')
}

const getCountries = () => {
  return horizon('countries').fetch()
}

const onReady = (cb) => {
  horizon.onReady(cb)
}

export default {
  getCurrentUser,
  githubLogin,
  googleLogin,
  logout,
  getCountries,
  getStatus,
  horizon,
  onReady
}
