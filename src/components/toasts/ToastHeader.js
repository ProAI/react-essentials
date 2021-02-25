import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const ToastHeader = React.forwardRef((props, ref) => (
  <BaseView {...props} ref={ref} essentials={{ className: 'toast-header' }} />
));

ToastHeader.displayName = 'ToastHeader';
ToastHeader.propTypes = propTypes;

export default ToastHeader;
