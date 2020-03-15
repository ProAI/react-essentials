import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';
import { COLORS } from '../../utils/constants';

const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(COLORS),
};

const Badge = React.forwardRef(function Badge(props, ref) {
  const { color = 'primary', ...elementProps } = props;

  const classes = cx(
    // constant classes
    'badge',
    `badge-${color}`,
  );

  return (
    <BaseView {...elementProps} ref={ref} essentials={{ className: classes }} />
  );
});

Badge.displayName = 'Badge';
Badge.propTypes = propTypes;

export default Badge;
