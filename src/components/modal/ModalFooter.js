import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const ModalFooter = React.forwardRef((props, ref) => (
  <BaseView {...props} ref={ref} essentials={{ className: 'modal-footer' }} />
));

ModalFooter.displayName = 'ModalFooter';
ModalFooter.propTypes = propTypes;

export default ModalFooter;
