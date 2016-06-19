import React from 'react'
import { Router, Route, Redirect, browserHistory } from 'react-router'
import { Profile, Login, Signup, Logout } from 'containers/User'
import SignupSuccess from 'components/User/SignupSuccess'
import { syncHistoryWithStore } from 'react-router-redux'
import { userIsAuthenticated } from 'lib/auth'
import Layout from 'containers/Layout'
import Youtube from 'components/Youtube'
import Home from 'components/Home'
import store from 'lib/store'

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

export default router
