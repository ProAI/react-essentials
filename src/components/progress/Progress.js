import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';
import ProgressBar from './ProgressBar';
import ProgressContext from './ProgressContext';
import useProgress from './useProgress';

const propTypes = {
  children: PropTypes.node.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const Progress = React.forwardRef((props, ref) => {
  const { min = 0, max = 100, style, ...elementProps } = props;

  const progress = useProgress(min, max);

  return (
    <ProgressContext.Provider value={progress}>
      <BaseView
        {...elementProps}
        ref={ref}
        style={[style, { flexDirection: 'row' }]}
        essentials={{ className: 'progress' }}
      />
    </ProgressContext.Provider>
  );
});

Progress.displayName = 'Progress';
Progress.propTypes = propTypes;

Progress.Bar = ProgressBar;

export default Progress;
