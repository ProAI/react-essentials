import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseText } from '../../utils/components';
import { COLORS } from '../../utils/constants';

const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(COLORS),
};

const defaultProps = {
  color: 'primary',
};

function Badge({ children, color, ...elementProps }) {
  const classes = cx(
    // constant classes
    'badge',
    `badge-${color}`,
  );

  return (
    <BaseText props={elementProps} className={classes} inlineOnly>
      {children}
    </BaseText>
  );
}

Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default Badge;
