import React from 'react';
import { resetAuth } from 'actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Logout extends React.Component {
  componentWillMount() {
    this.props.resetAuth();
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
  resetAuth: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    resetAuth,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Logout);

