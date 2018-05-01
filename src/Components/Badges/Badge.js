import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { TextView, propValues } from '../../utils';

const propTypes = {
  variant: PropTypes.oneOf(propValues.colors),
};

const defaultProps = {
  variant: 'primary',
};

function Badge({ variant, ...attributes }) {
  const classes = cx('badge', `badge-${variant}`);

  return <TextView {...attributes} className={classes} />;
}

Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default Badge;
