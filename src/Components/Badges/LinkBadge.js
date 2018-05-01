import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { RawLink, propValues } from '../../utils';

const propTypes = {
  variant: PropTypes.oneOf(propValues.colors),
};

const defaultProps = {
  variant: 'primary',
};

function LinkBadge({ variant, ...attributes }) {
  const classes = cx('badge', `badge-${variant}`);

  return <RawLink {...attributes} className={classes} />;
}

LinkBadge.propTypes = propTypes;
LinkBadge.defaultProps = defaultProps;

export default LinkBadge;
