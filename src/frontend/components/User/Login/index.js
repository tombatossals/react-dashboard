import React from 'react'
import styles from 'components/User/Login/style'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import LinearProgress from 'material-ui/LinearProgress'
import { AsyncStatus } from 'lib/constants'
import Paper from 'material-ui/Paper'
import Title from 'components/User/Title'
import ActionAndroid from 'material-ui/svg-icons/action/android'
import { Row, Col } from 'react-flexbox-grid/lib'

export default class Login extends React.Component {
  constructor () {
    super()
    this.submit = this.submit.bind(this)
    this.facebookLogin = this.facebookLogin.bind(this)
    this.setUsername = this.setUsername.bind(this)
    this.setPassword = this.setPassword.bind(this)
    this.onEnterKeyDown = this.onEnterKeyDown.bind(this)
  }

  onEnterKeyDown (ev) {
    if (ev.keyCode === 13) {
      this.submit()
    }
  }

  setUsername (ev) {
    this.setState({
      username: ev.target.value
    })
  }

  setPassword (ev) {
    this.setState({
      password: ev.target.value
    })
  }

  focus (field) {
    if (field) {
      field.focus()
    }
  }

  facebookLogin () {
    this.setState({
      status: AsyncStatus.LOADING
    })

    this.props.onSubmit({
      type: 'facebook'
    })
  }

  submit () {
    if (!this.state.username && !this.state.password) {
      return
    }

    this.setState({
      status: AsyncStatus.LOADING
    })

    this.props.onSubmit({
      username: this.state.username,
      password: this.state.password
    })
  }

  disableInput () {
    return this.props.status === AsyncStatus.LOADING ||
    this.props.status === AsyncStatus.SUCCESS
  }

  showButtonLabel () {
    if (this.props.status === AsyncStatus.LOADING) {
      return 'Wait...'
    } else if (this.props.status === AsyncStatus.SUCCESS) {
      return 'Success'
    }
    return 'Log in'
  }

  render () {
    return (
      <Row center='xs'>
        <Col md={4}>
          <Paper style={styles.login} zDepth={3}>
            <Title label='Login' message={this.props.message} />
            <div style={styles.form}>
              <div style={styles.loginform}>
                <TextField
                  ref={this.focus}
                  onChange={this.setUsername}
                  style={styles.textlabel}
                  disabled={this.disableInput()}
                  inputStyle={styles.hideAutoFillColorStyle}
                  hintStyle={styles.hintStyle}
                  hintText='Username' />
                <TextField
                  style={styles.textlabel}
                  onChange={this.setPassword}
                  type='password'
                  disabled={this.disableInput()}
                  inputStyle={styles.hideAutoFillColorStyle}
                  hintStyle={styles.hintStyle}
                  onKeyDown={this.onEnterKeyDown}
                  hintText='Password' />
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
            {this.props.status === AsyncStatus.LOADING && <LinearProgress mode='indeterminate' />}
          </Paper>
        </Col>
        {this.props.external &&
          <Col md={1} />
        }
        {this.props.external &&
          <Col md={4}>
            <h2>Log-in with other providers</h2>
            <div style={styles.external}>
              <FlatButton
                style={styles.google}
                label='Google Sign in'
                icon={<ActionAndroid />}
                onClick={this.submit}
              />
              <FlatButton
                style={styles.facebook}
                label='Facebook Sign in'
                icon={<ActionAndroid />}
                onClick={this.facebookLogin}
              />
            </div>
          </Col>
        }
      </Row>
    )
  }
}

Login.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  onSignup: React.PropTypes.func.isRequired,
  status: React.PropTypes.string.isRequired,
  external: React.PropTypes.bool,
  message: React.PropTypes.string
}
