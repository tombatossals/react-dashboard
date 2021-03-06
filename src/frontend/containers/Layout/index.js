import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { getUserPropTypes } from 'lib/proptypes'
import { connect } from 'react-redux'
import { checkAuthToken } from 'actions'
import Header from 'components/Header'
import { withRouter } from 'react-router'

class Layout extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    checkAuthToken: React.PropTypes.func.isRequired,
    user: getUserPropTypes(),
    router: React.PropTypes.object.isRequired
  }

  componentDidMount () {
    this.props.checkAuthToken()
  }

  navigate = (url) => {
    this.props.router.push(url)
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Header user={this.props.user} onNavigationChange={this.navigate} />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user })
export default withRouter(connect(mapStateToProps,
  { checkAuthToken })(Layout))
