import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
  ]),
};

const defaultProps = {
  className: null,
  variant: 'primary',
};

function Badge({ variant, className, ...attributes }) {
  const classes = cx('badge', `badge-${variant}`, className);

  return <span {...attributes} className={classes} />;
}

Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default Badge;
