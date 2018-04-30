import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { DISPLAY_HEADING_SIZES, UTILS } from '../../utils/propTypes';

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(DISPLAY_HEADING_SIZES).isRequired,
  class: PropTypes.arrayOf(UTILS),
  style: PropTypes.object,
};

const defaultProps = {
  class: null,
  style: null,
};

function Heading({
  children, size, class: utils, style,
}) {
  const classes = cx(
    // base classes
    `display-${size}`,
    // util classes
    utils.join(' '),
  );

  return (
    <h1 className={classes} style={style}>
      {children}
    </h1>
  );
}

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;

export default Heading;
