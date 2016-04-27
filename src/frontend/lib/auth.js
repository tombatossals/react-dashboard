import { UserAuthWrapper as userAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';

export const userIsAuthenticated = userAuthWrapper({
  authSelector: state => state.auth,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
});

export const userIsAdmin = userAuthWrapper({
  authSelector: state => state.user,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/',
  wrapperDisplayName: 'UserIsAdmin',
  predicate: user => user.isAdmin,
  allowRedirectBack: false,
});
