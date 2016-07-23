import React from 'react'
import styles from 'components/User/Signup/style'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import LinearProgress from 'material-ui/LinearProgress'
import { AsyncStatus } from 'lib/constants'
import Paper from 'material-ui/Paper'
import Title from 'components/User/Title'

export default class Signup extends React.Component {
  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    onLogin: React.PropTypes.func.isRequired,
    status: React.PropTypes.string.isRequired,
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

  setEmail = (ev) => {
    this.setState({
      email: ev.target.value
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

  submit = () => {
    this.setState({
      status: AsyncStatus.REQUEST
    })

    this.props.onSubmit({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    })
  }

  disableInput = () => {
    return this.props.status === AsyncStatus.REQUEST ||
           this.props.status === AsyncStatus.AUTHENTICATED
  }

  disableButton = () => {
    return false
  }

  showButtonLabel = () => {
    if (this.props.status === AsyncStatus.REQUEST) {
      return 'Wait...'
    } else if (this.props.status === AsyncStatus.AUTHENTICATED) {
      return 'Success'
    }
    return 'Signup'
  }

  render () {
    return (
      <div style={styles.signupBox}>
        <Paper style={styles.registration} zDepth={3}>
          <Title label="Signup new account" message={this.props.message} />
          <div style={styles.form}>
            <div style={styles.registrationform}>
              <TextField
                ref={this.focus}
                onChange={this.setUsername}
                style={styles.textlabel}
                disabled={this.disableInput()}
                inputStyle={styles.hideAutoFillColorStyle}
                hintStyle={styles.hintStyle}
                name="newUsername"
                hintText="Username" />
              <TextField
                onChange={this.setEmail}
                style={styles.textlabel}
                disabled={this.disableInput()}
                inputStyle={styles.hideAutoFillColorStyle}
                hintStyle={styles.hintStyle}
                name="newEmail"
                hintText="E-mail address" />

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
                secondary
                onClick={this.submit}
                style={styles.button}
                disabled={this.disableButton()}
                label={this.showButtonLabel()} />
              <div style={styles.login}>
                You already have an account?&nbsp;
                <strong style={styles.onLogin} onClick={this.props.onLogin}>Login</strong>
              </div>
            </div>
          </div>
          {this.props.status === AsyncStatus.REQUEST && <LinearProgress mode="indeterminate" />}
        </Paper>
      </div>
    )
  }
}
