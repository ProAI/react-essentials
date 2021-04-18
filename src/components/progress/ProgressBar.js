import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import invariant from 'fbjs/lib/invariant';
import { COLORS } from '../../utils/constants';
import BaseView from '../../utils/rnw-compat/BaseView';
import ProgressContext from './ProgressContext';

const propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
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
    color = null,
    striped = false,
    style,
    ...elementProps
  } = props;

  const progress = useContext(ProgressContext);

  invariant(
    progress,
    'ProgressBar can only be used inside a Progress component.',
  );

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
      aria-valuemin={progress.min}
      aria-valuemax={progress.max}
      essentials={{ className: classes }}
    />
  );
});

ProgressBar.displayName = 'ProgressBar';
ProgressBar.propTypes = propTypes;

export default ProgressBar;
