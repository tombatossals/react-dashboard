import React from 'react'
import List from 'material-ui/List'
import ListItem from 'material-ui/List/ListItem'
import Dialog from 'material-ui/Dialog'
import styles from 'components/User/Profile/ProfileTab/style'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { getUserPropTypes } from 'lib/proptypes'
import { AsyncStatus } from 'lib/constants'
import LinearProgress from 'material-ui/LinearProgress'

class PreferencesTab extends React.Component {
  constructor () {
    super()
    this.handleEditMode = this.handleEditMode.bind(this)
    this.handleCancelEdit = this.handleCancelEdit.bind(this)
    this.setUsername = this.setUsername.bind(this)
    this.setEmail = this.setEmail.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      editMode: false,
      status: AsyncStatus.IDLE
    }
  }

  componenWillReceiveProps (props) {
    this.setState({
      username: props.user.data.username,
      email: props.user.data.email
    })
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

  onEnterKeyDown (ev) {
    if (ev.keyCode === 13) {
      this.submit()
    }
  }

  handleEditMode () {
    this.setState({
      editMode: true
    })
  }

  handleCancelEdit () {
    this.setState({
      editMode: false
    })
  }

  onSubmit () {
    this.setState({
      status: AsyncStatus.LOADING
    })
    this.props.onEditSubmit(this.state)
  }

  render () {
    const actions = [
      <FlatButton label='Cancel' secondary onTouchTap={this.handleCancelEdit} />,
      <FlatButton
        label='Submit'
        primary
        keyboardFocused
        onTouchTap={this.onSubmit} />
    ]

    if (this.state.status === AsyncStatus.LOADING) {
      actions.push(<LinearProgress style={styles.progress} mode='indeterminate' />)
    }

    return (
      <List style={styles.list}>
        <ListItem
          style={styles.item}
          primaryText={this.props.user.data.username}
          secondaryText='Username'
          onClick={this.handleEditMode} />
        <ListItem
          style={styles.item}
          primaryText={this.props.user.data.email}
          secondaryText='E-Mail'
          onClick={this.handleEditMode} />
        <Dialog
          title='Edit profile'
          label='Profile'
          actions={actions}
          modal
          open={this.state.editMode}>
          <TextField
            onKeyDown={this.onEnterKeyDown}
            floatingLabelText='Username'
            style={styles.textfield}
            onChange={this.setUsername}
            defaultValue={this.props.user.data.username}
          />
          <TextField
            onKeyDown={this.onEnterKeyDown}
            floatingLabelText='E-Mail'
            style={styles.textfield}
            onChange={this.setEmail}
            defaultValue={this.props.user.data.email}
          />
        </Dialog>
      </List>
    )
  }
}

PreferencesTab.propTypes = {
  user: getUserPropTypes(),
  onEditSubmit: React.PropTypes.func
}

export default PreferencesTab
