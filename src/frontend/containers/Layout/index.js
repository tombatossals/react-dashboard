import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { getUserPropTypes } from 'lib/proptypes'
import { connect } from 'react-redux'
import { checkAuthToken } from 'actions'
import HeaderMenu from 'components/HeaderToolbar'
import { withRouter } from 'react-router'

class Layout extends React.Component {
  constructor () {
    super()
    this.navigate = this.navigate.bind(this)
  }

  componentDidMount () {
    this.props.checkAuthToken()
  }

  navigate (url) {
    this.props.router.push(url)
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <HeaderMenu user={this.props.user} onNavigationChange={this.navigate} />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

Layout.propTypes = {
  children: React.PropTypes.node,
  checkAuthToken: React.PropTypes.func.isRequired,
  user: getUserPropTypes(),
  router: React.PropTypes.object.isRequired
}

const mapStateToProps = ({ user }) => ({ user })
export default withRouter(connect(mapStateToProps,
  { checkAuthToken })(Layout))
