import Horizon from '@horizon/client'

const horizon = Horizon({
  authType: 'token'
})

const init = () => {
  horizon.connect()
}

const getCurrentUser = () => {
  console.log('getUser')
  return horizon.currentUser().fetch().subscribe
}

const hasAuthToken = () => {
  return horizon.hasAuthToken()
}

const clearAuthTokens = () => Horizon.clearAuthTokens()

export default {
  init,
  getCurrentUser,
  clearAuthTokens,
  hasAuthToken
}
