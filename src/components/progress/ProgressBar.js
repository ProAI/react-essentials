import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { COLORS } from '../../utils/constants';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  color: PropTypes.oneOf(COLORS),
  striped: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const ProgressBar = React.forwardRef((props, ref) => {
  const {
    value,
    min,
    max,
    color = null,
    striped,
    style,
    ...elementProps
  } = props;

  const classes = cx(
    // constant classes
    'progress-bar',
    // variable classes
    color && `bg-${color}`,
    striped && 'progress-bar-striped',
  );

  return (
    <BaseView
      {...elementProps}
      ref={ref}
      style={[style, { width: `${value}%` }]}
      accessibilityRole="progressbar"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      essentials={{ className: classes }}
    />
  );
});

ProgressBar.displayName = 'ProgressBar';
ProgressBar.propTypes = propTypes;

export default ProgressBar;
