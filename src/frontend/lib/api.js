import Parse from 'parse'

const init = () => {
  Parse.initialize('react-dashboard', 'myb1gs3cret')
  Parse.serverURL = 'http://localhost:8080/parse'
}

const login = (username, password) => {
  return Parse.User.logIn(username, password)
        .then(res => res.fetch())
}

const facebookLogin = () => {
  return new Promise((resolve, reject) => {
    Parse.FacebookUtils.logIn(null, {
      success: user => resolve(user),
      reject: (user, error) => {
        console.log(user, error)
      }
    })
  })
}

const logout = () => Parse.User.logOut()
const getCurrentUser = () => Parse.User.current()

window.fbAsyncInit = () => {
  Parse.FacebookUtils.init({
    appId: '1495421584065697',
    status: true,
    cookie: true,
    xfbml: true,
    version: 'v2.5'
  })
}

export default {
  init,
  login,
  logout,
  getCurrentUser,
  facebookLogin
}
