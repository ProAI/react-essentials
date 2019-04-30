import React from 'react';
import PropTypes from 'prop-types';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function ModalFooter(elementProps) {
  return (
    <BaseView {...elementProps} essentials={{ className: 'modal-footer' }} />
  );
}

ModalFooter.propTypes = propTypes;

export default ModalFooter;
