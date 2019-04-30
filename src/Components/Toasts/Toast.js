import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';
import ToastBody from './ToastBody';
import ToastHeader from './ToastHeader';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function Toast(elementProps) {
  const classes = cx(
    // constant classes
    'toast',
    'show',
  );

  return (
    <BaseView
      {...elementProps}
      accessibilityRole="alert"
      essentials={{ className: classes }}
    />
  );
}

Toast.propTypes = propTypes;

Toast.Body = ToastBody;
Toast.Header = ToastHeader;

export default Toast;
