import React from 'react';
import { BaseView } from '../../utils/components';

function ModalFooter({ ...elementProps }) {
  return <BaseView props={elementProps} className="modal-footer" />;
}

export default ModalFooter;
