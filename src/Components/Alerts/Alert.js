import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';
import { COLORS } from '../../utils/constants';

const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(COLORS),
  dismissible: PropTypes.bool,
};

const defaultProps = {
  color: 'primary',
  dismissible: false,
};

function Alert({ color, dismissible, ...elementProps }) {
  const classes = cx(
    // constant classes
    'alert',
    `alert-${color}`,
    dismissible && 'alert-dismissible',
  );

  return (
    <BaseView
      {...elementProps}
      accessibilityRole="alert"
      essentials={{ className: classes }}
    />
  );
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default Alert;
