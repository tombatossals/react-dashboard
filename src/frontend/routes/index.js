import React from 'react'
import { Router, Route, Redirect } from 'react-router'
import { Profile, Login, Signup, Logout } from 'containers/User'
import SignupSuccess from 'components/User/SignupSuccess'
import Layout from 'containers/Layout'
import Youtube from 'components/Youtube'
import Home from 'components/Home'
import Countries from 'containers/Countries'
import requireauth from 'containers/User/requireauth'

const Routes = (props) => (
  <Router history={props.history}>
    <Redirect from='/' to='/home' />
    <Route path='/' component={Layout}>
      <Route path='home' component={Home} />
      <Route path='countries' component={Countries} />
      <Route path='login' component={Login} />
      <Route path='logout' component={Logout} />
      <Route path='youtube' component={requireauth(Youtube)} />
      <Route path='user'>
        <Route path='preferences' component={requireauth(Profile)} />
        <Route path='signup' component={Signup} />
        <Route path='signup/success' component={SignupSuccess} />
        <Route path='profile' component={requireauth(Profile)} />
      </Route>
    </Route>
  </Router>
)

Routes.propTypes = {
  history: React.PropTypes.any
}

export default Routes
