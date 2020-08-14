import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';
import ProgressBar from './ProgressBar';

const propTypes = {
  children: PropTypes.node.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const Progress = React.forwardRef(function Progress(props, ref) {
  const { children, min = 0, max = 100, style, ...elementProps } = props;

  const clonedChildren = React.Children.map(children, child => {
    return React.cloneElement(child, { min, max });
  });

  return (
    <BaseView
      {...elementProps}
      ref={ref}
      style={[style, { flexDirection: 'row' }]}
      essentials={{ className: 'progress' }}
    >
      {clonedChildren}
    </BaseView>
  );
});

Progress.displayName = 'Progress';
Progress.propTypes = propTypes;

Progress.Bar = ProgressBar;

export default Progress;
