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

function ListGroup({
  children, fluid, class: utils, style,
}) {
  const classes = cx(utils.join(' '));

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}

ListGroup.propTypes = propTypes;
ListGroup.defaultProps = defaultProps;

export default ListGroup;
