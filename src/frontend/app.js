import React from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import Layout from 'components/Layout';
import Youtube from 'components/youtube';
import Login from 'containers/Login';
import { syncHistoryWithStore, routerActions } from 'react-router-redux';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import createAppStore from 'lib/store';
import { UserAuthWrapper as createUserAuthWrapper } from 'redux-auth-wrapper';


const store = createAppStore();
injectTapEventPlugin();

// Redirects to /login by default
const userIsAuthenticated = createUserAuthWrapper({
  authSelector: state => state.user, // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated', // a nice name for this auth check
});

const history = syncHistoryWithStore(browserHistory, store);
const router = (
  <Router history={history}>
    <Redirect from="/" to="/youtube" />
    <Route path="/" component={Layout}>
      <Route path="login" component={Login} />
      <Route path="youtube" component={userIsAuthenticated(Youtube)} />
    </Route>
  </Router>);

ReactDOM.render((
  <Provider store={store}>
    {router}
  </Provider>), document.getElementById('root'));
