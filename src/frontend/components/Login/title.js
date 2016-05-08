import React from 'react'
import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle'
import styles from 'components/Login/login.style'

const Title = (props) => (
  <Toolbar style={styles.title}>
    <ToolbarGroup float='left'>
      <ToolbarTitle text='Login' />
    </ToolbarGroup>
    <ToolbarGroup float='right'>
      <ToolbarTitle style={styles.error} text={props.message} />
    </ToolbarGroup>
  </Toolbar>
)

Title.propTypes = {
  message: React.PropTypes.string
}

export default Title
