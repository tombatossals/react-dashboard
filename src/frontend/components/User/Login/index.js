import React from 'react'
import styles from 'components/User/Login/style'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import LinearProgress from 'material-ui/LinearProgress'
import { UserStatus } from 'lib/constants'
import Paper from 'material-ui/Paper'
import Title from 'components/User/Title'
import ActionAndroid from 'material-ui/svg-icons/action/android'

export default class Login extends React.Component {
  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    onSignup: React.PropTypes.func.isRequired,
    status: React.PropTypes.string.isRequired,
    external: React.PropTypes.bool,
    message: React.PropTypes.string
  }

  onEnterKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      this.submit()
    }
  }

  setUsername = (ev) => {
    this.setState({
      username: ev.target.value
    })
  }

  setPassword = (ev) => {
    this.setState({
      password: ev.target.value
    })
  }

  focus = (field) => {
    if (field) {
      field.focus()
    }
  }

  facebookLogin = () => {
    this.setState({
      status: UserStatus.REQUEST
    })

    this.props.onSubmit({
      type: 'facebook'
    })
  }

  githubLogin = () => {
    this.setState({
      status: UserStatus.REQUEST
    })

    this.props.onSubmit({
      type: 'github'
    })
  }

  googleLogin = () => {
    this.setState({
      status: UserStatus.REQUEST
    })

    this.props.onSubmit({
      type: 'google'
    })
  }

  submit = () => {
    if (!this.state.username && !this.state.password) {
      return
    }

    this.setState({
      status: UserStatus.REQUEST
    })

    this.props.onSubmit({
      username: this.state.username,
      password: this.state.password
    })
  }

  disableInput = () => {
    return this.props.status === UserStatus.REQUEST ||
    this.props.status === UserStatus.AUTHENTICATED
  }

  showButtonLabel = () => {
    if (this.props.status === UserStatus.REQUEST) {
      return 'Wait...'
    } else if (this.props.status === UserStatus.AUTHENTICATED) {
      return 'Success'
    }
    return 'Log in'
  }

  render () {
    return (
      <div style={styles.loginbox}>
        <Paper zDepth={3}>
          <Title label="Login" message={this.props.message} />
          <div style={styles.form}>
            <div style={styles.loginform}>
              <TextField
                ref={this.focus}
                onChange={this.setUsername}
                style={styles.textlabel}
                disabled={this.disableInput()}
                inputStyle={styles.hideAutoFillColorStyle}
                hintStyle={styles.hintStyle}
                hintText="Username" />
              <TextField
                style={styles.textlabel}
                onChange={this.setPassword}
                type="password"
                disabled={this.disableInput()}
                inputStyle={styles.hideAutoFillColorStyle}
                hintStyle={styles.hintStyle}
                onKeyDown={this.onEnterKeyDown}
                hintText="Password" />
              <RaisedButton
                primary
                onClick={this.submit}
                style={styles.button}
                disabled={this.disableInput()}
                label={this.showButtonLabel()} />
              <div style={styles.signup}>
                You don't have an account?&nbsp;
                <strong style={styles.onSignup} onClick={this.props.onSignup}>Signup</strong>
              </div>
            </div>
          </div>
          {this.props.status === UserStatus.REQUEST && <LinearProgress mode="indeterminate" />}
        </Paper>
        {this.props.external &&
          <div>
            <h2>Log-in with other providers</h2>
            <div style={styles.external}>
              <FlatButton
                style={styles.google}
                label="Google Sign in"
                icon={<ActionAndroid />}
                onClick={this.googleLogin}
              />
              <FlatButton
                style={styles.facebook}
                label="Github Sign in"
                icon={<ActionAndroid />}
                onClick={this.githubLogin}
              />
            </div>
          </div>
        }
      </div>
    )
  }
}
