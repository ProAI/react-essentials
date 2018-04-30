import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { HEADING_SIZES, UTILS } from '../../utils/propTypes';

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(HEADING_SIZES).isRequired,
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
  const classes = cx(utils.join(' '));

  const Hx = `h${size.toString()}`;

  return (
    <Hx className={classes} style={style}>
      {children}
    </Hx>
  );
}

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;

export default Heading;
