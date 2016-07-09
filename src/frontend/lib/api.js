import Horizon from '@horizon/client'

const horizon = Horizon({
  authType: 'anonymous'
})

const getCurrentUser = () => {
  if (horizon.hasAuthToken()) {
    horizon.connect()
    return horizon.currentUser()
  }
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
  googleLogin
}
