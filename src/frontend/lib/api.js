import Horizon from '@horizon/client'
import { AsyncStatus } from 'lib/constants'

const horizon = Horizon({
  authType: 'token',
  secure: true
})

const getCurrentUser = () => {
  if (horizon.hasAuthToken()) {
    return horizon.currentUser().fetch()
  }
}

const isAnonymous = (user) => {
  return !user || user.status !== AsyncStatus.SUCCESS || !user.providers
}

const logout = () => {
  // Horizon.clearAuthTokens()
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
  onReady,
  isAnonymous
}
