import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';
import ToastBody from './ToastBody';
import ToastHeader from './ToastHeader';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function Toast({ children, ...elementProps }) {
  const classes = cx(
    // constant classes
    'toast',
    'show',
  );

  return (
    <BaseView props={elementProps} role="alert" className={classes}>
      {children}
    </BaseView>
  );
}

Toast.propTypes = propTypes;

Toast.Body = ToastBody;
Toast.Header = ToastHeader;

export default Toast;
