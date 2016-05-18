import React from 'react'
import List from 'material-ui/List'
import ListItem from 'material-ui/List/ListItem'
import Dialog from 'material-ui/Dialog'
import styles from 'components/User/Profile/ProfileTab/style'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { getUserPropTypes } from 'lib/proptypes'
import { AsyncStatus, UserActions } from 'lib/constants'
import LinearProgress from 'material-ui/LinearProgress'
import isequal from 'lodash.isequal'
import Title from 'components/User/Title'

class PreferencesTab extends React.Component {
  constructor () {
    super()
    this.handleEditMode = this.handleEditMode.bind(this)
    this.handleCancelEdit = this.handleCancelEdit.bind(this)
    this.userHasDifferences = this.userHasDifferences.bind(this)
    this.onEnterKeyDown = this.onEnterKeyDown.bind(this)
    this.setUsername = this.setUsername.bind(this)
    this.setEmail = this.setEmail.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      editMode: false,
      status: AsyncStatus.IDLE
    }
  }

  componentWillMount () {
    this.setState({
      username: this.props.user.data.username,
      email: this.props.user.data.email
    })
  }

  componentWillReceiveProps (props) {
    this.setState({
      status: props.user.action.status,
      message: props.user.action.message
    })

    if (this.state.status === AsyncStatus.LOADING &&
        props.user.action.type === UserActions.USER_UPDATE &&
        props.user.action.status === AsyncStatus.SUCCESS) {
      this.setState({
        editMode: false,
        status: AsyncStatus.IDLE,
        message: ''
      })
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

  onEnterKeyDown (ev) {
    if (ev.keyCode === 13) {
      this.onSubmit()
    }
  }

  handleEditMode () {
    this.setState({
      editMode: true
    })
  }

  handleCancelEdit () {
    this.setState({
      editMode: false,
      status: AsyncStatus.IDLE,
      message: ''
    })
  }

  userHasDifferences () {
    return !isequal({
      username: this.props.user.data.username,
      email: this.props.user.data.email
    }, {
      username: this.state.username,
      email: this.state.email
    })
  }

  onSubmit () {
    if (this.userHasDifferences()) {
      this.setState({
        status: AsyncStatus.LOADING
      })

      const userdata = {
        username: this.state.username,
        email: this.state.email
      }

      return this.props.onEditSubmit(userdata)
    }

    if (this.state.status === AsyncStatus.IDLE) {
      return this.setState({
        editMode: false
      })
    }
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
          label='Profile'
          actions={actions}
          modal
          open={this.state.editMode}>
          <Title label='Edit profile' message={this.state.message} />
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
