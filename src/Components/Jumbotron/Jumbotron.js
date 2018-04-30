import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { UTILS } from '../../utils/propTypes';

const propTypes = {
  children: PropTypes.node.isRequired,
  fluid: PropTypes.bool,
  class: PropTypes.arrayOf(UTILS),
  style: PropTypes.object,
};

const defaultProps = {
  fluid: false,
  class: null,
  style: null,
};

function Jumbotron({
  children, fluid, class: utils, style,
}) {
  const classes = cx(
    // base classes
    'jumbotron',
    // variable classes
    fluid ? 'jumbotron-fluid' : null,
    // util classes
    utils.join(' '),
  );

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}

Jumbotron.propTypes = propTypes;
Jumbotron.defaultProps = defaultProps;

export default Jumbotron;
