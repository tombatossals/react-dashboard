import React from 'react';
import styles from 'components/Login/login.style';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';
import { AsyncStatus } from 'lib/constants';

export default class Login extends React.Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.state = {
      status: AsyncStatus.IDLE,
    };
  }

  componentWillReceiveProps(props) {
    if (props.status === AsyncStatus.SUCCESS) {
      this.setState({
        status: props.status,
        message: '',
      });
    }
    if (props.status === AsyncStatus.FAILED) {
      this.setState({
        status: props.status,
        message: props.message,
      });
    }
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
    field.focus();
  }

  submit() {
    this.setState({
      status: AsyncStatus.LOADING,
    });

    this.props.onSubmit(this.state.username, this.state.password);
  }

  disableInput() {
    return this.state.status === AsyncStatus.LOADING ||
           this.state.status === AsyncStatus.SUCCESS;
  }

  showButtonLabel() {
    if (this.state.status === AsyncStatus.LOADING) {
      return 'Wait...';
    } else if (this.state.status === AsyncStatus.SUCCESS) {
      return 'Success';
    }
    return 'Log in';
  }

  render() {
    return (<div style={styles.loginbox}>
      <h1 style={styles.h1}>Log in to your account</h1>
      <div style={styles.loginform}>
        <div style={styles.error}>
          <span style={styles.message}>{this.state.message}</span>
        </div>
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
          style={styles.loginbutton}
          disabled={this.disableInput()}
          label={this.showButtonLabel()}
        />
        {this.state.status === AsyncStatus.LOADING && <LinearProgress mode="indeterminate" />}
      </div>
    </div>
    );
  }
}

Login.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
};
