import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';
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
    size && `spinner-${variant}-sm`,
  );

  return <BaseView props={elementProps} role="alert" className={classes} />;
}

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
