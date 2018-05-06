import React from 'react';
import { BaseText } from '../../utils/components';

function FormText({ ...elementProps }) {
  return <BaseText props={elementProps} className="form-text" />;
}

export default FormText;
