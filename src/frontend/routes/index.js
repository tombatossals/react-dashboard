import React from 'react'
import { Router, Route, Redirect } from 'react-router'
import { Profile, Login, Signup, Logout } from 'containers/User'
import SignupSuccess from 'components/User/SignupSuccess'
import Layout from 'containers/Layout'
import Youtube from 'components/Youtube'
import Home from 'components/Home'
import Countries from 'containers/Countries'
import RequireAuth from 'containers/RequireAuth'

const Routes = (props) => (
  <Router history={props.history}>
    <Redirect from="/" to="/home" />
    <Route path="/" component={Layout}>
      <Route path="home" component={Home} />
      <Route path="countries" component={RequireAuth(Countries)} />
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="youtube" component={RequireAuth(Youtube)} />
      <Route path="user">
        <Route path="preferences" component={RequireAuth(Profile)} />
        <Route path="signup" component={Signup} />
        <Route path="signup/success" component={SignupSuccess} />
        <Route path="profile" component={RequireAuth(Profile)} />
      </Route>
    </Route>
  </Router>
)

Routes.propTypes = {
  history: React.PropTypes.object.isRequired
}

export default Routes
