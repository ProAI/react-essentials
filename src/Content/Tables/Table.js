import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { UTILS } from '../utils/propTypes';

const propTypes = {
  children: PropTypes.node.isRequired,
  bordered: PropTypes.bool,
  striped: PropTypes.bool,
  hover: PropTypes.bool,
  responsive: PropTypes.bool,
  responsiveSm: PropTypes.bool,
  responsiveMd: PropTypes.bool,
  responsiveLg: PropTypes.bool,
  responsiveXl: PropTypes.bool,
  class: PropTypes.arrayOf(UTILS),
  style: PropTypes.object,
};

const defaultProps = {
  bordered: false,
  striped: false,
  hover: false,
  responsive: false,
  responsiveSm: false,
  responsiveMd: false,
  responsiveLg: false,
  responsiveXl: false,
  class: null,
  style: null,
};

function Table({
  children,
  bordered, // borderless?
  striped,
  hover,
  responsive,
  responsiveSm,
  responsiveMd,
  responsiveLg,
  responsiveXl,
  class: utils,
  style,
}) {
  const classes = cx(
    // util classes
    utils.join(' '));

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;
