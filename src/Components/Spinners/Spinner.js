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

const defaultProps = {
  variant: 'border',
  color: null,
  size: null,
};

function Spinner({ variant, color, size, ...elementProps }) {
  const classes = cx(
    // constant classes
    `spinner-${variant}`,
    // variable classes
    color && `text-${color}`,
    size === 'sm' && `spinner-${variant}-sm`,
  );

  return <BaseText {...elementProps} essentials={{ className: classes }} />;
}

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
