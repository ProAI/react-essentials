import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseText } from '../../utils/components';
import { COLORS } from '../../utils/constants';

const propTypes = {
  color: PropTypes.oneOf(COLORS),
};

const defaultProps = {
  color: 'primary',
};

function Badge({ color, ...elementProps }) {
  const classes = cx(
    // constant classes
    'badge',
    `badge-${color}`,
  );

  return <BaseText props={elementProps} className={classes} inlineOnly />;
}

Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default Badge;
