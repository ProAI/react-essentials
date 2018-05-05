import React from 'react';
import { BaseText } from '../../utils/components';

function FormText({ ...elementProps }) {
  return <BaseText elementProps={elementProps} className="form-text" />;
}

export default FormText;
