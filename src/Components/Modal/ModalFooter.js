import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function ModalFooter({ children, ...elementProps }) {
  return (
    <BaseView props={elementProps} className="modal-footer">
      {children}
    </BaseView>
  );
}

ModalFooter.propTypes = propTypes;

export default ModalFooter;
