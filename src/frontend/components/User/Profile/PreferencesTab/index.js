import React from 'react'
import LockIcon from 'material-ui/svg-icons/action/lock'
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle'
import List from 'material-ui/List'
import ListItem from 'material-ui/List/ListItem'
import Dialog from 'material-ui/Dialog'
import styles from 'components/User/Profile/profile.style'
import FlatButton from 'material-ui/FlatButton'

class PreferencesTab extends React.Component {
  constructor () {
    super()
    this.handleDeleteMode = this.handleDeleteMode.bind(this)
    this.handleCancelDelete = this.handleCancelDelete.bind(this)
    this.state = {
      deleteMode: false
    }
  }

  handleCancelDelete () {
    this.setState({
      deleteMode: false
    })
  }

  handleDeleteMode () {
    this.setState({
      deleteMode: true
    })
  }

  render () {
    const actions = [
      <FlatButton label='Cancel' secondary onTouchTap={this.handleCancelDelete} />,
      <FlatButton
        label='Submit'
        primary
        keyboardFocused
        onTouchTap={this.props.onDeleteSubmit} />
    ]

    return (
      <List style={styles.list}>
        <ListItem style={styles.item} primaryText='Change password' leftIcon={<LockIcon />} />
        <ListItem style={styles.item} primaryText='Delete account' onClick={this.handleDeleteMode} leftIcon={<RemoveIcon />} />
        <Dialog
          title='Delete account'
          label='Delete'
          actions={actions}
          modal
          open={this.state.deleteMode}>
          <p>Are you sure you want to delete your account?</p>
        </Dialog>
      </List>
    )
  }
}

PreferencesTab.propTypes = {
  onDeleteSubmit: React.PropTypes.func
}

export default PreferencesTab
