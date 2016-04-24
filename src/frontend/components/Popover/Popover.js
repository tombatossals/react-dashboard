import hasAncestor from 'lib/hasAncestor';
import React from 'react';
import ReactDOM from 'react-dom';
import styles from 'components/Popover/Popover.scss';
import ContextProxy from 'components/Popover/ContextProxy';
import Position from 'lib/Position';

export default class Popover extends React.Component {
  constructor() {
    super();
    this.checkExternalClick = this.checkExternalClick.bind(this);
  }

  componentWillMount() {
    const wrapperStyle = this.props.fixed ? styles.fixed_wrapper : styles.popover_wrapper;
    this.popoverWrapper = document.getElementById(wrapperStyle);

    if (!this.popoverWrapper) {
      this.popoverWrapper = document.createElement('div');
      this.popoverWrapper.id = wrapperStyle;
      document.body.appendChild(this.popoverWrapper);
    }

    this.popoverLayer = document.createElement('div');
    if (this.props.position) {
      this.popoverLayer.style.left = `${this.props.position.x}px`;
      this.popoverLayer.style.top = `${this.props.position.y}px`;
    }

    if (this.props.modal) {
      this.popoverLayer.style.right = 0;
      this.popoverLayer.style.bottom = 0;
    }

    if (this.props.color) {
      this.popoverLayer.style.background = this.props.color;
    }

    if (this.props.fadeIn) {
      this.popoverLayer.className = styles.transition;
    }

    this.popoverWrapper.appendChild(this.popoverLayer);
  }

  componentDidMount() {
    ReactDOM.render(
      <ContextProxy cx={this.context}>{React.Children.only(this.props.children)}</ContextProxy>,
      this.popoverLayer
    );
    document.body.addEventListener('click', this.checkExternalClick);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.position) {
      this.popoverLayer.style.left = `${this.props.position.x}px`;
      this.popoverLayer.style.top = `${this.props.position.y}px`;
    }
  }

  componentWillUpdate(nextProps) {
    ReactDOM.render(
      <ContextProxy cx={this.context}>{React.Children.only(nextProps.children)}</ContextProxy>,
      this.popoverLayer
    );
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.checkExternalClick);
    ReactDOM.unmountComponentAtNode(this.popoverLayer);
    this.popoverWrapper.removeChild(this.popoverLayer);
  }

  _checkExternalClick(e) {
    if (!hasAncestor(e.target, this.popoverLayer) &&
      this.props.onExternalClick) {
      this.props.onExternalClick(e);
    }
  }

  render() {
    return <div></div>;
  }
}

Popover.contextTypes = {
  history: React.PropTypes.object,
  router: React.PropTypes.object,
};

Popover.propTypes = {
  onExternalClick: React.PropTypes.func,
  fixed: React.PropTypes.bool,
  position: React.PropTypes.instanceOf(Position),
  children: React.PropTypes.node,
  modal: React.Proptypes.bool,
  color: React.PropTypes.string,
  fadeIn: React.PropTypes.bool,
};
