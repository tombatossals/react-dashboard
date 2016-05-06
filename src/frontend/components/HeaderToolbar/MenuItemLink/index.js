import React from 'react';
import MenuItem from 'material-ui/MenuItem';

export default class MenuItemLink extends React.Component {
  constructor() {
    super();
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.handleOnClick(this.props.url);
  }

  render() {
    return (
      <MenuItem
        primaryText={this.props.primaryText}
        onClick={this.handleOnClick}
        leftIcon={this.props.leftIcon}
      />
    );
  }
}

MenuItemLink.propTypes = {
  url: React.PropTypes.string.isRequired,
  primaryText: React.PropTypes.string.isRequired,
  leftIcon: React.PropTypes.element,
  handleOnClick: React.PropTypes.func,
};
