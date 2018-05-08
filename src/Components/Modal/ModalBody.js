import React from 'react';
import PropTypes from 'prop-types';
import { BaseView } from '../../utils/components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function ModalBody({ children, ...elementProps }) {
  return (
    <BaseView props={elementProps} className="modal-body">
      {children}
    </BaseView>
  );
}

ModalBody.propTypes = propTypes;

export default ModalBody;
