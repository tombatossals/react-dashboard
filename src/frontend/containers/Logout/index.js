import React from 'react';
import { logout } from 'actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Logout extends React.Component {
  componentWillMount() {
    this.props.logout();
  }

  render() {
    return (
      <div>
        <h1>Logged out</h1>
        <Link to="/">Go to main page</Link>
      </div>
    );
  }
}

Logout.propTypes = {
  logout: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logout,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Logout);

