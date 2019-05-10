import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const ModalBody = React.forwardRef(function ModalBody(props, ref) {
  return (
    <BaseView {...props} ref={ref} essentials={{ className: 'modal-body' }} />
  );
});

ModalBody.propTypes = propTypes;

export default ModalBody;
