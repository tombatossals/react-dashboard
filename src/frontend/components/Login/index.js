import React from 'react';
import styles from 'components/Login/login.style';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';
import { AsyncStatus } from 'lib/constants';
import Paper from 'material-ui/Paper';
// import Divider from 'material-ui/Divider';
import Title from 'components/Login/title';

export default class Login extends React.Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  setUsername(ev) {
    this.setState({
      username: ev.target.value,
    });
  }

  setPassword(ev) {
    this.setState({
      password: ev.target.value,
    });
  }

  focus(field) {
    if (field) {
      field.focus();
    }
  }

  submit() {
    this.setState({
      status: AsyncStatus.LOADING,
    });

    this.props.onSubmit({
      username: this.state.username,
      password: this.state.password,
    });
  }

  disableInput() {
    return this.props.status === AsyncStatus.LOADING ||
           this.props.status === AsyncStatus.SUCCESS;
  }

  showButtonLabel() {
    if (this.props.status === AsyncStatus.LOADING) {
      return 'Wait...';
    } else if (this.props.status === AsyncStatus.SUCCESS) {
      return 'Success';
    }
    return 'Log in';
  }

  render() {
    return (
      <Paper style={styles.login} zDepth={3}>
        <Title message={this.props.message} />
        <div style={styles.form}>
          <div style={styles.external}>
            <FlatButton style={styles.google} label="Google" />
            <FlatButton style={styles.facebook} label="Facebook" />
          </div>
          <div style={styles.loginform}>
            <TextField
              ref={this.focus}
              onChange={this.setUsername}
              style={styles.textlabel}
              disabled={this.disableInput()}
              hintText="Username"
            />
            <TextField
              style={styles.textlabel}
              onChange={this.setPassword}
              type="password"
              disabled={this.disableInput()}
              hintText="Password"
            />
            <RaisedButton
              primary
              onClick={this.submit}
              style={styles.button}
              disabled={this.disableInput()}
              label={this.showButtonLabel()}
            />
          </div>
        </div>
        {this.props.status === AsyncStatus.LOADING && <LinearProgress mode="indeterminate" />}
      </Paper>
    );
  }
}

Login.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  status: React.PropTypes.string.isRequired,
  message: React.PropTypes.string,
};
