import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const ToastHeader = React.forwardRef(function ToastHeader(props, ref) {
  return (
    <BaseView {...props} ref={ref} essentials={{ className: 'toast-header' }} />
  );
});

ToastHeader.propTypes = propTypes;

export default ToastHeader;
