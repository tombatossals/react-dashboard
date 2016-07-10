import Horizon from '@horizon/client'

const horizon = Horizon({
  authType: 'token',
  secure: true,
  path: '/horizon',
  host: '127.0.0.1:8181'
})

const getCurrentUser = () => {
  horizon.status().subscribe(status => console.log('status', status))
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
