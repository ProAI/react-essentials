import React from 'react';
import { BaseView } from '../../utils/components';

function ModalBody({ ...elementProps }) {
  return <BaseView elementProps={elementProps} className="modal-body" />;
}

export default ModalBody;
