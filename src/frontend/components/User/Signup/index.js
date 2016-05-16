import React from 'react'
import styles from 'components/User/Signup/style'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import LinearProgress from 'material-ui/LinearProgress'
import { AsyncStatus } from 'lib/constants'
import Paper from 'material-ui/Paper'
import Title from 'components/User/title'
import { Row, Col } from 'react-flexbox-grid/lib'

export default class Signup extends React.Component {
  constructor () {
    super()
    this.submit = this.submit.bind(this)
    this.setUsername = this.setUsername.bind(this)
    this.setPassword = this.setPassword.bind(this)
    this.setEmail = this.setEmail.bind(this)
    this.disableButton = this.disableButton.bind(this)
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

  setEmail (ev) {
    this.setState({
      email: ev.target.value
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

  submit () {
    this.setState({
      status: AsyncStatus.LOADING
    })

    this.props.onSubmit({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    })
  }

  disableInput () {
    return this.props.status === AsyncStatus.LOADING ||
           this.props.status === AsyncStatus.SUCCESS
  }

  disableButton () {
    return false
  }

  showButtonLabel () {
    if (this.props.status === AsyncStatus.LOADING) {
      return 'Wait...'
    } else if (this.props.status === AsyncStatus.SUCCESS) {
      return 'Success'
    }
    return 'Signup'
  }

  render () {
    return (
      <Row center='xs'>
        <Col md={4}>
          <Paper style={styles.registration} zDepth={3}>
            <Title label='Signup new account' message={this.props.message} />
            <div style={styles.form}>
              <div style={styles.registrationform}>
                <TextField
                  ref={this.focus}
                  onChange={this.setUsername}
                  style={styles.textlabel}
                  disabled={this.disableInput()}
                  inputStyle={styles.hideAutoFillColorStyle}
                  hintStyle={styles.hintStyle}
                  name='newUsername'
                  hintText='Username' />
                <TextField
                  onChange={this.setEmail}
                  style={styles.textlabel}
                  disabled={this.disableInput()}
                  inputStyle={styles.hideAutoFillColorStyle}
                  hintStyle={styles.hintStyle}
                  name='newEmail'
                  hintText='E-mail address' />

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
                  secondary
                  onClick={this.submit}
                  style={styles.button}
                  disabled={this.disableButton()}
                  label={this.showButtonLabel()} />
              </div>
            </div>
            {this.props.status === AsyncStatus.LOADING && <LinearProgress mode='indeterminate' />}
          </Paper>
        </Col>
      </Row>
    )
  }
}

Signup.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  status: React.PropTypes.string.isRequired,
  message: React.PropTypes.string
}
