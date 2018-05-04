import React from 'react';
import { BaseView } from '../../utils/components';

function ModalFooter({ ...otherProps }) {
  return <BaseView {...otherProps} className="modal-footer" />;
}

export default ModalFooter;
