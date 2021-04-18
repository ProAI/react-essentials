import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
  titleId: PropTypes.string,
};

const ModalHeader = React.forwardRef((props, ref) => (
  <BaseView {...props} ref={ref} essentials={{ className: 'modal-header' }} />
));

ModalHeader.displayName = 'ModalHeader';
ModalHeader.propTypes = propTypes;

export default ModalHeader;
