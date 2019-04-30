import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function ToastHeader(elementProps) {
  return (
    <BaseView {...elementProps} essentials={{ className: 'toast-header' }} />
  );
}

ToastHeader.propTypes = propTypes;

export default ToastHeader;
