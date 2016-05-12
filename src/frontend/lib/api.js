import Parse from 'parse'

const init = () => {
  Parse.initialize('react-dashboard', 'myb1gs3cret')
  Parse.serverURL = 'http://localhost:8080/parse'
}

const login = (username, password) => {
  return Parse.User.logIn(username, password)
        .then(res => res.fetch())
}

const logout = () => Parse.User.logOut()
const getCurrentUser = () => Parse.User.current()

export default {
  init,
  login,
  logout,
  getCurrentUser
}
