import React from 'react'

const Preferences = () => (
  <Tab label='Profile' onClick={this.handleBrowseProfileAction}>
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
    </List>
    <Dialog
      title='Edit profile'
      label='Profile'
      actions={editActions}
      modal
      open={this.state.editMode}>
      <TextField floatingLabelText='Username' style={styles.textfield} defaultValue={this.props.user.data.username} />
      <TextField floatingLabelText='E-Mail' style={styles.textfield} defaultValue={this.props.user.data.email} />
    </Dialog>
  </Tab>
  <Tab label='Preferences' onClick={this.handleBrowsePreferencesAction}>
    <List style={styles.list}>
      <ListItem style={styles.item} primaryText='Change password' leftIcon={<LockIcon />} />
      <ListItem style={styles.item} primaryText='Delete account' onClick={this.handleDeleteMode} leftIcon={<RemoveIcon />} />
    </List>
    <Dialog
      title='Delete account'
      label='Delete'
      actions={deleteActions}
      modal
      open={this.state.deleteMode}>
      <p>Are you sure you want to delete your account?</p>
    </Dialog>
  </Tab>
)

export default Preferences
