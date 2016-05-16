import React from 'react'
import { Router, Route, Redirect, browserHistory } from 'react-router'
import Layout from 'containers/Layout'
import Youtube from 'components/Youtube'
import Home from 'components/Home'
import { syncHistoryWithStore } from 'react-router-redux'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'
import configureStore from 'lib/store'
import { userIsAuthenticated } from 'lib/auth'
import { Profile, Login, Signup, Logout } from 'containers/User'
import SignupSuccess from 'components/User/SignupSuccess'
import API from 'lib/api'

API.init()

const store = configureStore(browserHistory)
injectTapEventPlugin()

const history = syncHistoryWithStore(browserHistory, store)

const router = (
  <Router history={history}>
    <Redirect from='/' to='/home' />
    <Route path='/' component={Layout}>
      <Route path='youtube' component={userIsAuthenticated(Youtube)} />
      <Route path='home' component={Home} />
      <Route path='user'>
        <Route path='login' component={Login} />
        <Route path='logout' component={Logout} />
        <Route path='preferences' component={userIsAuthenticated(Profile)} />
        <Route path='signup' component={Signup} />
        <Route path='signup/success' component={SignupSuccess} />
        <Route path='profile' component={userIsAuthenticated(Profile)} />
      </Route>
    </Route>
  </Router>)

ReactDOM.render((
  <Provider store={store}>
    {router}
  </Provider>), document.getElementById('root'))
