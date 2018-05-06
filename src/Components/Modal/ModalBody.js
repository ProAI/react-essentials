import React from 'react';
import { BaseView } from '../../utils/components';

function ModalBody({ ...elementProps }) {
  return <BaseView props={elementProps} className="modal-body" />;
}

export default ModalBody;
