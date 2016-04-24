import React from 'react';

const Icon = ({ name, fill, width, height }) =>
  <svg height={height} width={width} fill={fill}>
    <use xlinkHref={`bundles/sprites.svg#${name}`} />
  </svg>;

export default Icon;

Icon.propTypes = {
  name: React.PropTypes.string.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  fill: React.PropTypes.string,
};
