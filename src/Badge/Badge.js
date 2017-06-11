import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'info', 'warning', 'danger']),
};

const defaultProps = {
  className: null,
  variant: 'default',
};

function Badge({ variant, className, ...attributes }) {
  const classes = cx('badge', `badge-${variant}`, className);

  return <span {...attributes} className={classes} />;
}

Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default Badge;
