import React from 'react'
import LockIcon from 'material-ui/svg-icons/action/lock'
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle'
import List from 'material-ui/List'
import ListItem from 'material-ui/List/ListItem'
import Dialog from 'material-ui/Dialog'
import styles from 'components/User/Profile/PreferencesTab/style'
import FlatButton from 'material-ui/FlatButton'
import Title from 'components/User/Title'
import TextField from 'material-ui/TextField'
import { AsyncStatus, UserActions } from 'lib/constants'

export default class PreferencesTab extends React.Component {
  static propTypes = {
    onDeleteSubmit: React.PropTypes.func,
    onChangePasswordSubmit: React.PropTypes.func
  }

  state = {
    status: AsyncStatus.IDLE,
    deleteMode: false,
    changePasswordMode: false,
    changePasswordMessage: ''
  }

  componentWillReceiveProps (props) {
    console.log(props)
    if (this.state.status === AsyncStatus.REQUEST &&
        props.user.action.type === UserActions.USER_CHANGE_PASSWORD &&
        props.user.action.status === AsyncStatus.SUCCESS) {
      return this.setState({
        changePasswordMode: false,
        changePasswordMessage: ''
      })
    }
    this.setState({
      changePasswordMessage: props.user.action.message
    })
  }

  handleCancelDelete = () => {
    this.setState({
      deleteMode: false
    })
  }

  handleDeleteMode = () => {
    this.setState({
      deleteMode: true
    })
  }

  handleCancelChangePassword = () => {
    this.setState({
      changePasswordMode: false,
      changePasswordMessage: ''
    })
  }

  handleChangePasswordMode = () => {
    this.setState({
      changePasswordMode: true
    })
  }

  setPassword1 = (ev) => {
    this.setState({
      pass1: ev.target.value
    })
  }

  setPassword2 = (ev) => {
    this.setState({
      pass2: ev.target.value
    })
  }

  onSubmit = () => {
    this.setState({
      status: AsyncStatus.REQUEST
    })
    this.props.onChangePasswordSubmit(this.state.pass1, this.state.pass2)
  }

  focus = (field) => {
    if (field) {
      field.focus()
    }
  }

  render () {
    const deleteActions = [
      <FlatButton label='Cancel' secondary onTouchTap={this.handleCancelDelete} />,
      <FlatButton
        label='Submit'
        primary
        keyboardFocused
        onTouchTap={this.props.onDeleteSubmit} />
    ]

    const changePasswordActions = [
      <FlatButton label='Cancel' secondary onTouchTap={this.handleCancelChangePassword} />,
      <FlatButton
        label='Submit'
        primary
        keyboardFocused
        onTouchTap={this.onSubmit} />
    ]

    return (
      <List style={styles.list}>
        <ListItem style={styles.item} primaryText='Change password' onClick={this.handleChangePasswordMode} leftIcon={<LockIcon />} />
        <ListItem style={styles.item} primaryText='Delete account' onClick={this.handleDeleteMode} leftIcon={<RemoveIcon />} />
        <Dialog
          label='Change Password'
          actions={changePasswordActions}
          modal
          open={this.state.changePasswordMode}>
          <Title label='Change Password' message={this.state.changePasswordMessage} />
          <TextField
            ref={this.focus}
            onKeyDown={this.onEnterKeyDown}
            floatingLabelText='Insert New Password'
            style={styles.textfield}
            type='password'
            onChange={this.setPassword1}
          />
          <TextField
            onKeyDown={this.onEnterKeyDown}
            floatingLabelText='Repeat New Password'
            style={styles.textfield}
            type='password'
            onChange={this.setPassword2}
          />
        </Dialog>

        <Dialog
          title='Delete account'
          label='Delete'
          actions={deleteActions}
          modal
          open={this.state.deleteMode}>
          <p>Are you sure you want to delete your account?</p>
        </Dialog>
      </List>
    )
  }
}
