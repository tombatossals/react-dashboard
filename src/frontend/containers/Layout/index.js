import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import HeaderMenu from 'components/HeaderToolbar'
import { getUserPropTypes } from 'lib/proptypes'

const Layout = (props) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <HeaderMenu user={props.user} />
    {this.props.children}
  </MuiThemeProvider>
)

Layout.propTypes = {
  user: getUserPropTypes()
}

export default Layout
