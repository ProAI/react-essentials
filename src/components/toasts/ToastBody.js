import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const ToastBody = React.forwardRef((props, ref) => (
  <BaseView {...props} ref={ref} essentials={{ className: 'toast-body' }} />
));

ToastBody.displayName = 'ToastBody';
ToastBody.propTypes = propTypes;

export default ToastBody;
