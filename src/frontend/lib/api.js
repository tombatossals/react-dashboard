import Horizon from '@horizon/client'

const horizon = Horizon({
  authType: 'token',
  secure: true
})

const getCurrentUser = () => {
  if (horizon.hasAuthToken()) {
    horizon.connect()
    return horizon.currentUser()
  }
}

const logout = () => {
  Horizon.clearAuthTokens()
}

const githubLogin = () => {
  return horizon.authEndpoint('github')
}

const googleLogin = () => {
  return horizon.authEndpoint('google')
}

export default {
  getCurrentUser,
  githubLogin,
  googleLogin,
  logout
}
