import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseText from '../../utils/rnw-compat/BaseText';
import { TEXT_COLORS } from '../../utils/constants';

const propTypes = {
  variant: PropTypes.oneOf(['border', 'grow']),
  color: PropTypes.oneOf(TEXT_COLORS),
  size: PropTypes.oneOf(['sm']),
};

const Spinner = React.forwardRef(function Spinner(props, ref) {
  const { variant = 'border', color, size, ...elementProps } = props;

  const classes = cx(
    // constant classes
    `spinner-${variant}`,
    // variable classes
    color && `text-${color}`,
    size === 'sm' && `spinner-${variant}-sm`,
  );

  return (
    <BaseText {...elementProps} ref={ref} essentials={{ className: classes }} />
  );
});

Spinner.displayName = 'Spinner';
Spinner.propTypes = propTypes;

export default Spinner;
