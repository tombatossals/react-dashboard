import React from 'react'
import MenuItem from 'material-ui/MenuItem'

export default class MenuItemLink extends React.Component {
  static propTypes = {
    url: React.PropTypes.string.isRequired,
    primaryText: React.PropTypes.string.isRequired,
    handleOnClick: React.PropTypes.func.isRequired,
    leftIcon: React.PropTypes.element
  }

  handleOnClick = () => {
    this.props.handleOnClick(this.props.url)
  }

  render () {
    return (
      <MenuItem
        primaryText={this.props.primaryText}
        onClick={this.handleOnClick}
        leftIcon={this.props.leftIcon}
      />
    )
  }
}
