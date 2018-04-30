import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { UTILS } from '../utils/propTypes';

const propTypes = {
  children: PropTypes.node.isRequired,
  class: PropTypes.arrayOf(UTILS),
  style: PropTypes.object,
};

const defaultProps = {
  class: null,
  style: null,
};

function TableRow({ children, class: utils, style }) {
  const classes = cx(
    // util classes
    utils.join(' '));

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}

TableRow.propTypes = propTypes;
TableRow.defaultProps = defaultProps;

export default TableRow;
