import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  bordered: PropTypes.bool,
  striped: PropTypes.bool,
  hover: PropTypes.bool,
  responsive: PropTypes.bool,
  responsiveSm: PropTypes.bool,
  responsiveMd: PropTypes.bool,
  responsiveLg: PropTypes.bool,
  responsiveXl: PropTypes.bool,
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
};

function Table({
  bordered,
  striped,
  hover,
  responsive,
  responsiveSm,
  responsiveMd,
  responsiveLg,
  responsiveXl,
  ...otherProps
}) {
  const classes = cx(
    // constant classes
    'table',
    // variable classes
    bordered && 'table-bordered',
    striped && 'table-striped',
    hover && 'table-hover',
    responsive && 'table-responsive',
    responsiveSm && 'table-responsive-sm',
    responsiveMd && 'table-responsive-md',
    responsiveLg && 'table-responsive-lg',
    responsiveXl && 'table-responsive-xl',
  );

  return <div {...otherProps} className={classes} />;
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;
