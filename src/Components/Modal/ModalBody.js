import React from 'react';
import { BaseView } from '../../utils/components';

function ModalBody({ ...otherProps }) {
  return <BaseView {...otherProps} className="modal-body" />;
}

export default ModalBody;
