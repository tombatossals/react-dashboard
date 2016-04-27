import React from 'react';
import LoginComponent from 'components/Login';
import { AsyncStatus } from 'lib/constants';
import { authenticate, checkAuthToken } from 'actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';

class Login extends React.Component {
  componentWillMount() {
    this.ensureNotLoggedIn(this.props);
  }

  componentWillReceiveProps(props) {
    this.ensureNotLoggedIn(props);
  }

  ensureNotLoggedIn(props) {
    if (props.auth.status === AsyncStatus.IDLE) {
      props.checkAuthToken();
    } else if (props.auth.status === AsyncStatus.SUCCESS) {
      props.replace(props.redirect);
    }
  }

  render() {
    return (
      <LoginComponent
        onSubmit={this.props.authenticate}
        status={this.props.auth.status}
        message={this.props.auth.message}
      />
    );
  }
}

Login.propTypes = {
  auth: React.PropTypes.shape({
    token: React.PropTypes.string,
    status: React.PropTypes.string,
    username: React.PropTypes.string,
    message: React.PropTypes.string,
    admin: React.PropTypes.bool,
  }),
  authenticate: React.PropTypes.func.isRequired,
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
    authenticate,
    checkAuthToken,
    replace: routerActions.replace,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

