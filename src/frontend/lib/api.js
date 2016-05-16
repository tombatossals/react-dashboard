import Parse from 'parse'

const init = () => {
  Parse.initialize('react-dashboard', 'myb1gs3cret')
  Parse.serverURL = 'http://localhost:8080/parse'
}

const login = (username, password) => {
  return Parse.User.logIn(username, password)
        .then(res => res.fetch())
}

const signup = attrs => {
  const { username, password } = attrs
  return Parse.User.signUp(username, password, attrs)
}

const facebookLogin = () => {
  return new Promise((resolve, reject) => {
    Parse.FacebookUtils.logIn(null, {
      success: user => resolve(user),
      error: (user, error) => {
        reject(error)
      }
    })
  })
}

const deleteUser = () => {
  return Parse.User.current().destroy()
}

const logout = () => Parse.User.logOut()
const getCurrentUser = () => Parse.User.current()

window.fbAsyncInit = () => {
  Parse.FacebookUtils.init({
    appId: '1495421584065697',
    cookie: true,
    xfbml: true,
    version: 'v2.5'
  })
}

export default {
  init,
  login,
  signup,
  logout,
  getCurrentUser,
  deleteUser,
  facebookLogin
}
