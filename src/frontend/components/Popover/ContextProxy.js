import React from 'react';

export default class ContextProxy extends React.Component {
  getChildContext() {
    return this.props.cx;
  }

  render() {
    return this.props.children;
  }
}

ContextProxy.childContextTypes = {
  history: React.PropTypes.object,
  router: React.PropTypes.object,
};

ContextProxy.propTypes = {
  cx: React.PropTypes.any,
  children: React.PropTypes.any,
};
