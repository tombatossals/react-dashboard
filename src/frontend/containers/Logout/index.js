import React from 'react';
import { resetAuth } from 'actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { getAuthPropTypes } from 'proptypes';

class Logout extends React.Component {
  componentWillMount() {
    this.props.resetAuth();
    this.props.replace('/');
  }

  render() {
    return null;
  }
}

Logout.propTypes = {
  auth: getAuthPropTypes(),
  resetAuth: React.PropTypes.func.isRequired,
  replace: React.PropTypes.func.isRequired,
  location: React.PropTypes.shape({
    state: React.PropTypes.shape({
      pathname: React.PropTypes.string,
    }),
  }),
};

function mapStateToProps(state, ownProps) {
  const redirect = ownProps.location.query.redirect || '/';
  return {
    auth: state.auth,
    redirect,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    resetAuth,
    replace: routerActions.replace,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);

