import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';
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

function Alert({ children, color, dismissible, ...elementProps }) {
  const classes = cx(
    // constant classes
    'alert',
    `alert-${color}`,
    dismissible && 'alert-dismissible',
  );

  return (
    <BaseView props={elementProps} role="alert" className={classes}>
      {children}
    </BaseView>
  );
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default Alert;
