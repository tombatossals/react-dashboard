import React from 'react'
import { Router, Route, Redirect, browserHistory } from 'react-router'
import Layout from 'containers/Layout'
import Youtube from 'components/Youtube'
import Home from 'components/Home'
import Login from 'containers/Login'
import Logout from 'containers/Logout'
import { syncHistoryWithStore } from 'react-router-redux'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'
import configureStore from 'lib/store'
import { userIsAuthenticated } from 'lib/auth'
import Parse from 'parse'
import UserProfile from 'containers/UserProfile'

Parse.initialize('react-dashboard', 'myb1gs3cret')
Parse.serverURL = 'http://localhost:8080/parse'

const store = configureStore(browserHistory)
injectTapEventPlugin()

const history = syncHistoryWithStore(browserHistory, store)

const router = (
  <Router history={history}>
    <Redirect from='/' to='/home' />
    <Route path='/' component={Layout}>
      <Route path='login' component={Login} />
      <Route path='logout' component={Logout} />
      <Route path='youtube' component={userIsAuthenticated(Youtube)} />
      <Route path='home' component={Home} />
      <Route path='user'>
        <Route path='preferences' component={UserProfile} />
        <Route path='profile' component={UserProfile} />
      </Route>
    </Route>
  </Router>)

ReactDOM.render((
  <Provider store={store}>
    {router}
  </Provider>), document.getElementById('root'))
