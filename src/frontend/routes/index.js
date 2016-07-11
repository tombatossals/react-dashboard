import React from 'react'
import { Router, Route, Redirect } from 'react-router'
import { Profile, Login, Signup, Logout } from 'containers/User'
import SignupSuccess from 'components/User/SignupSuccess'
import Layout from 'containers/Layout'
import Youtube from 'components/Youtube'
import Home from 'components/Home'
import authenticate from 'lib/auth'

const Routes = (props) => (
  <Router history={props.history}>
    <Redirect from='/' to='/home' />
    <Route path='/' component={Layout}>
      <Route path='/home' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='logout' component={Logout} />
      <Route path='/youtube' component={authenticate(Youtube)} />
      <Route path='user'>
        <Route path='preferences' component={authenticate(Profile)} />
        <Route path='signup' component={Signup} />
        <Route path='signup/success' component={SignupSuccess} />
        <Route path='profile' component={authenticate(Profile)} />
      </Route>
    </Route>
  </Router>
)

Routes.propTypes = {
  history: React.PropTypes.any
}

export default Routes
